'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal, Play, Pause, Square, Zap, RefreshCw, Clock, Check, X, Loader2, ChevronDown } from 'lucide-react';
import { MCPRegistryPanel } from '@/components/openclaw/MCPRegistryPanel';

interface Agent {
  id: string;
  name: string;
  layer: string;
  entity: string;
}

interface Command {
  id: string;
  agent_id: string;
  command: string;
  status: 'pending' | 'sent' | 'ack' | 'completed' | 'failed';
  result?: Record<string, unknown>;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

type CommandAction = 'run' | 'pause' | 'resume' | 'stop';

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: '#B8963E', text: '#FFFFFF', label: 'EN QUEUE' },
  sent: { bg: '#3D5E8C', text: '#FFFFFF', label: 'ENVOYÉ' },
  ack: { bg: '#B87D3E', text: '#FFFFFF', label: 'REÇU' },
  completed: { bg: '#3D7C5E', text: '#FFFFFF', label: 'TERMINÉ' },
  failed: { bg: '#9C3D3D', text: '#FFFFFF', label: 'ERREUR' },
};

export default function CommandPanel() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [commands, setCommands] = useState<Command[]>([]);
  const [activeCommand, setActiveCommand] = useState<Command | null>(null);
  const [connectionMode, setConnectionMode] = useState<'checking' | 'live' | 'simulated'>('checking');
  const [output, setOutput] = useState<string>('En attente de commande...');
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch agents + status au mount
  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(data => {
      const list = Array.isArray(data) ? data : data.agents || [];
      setAgents(list);
      if (list.length > 0) setSelectedAgent(list[0].id);
    });

    fetch('/api/openclaw/status')
      .then(r => r.json())
      .then(data => setConnectionMode(data.mode === 'LIVE' ? 'live' : 'simulated'))
      .catch(() => setConnectionMode('simulated'));

    refreshHistory();
  }, []);

  // Refresh l'historique des commandes
  function refreshHistory() {
    fetch('/api/openclaw/commands')
      .then(r => r.json())
      .then(data => setCommands(data.commands || []));
  }

  // Envoyer une commande
  async function sendCommand(action: CommandAction) {
    if (!selectedAgent) return;

    setOutput(`Envoi commande ${action} à ${selectedAgent}...`);

    try {
      const res = await fetch('/api/openclaw/commands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: selectedAgent,
          command: action,
          payload: { source: 'command-panel', timestamp: new Date().toISOString() },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setOutput(`Erreur: ${err.error}`);
        return;
      }

      const cmd = await res.json();
      setActiveCommand(cmd);
      setOutput(`Commande ${cmd.id.slice(0, 8)}... créée. Polling status...`);
      startPolling(cmd.id);
      refreshHistory();
    } catch (e) {
      setOutput(`Erreur réseau: ${(e as Error).message}`);
    }
  }

  // Polling du status d'une commande (500ms, 10s max)
  const startPolling = useCallback((cmdId: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    let elapsed = 0;
    pollingRef.current = setInterval(async () => {
      elapsed += 500;

      try {
        const res = await fetch(`/api/openclaw/commands/${cmdId}`);
        const cmd = await res.json();
        setActiveCommand(cmd);

        if (cmd.status === 'completed') {
          setOutput(`Terminé. Résultat: ${JSON.stringify(cmd.result || {}, null, 2)}`);
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          refreshHistory();
          return;
        }

        if (cmd.status === 'failed') {
          setOutput(`Erreur: ${cmd.error_message || 'Échec sans message'}`);
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          refreshHistory();
          return;
        }

        setOutput(`Status: ${cmd.status} (${Math.round(elapsed / 1000)}s)...`);
      } catch {
        setOutput('Erreur de polling...');
      }

      // Timeout après 10s
      if (elapsed >= 10000) {
        setOutput('Timeout 10s — commande en queue. Le bridge la traitera quand disponible.');
        clearInterval(pollingRef.current!);
        pollingRef.current = null;
      }
    }, 500);
  }, []);

  // Cleanup polling au unmount
  useEffect(() => {
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, []);

  return (
    <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[rgba(60,52,40,0.10)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#B8963E]" />
          <span className="font-['JetBrains_Mono'] text-[9px] tracking-wider text-[#918977]">
            COMMAND PANEL
          </span>
          <span className={`font-['JetBrains_Mono'] text-[7px] px-2 py-0.5 rounded-full ${
            connectionMode === 'live' ? 'bg-[#3D7C5E] text-white' : 'bg-[#918977] text-white'
          }`}>
            {connectionMode === 'live' ? 'LIVE — OpenClaw' : connectionMode === 'simulated' ? 'SIMULÉ' : '...'}
          </span>
        </div>
        <button onClick={refreshHistory}
          className="p-1 rounded hover:bg-[rgba(184,150,62,0.08)]">
          <RefreshCw size={12} className="text-[#918977]" />
        </button>
      </div>

      {/* Agent selector + Action buttons */}
      <div className="px-4 py-3 border-b border-[rgba(60,52,40,0.04)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1">
            <select
              value={selectedAgent}
              onChange={e => setSelectedAgent(e.target.value)}
              className="w-full appearance-none bg-[#F7F3EA] border border-[rgba(60,52,40,0.10)] rounded px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] text-[#1C1814] pr-8 outline-none focus:border-[#B8963E]"
            >
              {agents.map(a => (
                <option key={a.id} value={a.id}>
                  [{a.layer}] {a.name} — {a.id}
                </option>
              ))}
            </select>
            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#918977] pointer-events-none" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button onClick={() => sendCommand('run')}
            disabled={!selectedAgent || !!pollingRef.current}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-['JetBrains_Mono'] text-[8px] bg-[#3D7C5E] text-white hover:bg-[#2D5C46] disabled:opacity-40 transition">
            <Zap size={10} /> LANCER
          </button>
          <button onClick={() => sendCommand('pause')}
            disabled={!selectedAgent || !!pollingRef.current}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-['JetBrains_Mono'] text-[8px] border border-[rgba(60,52,40,0.10)] text-[#918977] hover:border-[#B8963E] disabled:opacity-40 transition">
            <Pause size={10} /> PAUSE
          </button>
          <button onClick={() => sendCommand('resume')}
            disabled={!selectedAgent || !!pollingRef.current}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-['JetBrains_Mono'] text-[8px] border border-[rgba(60,52,40,0.10)] text-[#918977] hover:border-[#B8963E] disabled:opacity-40 transition">
            <Play size={10} /> REPRENDRE
          </button>
          <button onClick={() => sendCommand('stop')}
            disabled={!selectedAgent || !!pollingRef.current}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-['JetBrains_Mono'] text-[8px] border border-[#9C3D3D20] text-[#9C3D3D] hover:border-[#9C3D3D] disabled:opacity-40 transition">
            <Square size={10} /> STOP
          </button>
        </div>
      </div>

      {/* Output panel */}
      <div className="px-4 py-3 border-b border-[rgba(60,52,40,0.04)]">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-['JetBrains_Mono'] text-[7px] tracking-wider text-[#918977]">SORTIE</span>
          {activeCommand && (
            <span className="font-['JetBrains_Mono'] text-[7px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: STATUS_STYLES[activeCommand.status]?.bg || '#918977',
                color: STATUS_STYLES[activeCommand.status]?.text || '#FFFFFF',
              }}>
              {STATUS_STYLES[activeCommand.status]?.label || activeCommand.status}
            </span>
          )}
          {pollingRef.current && <Loader2 size={10} className="text-[#B8963E] animate-spin" />}
        </div>
        <pre className="font-['JetBrains_Mono'] text-[10px] text-[#D4B662] bg-[#1C1814] p-3 rounded whitespace-pre-wrap min-h-[60px] max-h-[120px] overflow-y-auto">
          {output}
        </pre>
      </div>

      {/* Command history */}
      <div className="px-4 py-3">
        <span className="font-['JetBrains_Mono'] text-[7px] tracking-wider text-[#918977] mb-2 block">
          HISTORIQUE ({commands.length})
        </span>
        <div className="max-h-[200px] overflow-y-auto space-y-0.5">
          {commands.map(cmd => (
            <div key={cmd.id}
              className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[rgba(184,150,62,0.03)]">
              {cmd.status === 'completed' ? <Check size={10} className="text-[#3D7C5E]" /> :
               cmd.status === 'failed' ? <X size={10} className="text-[#9C3D3D]" /> :
               cmd.status === 'pending' ? <Clock size={10} className="text-[#B8963E]" /> :
               <Loader2 size={10} className="text-[#3D5E8C]" />}
              <span className="font-['JetBrains_Mono'] text-[8px] text-[#918977] w-14">
                {cmd.command}
              </span>
              <span className="font-['Noto_Sans'] text-[9px] text-[#6B5E4C] flex-1 truncate">
                {cmd.agent_id}
              </span>
              <span className="font-['JetBrains_Mono'] text-[8px] text-[#D4CCBA]">
                {new Date(cmd.created_at).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Registry */}
      <div className="px-4 py-3 border-t border-[rgba(60,52,40,0.06)]">
        <span className="font-['JetBrains_Mono'] text-[7px] tracking-wider text-[#918977] mb-2 block">
          MCP REGISTRY
        </span>
        <MCPRegistryPanel />
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { History, Check, X, ChevronDown, ChevronRight, Play, DollarSign, GitCompare } from 'lucide-react';

interface ExecutionLog {
  id: string;
  timestamp: string;
  duration: string;
  tokens: number;
  status: 'success' | 'error';
  input: string;
  output: string;
}

interface ReplayData {
  agentName: string;
  timestamp: string;
  duration: string;
  tokens: { input: number; output: number; total: number };
  cost: { amount: number; currency: string };
  prompt: string;
  response: string;
  status: string;
}

// Prix moyen par token (Claude Sonnet estimate)
const COST_PER_INPUT_TOKEN = 0.000003;
const COST_PER_OUTPUT_TOKEN = 0.000015;

export default function AgentExecutionLogs({ agentId }: { agentId: string }) {
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [source, setSource] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [replay, setReplay] = useState<ReplayData | null>(null);
  const [showReplay, setShowReplay] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [loadingReplay, setLoadingReplay] = useState(false);

  useEffect(() => {
    fetch(`/api/openclaw/logs/${agentId}`)
      .then(r => r.json())
      .then(data => { setLogs(data.logs || []); setSource(data.source); });
  }, [agentId]);

  const totalTokens = logs.reduce((sum, l) => sum + l.tokens, 0);
  const successRate = logs.length
    ? Math.round(logs.filter(l => l.status === 'success').length / logs.length * 100)
    : 0;

  // Estimation coût total (approx : 60% input, 40% output)
  const estimatedCost = totalTokens * 0.6 * COST_PER_INPUT_TOKEN
    + totalTokens * 0.4 * COST_PER_OUTPUT_TOKEN;

  // Dernier succès et dernière erreur pour le diff
  const lastSuccess = logs.find(l => l.status === 'success');
  const lastError = logs.find(l => l.status === 'error');
  const hasDiff = lastSuccess && lastError;

  async function loadReplay() {
    setLoadingReplay(true);
    try {
      const res = await fetch(`/api/openclaw/agents/${agentId}/replay`);
      const data = await res.json();
      setReplay(data.replay || data);
      setShowReplay(true);
    } catch { /* silently fail */ }
    setLoadingReplay(false);
  }

  return (
    <div className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] rounded-none-none p-4">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History size={14} className="text-[#1E0A20]" />
          <span className="font-['JetBrains_Mono'] text-[9px] tracking-wider text-[rgba(30,10,32,0.60)]">
            HISTORIQUE D'EXÉCUTION
          </span>
          <span className={`font-['JetBrains_Mono'] text-[7px] px-2 py-0.5 rounded-none-full ${
            source === 'openclaw' ? 'bg-[#3D7C5E] text-white' : 'bg-[rgba(30,10,32,0.60)] text-white'
          }`}>
            {source === 'openclaw' ? 'LOGS RÉELS' : 'SIMULÉ'}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)]">
            {logs.length} runs
          </span>
          <span className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] flex items-center gap-1">
            {totalTokens.toLocaleString()} tok
            <DollarSign size={8} className="text-[#1E0A20]" />
            <span className="text-[#1E0A20]">~${estimatedCost.toFixed(3)}</span>
          </span>
          <span className={`font-['JetBrains_Mono'] text-[8px] ${
            successRate >= 90 ? 'text-[#3D7C5E]' : 'text-[#9C3D3D]'
          }`}>
            {successRate}% succès
          </span>
        </div>
      </div>

      {/* ── BOUTONS REPLAY + DIFF ── */}
      <div className="flex gap-2 mb-3">
        {logs.length > 0 && (
          <button onClick={loadReplay} disabled={loadingReplay}
            className="flex items-center gap-1 px-2 py-1 rounded-none font-['JetBrains_Mono'] text-[8px] border border-[rgba(30,10,32,0.08)] hover:border-[#1E0A20] text-[rgba(30,10,32,0.60)] disabled:opacity-50">
            <Play size={10} />
            {loadingReplay ? 'Chargement...' : 'Voir le replay complet'}
          </button>
        )}
        {hasDiff && (
          <button onClick={() => setShowDiff(!showDiff)}
            className="flex items-center gap-1 px-2 py-1 rounded-none font-['JetBrains_Mono'] text-[8px] border border-[rgba(30,10,32,0.08)] hover:border-[#9C3D3D] text-[rgba(30,10,32,0.60)]">
            <GitCompare size={10} />
            {showDiff ? 'Masquer diff' : 'DIFF succès/erreur'}
          </button>
        )}
      </div>

      {/* ── PANNEAU REPLAY ── */}
      {showReplay && replay && (
        <div className="mb-3 bg-[#1E0A20] rounded-none-none p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-['JetBrains_Mono'] text-[9px] text-[#1E0A20] tracking-wider">
              REPLAY COMPLET — {replay.agentName}
            </span>
            <button onClick={() => setShowReplay(false)}
              className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] hover:text-[#F5F2F8]">
              FERMER
            </button>
          </div>
          <div className="flex gap-4 font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)]">
            <span>{replay.duration}</span>
            <span>{replay.tokens?.total?.toLocaleString()} tokens</span>
            <span className="text-[#1E0A20]">
              ${replay.cost?.amount?.toFixed(3) || '0.000'}
            </span>
          </div>
          {/* Prompt — titres # en gold */}
          <div>
            <div className="font-['JetBrains_Mono'] text-[7px] text-[rgba(30,10,32,0.60)] mb-1">
              PROMPT
            </div>
            <pre className="font-['JetBrains_Mono'] text-[9px] text-[#1E0A20] whitespace-pre-wrap max-h-[200px] overflow-y-auto">
              {replay.prompt}
            </pre>
          </div>
          {/* Réponse — code blocks en monospace */}
          <div>
            <div className="font-['JetBrains_Mono'] text-[7px] text-[rgba(30,10,32,0.60)] mb-1">
              RÉPONSE
            </div>
            <pre className="font-['JetBrains_Mono'] text-[9px] text-[#3D7C5E] whitespace-pre-wrap max-h-[200px] overflow-y-auto">
              {replay.response}
            </pre>
          </div>
        </div>
      )}

      {/* ── PANNEAU DIFF ── */}
      {showDiff && lastSuccess && lastError && (
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div className="bg-[#1E0A20] rounded-none p-3">
            <div className="font-['JetBrains_Mono'] text-[7px] text-[#3D7C5E] mb-1">
              DERNIER SUCCÈS — {new Date(lastSuccess.timestamp).toLocaleDateString('fr-FR')}
            </div>
            <pre className="font-['JetBrains_Mono'] text-[8px] text-[#F5F2F8] whitespace-pre-wrap max-h-[150px] overflow-y-auto">
              {lastSuccess.output}
            </pre>
          </div>
          <div className="bg-[#1E0A20] rounded-none p-3">
            <div className="font-['JetBrains_Mono'] text-[7px] text-[#9C3D3D] mb-1">
              DERNIÈRE ERREUR — {new Date(lastError.timestamp).toLocaleDateString('fr-FR')}
            </div>
            <pre className="font-['JetBrains_Mono'] text-[8px] text-[#F5F2F8] whitespace-pre-wrap max-h-[150px] overflow-y-auto">
              {lastError.output}
            </pre>
          </div>
        </div>
      )}

      {/* ── TABLEAU DE LOGS ── */}
      <div className="space-y-0.5">
        {logs.map(log => (
          <div key={log.id}>
            <div className="flex items-center gap-3 py-1.5 px-2 rounded-none hover:bg-[rgba(184,150,62,0.03)] cursor-pointer"
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}>
              {expanded === log.id
                ? <ChevronDown size={10} className="text-[rgba(30,10,32,0.60)]" />
                : <ChevronRight size={10} className="text-[rgba(30,10,32,0.60)]" />}
              {log.status === 'success'
                ? <Check size={10} className="text-[#3D7C5E]" />
                : <X size={10} className="text-[#9C3D3D]" />}
              <span className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] w-28">
                {new Date(log.timestamp).toLocaleString('fr-FR', {
                  day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                })}
              </span>
              <span className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] w-12">
                {log.duration}
              </span>
              <span className="font-['JetBrains_Mono'] text-[8px] text-[rgba(30,10,32,0.60)] w-20">
                {log.tokens.toLocaleString()} tok
                <span className="text-[#1E0A20] ml-1">
                  ${(log.tokens * 0.6 * COST_PER_INPUT_TOKEN + log.tokens * 0.4 * COST_PER_OUTPUT_TOKEN).toFixed(3)}
                </span>
              </span>
              <span className="font-['Noto_Sans'] text-[9px] text-[rgba(30,10,32,0.60)] flex-1 truncate">
                {log.output}
              </span>
            </div>
            {expanded === log.id && (
              <div className="ml-8 mb-2 p-3 bg-[#1E0A20] rounded-none">
                <div className="font-['JetBrains_Mono'] text-[7px] text-[rgba(30,10,32,0.60)] mb-1">INPUT</div>
                <pre className="font-['JetBrains_Mono'] text-[9px] text-[#1E0A20] mb-3 whitespace-pre-wrap">
                  {log.input}
                </pre>
                <div className="font-['JetBrains_Mono'] text-[7px] text-[rgba(30,10,32,0.60)] mb-1">OUTPUT</div>
                <pre className="font-['JetBrains_Mono'] text-[9px] text-[#3D7C5E] whitespace-pre-wrap">
                  {log.output}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

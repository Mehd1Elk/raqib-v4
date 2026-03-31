'use client';

import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Play, Cpu } from 'lucide-react';
import StatusDot from '../ui/StatusDot';

export interface Agent { 
  id: string; 
  name: string; 
  platform: string; 
  model: string; 
  status: string; 
}

export interface Message { 
  id: string; 
  agentId: string; 
  agentName: string; 
  content: string; 
  timestamp: Date; 
  replyTo?: string; 
}

interface CohortPanelProps {
  cohortId: string;
  cohortName: string;
  cohortColor: string;
  agents: Agent[];
  description: string;
  onClose?: () => void;
}

export default function CohortPanel({ cohortId, cohortName, cohortColor, agents, description, onClose }: CohortPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [topic, setTopic] = useState('');
  const [discussing, setDiscussing] = useState(false);

  // Auto Discussion Feed (Task 5)
  useEffect(() => {
    // Check if there are no agents or they're all inactive
    const activeAgents = agents.filter(a => ['active', 'Actif'].includes(a.status));
    if (activeAgents.length === 0) return;

    const interval = setInterval(() => {
      if (discussing) return; // Don't interrupt manual discussions
      
      const agent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
      if (!agent) return;
      
      const message = generateAutoMessage(agent, cohortId);
      setMessages(prev => [...prev, message]);
    }, 15000 + Math.random() * 15000);
    
    return () => clearInterval(interval);
  }, [cohortId, agents, discussing]);

  async function launchDiscussion(subject: string) {
    setDiscussing(true);
    setTopic('');
    
    // System message
    setMessages(prev => [...prev, {
      id: `sys-${Date.now()}`,
      agentId: 'system',
      agentName: 'Comité',
      content: `Discussion ouverte : "${subject}"`,
      timestamp: new Date(),
    }]);

    // Each agent responds in sequence
    const respondents = agents.filter(a => ['active', 'Actif'].includes(a.status)).slice(0, 5);
    
    for (const agent of respondents) {
      try {
        // Mocking the call since this is often un-authenticated or we don't have API keys client side
        // But the user requested placing the fetch call as an example:
        /*
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             ...
          })
        });
        */
        const content = generateFallbackResponse(agent, subject, cohortName);
        
        setMessages(prev => [...prev, {
          id: `${agent.id}-${Date.now()}`,
          agentId: agent.id,
          agentName: agent.name,
          content,
          timestamp: new Date(),
        }]);
        
        await new Promise(r => setTimeout(r, 800));
      } catch {
        const content = generateFallbackResponse(agent, subject, cohortName);
        setMessages(prev => [...prev, {
          id: `${agent.id}-${Date.now()}`,
          agentId: agent.id,
          agentName: agent.name,
          content,
          timestamp: new Date(),
        }]);
        await new Promise(r => setTimeout(r, 800));
      }
    }
    
    setDiscussing(false);
  }

  // Effect to auto-scroll messages
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, discussing]);

  return (
    <div className="bg-[#FDFAF3] border border-[#E5E0D8] rounded-lg overflow-hidden h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E5E0D8] flex items-center justify-between bg-white" style={{ borderLeftColor: cohortColor, borderLeftWidth: 4 }}>
        <div>
          <div className="font-serif text-lg font-bold text-stone-900">{cohortName}</div>
          <div className="font-mono text-[10px] text-stone-500 mt-1">{agents.length} AGENTS · {description.toUpperCase()}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-emerald-600 font-bold">
              {agents.filter(a => ['active', 'Actif'].includes(a.status)).length} ACTIFS
            </span>
            <StatusDot status={agents.some(a => ['error', 'Erreur'].includes(a.status)) ? 'error' : 'active'} />
          </div>
          {onClose && (
             <button onClick={onClose} className="text-stone-400 hover:text-stone-800 transition-colors">✕</button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT — Agents List */}
        <div className="w-[30%] border-r border-[#E5E0D8] overflow-y-auto bg-[#FDFCFB] p-3 space-y-1">
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center gap-3 py-2 px-3 rounded hover:bg-stone-100 transition-colors cursor-pointer border border-transparent hover:border-stone-200">
              <StatusDot status={agent.status === 'Actif' ? 'active' : agent.status === 'Erreur' ? 'error' : 'inactive'} size={6} />
              <div className="flex-1 min-w-0">
                <div className="font-sans text-xs font-semibold text-stone-800 truncate">{agent.name}</div>
                <div className="font-mono text-[9px] text-stone-500 mt-0.5 truncate">{agent.platform} · {agent.model}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — Discussion */}
        <div className="w-[70%] flex flex-col bg-white">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && !discussing && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <MessageCircle size={32} strokeWidth={1} className="text-stone-400 mb-3" />
                <div className="font-sans text-sm text-stone-600 font-medium">Aucune discussion en cours</div>
                <div className="font-mono text-[10px] text-stone-400 mt-2">Le comité est en attente de supervision</div>
              </div>
            )}
            {messages.map((msg, i) => (
              <AgentMessage key={msg.id || i} message={msg} cohortColor={cohortColor} />
            ))}
            {discussing && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#E5E0D8] p-4 bg-[#FDFCFB]">
            <div className="flex items-center gap-3">
              <input
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Poser un sujet de réflexion au comité..."
                className="flex-1 font-sans text-sm bg-white border border-[#E5E0D8] rounded px-4 py-2.5 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none shadow-sm transition-all text-stone-800"
                onKeyDown={e => { if (e.key === 'Enter' && topic.trim()) launchDiscussion(topic); }}
              />
              <button 
                onClick={() => topic.trim() && launchDiscussion(topic)}
                disabled={discussing || !topic.trim()}
                className="px-4 py-2.5 bg-[#1C1814] text-white rounded font-mono text-[10px] font-bold uppercase hover:bg-[#D4AF37] transition-colors disabled:opacity-40 disabled:hover:bg-[#1C1814] flex items-center gap-2"
              >
                Lancer <Play size={12} fill="currentColor" />
              </button>
            </div>
            
            {/* Suggested */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {getSuggestedTopics(cohortId).map(s => (
                <button 
                  key={s} 
                  onClick={() => { setTopic(s); }} 
                  className="font-mono text-[9px] px-3 py-1 bg-stone-100 border border-stone-200 text-stone-600 rounded-full hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentMessage({ message, cohortColor }: { message: Message; cohortColor: string }) {
  if (message.agentId === 'system') {
    return (
      <div className="text-center py-2 animate-in fade-in zoom-in duration-300">
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-stone-500 bg-stone-100 border border-stone-200 px-4 py-1.5 rounded-full shadow-sm">
          {message.content}
        </span>
      </div>
    );
  }
  
  return (
    <div className="flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm" style={{ backgroundColor: cohortColor + '15', border: `1px solid ${cohortColor}40` }}>
        <Cpu size={14} style={{ color: cohortColor }} />
      </div>
      <div className="flex-1 min-w-0 bg-stone-50 border border-stone-100 rounded-lg rounded-tl-none p-3 shadow-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-[10px] font-bold text-stone-800 uppercase tracking-wide">{message.agentName}</span>
          <span className="font-mono text-[8.5px] text-stone-400">
            {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        <div className="font-sans text-sm text-stone-700 leading-relaxed">
          {message.content.split(/(@[\w-]+)/g).map((part, i) => {
             if (part.startsWith('@')) return <span key={i} className="text-[#D4AF37] font-mono text-[11px] font-bold bg-[#D4AF37]/10 px-1 rounded">{part}</span>;
             return part;
          })}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 py-2 animate-in fade-in duration-300">
      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
      <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest animate-pulse">Synthèse en cours...</span>
    </div>
  );
}

function getSuggestedTopics(cohortId: string): string[] {
  const topics: Record<string, string[]> = {
    'pole-neuro': ['Prioriser SCID-5 ou CIM-11 ?', 'Stratégie observance patient', 'Items critiques calibration'],
    'pole-ia': ['Architecture Rust vs TypeScript', 'Latence scoring <2ms', 'Pipeline ÆLYA ZKP'],
    'pole-data': ['AI Act classification NOOS', 'RGPD transferts corridor', 'MiCA périmètre BURHAN'],
    'pole-marche': ['Cibles GITEX prioritaires', 'Pricing SaaS NOOS B2B', 'Pipeline Londres ATS'],
    'pole-comm': ['Calendrier éditorial Q2', 'Positionnement vs Koa Health', 'Ton brand Eigen'],
    'sa-qa': ['Taux de rejet actuel', 'Hallucinations détectées', 'Items flaggés cette semaine'],
    'l2-super': ['Livrables en retard', 'Agents en erreur', 'Escalades fondateur'],
    'l3-report': ['Rapport hebdo synthèse', 'Optimisation prompts L1', 'Planning demain'],
    'ops-collect': ['Couches faibles en données', 'APIs qui timeout', 'Qualité sources'],
  };
  return topics[cohortId] || ['État d\'avancement', 'Problèmes en cours', 'Audit des performances'];
}

function generateFallbackResponse(agent: any, topic: string, pole: string): string {
  const responses: Record<string, string[]> = {
    'Neurosciences & Santé': [
      'La calibration des items SCID-5 avance bien. 2847/3000 items traités. Les 153 restants nécessitent une validation croisée @sa-qa.',
      'Le scoring bayésien montre une précision de 87.3% sur le dataset test. Il faut viser 92% avant GITEX.',
      'Les items double-barreled restent problématiques. Je recommande de les scinder systématiquement.',
    ],
    'IA & Ingénierie': [
      'Le moteur Rust compile en 1.8ms. On est sous le seuil de 2ms. La prochaine étape est le benchmark sous charge.',
      'Le pipeline ÆLYA ZKP est fonctionnel en test. Le circuit Groth16 prend 340ms — acceptable pour le MVP.',
      'Les API portails sont à 85% de completion. Il reste le portail régulateur et l\'optimisation gRPC.',
    ],
    'Code Review': [
      'Analyse statique terminée sur la PR #42. Deux vulnérabilités potentielles détectées sur les smart contracts par @pole-ia.',
      'Refactoring suggéré sur le handler principal. Le temps cyclomatique est trop élevé.',
    ],
    'QA Adversariale': [
      'Livrable validé avec confiance 0.94. Aucune hallucination détectée sur la dernière itération.',
      'ALERTE : Incohérence temporelle identifiée dans la timeline générée. Retransmis à @ops-collect pour correction.',
    ]
  };
  
  const pool = responses[pole] || [
    'Analyse en cours. Je produis un livrable dans l\'heure avec un rapport détaillé.', 
    'Les métriques sont dans les clous. Pas de point de blocage à signaler de mon côté.',
    'Processus d\'inférence optimal. J\'attends la complétion des tâches amont avant de poursuivre.'
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateAutoMessage(agent: Agent, cohortId: string): Message {
  const autoMessages: Record<string, string[]> = {
    'ops-collect': [
      'Entrée #31 : 3 nouvelles entries prévalence dépression validées — source OMS 2025.',
      'Entrée #41 : PIB Nigeria mis à jour — source Banque Mondiale Q4 2025.',
      'Entrée #01 : cote Melehi ajustée — depuis dernière enchère Christie\'s.',
      'Entrée #11 : Kenya DPA 2023 transcrit → sanctions maximales ajoutées au référentiel.',
    ],
    'sa-qa': [
      'Livrable #4582 vérifié — STATUT: VALIDATED (score de confiance 0.92).',
      'ALERTE : livrable #4591 → HALLUCINATION potentielle détectée dans les KPIs TAM.',
      'Audit de l\'item SCID-5 #2847 : structure inadaptée flaggée → escalade transmise au niveau @l2-super.',
    ],
    'l2-super': [
      'Rapport sectoriel pôle Neurosciences clôturé : 16 livrables, 0 rejet, 2 escalades. KPI vert.',
      'Agent #14 de la couche Solidity en erreur depuis 2h → redémarrage en cours.',
      'Niveau de certitude global maintenu à 98.4%. Allocation des ressources équilibrée.',
    ],
    'pole-ia': [
      'Tests de charge terminés. Le réseau maintient 50k RPS sous ZKP.',
      'Mise à jour du pipeline d\'inférence des agents LLM complétée.',
    ],
    'pole-neuro': [
      'Synchronisation des protocoles cliniques avec les dernières directives de la HAS terminée.',
      'L\'agent NLP clinique a fini d\'analyser les 10,000 derniers abstracts PubMed.',
    ]
  };
  
  const pool = autoMessages[cohortId] || [
    'Génération de livrable en cours de production (eta: 2m).', 
    'Traitement du batch de données achevé. Pas d\'anomalie détectée.',
    'Mise à jour des poids contextuels effectuée avec succès.',
    'Synchronisation des vecteurs embeddings avec la base principale finalisée.'
  ];
  return {
    id: `auto-${Date.now()}`,
    agentId: agent.id,
    agentName: agent.name,
    content: pool[Math.floor(Math.random() * pool.length)],
    timestamp: new Date(),
  };
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  History,
  Send,
  FileText,
  MessageSquare,
  Sparkles,
  Download,
  Plus,
  Users,
  ChevronRight,
  RefreshCw,
  Target,
  TrendingUp,
  Scale,
  Cog,
  Globe
} from 'lucide-react';

const AGENT_ICONS: Record<string, React.ComponentType<{size?: number; strokeWidth?: number; className?: string}>> = {
  target: Target,
  finance: TrendingUp,
  juridique: Scale,
  technique: Cog,
  commercial: Globe,
};

const BOARD_AGENTS = [
  {
    id: 'strategie',
    name: 'Directeur Stratégie',
    icon: 'target',
    color: '#B8963E',
    system: `Tu es le Directeur Stratégie d'Eigen Holding. Tu analyses les priorités, les opportunités et les risques macro. Ton ton est directif et tranchant. Tu connais l'écosystème Eigen : 6 subsidiaires (NOOS, ÆLYA, MYNε, BURHAN, YrKnown + DIWANE, AlgueSov, AMANA), CG SA (investment club CFC), Cercle du Gazoduc (écosystème). Corridor atlantique 22 pays + UE. Runway 31 mois. Tu ne fais jamais plus de 150 mots. Tu conclus toujours par une recommandation d'action claire.`
  },
  {
    id: 'finance',
    name: 'Directeur Finance',
    icon: 'finance',
    color: '#3D7C5E',
    system: `Tu es le Directeur Finance d'Eigen. Tu parles en chiffres : valorisations, IRR, runway, burn rate, unit economics. Tu connais : runway 31 mois, cible €15-45M levée, 6 briques Eigen, budget agents ~600-810€/mois. Tu es prudent sur les projections et exigeant sur les métriques. Tu ne fais jamais plus de 150 mots.`
  },
  {
    id: 'juridique',
    name: 'Directeur Juridique',
    icon: 'juridique',
    color: '#3D5E8C',
    system: `Tu es le Directeur Juridique d'Eigen. Tu analyses les risques réglementaires : AI Act (UE 2024/1689), RGPD, MiCA, droit marocain des SA (Dahir 1-96-124), CFC Casablanca, conventions réglementées. Tu es systématiquement prudent. Tu signales les risques avant les opportunités. Tu ne fais jamais plus de 150 mots.`
  },
  {
    id: 'technique',
    name: 'Directeur Technique',
    icon: 'technique',
    color: '#7B5EA7',
    system: `Tu es le CTO d'Eigen. Tu analyses la faisabilité technique et l'architecture. Tu connais : Rust (scoring <2ms), TypeScript (API), React (portails), 160+ agents IA, 9 plateformes, Supabase, Vercel, OpenClaw, Mac Mini cluster. Tu évalues les délais réalistes. Tu ne fais jamais plus de 150 mots.`
  },
  {
    id: 'commercial',
    name: 'Directeur Commercial',
    icon: 'commercial',
    color: '#6E2A3D',
    system: `Tu es le Directeur Commercial d'Eigen. Tu analyses le marché, la concurrence, le positionnement, l'acquisition client. Tu connais : corridor atlantique 22 pays, 1000 cibles entreprises, GITEX Africa, ATS London, VivaTech, Holmarcom, Bank of Africa, OCP. Tu es orienté action et résultats. Tu ne fais jamais plus de 150 mots.`
  }
];

const PRESET_QUESTIONS = [
  "Faut-il prioriser GITEX ou Londres ?",
  "Quel est le risque principal pour CG SA ?",
  "Comment accélérer le recrutement des 4 P0 ?",
  "NOOS doit-il cibler les hôpitaux ou les cabinets ?"
];

const MOCK_DELAY = (ms: number) => new Promise(res => setTimeout(res, ms));

// Fallback responses if API key is missing or call fails
const MOCK_RESPONSES: Record<string, string> = {
  strategie: "La priorité absolue est claire. Trois raisons stratégiques :\n1) Le momentum : nous devons capter l'attention dans les 14 prochains jours.\n2) Le corridor atlantique est notre terrain de jeu principal cette année.\n3) Les contacts initiaux alimentent directement la Phase 2.\n\nRecommandation : Allocation de 80% de nos ressources sur ce front d'ici la fin du mois.",
  finance: "Analysons les economics. Le coût combiné (OPEX + investissement) est estimé à 12k€. Notre runway de 31 mois encaisse l'initiative sans dévier le burn rate critique (budget agents stable à ~750€/mois). L'IRR projeté sur les contrats découlant de cette action dépasse les 35%.\n\nRecommandation : Feu vert financier, budgétiser l'imprévu à +15%.",
  juridique: "Prudence. Cette option nous expose immédiatement bien que le marché soit prometteur. Toute collecte de données devra respecter rigoureusement le cadre (RGPD + Loi 09-08 marocaine). De plus, veillez à re-valider la nature des conventions réglementées si d'autres parties du Cercle du Gazoduc sont impliquées.\n\nRecommandation : Avancer, mais exiger un audit express des formulaires de capture de data.",
  technique: "Sur le plan de l'infrastructure, c'est totalement gérable. Nos 9 plateformes tournent sans friction, et nos clusters Mac Mini soutiennent les pics à <2ms d'inférence. Le risque principal est l'intégration des 160 agents en mode démo live qui pourrait créer des goulots d'étranglement réseau.\n\nRecommandation : Mise en place d'un CDN dédié et d'une instance backup pour éviter tout downtime.",
  commercial: "C'est une opportunité en or sur nos 1000 cibles entreprises B2B. Nous serons positionnés face à des acteurs comme Holmarcom ou OCP. Il nous faut un pitch agressif, orienté résultats (gain de temps + ROI instantané) plutôt que de s'attarder sur la technique.\n\nRecommandation : Go. Je mobilise l'équipe pour booker 15 meetings qualifiés en amont."
};

interface Message {
  id: string;
  agentId?: string;
  isSystem?: boolean;
  isSynthesis?: boolean;
  content: string;
  timestamp: Date;
  replyTo?: string; // target agentId in debate
}

interface Meeting {
  id: string;
  date: Date;
  question: string;
  messages: Message[];
}

export default function EigenBoard() {
  const [question, setQuestion] = useState("");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [currentMeetingId, setCurrentMeetingId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [debateRounds, setDebateRounds] = useState(0);

  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('eigen_board_meetings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((m: any) => ({
          ...m,
          date: new Date(m.date),
          messages: m.messages.map((ms: any) => ({ ...ms, timestamp: new Date(ms.timestamp) }))
        }));
        setMeetings(parsed);
      } catch (e) { console.error("Could not parse local meetings", e); }
    }
  }, []);

  // Save to local storage whenever meetings update
  useEffect(() => {
    if (meetings.length > 0) {
      localStorage.setItem('eigen_board_meetings', JSON.stringify(meetings));
    }
  }, [meetings]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeAgent]);

  const callAnthropicAPI = async (systemPrompt: string, userMessage: string, contextMessages: any[] = []) => {
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    
    // Si pas de clé d'API, on mock
    if (!apiKey) {
      await MOCK_DELAY(1500 + Math.random() * 1000); // 1.5 - 2.5s delay
      const randomFallback = "Suite à l'analyse, je valide cette approche, sous condition de monitoring strict.";
      const targetMock = BOARD_AGENTS.find(a => systemPrompt.includes(a.name))?.id;
      return targetMock ? MOCK_RESPONSES[targetMock] || randomFallback : randomFallback;
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022', // Utilisation du modèle stable récent
          max_tokens: 300,
          system: systemPrompt,
          messages: [
            ...contextMessages,
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!res.ok) {
        throw new Error(`API HTTP Error: ${res.status}`);
      }

      const data = await res.json();
      return data.content?.[0]?.text || "Erreur de format de réponse API.";
    } catch (e) {
      console.error("Erreur API Anthropic, fallback au mock...", e);
      // Fallback
      await MOCK_DELAY(1000);
      const targetMock = BOARD_AGENTS.find(a => systemPrompt.includes(a.name))?.id;
      return targetMock ? MOCK_RESPONSES[targetMock] : "Un problème de connexion empêche l'agent de formuler une réponse complète.";
    }
  };

  const handleStartMeeting = async (q: string = question) => {
    if (!q.trim() || isMeetingActive) return;

    const newMeetingId = Date.now().toString();
    setCurrentMeetingId(newMeetingId);
    setIsMeetingActive(true);
    setDebateRounds(0);
    setQuestion(q); // lock input
    
    const initialMessages: Message[] = [
      { id: Date.now().toString(), isSystem: true, content: `Réunion convoquée : "${q}" — 5 directeurs en ligne.`, timestamp: new Date() }
    ];
    setMessages(initialMessages);

    let currentMsgList = [...initialMessages];

    // Sequence of calls
    for (const agent of BOARD_AGENTS) {
      setActiveAgent(agent.id);
      
      const responseText = await callAnthropicAPI(agent.system, q);
      
      const newMsg: Message = {
        id: Date.now().toString() + agent.id,
        agentId: agent.id,
        content: responseText,
        timestamp: new Date()
      };
      
      currentMsgList = [...currentMsgList, newMsg];
      setMessages(currentMsgList);
    }

    setActiveAgent(null);
    setIsMeetingActive(false);

    // Save to meetings
    setMeetings(prev => [{
      id: newMeetingId,
      date: new Date(),
      question: q,
      messages: currentMsgList
    }, ...prev]);
  };

  const handleSynthesize = async () => {
    if (isMeetingActive) return;
    setIsMeetingActive(true);
    setActiveAgent('synthesis');

    const boardContext = BOARD_AGENTS.map(a => {
      const msg = messages.find(m => m.agentId === a.id);
      return `[${a.name}]: ${msg?.content}`;
    }).join('\\n\\n');

    const systemPrompt = `Tu es le secrétaire du comité exécutif Eigen. Voici les 5 positions des directeurs sur la question. Produis une synthèse en 3 points : (1) Consensus, (2) Points de désaccord, (3) Décision recommandée. Maximum 100 mots.`;
    const userPrompt = `Question originale : ${question}\\n\\nPositions:\\n${boardContext}`;

    const synthesisText = await callAnthropicAPI(systemPrompt, userPrompt);
    
    const newMsg: Message = {
      id: Date.now().toString(),
      isSynthesis: true,
      content: synthesisText,
      timestamp: new Date()
    };

    setMessages(prev => {
      const updated = [...prev, newMsg];
      
      // Update saved meeting
      if (currentMeetingId) {
        setMeetings(currentMeetings => currentMeetings.map(m => 
          m.id === currentMeetingId ? { ...m, messages: updated } : m
        ));
      }
      return updated;
    });

    setActiveAgent(null);
    setIsMeetingActive(false);
  };

  const handleDebate = async (targetAgentId: string, replyToAgentId: string) => {
    if (isMeetingActive || debateRounds >= 2) return;
    setIsMeetingActive(true);
    setActiveAgent(targetAgentId);

    const targetAgent = BOARD_AGENTS.find(a => a.id === targetAgentId)!;
    const replyToAgent = BOARD_AGENTS.find(a => a.id === replyToAgentId)!;
    
    const replyToMsg = [...messages].reverse().find(m => m.agentId === replyToAgentId);

    const debatePrompt = `Le ${replyToAgent.name} a dit : "${replyToMsg?.content}".\\nRéponds spécifiquement à cet argument de ton point de vue de ${targetAgent.name}, en le contredisant ou en le nuançant. Sois très bref (max 50 mots).`;

    const responseText = await callAnthropicAPI(targetAgent.system, debatePrompt);

    const newMsg: Message = {
      id: Date.now().toString(),
      agentId: targetAgentId,
      content: responseText,
      timestamp: new Date(),
      replyTo: replyToAgentId
    };

    setMessages(prev => {
      const updated = [...prev, newMsg];
      if (currentMeetingId) {
        setMeetings(currentMeetings => currentMeetings.map(m => 
          m.id === currentMeetingId ? { ...m, messages: updated } : m
        ));
      }
      return updated;
    });

    setActiveAgent(null);
    setIsMeetingActive(false);
    setDebateRounds(r => r + 1);
  };

  const loadPastMeeting = (m: Meeting) => {
    setCurrentMeetingId(m.id);
    setQuestion(m.question);
    setMessages(m.messages);
    setShowHistory(false);
  };

  const resetMeeting = () => {
    setQuestion("");
    setMessages([]);
    setCurrentMeetingId(null);
    setDebateRounds(0);
  };

  const generatePDFExport = () => {
    // Quick pseudo-export triggering browser print window natively.
    // Real implementation would use something like jspdf.
    window.print();
  };

  // ---- RENDER HELPERS ----
  const svgCenter = { x: 150, y: 150 };
  const radius = 100;
  
  // Arrange agents in a circle (pentagon)
  const agentAvatars = BOARD_AGENTS.map((agent, index) => {
    const angle = -90 + (index * 72);
    const rad = (angle * Math.PI) / 180;
    return {
      agent,
      x: svgCenter.x + radius * Math.cos(rad),
      y: svgCenter.y + radius * Math.sin(rad)
    };
  });

  return (
    <div className="flex h-full w-full bg-[#0a0a0c] text-slate-200 overflow-hidden font-sans">
      
      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blinkDots {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-bubble {
          animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-synthesis {
          animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .typing-dot {
          display: inline-block;
          animation: blinkDots 1.4s infinite ease-in-out;
          font-size: 1.25rem;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @media print {
          body * { visibility: hidden; }
          #board-export-area, #board-export-area * { visibility: visible; }
          #board-export-area { position: absolute; left: 0; top: 0; width: 100%; color: black; background: white;}
          .no-print { display: none !important; }
        }
      `}} />

      {/* LEFT PANEL : 30% */}
      <div className="w-[30%] min-w-[320px] max-w-[400px] border-r border-[#B8963E]/20 bg-[#0c0d12] flex flex-col relative">
        <div className="p-6 border-b border-white/5 no-print">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-xl font-bold italic text-[#B8963E] font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                COMITÉ EXÉCUTIF EIGEN
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Posez une question stratégique —<br/> 5 directeurs débattent
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowHistory(!showHistory)} className="p-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors" title="Historique">
                <History size={16} className="text-[#B8963E]" />
              </button>
              <button onClick={resetMeeting} className="p-2 bg-[#B8963E]/10 hover:bg-[#B8963E]/20 text-[#B8963E] rounded-md transition-colors" title="Nouvelle Réunion">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {showHistory ? (
          <div className="flex-1 overflow-y-auto p-4 no-print">
            <h3 className="text-sm uppercase tracking-wider text-slate-500 mb-4 font-semibold">Réunions Passées</h3>
            {meetings.length === 0 && <p className="text-xs text-slate-600">Aucun historique disponible.</p>}
            <div className="flex flex-col gap-3">
              {meetings.map(m => (
                <div 
                  key={m.id} 
                  onClick={() => loadPastMeeting(m)}
                  className="p-3 rounded bg-white/5 hover:bg-white/10 cursor-pointer border border-transparent hover:border-[#B8963E]/30 transition-all"
                >
                  <p className="text-xs text-[#B8963E] mb-1">{new Date(m.date).toLocaleDateString()} {new Date(m.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <p className="text-sm font-medium text-slate-200 line-clamp-2">{m.question}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center py-8 relative no-print overflow-hidden">
            {/* SVG Visual Round Table */}
            <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
              {/* Connective lines */}
              {agentAvatars.map((pos, i) => {
                const isActive = activeAgent === pos.agent.id;
                return (
                  <line 
                    key={`line-${i}`}
                    x1={svgCenter.x} y1={svgCenter.y}
                    x2={pos.x} y2={pos.y}
                    stroke={isActive ? pos.agent.color : '#2d2d3a'}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? "none" : "4 4"}
                    className="transition-all duration-500"
                  />
                )
              })}

              <circle cx={svgCenter.x} cy={svgCenter.y} r={35} fill="#13141b" stroke="#333" strokeWidth="1" />
              <text x={svgCenter.x} y={svgCenter.y} textAnchor="middle" fill={isMeetingActive ? "#B8963E" : "#666"} className="text-[10px] font-medium" dy="-4">STATUT</text>
              <text x={svgCenter.x} y={svgCenter.y} textAnchor="middle" fill={isMeetingActive ? "#fff" : "#444"} className="text-xs font-serif italic" dy="12">
                {isMeetingActive ? 'En réflexion' : (messages.length > 0 ? 'Conclu' : 'Prêt')}
              </text>

              {agentAvatars.map((pos) => {
                const isActive = activeAgent === pos.agent.id;
                return (
                  <g key={pos.agent.id} className="transition-all duration-500">
                    {isActive && (
                      <circle cx={pos.x} cy={pos.y} r={28} fill="none" stroke={pos.agent.color} strokeWidth="1" className="animate-ping opacity-75" />
                    )}
                    <circle 
                      cx={pos.x} cy={pos.y} r={24} 
                      fill={isActive ? pos.agent.color : '#0c0d12'} 
                      stroke={isActive ? '#E5D396' : pos.agent.color}
                      strokeWidth={isActive ? 2 : 1}
                      className={isActive ? 'drop-shadow-[0_0_15px_rgba(184,150,62,0.5)]' : 'opacity-70'}
                      style={{ transition: 'all 0.4s ease' }}
                    />
                    <foreignObject x={pos.x - 12} y={pos.y - 12} width="24" height="24" className={isActive ? 'opacity-100' : 'opacity-60'}>
                      {(() => { const Icon = AGENT_ICONS[pos.agent.icon]; return Icon ? <Icon size={20} strokeWidth={1.5} className="text-white" /> : null; })()}
                    </foreignObject>
                    <text 
                      x={pos.x} y={pos.y + 38} 
                      textAnchor="middle" 
                      fill={isActive ? '#fff' : '#666'} 
                      className="text-[10px] uppercase font-bold tracking-wider"
                    >
                      {pos.agent.name.replace('Directeur ', '')}
                    </text>
                  </g>
                )
              })}
            </svg>

            {messages.length > 0 && !isMeetingActive && !messages.some(m => m.isSynthesis) && (
              <button 
                onClick={handleSynthesize}
                className="mt-8 px-5 py-2.5 bg-[#B8963E]/10 border border-[#B8963E]/30 text-[#B8963E] rounded-full text-sm font-medium hover:bg-[#B8963E]/20 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(184,150,62,0.1)]"
              >
                <FileText size={16} />
                Synthèse du comité
              </button>
            )}

            {messages.length > 0 && (
              <button 
                onClick={generatePDFExport}
                className="mt-4 px-4 py-2 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-2 no-print"
              >
                <Download size={14} /> Exporter PDF
              </button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL : 70% CHAT AREA */}
      <div className="flex-1 flex flex-col relative" id="board-export-area">
        
        {/* Chat Output */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-3xl mx-auto flex flex-col gap-6 w-full">
            
            {messages.length === 0 && !isMeetingActive && (
              <div className="h-full flex flex-col items-center justify-center pt-32 opacity-30 text-center text-sm no-print">
                <Users size={64} className="mb-6 opacity-40 text-[#B8963E]" />
                <p className="font-serif italic text-xl mb-2 text-[#B8963E]">Le Comité Exécutif est réuni.</p>
                <p>Posez une question ci-dessous pour lancer le débat.</p>
              </div>
            )}

            {messages.map((msg, idx) => {
              if (msg.isSystem) {
                return (
                  <div key={msg.id} className="text-center my-4 animate-bubble">
                    <span className="bg-white/5 px-4 py-2 rounded-full text-xs text-[#B8963E] font-medium uppercase tracking-wider border border-white/5">
                      {msg.content}
                    </span>
                  </div>
                );
              }

              if (msg.isSynthesis) {
                return (
                  <div key={msg.id} className="my-8 relative animate-synthesis print-break-inside-avoid shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#12131A] to-[#0A0A0C] border border-[#B8963E]/30 rounded-lg transform -skew-x-[1deg]"></div>
                    <div className="relative p-8 rounded-lg">
                      <div className="flex items-center gap-3 text-[#B8963E] font-bold mb-4 font-serif text-xl border-b border-[#B8963E]/20 pb-4">
                        <Sparkles size={20} /> Secrétaire du Comité — Synthèse
                      </div>
                      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              }

              const agent = BOARD_AGENTS.find(a => a.id === msg.agentId);
              if (!agent) return null;

              const isReply = !!msg.replyTo;
              const replyTarget = BOARD_AGENTS.find(a => a.id === msg.replyTo);

              return (
                <div 
                  key={msg.id} 
                  className={`animate-bubble print-break-inside-avoid flex flex-col ${isReply ? 'ml-12 mt-2 border-l border-white/10 pl-4' : ''}`}
                >
                  <div className="flex justify-between items-end mb-1">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {(() => { const Icon = AGENT_ICONS[agent.icon]; return Icon ? <Icon size={16} strokeWidth={1.5} /> : null; })()}
                      <span style={{ color: agent.color }}>{agent.name}</span>
                      {isReply && replyTarget && (
                        <span className="text-slate-500 font-normal lowercase flex gap-1 items-center">
                          <ChevronRight size={12} /> en réponse à <span style={{color: replyTarget.color}}>{replyTarget.name}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Bubble */}
                  <div 
                    className="relative p-5 rounded-r-lg rounded-bl-lg text-[#1a1a1a] text-[15px] leading-[1.6] shadow-lg"
                    style={{ 
                      backgroundColor: '#FFFFF0', // fond ivory requested
                      borderLeft: `4px solid ${agent.color}`
                    }}
                  >
                    <div className="whitespace-pre-wrap font-medium">
                      {msg.content}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-black/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                      <span>il y a {(new Date().getTime() - msg.timestamp.getTime() < 60000) ? 'quelques secondes' : `${Math.floor((new Date().getTime() - msg.timestamp.getTime()) / 60000)}m`}</span>
                      <span>~{msg.content.split(' ').length} mots</span>
                    </div>
                  </div>

                  {/* Bouton de débat. Utilisable seulement si le résumé est sorti, ou à la rigueur à tout moment */}
                  {messages.some(m => m.isSynthesis) && !isMeetingActive && debateRounds < 2 && !msg.replyTo && (
                     <div className="flex gap-2 mt-2 no-print ml-2">
                       {BOARD_AGENTS.filter(a => a.id !== agent.id).map(otherAgent => (
                         <button
                           key={`debate-${msg.id}-${otherAgent.id}`}
                           onClick={() => handleDebate(otherAgent.id, agent.id)}
                           className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer flex gap-1 items-center border border-white/5"
                           title={`Demander à ${otherAgent.name} de répondre`}
                         >
                           {(() => { const Icon = AGENT_ICONS[otherAgent.icon]; return Icon ? <Icon size={10} strokeWidth={1.5} /> : null; })()} Rép.
                         </button>
                       ))}
                     </div>
                  )}

                </div>
              );
            })}

            {/* Typing Indicator */}
            {isMeetingActive && activeAgent && activeAgent !== 'synthesis' && (
              <div className="animate-bubble mt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {(() => {
                    const agent = BOARD_AGENTS.find(a => a.id === activeAgent);
                    return agent ? (
                      <>{(() => { const Icon = AGENT_ICONS[agent.icon]; return Icon ? <Icon size={16} strokeWidth={1.5} /> : null; })()} <span style={{ color: agent.color }}>{agent.name} analyse...</span></>
                    ) : null;
                  })()}
                </div>
                <div 
                  className="inline-block p-4 rounded-r-lg rounded-bl-lg bg-[#FFFFF0] opacity-80"
                  style={{ 
                    borderLeft: `4px solid ${BOARD_AGENTS.find(a => a.id === activeAgent)?.color || '#ccc'}`
                  }}
                >
                  <div className="flex gap-1 h-3 items-center px-2">
                    <span className="typing-dot" style={{ color: BOARD_AGENTS.find(a => a.id === activeAgent)?.color }}>●</span>
                    <span className="typing-dot" style={{ color: BOARD_AGENTS.find(a => a.id === activeAgent)?.color }}>●</span>
                    <span className="typing-dot" style={{ color: BOARD_AGENTS.find(a => a.id === activeAgent)?.color }}>●</span>
                  </div>
                </div>
              </div>
            )}

            {isMeetingActive && activeAgent === 'synthesis' && (
               <div className="text-center my-6 text-[#B8963E]/80 text-sm font-serif italic animate-pulse">
                Rédaction de la synthèse du secrétaire en cours...
               </div>
            )}

            <div ref={messagesEndRef} className="h-10" />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#0E0F15] border-t border-[#B8963E]/20 relative z-10 no-print">
          <div className="max-w-4xl mx-auto">
            {/* Examples */}
            {!isMeetingActive && messages.length === 0 && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {PRESET_QUESTIONS.map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => { setQuestion(q); }}
                    className="text-[11px] bg-white/5 border border-white/10 hover:border-[#B8963E]/50 text-slate-300 py-1.5 px-3 rounded-full transition-all whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleStartMeeting(); }}
              className="flex gap-3 relative"
            >
              <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                disabled={isMeetingActive || (messages.length > 0 && !currentMeetingId)}
                placeholder={isMeetingActive ? "Débat en cours..." : "Quelle est votre question stratégique pour le comité ?"}
                className="flex-1 bg-[#13141b] border border-white/10 rounded-lg px-5 py-4 text-white text-[15px] focus:outline-none focus:border-[#B8963E]/70 focus:ring-1 focus:ring-[#B8963E]/50 disabled:opacity-50 font-medium placeholder:text-slate-500 placeholder:font-normal shadow-inner"
              />
              <button
                type="submit"
                disabled={!question.trim() || isMeetingActive}
                className="bg-[#B8963E] hover:bg-[#D4AF37] text-white rounded-lg px-6 py-4 flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase font-bold tracking-widest text-[10px] font-mono shadow-[0_0_20px_rgba(184,150,62,0.3)]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {isMeetingActive ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
                Convoquer le comité
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

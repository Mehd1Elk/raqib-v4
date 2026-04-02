'use client';

import React, { useState } from 'react';
import { Agent } from '../../../lib/agents-data';
import { Send, Cpu, User } from 'lucide-react';

export function AgentChat({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function send(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real app, you would proxy this via your Next.js backend to avoid exposing the Anthropic API key.
      // Here we mock the reply for demonstration in the UI since no Anthropic API key is provided here directly
      // However the prompt asks for standard API fetch. We will add a simulated response if no KEY exists.
      
      const res = await fetch('/api/anthropic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 300,
          system: `Tu es ${agent.name} (${agent.id}), agent ${agent.layer} du pôle ${agent.pole} chez Eigen. Plateforme : ${agent.platform}. Modèle : ${agent.model}. Instructions : ${agent.instructions}. Ton : ${agent.tone}. Tu réponds de manière opérationnelle et concise. Tu connais l'écosystème Eigen complet.`,
          messages: [...messages, userMsg].map(m => ({ role: m.role as any, content: m.content }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.content?.[0]?.text || 'Message reçu.' }]);
      } else {
        // Mock response fallback for demo if API route fails
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `[Simulation API: L'appel réel requiert une clé côté serveur] Je suis ${agent.name}. Message reçu : "${userMsg.content}". Comment puis-je vous aider pour ${agent.pole} ?` 
          }]);
        }, 1000);
      }
    } catch {
       setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `Simulation (mode démo). Je suis ${agent.name}. Je confirme la réception de votre directive.` 
          }]);
        }, 800);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[400px] border border-[rgba(30,10,32,0.08)] rounded-none-none bg-[#FAF8FC] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-[rgba(30,10,32,0.60)] font-['Noto_Sans'] text-xs mt-10">
            Commencez la conversation avec {agent.name}.
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-none-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#1E0A20]' : 'bg-[#1E0A20] bg-opacity-10 border border-[#1E0A20] border-opacity-30'}`}>
              {msg.role === 'user' ? <User size={14} className="text-[#FDFCFB]" /> : <Cpu size={14} className="text-[#1E0A20]" />}
            </div>
            <div className={`max-w-[80%] rounded-none-none p-3 text-[11px] font-['Noto_Sans'] leading-relaxed ${
              msg.role === 'user' ? 'bg-[#FDFCFB] border border-[#E5E0D8] text-[#1E0A20]' : 'bg-transparent text-[rgba(30,10,32,0.60)]'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-none-full flex items-center justify-center shrink-0 bg-[#1E0A20] bg-opacity-10 border border-[#1E0A20] border-opacity-30">
              <Cpu size={14} className="text-[#1E0A20]" />
            </div>
            <div className="max-w-[80%] rounded-none-none p-3 text-[11px] font-['Noto_Sans'] text-[rgba(30,10,32,0.60)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[rgba(30,10,32,0.60)] rounded-none-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[rgba(30,10,32,0.60)] rounded-none-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-[rgba(30,10,32,0.60)] rounded-none-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 bg-[#FDFCFB] border-t border-[rgba(30,10,32,0.08)]">
        <form onSubmit={send} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-white border border-[rgba(60,52,40,0.15)] rounded-none px-3 py-2 text-xs font-['Noto_Sans'] text-[#1E0A20] focus:outline-none focus:border-[#1E0A20]"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-3 py-2 bg-[#1E0A20] text-white rounded-none flex items-center justify-center disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

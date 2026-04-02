'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Inbox } from 'lucide-react';

interface DecisionOption {
  label: string;
}

interface Decision {
  id: string;
  question: string;
  context?: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  entity?: string;
  options: DecisionOption[];
  source?: string;
  deadline?: string;
}

const urgencyStyles = {
  critical: { bg: 'bg-[rgba(156,61,61,0.05)]', border: 'border-[#9C3D3D]', badge: 'bg-[#9C3D3D]' },
  high: { bg: 'bg-[rgba(184,125,62,0.05)]', border: 'border-[#B87D3E]', badge: 'bg-[#B87D3E]' },
  medium: { bg: 'bg-[rgba(184,150,62,0.05)]', border: 'border-[#B8963E]', badge: 'bg-[#B8963E]' },
  low: { bg: '', border: 'border-[rgba(60,52,40,0.10)]', badge: 'bg-[#918977]' },
};

function EmptyQueue() {
  return (
    <div className="max-w-2xl mx-auto py-24 text-center">
      <Inbox size={32} className="mx-auto text-[#D4CCBA] mb-4" />
      <div className="font-[family-name:var(--font-playfair)] text-[18px] font-bold  text-[#918977]">
        Aucune décision en attente
      </div>
      <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] mt-2">
        Les nouvelles décisions apparaîtront ici automatiquement
      </div>
    </div>
  );
}

export function DecisionQueue() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/decisions')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setDecisions(data);
      })
      .catch(() => toast('error', 'Échec du chargement des décisions'))
      .finally(() => setLoading(false));
  }, [toast]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] animate-pulse">
          Chargement...
        </div>
      </div>
    );
  }

  const current = decisions[currentIndex];
  if (!current) return <EmptyQueue />;

  const style = urgencyStyles[current.urgency] ?? urgencyStyles.low;

  async function decide(id: string, choice: string) {
    try {
      const res = await fetch(`/api/decisions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chosen_option: choice }),
      });
      if (!res.ok) throw new Error();
      toast('success', `Décision prise : ${choice}`);
      setDecisions(prev => prev.filter(d => d.id !== id));
      if (currentIndex >= decisions.length - 1) {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
    } catch {
      toast('error', 'Échec de l\'enregistrement');
    }
  }

  function skip(id: string) {
    setCurrentIndex(i => Math.min(decisions.length - 1, i + 1));
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Counter */}
      <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] text-center mb-6">
        DÉCISION {currentIndex + 1} / {decisions.length}
      </div>

      {/* Decision Card */}
      <div className={`${style.bg} border ${style.border} rounded-none-none p-8`}>
        <div className="flex items-center justify-between mb-6">
          {current.entity && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] px-2 py-0.5 bg-[#918977] text-white rounded-none uppercase">
              {current.entity}
            </span>
          )}
          <span className={`font-[family-name:var(--font-jetbrains)] text-[8px] px-2 py-0.5 ${style.badge} text-white rounded-none`}>
            {current.urgency.toUpperCase()}
          </span>
        </div>

        <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold  text-[#1C1814] mb-4">
          {current.question}
        </h2>

        {current.context && (
          <p className="font-[family-name:var(--font-noto)] text-[11px] text-[#6B5E4C] leading-relaxed mb-8">
            {current.context}
          </p>
        )}

        {/* Decision buttons */}
        <div className="flex gap-3">
          {(current.options || []).map((option, i) => (
            <button
              key={i}
              onClick={() => decide(current.id, option.label)}
              className={`flex-1 py-3 rounded-none-none font-[family-name:var(--font-jetbrains)] text-[10px] transition ${
                i === 0
                  ? 'bg-[#B8963E] text-white hover:bg-[#9A7B32]'
                  : 'border border-[rgba(60,52,40,0.10)] text-[#918977] hover:border-[#B8963E] hover:text-[#B8963E]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977] text-center mt-6">
          Source : {current.source ?? 'system'} {current.deadline ? `· Deadline : ${current.deadline}` : ''}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] disabled:opacity-30 transition"
        >
          ← Précédente
        </button>
        <button
          onClick={() => skip(current.id)}
          className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] hover:text-[#B8963E] transition"
        >
          Passer
        </button>
        <button
          onClick={() => setCurrentIndex(i => Math.min(decisions.length - 1, i + 1))}
          disabled={currentIndex >= decisions.length - 1}
          className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] disabled:opacity-30 transition"
        >
          Suivante →
        </button>
      </div>
    </div>
  );
}

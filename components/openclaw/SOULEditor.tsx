'use client';

import { useState, useEffect } from 'react';
import { Eye, Edit3, Loader2, Save } from 'lucide-react';

type SoulSource = 'openclaw' | 'generated' | 'supabase';

const SOURCE_BADGE: Record<SoulSource, { label: string; color: string; bg: string }> = {
  openclaw:  { label: 'FICHIER RÉEL', color: '#3D7C5E', bg: '#3D7C5E18' },
  generated: { label: 'GÉNÉRÉ',       color: '#918977', bg: '#91897718' },
  supabase:  { label: 'SUPABASE',     color: '#B8963E', bg: '#B8963E18' },
};

export function SOULEditor({ agentId }: { agentId: string }) {
  const [soul, setSoul] = useState('');
  const [source, setSource] = useState<SoulSource>('generated');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/openclaw/agents/${agentId}/soul`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return; }
        setSoul(data.soul ?? '');
        setSource((data.source as SoulSource) ?? 'generated');
      })
      .catch(() => setError('Impossible de charger le SOUL'))
      .finally(() => setIsLoading(false));
  }, [agentId]);

  async function handleSave() {
    setIsSaving(true);
    try {
      const r = await fetch(`/api/openclaw/agents/${agentId}/soul`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soul }),
      });
      const data = await r.json();
      setSource((data.source as SoulSource) ?? 'supabase');
      setIsEditing(false);
    } catch {
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  }

  const badge = SOURCE_BADGE[source] ?? SOURCE_BADGE.generated;

  return (
    <div className="mt-4 w-full">
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-['JetBrains_Mono'] text-[8px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider"
          style={{ color: badge.color, backgroundColor: badge.bg }}
        >
          {badge.label}
        </span>
        <span className="font-['JetBrains_Mono'] text-[8px] text-[#918977] uppercase tracking-wider">
          SOUL.md
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setIsEditing(false)}
            title="Preview"
            className={`p-1 rounded transition-colors ${!isEditing ? 'text-[#B8963E]' : 'text-[#918977] hover:text-[#1C1814]'}`}
          >
            <Eye size={12} />
          </button>
          <button
            onClick={() => setIsEditing(true)}
            title="Éditer"
            className={`p-1 rounded transition-colors ${isEditing ? 'text-[#B8963E]' : 'text-[#918977] hover:text-[#1C1814]'}`}
          >
            <Edit3 size={12} />
          </button>
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <div className="flex items-center gap-2 text-[#918977] font-['JetBrains_Mono'] text-[10px] py-3">
          <Loader2 size={12} className="animate-spin" />
          Chargement…
        </div>
      ) : error ? (
        <div className="font-['JetBrains_Mono'] text-[10px] text-[#9C3D3D] py-2">{error}</div>
      ) : isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={soul}
            onChange={e => setSoul(e.target.value)}
            className="w-full min-h-[200px] rounded border border-[rgba(60,52,40,0.25)] p-3 resize-y outline-none focus:border-[#B8963E] transition-colors"
            style={{
              backgroundColor: '#1C1814',
              color: '#D4B662',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              lineHeight: '1.6',
            }}
            spellCheck={false}
          />
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#B8963E] text-white rounded font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider font-bold hover:bg-[#a38435] disabled:opacity-50 transition-colors"
            >
              {isSaving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
              Sauvegarder
            </button>
          </div>
        </div>
      ) : (
        <div
          className="font-['Noto_Sans'] text-[12px] text-[#6B5E4C] leading-relaxed max-w-2xl bg-white/50 p-3 rounded border border-white whitespace-pre-wrap cursor-text"
          onClick={() => setIsEditing(true)}
          title="Cliquer pour éditer"
        >
          {soul || <span className="italic text-[#918977]">Aucun contenu SOUL</span>}
        </div>
      )}
    </div>
  );
}

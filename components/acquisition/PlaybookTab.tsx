'use client';

import { useState, useEffect, useMemo } from 'react';
import type { PlaybookPersona, AcquisitionCompany, Persona } from './types';
import { PERSONAS, PERSONA_LABELS, PERSONA_COLORS } from './types';

export default function PlaybookTab() {
  const [playbook, setPlaybook] = useState<PlaybookPersona[]>([]);
  const [companies, setCompanies] = useState<AcquisitionCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePersona, setActivePersona] = useState<Persona>('DRH');
  const [adaptCompanyId, setAdaptCompanyId] = useState('');
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/acquisition/playbook').then((r) => r.json()),
      fetch('/api/acquisition/companies').then((r) => r.json()),
    ])
      .then(([pbData, compData]) => {
        setPlaybook(pbData.playbook ?? []);
        setCompanies(compData.companies ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentPb = useMemo(
    () => playbook.find((p) => p.persona === activePersona),
    [playbook, activePersona],
  );

  const adaptCompany = useMemo(
    () => companies.find((c) => c.id === adaptCompanyId),
    [companies, adaptCompanyId],
  );

  const adaptText = (text: string) => {
    if (!adaptCompany) return text;
    return text
      .replace(/\[ENTREPRISE\]/g, adaptCompany.name)
      .replace(/\[NOM\]/g, adaptCompany.contact_name ?? '[NOM]');
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-none-none bg-gold animate-pulse" />
        <span className="text-[11px] text-t3 font-[family-name:var(--font-jetbrains)]">
          Chargement playbook&hellip;
        </span>
      </div>
    );
  }

  const color = PERSONA_COLORS[activePersona];

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold  text-noir">
            Playbook
          </h2>
          <p className="text-[10px] text-t3 font-[family-name:var(--font-jetbrains)] mt-1 tracking-[1px]">
            6 PERSONAS &middot; SCRIPTS D&apos;APPROCHE &middot; OBJECTIONS &middot; TEMPLATES
          </p>
        </div>

        {/* Adapt to company */}
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
            ADAPTER \u00c0
          </span>
          <select
            value={adaptCompanyId}
            onChange={(e) => setAdaptCompanyId(e.target.value)}
            className="px-2 py-1.5 rounded-none border border-div bg-ivory text-[10px] text-t1 font-[family-name:var(--font-sn)] outline-none focus:border-gold"
            style={{ width: 240 }}
          >
            <option value="">Aucune entreprise</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Persona tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {PERSONAS.map((p) => {
          const isActive = activePersona === p;
          return (
            <button
              key={p}
              onClick={() => { setActivePersona(p); setExpandedObjection(null); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-none border cursor-pointer"
              style={{
                borderColor: isActive ? PERSONA_COLORS[p] + '40' : '#D4CCBA30',
                background: isActive ? PERSONA_COLORS[p] + '08' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                className="w-2 h-2 rounded-none-none"
                style={{ background: isActive ? PERSONA_COLORS[p] : '#D4CCBA' }}
              />
              <span
                className="text-[11px] font-[family-name:var(--font-playfair)] font-bold "
                style={{ color: isActive ? PERSONA_COLORS[p] : '#918977' }}
              >
                {p}
              </span>
            </button>
          );
        })}
      </div>

      {currentPb && (
        <div className="space-y-4">
          {/* Persona label + metrics row */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-none-none" style={{ background: color }} />
              <span className="text-[13px] font-[family-name:var(--font-playfair)] font-bold " style={{ color }}>
                {PERSONA_LABELS[activePersona]}
              </span>
            </div>
            <div className="flex gap-4">
              {[
                { label: 'PRIX', value: currentPb.prix },
                { label: 'CAC', value: currentPb.cac },
                { label: 'LTV', value: currentPb.ltv },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-[7px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">{m.label}</div>
                  <div className="text-[11px] text-gold font-[family-name:var(--font-jetbrains)] font-bold">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="flex gap-1.5 flex-wrap">
            {currentPb.produits.map((prod) => (
              <span
                key={prod}
                className="text-[9px] font-[family-name:var(--font-jetbrains)] px-2 py-1 rounded-none border"
                style={{ borderColor: color + '30', color, background: color + '08' }}
              >
                {prod}
              </span>
            ))}
          </div>

          {/* Hook */}
          <div className="p-4 rounded-none border border-div bg-ivory">
            <div className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-2">HOOK</div>
            <div className="text-[12px] text-t1 font-[family-name:var(--font-playfair)]  leading-relaxed">
              {adaptText(currentPb.hook)}
            </div>
          </div>

          {/* Script */}
          <div className="p-4 rounded-none border border-div bg-ivory">
            <div className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-2">
              SCRIPT D&apos;APPROCHE
              {adaptCompany && (
                <span className="ml-2 text-gold">
                  adapt\u00e9 \u00e0 {adaptCompany.name}
                </span>
              )}
            </div>
            <pre className="text-[10px] text-t1 font-[family-name:var(--font-sn)] leading-relaxed whitespace-pre-wrap">
              {adaptText(currentPb.script_approche)}
            </pre>
          </div>

          {/* Objections */}
          <div className="rounded-none border border-div bg-ivory overflow-hidden">
            <div className="px-4 py-2 border-b border-div bg-cream">
              <span className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
                OBJECTIONS &amp; R\u00c9PONSES ({currentPb.objections.length})
              </span>
            </div>
            <div className="divide-y divide-div-l">
              {currentPb.objections.map((obj, i) => {
                const isOpen = expandedObjection === i;
                return (
                  <div key={i}>
                    <button
                      onClick={() => setExpandedObjection(isOpen ? null : i)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between cursor-pointer bg-transparent border-none hover:bg-cream/50"
                      style={{ transition: 'background 0.1s' }}
                    >
                      <span className="text-[11px] text-ruby font-[family-name:var(--font-sn)] font-medium">
                        &laquo; {obj.objection} &raquo;
                      </span>
                      <span className="text-[10px] text-t3 flex-shrink-0 ml-2">
                        {isOpen ? '\u25B2' : '\u25BC'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3">
                        <div className="p-3 rounded-none bg-emerald/5 border border-emerald/15">
                          <div className="text-[7px] text-emerald font-[family-name:var(--font-jetbrains)] tracking-[1px] mb-1">
                            R\u00c9PONSE
                          </div>
                          <div className="text-[10px] text-t1 font-[family-name:var(--font-sn)] leading-relaxed">
                            {obj.reponse}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email template */}
          <div className="rounded-none border border-div bg-ivory overflow-hidden">
            <div className="px-4 py-2 border-b border-div bg-cream flex items-center justify-between">
              <span className="text-[8px] text-t3 font-[family-name:var(--font-jetbrains)] tracking-[1px]">
                TEMPLATE EMAIL
                {adaptCompany && (
                  <span className="ml-2 text-gold">
                    adapt\u00e9 \u00e0 {adaptCompany.name}
                  </span>
                )}
              </span>
              <button
                className="text-[8px] text-gold font-[family-name:var(--font-jetbrains)] tracking-[1px] cursor-pointer bg-transparent border-none hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText(adaptText(currentPb.template_email));
                }}
              >
                COPIER
              </button>
            </div>
            <pre className="p-4 text-[10px] text-t1 font-[family-name:var(--font-sn)] leading-relaxed whitespace-pre-wrap">
              {adaptText(currentPb.template_email)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

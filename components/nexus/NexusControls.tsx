'use client';

import { useNexusStore } from './nexus-store';

const FLOW_TYPES = [
  { type: 'consent', label: 'Consentement', color: '#8B5EB0' },
  { type: 'audit', label: 'Audit', color: '#A87D3E' },
  { type: 'data', label: 'Donnees', color: '#5A8A6E' },
  { type: 'proof', label: 'Preuve', color: '#5A6E9C' },
  { type: 'command', label: 'Pilotage', color: '#E4D4EA' },
  { type: 'invest', label: 'Investissement', color: 'rgba(250,248,252,0.70)' },
  { type: 'knowledge', label: 'Savoir', color: 'rgba(250,248,252,0.50)' },
  { type: 'verify', label: 'Verification', color: '#5A8A90' },
  { type: 'cert', label: 'Certificat', color: '#904A68' },
  { type: 'eco', label: 'Ecosysteme', color: '#E4D4EA' },
];

export default function NexusControls() {
  const { activeFlowTypes, toggleFlowType, flowCount } = useNexusStore();

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="bg-[#1E0A20]/90 backdrop-blur-md border border-[rgba(250,248,252,0.12)] rounded-none-none p-4 w-[220px]">
        <div className="font-[family-name:var(--font-cormorant)] text-[18px] font-bold  text-[#FAF8FC] mb-1">
          Nexus
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(255,255,255,0.45)] mb-4">
          11 entites &middot; {flowCount} flux
        </div>

        <div className="space-y-1.5 mb-4">
          {FLOW_TYPES.map(({ type, label, color }) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFlowTypes.has(type)}
                onChange={() => toggleFlowType(type)}
                className="accent-[#FAF8FC] w-3 h-3"
              />
              <span
                className="w-2 h-2 rounded-none-none shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(255,255,255,0.70)] group-hover:text-[#FAF8FC] transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>

        <div className="border-t border-[rgba(250,248,252,0.08)] pt-3 space-y-2">
          <a
            href="/eigen"
            className="block text-center font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(250,248,252,0.70)] hover:underline"
          >
            &larr; Cockpit EIGEN
          </a>
          <a
            href="/"
            className="block text-center font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(255,255,255,0.45)] hover:text-[#FAF8FC] hover:underline"
          >
            &larr; Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

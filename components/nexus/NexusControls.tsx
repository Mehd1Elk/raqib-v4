'use client';

import { useNexusStore } from './nexus-store';

const FLOW_TYPES = [
  { type: 'consent', label: 'Consentement', color: '#7B5EA7' },
  { type: 'audit', label: 'Audit', color: '#B87D3E' },
  { type: 'data', label: 'Donnees', color: '#3D7C5E' },
  { type: 'proof', label: 'Preuve', color: '#3D5E8C' },
  { type: 'command', label: 'Pilotage', color: '#D4B662' },
  { type: 'invest', label: 'Investissement', color: '#162B20' },
  { type: 'knowledge', label: 'Savoir', color: '#918977' },
  { type: 'verify', label: 'Verification', color: '#3D7C8C' },
  { type: 'cert', label: 'Certificat', color: '#6E2A3D' },
  { type: 'eco', label: 'Ecosysteme', color: '#C9A96E' },
];

export default function NexusControls() {
  const { activeFlowTypes, toggleFlowType, flowCount } = useNexusStore();

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="bg-[#252019]/90 backdrop-blur-md border border-[rgba(212,182,98,0.15)] rounded-none-none p-4 w-[220px]">
        <div className="font-[family-name:var(--font-playfair)] text-[18px] font-bold  text-[#D4B662] mb-1">
          Nexus
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] mb-4">
          11 entites &middot; {flowCount} flux
        </div>

        <div className="space-y-1.5 mb-4">
          {FLOW_TYPES.map(({ type, label, color }) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFlowTypes.has(type)}
                onChange={() => toggleFlowType(type)}
                className="accent-[#B8963E] w-3 h-3"
              />
              <span
                className="w-2 h-2 rounded-none-none shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] group-hover:text-[#D4B662] transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>

        <div className="border-t border-[rgba(212,182,98,0.1)] pt-3 space-y-2">
          <a
            href="/eigen"
            className="block text-center font-[family-name:var(--font-jetbrains)] text-[8px] text-[#B8963E] hover:underline"
          >
            &larr; Cockpit EIGEN
          </a>
          <a
            href="/"
            className="block text-center font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] hover:text-[#D4B662] hover:underline"
          >
            &larr; Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

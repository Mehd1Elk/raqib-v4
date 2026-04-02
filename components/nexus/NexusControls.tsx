'use client';

import { useNexusStore } from './nexus-store';

const FLOW_TYPES = [
  { type: 'consent', label: 'Consentement', color: '#7B5EA7' },
  { type: 'audit', label: 'Audit', color: '#B87D3E' },
  { type: 'data', label: 'Donnees', color: '#3D7C5E' },
  { type: 'proof', label: 'Preuve', color: '#3D5E8C' },
  { type: 'command', label: 'Pilotage', color: '#1E0A20' },
  { type: 'invest', label: 'Investissement', color: '#162B20' },
  { type: 'knowledge', label: 'Savoir', color: 'rgba(30,10,32,0.60)' },
  { type: 'verify', label: 'Verification', color: '#3D7C8C' },
  { type: 'cert', label: 'Certificat', color: '#6E2A3D' },
  { type: 'eco', label: 'Ecosysteme', color: '#1E0A20' },
];

export default function NexusControls() {
  const { activeFlowTypes, toggleFlowType, flowCount } = useNexusStore();

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="bg-[#252019]/90 backdrop-blur-md border border-[rgba(212,182,98,0.15)] rounded-none-none p-4 w-[220px]">
        <div className="font-[family-name:var(--font-cormorant)] text-[18px] font-bold italic text-[#1E0A20] mb-1">
          Nexus
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] mb-4">
          11 entites &middot; {flowCount} flux
        </div>

        <div className="space-y-1.5 mb-4">
          {FLOW_TYPES.map(({ type, label, color }) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeFlowTypes.has(type)}
                onChange={() => toggleFlowType(type)}
                className="accent-[#1E0A20] w-3 h-3"
              />
              <span
                className="w-2 h-2 rounded-none-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] group-hover:text-[#1E0A20] transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>

        <div className="border-t border-[rgba(212,182,98,0.1)] pt-3 space-y-2">
          <a
            href="/eigen"
            className="block text-center font-[family-name:var(--font-jetbrains)] text-[8px] text-[#1E0A20] hover:underline"
          >
            &larr; Cockpit EIGEN
          </a>
          <a
            href="/"
            className="block text-center font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] hover:text-[#1E0A20] hover:underline"
          >
            &larr; Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

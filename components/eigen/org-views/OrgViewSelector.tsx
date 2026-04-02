'use client';

import React from 'react';
import { GitBranch, Layers, ArrowRightLeft, Building2, Network } from 'lucide-react';

export type OrgViewId = 'hierarchy' | 'platform' | 'dataflow' | 'entity' | 'network';

const ORG_VIEWS: { id: OrgViewId; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'hierarchy', label: 'Hierarchie', icon: GitBranch, description: 'L4 → L3 → L2 → L1.5 → L1' },
  { id: 'platform', label: 'Plateformes', icon: Layers, description: 'Agents groupes par outil' },
  { id: 'dataflow', label: 'Flux de donnees', icon: ArrowRightLeft, description: 'Qui produit quoi pour qui' },
  { id: 'entity', label: 'Par entite', icon: Building2, description: 'Agents par subsidiaire Eigen' },
  { id: 'network', label: 'Reseau', icon: Network, description: 'Dependances inter-agents' },
];

interface OrgViewSelectorProps {
  activeView: OrgViewId;
  onViewChange: (view: OrgViewId) => void;
}

export function OrgViewSelector({ activeView, onViewChange }: OrgViewSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-[#F7F3EA] border border-[#E5E0D8] rounded-none-none p-1">
      {ORG_VIEWS.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;
        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            title={view.description}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-none-none text-[10px] font-mono font-bold uppercase tracking-wide
              transition-all duration-200
              ${isActive
                ? 'bg-white text-[#B8963E] shadow-sm border border-[#B8963E]/20'
                : 'text-[#918977] hover:text-[#1C1814] hover:bg-white/50'
              }
            `}
          >
            <Icon size={13} strokeWidth={isActive ? 2.2 : 1.8} />
            <span className="hidden sm:inline">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
}

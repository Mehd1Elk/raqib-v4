'use client';

import React, { useState } from 'react';
import { MessageCircle, Users } from 'lucide-react';
import CohortPanel from './CohortPanel';
import type { Agent } from '../../lib/agents-data';
import StatusDot from '../ui/StatusDot';

const COHORTS_DEF = [
  { id: 'pole-neuro', name: 'Neurosciences & Santé', color: '#3D5E8C', layer: 'L1', description: 'Calibration SCID-5, NLP clinique, observance', filter: (a: any) => a.pole === 'Neurosciences & Santé' && a.layer === 'L1' },
  { id: 'pole-ia', name: 'IA & Ingénierie', color: '#7B5EA7', layer: 'L1', description: 'Rust, TypeScript, React, Solidity, ZKP', filter: (a: any) => a.pole === 'IA & Ingénierie' && a.layer === 'L1' },
  { id: 'pole-data', name: 'Données & Conformité', color: '#3D7C5E', layer: 'L1', description: 'RGPD, AI Act, MiCA, ISO 13485', filter: (a: any) => a.pole === 'Données & Conformité' && a.layer === 'L1' },
  { id: 'pole-marche', name: 'Marché & Acquisition', color: '#B8963E', layer: 'L1', description: 'VC, GITEX, deal flow, pricing', filter: (a: any) => a.pole === 'Marché & Acquisition' && a.layer === 'L1' },
  { id: 'pole-comm', name: 'Communication & Design', color: '#6E2A3D', layer: 'L1', description: 'Content, UI/UX, motion, PR', filter: (a: any) => a.pole === 'Communication & Design' && a.layer === 'L1' },
  { id: 'pole-raqib', name: 'Raqib Collectors', color: '#918977', layer: 'OPS', description: '10 collectors — 1 par entité', filter: (a: any) => a.pole === 'Raqib' && a.layer === 'L1' },
  { id: 'pole-viz', name: 'Visualisation', color: '#B87D3E', layer: 'OPS', description: 'Charts, maps, networks, timelines', filter: (a: any) => a.pole === 'Viz' && a.layer === 'L1' },
  { id: 'sa-termi', name: 'Vérification Terminologique', color: '#9C3D3D', layer: 'L1.5', description: 'FR, EN, AR, OHADA, UE, MA, Corridor', filter: (a: any) => a.name.includes('terminologique') },
  { id: 'sa-fact', name: 'Vérification Factuelle', color: '#9C3D3D', layer: 'L1.5', description: 'Santé, finance, juridique, tech, géo', filter: (a: any) => a.name.includes('factuel') },
  { id: 'sa-code', name: 'Code Review', color: '#9C3D3D', layer: 'L1.5', description: 'Rust, TS, Solidity, Python, React, SQL', filter: (a: any) => a.name.includes('code') },
  { id: 'sa-qa', name: 'QA Adversariale', color: '#9C3D3D', layer: 'L1.5', description: 'Hallucination, logic, inconsistency, completeness', filter: (a: any) => a.name.includes('QA Adversariale') },
  { id: 'l2-super', name: 'Supervision', color: '#3D5E8C', layer: 'L2', description: '1 superviseur par paire d\'entités', filter: (a: any) => a.layer === 'L2' },
  { id: 'l3-report', name: 'Reporting & Stratégie', color: '#3D7C5E', layer: 'L3', description: 'Planificateur, Reporter, Optimiseur', filter: (a: any) => a.layer === 'L3' },
  { id: 'l4-found', name: 'Fondateur & Architectes', color: '#7B5EA7', layer: 'L4', description: 'Mehdi + 7 architectes stagiaires', filter: (a: any) => a.layer === 'L4' },
];

export default function CohortGrid({ agentsData }: { agentsData: Agent[] }) {
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);

  const activeCohort = COHORTS_DEF.find(c => c.id === selectedCohortId);
  const cohortAgents = activeCohort ? agentsData.filter(activeCohort.filter).map(a => ({
    id: a.id,
    name: a.name,
    platform: a.platform,
    model: a.model,
    status: a.status
  })) : [];

  if (selectedCohortId && activeCohort) {
    return (
      <div className="absolute inset-0 z-50 bg-[#FDFCFB]/95 backdrop-blur-sm p-6 overflow-hidden flex items-center justify-center animate-in fade-in duration-300">
        <div className="w-full max-w-6xl h-full pb-8">
          <CohortPanel 
            cohortId={activeCohort.id}
            cohortName={activeCohort.name}
            cohortColor={activeCohort.color}
            description={activeCohort.description}
            agents={cohortAgents}
            onClose={() => setSelectedCohortId(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full pb-32 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {COHORTS_DEF.map(cohort => {
          const agents = agentsData.filter(cohort.filter);
          const activeCount = agents.filter(a => ['Actif', 'active'].includes(a.status)).length;
          const hasError = agents.some(a => ['Erreur', 'error'].includes(a.status));
          
          return (
            <div 
              key={cohort.id}
              onClick={() => setSelectedCohortId(cohort.id)}
              className="bg-white border border-[#E5E0D8] rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all hover:border-stone-300 group flex flex-col h-[200px]"
            >
              <div className="flex-1 p-5 relative flex flex-col">
                {/* Side Color Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: cohort.color }} />
                
                {/* Header */}
                <div className="pl-2 flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-800 leading-tight mb-1">{cohort.name}</h3>
                    <div className="font-mono text-[9px] text-stone-500 uppercase flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-600 font-bold">{cohort.layer}</span>
                      <span>{agents.length} AGENTS · {activeCount} ACTIFS</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusDot status={hasError ? 'error' : activeCount > 0 ? 'active' : 'inactive'} />
                    {/* Unread badge simulation */}
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] animate-pulse mt-2" />
                  </div>
                </div>

                {/* Description */}
                <p className="pl-2 relative font-sans text-[11px] text-stone-500 mt-2 line-clamp-2">
                  {cohort.description}
                </p>

                <div className="mt-auto pl-2 flex gap-1 items-center flex-wrap pt-4">
                  {agents.slice(0, 10).map((a, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: ['Actif', 'active'].includes(a.status) ? '#10B981' : ['Erreur', 'error'].includes(a.status) ? '#EF4444' : '#D6D3D1' }} />
                  ))}
                  {agents.length > 10 && <span className="font-mono text-[8px] text-stone-400 ml-1">+{agents.length - 10}</span>}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="h-10 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between px-5 group-hover:bg-[#D4AF37]/5 transition-colors">
                <div className="flex items-center gap-2 font-mono text-[9px] text-stone-500 group-hover:text-[#D4AF37] transition-colors">
                  <MessageCircle size={10} />
                  <span>3 DISCUSSIONS · {Math.floor(Math.random() * 50) + 12} MESSAGES</span>
                </div>
                <span className="font-mono text-[9px] font-bold text-stone-400 group-hover:text-[#D4AF37] uppercase tracking-wider transition-colors">Ouvrir le comité →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

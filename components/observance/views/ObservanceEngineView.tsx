"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_OBSERVANCE_DATA } from '../shared/mock-data';
import { CLINICAL_TEAL_COLORS } from '../shared/constants';
import { HeartPulse, Activity, AlertTriangle, ActivitySquare, BrainCircuit, ActivityIcon } from 'lucide-react';

const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default function ObservanceEngineView() {
  const [selectedPathology, setSelectedPathology] = useState("Bipolaire");
  const [selectedMolecule, setSelectedMolecule] = useState("Lithium");
  const [apiDashboard, setApiDashboard] = useState<any>(null);

  useEffect(() => {
    fetch('/api/observance/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d && !d.error) setApiDashboard({
          activePatients: d.total_patients ?? 0,
          averageObservance: d.mean_adherence_score ?? 0,
          ruptureAlerts24h: d.alert_count_24h ?? 0,
          hmmState4Count: 0,
          myneDataValue: `€${((d.myne_revenue_24h ?? 0) / 1000).toFixed(1)}K`,
          avgMhfs: d.mean_mhfs ?? 0,
        });
      })
      .catch(() => {});
  }, []);

  const dashboard = apiDashboard ?? MOCK_OBSERVANCE_DATA.dashboard;
  const { recentAlerts, moleculeAggregates } = MOCK_OBSERVANCE_DATA;

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* HEADER: 6 STAT CARDS */}
      <div className="grid grid-cols-6 gap-4 shrink-0">
        <StatCard title="PATIENTS ACTIFS" value={dashboard.activePatients.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} icon={<HeartPulse size={16} />} color={CLINICAL_TEAL_COLORS.primary} />
        <StatCard title="OBSERVANCE MOYENNE" value={`${dashboard.averageObservance}%`} icon={<Activity size={16} />} color={CLINICAL_TEAL_COLORS.greenAELYA} />
        <StatCard title="ALERTES RUPTURE 24H" value={dashboard.ruptureAlerts24h} icon={<AlertTriangle size={16} />} color={CLINICAL_TEAL_COLORS.redDisruptive} pulseIf={true} />
        <StatCard title="HMM ÉTAT 4 (RUPTURE)" value={dashboard.hmmState4Count} icon={<ActivitySquare size={16} />} color={CLINICAL_TEAL_COLORS.redDisruptive} />
        <StatCard title="DONNÉES MYNε 24H" value={dashboard.myneDataValue} icon={<BrainCircuit size={16} />} color={CLINICAL_TEAL_COLORS.purpleMYNE} />
        <StatCard title="MHFS MOYEN" value={`${dashboard.avgMhfs}/1000`} icon={<ActivityIcon size={16} />} color={CLINICAL_TEAL_COLORS.goldBURHAN} />
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* PANNEAU GAUCHE: FILTRES */}
        <div className="w-64 bg-[#15161A] p-4 flex flex-col gap-6">
          <h3 className="font-['Playfair_Display'] text-[16px] text-white">Paramètres Cohorte</h3>
          
          <div className="space-y-4">
            <FilterSelect label="Pathologie" value={selectedPathology} onChange={setSelectedPathology} options={["Bipolaire", "Schizophrénie", "Dépression", "TDAH", "SSPT"]} />
            <FilterSelect label="Molécule" value={selectedMolecule} onChange={setSelectedMolecule} options={["Lithium", "Valproate", "Lamotrigine", "Clozapine", "Rispéridone", "Aripiprazole", "Quétiapine", "Olanzapine", "Sertraline", "Fluoxétine", "Méthylphénidate", "Atomoxétine"]} />
            <FilterSelect label="Pays Corridor" value="Maroc" onChange={()=>{}} options={["Maroc", "Sénégal", "Rwanda", "RDC", "Gabon", "Guinée"]} />
            
            <div className="pt-4 border-t border-[#0B0C10]">
              <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">PÉRIODE</label>
              <div className="flex bg-[#0B0C10] p-1 gap-1">
                {['7J', '30J', '90J', '6M', '1A'].map(p => (
                  <button key={p} className={`flex-1 text-[10px] font-['JetBrains_Mono'] py-1 ${p === '30J' ? 'bg-[#15161A] text-white' : 'text-[#8A9BA8]'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PANNEAU CENTRAL: DISTRIBUTION HMM */}
        <div className="flex-1 bg-[#15161A] p-6 flex flex-col">
          <h3 className="font-['Playfair_Display'] text-[20px] text-white mb-2">Distribution Hidden Markov Model</h3>
          <p className="font-['Geist'] text-[14px] text-[#8A9BA8] mb-8">Base: {dashboard.activePatients.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} patients • Modèle prédictif à 4 états</p>
          
          <div className="flex-1 flex flex-col justify-center gap-6">
            <HMMBar label="ÉTAT 1 : Observance Nominale" percent={60} color={CLINICAL_TEAL_COLORS.greenAELYA} desc="Prises régulières, entropie comportementale faible." />
            <HMMBar label="ÉTAT 2 : Observance Fragilisée" percent={20} color="#FFC107" desc="Retards mineurs, variations de routine détectées." />
            <HMMBar label="ÉTAT 3 : Micro-ruptures" percent={15} color="#FF9800" desc="Doses manquées isolées, signal renforcé par data environnementale." />
            <HMMBar label="ÉTAT 4 : Rupture Active" percent={5} color={CLINICAL_TEAL_COLORS.redDisruptive} desc="Arrêt thérapeutique probable, seuil d'alerte dépassé." />
          </div>
        </div>

        {/* PANNEAU DROIT: ALERTES */}
        <div className="w-80 bg-[#15161A] p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-['Playfair_Display'] text-[16px] text-white">Alertes Cohorte</h3>
            <span className="text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 bg-[rgba(244,67,54,0.1)] text-[#F44336]">LIVE</span>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="p-3 bg-[#0B0C10] border-l-2" style={{ borderColor: alert.severity === 'red' ? CLINICAL_TEAL_COLORS.redDisruptive : '#FFC107' }}>
                <div className="flex justify-between text-[11px] font-['JetBrains_Mono'] mb-1">
                  <span className="text-[#E0E6ED]">{alert.patient}</span>
                  <span className="text-[#8A9BA8]">{alert.time}</span>
                </div>
                <div className="text-[13px] font-['Geist'] text-white my-1">{alert.shift}</div>
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8]">
                  <span>{alert.molecule} • {alert.location}</span>
                  <span style={{ color: alert.severity === 'red' ? CLINICAL_TEAL_COLORS.redDisruptive : '#FFC107' }}>{alert.alert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM PANEL: TABLE */}
      <div className="bg-[#15161A] p-4 shrink-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#0B0C10] font-['JetBrains_Mono'] text-[10px] text-[#8A9BA8] [&_th]:pb-2 [&_th]:font-normal tracking-wide">
              <th>MOLÉCULE</th>
              <th>PATIENTS ACTIFS</th>
              <th>OBSERVANCE %</th>
              <th>HMM DISTRIBUTION</th>
              <th>ALERTES 24H</th>
              <th className="text-right">MHFS MOYEN</th>
            </tr>
          </thead>
          <tbody className="font-['Geist'] text-[13px] text-[#E0E6ED]">
            {moleculeAggregates.map(agg => (
              <tr key={agg.molecule} className="border-b border-[#0B0C10] hover:bg-[#0B0C10]/50 transition-colors">
                <td className="py-3 font-semibold">{agg.molecule}</td>
                <td className="font-['JetBrains_Mono'] text-[12px]">{agg.activePatients.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono'] text-[12px]">{agg.observance}%</span>
                    <div className="h-1 w-16 bg-[#0B0C10] overflow-hidden">
                      <div className="h-full bg-[#5AACAC]" style={{ width: `${agg.observance}%` }} />
                    </div>
                  </div>
                </td>
                <td className="w-48">
                  <div className="flex h-1.5 w-full bg-[#0B0C10]">
                    <div className="h-full" style={{ width: `${agg.hmm[0]}%`, backgroundColor: CLINICAL_TEAL_COLORS.greenAELYA }} />
                    <div className="h-full" style={{ width: `${agg.hmm[1]}%`, backgroundColor: '#FFC107' }} />
                    <div className="h-full" style={{ width: `${agg.hmm[2]}%`, backgroundColor: '#FF9800' }} />
                    <div className="h-full" style={{ width: `${agg.hmm[3]}%`, backgroundColor: CLINICAL_TEAL_COLORS.redDisruptive }} />
                  </div>
                </td>
                <td className="font-['JetBrains_Mono'] text-[12px] text-[#F44336]">{agg.alerts24h}</td>
                <td className="text-right font-['JetBrains_Mono'] text-[12px]">{agg.mhfs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

function StatCard({ title, value, icon, color, pulseIf = false }: any) {
  return (
    <div className="bg-[#15161A] border-t-2 p-4 flex flex-col gap-2 relative overflow-hidden" style={{ borderColor: color }}>
      <div className="flex items-center justify-between z-10">
        <span className="font-['JetBrains_Mono'] text-[10px] tracking-wide text-[#8A9BA8]">{title}</span>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="font-['JetBrains_Mono'] text-2xl text-white z-10">{value}</div>
      {pulseIf && (
        <div className="absolute top-0 right-0 w-full h-full bg-red-500/5 animate-pulse z-0" />
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-[10px] font-['JetBrains_Mono'] text-[#8A9BA8] block mb-2">{label.toUpperCase()}</label>
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#0B0C10] border-none text-[13px] font-['Geist'] text-white p-2 outline-none appearance-none cursor-pointer"
      >
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function HMMBar({ label, percent, color, desc }: any) {
  return (
    <div>
      <div className="flex justify-between font-['JetBrains_Mono'] text-[11px] mb-1">
        <span className="text-white">{label}</span>
        <span style={{ color }}>{percent}%</span>
      </div>
      <div className="h-8 bg-[#0B0C10] relative mb-1 group">
        <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${percent}%`, backgroundColor: color }} />
        <div className="absolute inset-x-0 bottom-full mb-2 bg-[#0B0C10] border border-[#15161A] p-2 text-[11px] font-['Geist'] text-[#8A9BA8] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
          {desc}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { CLINICAL_TEAL_COLORS, COMMON_STYLES } from '../shared/constants';
import { MYNE_INCENTIVE } from '../shared/mock-data';
import { Coins, Settings } from 'lucide-react';

export default function MyneIncentiveView() {
  const [apiIncentive, setApiIncentive] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/observance/incentive')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length > 0) setApiIncentive(d); })
      .catch(() => {});
  }, []);
  const incentiveScenarios = apiIncentive.length > 0 ? apiIncentive : MYNE_INCENTIVE;

  const [patients, setPatients] = useState(100);
  const [molecule, setMolecule] = useState('Lithium');
  const [corridor, setCorridor] = useState('Maroc');
  const [signals, setSignals] = useState(3);
  const [pgx, setPgx] = useState(false);
  const [twin, setTwin] = useState(false);
  const [forensics, setForensics] = useState(false);
  
  // Logic
  let pricePerPatient = 10;
  if (pgx) pricePerPatient *= 5;
  if (twin) pricePerPatient *= 3;
  if (forensics) pricePerPatient += 500; // Un peu simplifié pour la démo
  
  const totalSignals = patients * signals;
  const revenusBruts = totalSignals * pricePerPatient;
  const partPatient = revenusBruts * 0.53;
  const partSystem = revenusBruts - partPatient;
  
  const aelyaFee = partSystem * 0.40;
  const burhanFee = partSystem * 0.30;
  const eigenNet = partSystem * 0.30;
  
  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden text-sm">
      <h2 style={COMMON_STYLES.sectionTitle}>Simulateur Économique MYNε</h2>
      
      {/* PANNEAU HAUT — Configurateur */}
      <div className="p-6 grid grid-cols-4 gap-6" style={COMMON_STYLES.card}>
         <div className="flex items-center space-x-2 col-span-4 border-b pb-4 mb-2" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            <Settings size={18} color={CLINICAL_TEAL_COLORS.accentTeal} />
            <h3 style={COMMON_STYLES.label}>CONFIGURATEUR DE MARCHÉ</h3>
         </div>
         
         <div className="space-y-4">
            <div>
               <label className="flex justify-between" style={COMMON_STYLES.label}>
                 <span>Patients</span>
                 <span style={{ color: CLINICAL_TEAL_COLORS.textMain }}>{patients.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
               </label>
               <input type="range" min="100" max="500000" step="1000" value={patients} onChange={e => setPatients(Number(e.target.value))} className="w-full mt-2 accent-teal-500" />
            </div>
            <div>
               <label className="flex justify-between" style={COMMON_STYLES.label}>
                 <span>Signaux / mois</span>
                 <span style={{ color: CLINICAL_TEAL_COLORS.textMain }}>{signals}</span>
               </label>
               <input type="range" min="1" max="6" value={signals} onChange={e => setSignals(Number(e.target.value))} className="w-full mt-2 accent-teal-500" />
            </div>
         </div>
         
         <div className="space-y-4">
            <div>
               <label className="block mb-2" style={COMMON_STYLES.label}>Molécule cible</label>
               <select value={molecule} onChange={e => setMolecule(e.target.value)} className="w-full bg-[#051114] border p-2 text-[13px] outline-none" style={{ borderColor: CLINICAL_TEAL_COLORS.border, color: CLINICAL_TEAL_COLORS.textMain, fontFamily: 'Geist, sans-serif' }}>
                 <option>Lithium</option><option>Aripiprazole</option><option>Olanzapine</option>
               </select>
            </div>
            <div>
               <label className="block mb-2" style={COMMON_STYLES.label}>Corridor</label>
               <select value={corridor} onChange={e => setCorridor(e.target.value)} className="w-full bg-[#051114] border p-2 text-[13px] outline-none" style={{ borderColor: CLINICAL_TEAL_COLORS.border, color: CLINICAL_TEAL_COLORS.textMain, fontFamily: 'Geist, sans-serif' }}>
                 <option>Maroc</option><option>Sénégal</option><option>UEMOA</option><option>Nigeria (MTN)</option>
               </select>
            </div>
         </div>
         
         <div className="col-span-2 space-y-4">
            <label className="block mb-2" style={COMMON_STYLES.label}>Enrichissements Data</label>
            <div className="grid grid-cols-2 gap-4">
               <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={pgx} onChange={e => setPgx(e.target.checked)} className="accent-teal-500 w-4 h-4" />
                  <span style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>PGx Profiling (×5)</span>
               </label>
               <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={twin} onChange={e => setTwin(e.target.checked)} className="accent-teal-500 w-4 h-4" />
                  <span style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>Digital Twin (×3)</span>
               </label>
               <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={forensics} onChange={e => setForensics(e.target.checked)} className="accent-teal-500 w-4 h-4" />
                  <span style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain }}>Autopsie Forensique (€500)</span>
               </label>
            </div>
         </div>
      </div>
      
      {/* PANNEAU CENTRAL — Résultat en temps réel */}
      <div className="flex-1 grid grid-cols-3 gap-6 p-6" style={COMMON_STYLES.card}>
         <div className="flex flex-col justify-center border-r pr-6" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            <div style={COMMON_STYLES.label} className="mb-2">REVENUS BRUTS MENSUELS</div>
            <div style={{ ...COMMON_STYLES.value, fontSize: '36px' }}>€{revenusBruts.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</div>
            <div className="mt-2 text-xs" style={{ color: CLINICAL_TEAL_COLORS.textSecondary }}>Prix unitaire moyen : €{pricePerPatient}</div>
         </div>
         
         <div className="flex flex-col justify-center border-r px-6" style={{ borderColor: CLINICAL_TEAL_COLORS.border }}>
            <div style={{...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentPurple}} className="mb-2">PART PATIENT (53%)</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '36px', color: CLINICAL_TEAL_COLORS.accentPurple }}>
               €{partPatient.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </div>
            <div className="mt-2 p-3 bg-purple-900/20 text-xs" style={{ border: `1px solid ${CLINICAL_TEAL_COLORS.accentPurple}50`, color: '#D8B4FE', lineHeight: 1.5 }}>
               <strong>CASH-OUT :</strong> Le patient bipolaire reçoit ~€{(partPatient/patients/12).toFixed(2)}/mois.<br/>
               Via Wafacash, Orange Money, Wave.
            </div>
         </div>
         
         <div className="flex flex-col justify-center pl-6 space-y-4">
            <div style={COMMON_STYLES.label} className="mb-2">PART SYSTÈME (47%)</div>
            
            <div className="flex justify-between items-center" style={COMMON_STYLES.separator}>
               <span style={COMMON_STYLES.label}>ÆLYA Fees</span>
               <span style={{...COMMON_STYLES.value, fontSize: '15px'}}>€{aelyaFee.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
            </div>
            <div className="flex justify-between items-center" style={COMMON_STYLES.separator}>
               <span style={COMMON_STYLES.label}>BURHAN Fees</span>
               <span style={{...COMMON_STYLES.value, fontSize: '15px'}}>€{burhanFee.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
               <span style={{...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.accentGold}}>Eigen Marge Nette</span>
               <span style={{...COMMON_STYLES.value, fontSize: '18px', color: CLINICAL_TEAL_COLORS.accentGold}}>€{eigenNet.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
            </div>
         </div>
      </div>
      
      {/* PANNEAU BAS — Impact système */}
      <div className="p-6 flex flex-col justify-center" style={{ ...COMMON_STYLES.card, borderColor: CLINICAL_TEAL_COLORS.accentTeal }}>
         <div className="flex items-center space-x-2 mb-4">
            <Coins size={18} color={CLINICAL_TEAL_COLORS.accentTeal} />
            <h3 style={{ ...COMMON_STYLES.label, color: CLINICAL_TEAL_COLORS.textMain }}>IMPACT MACRO-ÉCONOMIQUE</h3>
         </div>
         <p style={{ fontFamily: 'Geist, sans-serif', color: CLINICAL_TEAL_COLORS.textMain, fontSize: '15px', lineHeight: 1.6 }} className="mb-6">
            Si l'observance passe de <strong>40% à 55%</strong> grâce à l'incitation MYNε / NOOS :<br/>
            Économie nette de <strong style={{color: CLINICAL_TEAL_COLORS.accentGreen}}>€500M - 1Md / an</strong> sur le corridor visé (réhospitalisations et arrêts maladie évités).
         </p>
         
         <div>
            <div className="flex justify-between text-xs mb-1" style={COMMON_STYLES.label}>
               <span>Investissement MYNε ({((partPatient)/1000000).toFixed(1)}M)</span>
               <span style={{color: CLINICAL_TEAL_COLORS.accentGreen}}>Économies Système (Ratio 1:15)</span>
            </div>
            <div className="w-full h-4 bg-[#11333A] flex">
               <div className="h-full bg-[#C084FC]" style={{ width: '6.6%' }}></div>
               <div className="h-full bg-[#4ADE80]" style={{ width: '93.4%' }}></div>
            </div>
         </div>
      </div>
    </div>
  );
}

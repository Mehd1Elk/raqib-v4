'use client';

import React, { useRef, useEffect } from 'react';
import {
  Database, ArrowRight, Activity, Euro, Shield,
  Lock, FileCheck, Users, BarChart3, Leaf,
  Brain, FlaskConical, Landmark, Scale
} from 'lucide-react';

/* ─────────────────── DATA ─────────────────── */

const EMERALD = '#3D7C5E';

const gaugeKPIs = [
  { label: 'Datasets produits', value: 12, target: 50, unit: '', icon: <Database size={14} /> },
  { label: 'Producteurs rémunérés', value: 0, target: 500, unit: '', icon: <Users size={14} /> },
  { label: 'k-Anonymisation', value: 5, target: 5, unit: 'k=', icon: <Shield size={14} />, prefix: true },
  { label: 'Revenus marketplace', value: 0, target: 100000, unit: '€', icon: <Euro size={14} /> },
  { label: 'Entries Raqib', value: 1521, target: 2000, unit: '', icon: <BarChart3 size={14} /> },
];

const pipelineSteps = [
  { id: 'T1', label: 'Métadonnées brutes', color: '#918977', desc: 'Ingestion données patient consenties' },
  { id: 'T2', label: 'Pseudonymisation', color: '#7B5EA7', desc: 'Remplacement identifiants directs' },
  { id: 'T3', label: 'k-Anonymisation', color: EMERALD, desc: 'k ≥ 5 — quasi-identifiants généralisés' },
  { id: 'T4', label: 'ℓ-Diversification', color: '#3D5E8C', desc: 'ℓ-diversity sur attributs sensibles' },
  { id: 'T5', label: 'Dataset recherche', color: '#B8963E', desc: 'Prêt pour marketplace — Differential Privacy' },
];

const businessModel = [
  { step: '1', label: 'Consentement', desc: 'Le patient consent via ÆLYA — granulaire, révocable, tracé', icon: Lock },
  { step: '2', label: 'Anonymisation', desc: 'Pipeline T1→T5 : pseudonymisation → k-anonymisation → ℓ-diversity → DP', icon: Shield },
  { step: '3', label: 'Marketplace', desc: 'Datasets vendus aux chercheurs, pharma, assureurs via API', icon: Landmark },
  { step: '4', label: 'Rémunération', desc: 'Le producteur reçoit une part des revenus (modèle Spotify)', icon: Euro },
  { step: '5', label: 'Preuve', desc: 'Chaque vente tracée par BURHAN — Tx 504 (anonymisation) + Tx 505 (vente)', icon: FileCheck },
];

const dataVerticals = [
  { range: '01-20', label: 'Data brokers mondiaux', desc: 'Comparables : Veeva, IQVIA, Flatiron Health, Tempus, Datavant' },
  { range: '21-40', label: 'Technologies anonymisation', desc: 'OpenDP, ARX, Google DP Library, differential privacy, k-anonymity' },
  { range: '41-60', label: 'Réglementation', desc: 'Data Act 2026, EHDS (European Health Data Space), RGPD Art.89, HDS' },
  { range: '61-80', label: 'Marché données santé', desc: 'TAM €12B données santé recherche — croissance 23% CAGR' },
  { range: '81-100', label: 'Roadmap MYNε', desc: 'MVP Q2 2026, premier dataset NOOS Q3, marketplace live Q4' },
];

const bridges = [
  { entity: 'NOOS', direction: '←', color: '#B8963E', desc: 'Premier dataset : psychiatrie — dépression, TDAH, anxiété', icon: Brain },
  { entity: 'ÆLYA', direction: '←', color: '#3D5E8C', desc: 'Vérification consentement avant chaque ingestion', icon: Lock },
  { entity: 'BURHAN', direction: '→', color: '#8C6E2A', desc: 'Preuve anonymisation (Tx 504) + preuve vente (Tx 505)', icon: FileCheck },
  { entity: 'AlgueSov', direction: '←', color: '#5E6E3D', desc: 'Deuxième vertical : données algues Dakhla', icon: Leaf },
];

/* ─────────────────── COMPONENTS ─────────────────── */

function GaugeKPI({ label, value, target, unit, icon, prefix }: typeof gaugeKPIs[0] & { prefix?: boolean }) {
  const pct = Math.min((value / target) * 100, 100);
  const isComplete = value >= target;
  const displayValue = prefix ? `${unit}${value}` : (value >= 1000 ? value.toLocaleString('fr-FR') : value);
  const displayTarget = target >= 1000 ? target.toLocaleString('fr-FR') : target;
  return (
    <div className="flex-1 min-w-[140px] bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] p-3 relative overflow-hidden">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[#3D7C5E]">{icon}</span>
        <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] tracking-[1px] uppercase">{label}</span>
      </div>
      <div className="font-[family-name:var(--font-playfair)] text-[22px] font-bold text-[#1C1814] leading-none">
        {displayValue}{!prefix && unit && <span className="text-[14px] text-[#918977] ml-0.5">{unit}</span>}
      </div>
      <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-[#918977] mt-0.5">/ {prefix ? `${unit}${displayTarget}` : `${displayTarget}${unit}`}</div>
      <div className="mt-2 h-[3px] bg-[rgba(60,52,40,0.08)] rounded-none-none overflow-hidden">
        <div
          className="h-full rounded-none-none transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: isComplete ? EMERALD : '#B8963E' }}
        />
      </div>
    </div>
  );
}

function PipelineViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = container.offsetWidth;
    const H = 50;
    canvas.width = W;
    canvas.height = H;

    const stepW = W / pipelineSteps.length;
    const particles: { x: number; y: number; speed: number; seg: number }[] = [];
    for (let i = 0; i < pipelineSteps.length - 1; i++) {
      for (let j = 0; j < 3; j++) {
        particles.push({
          x: stepW * i + stepW * 0.5 + Math.random() * stepW * 0.3,
          y: H / 2 + (Math.random() - 0.5) * 8,
          speed: 0.3 + Math.random() * 0.4,
          seg: i,
        });
      }
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      // Connection lines
      ctx.strokeStyle = 'rgba(61,124,94,0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < pipelineSteps.length - 1; i++) {
        const x1 = stepW * i + stepW * 0.75;
        const x2 = stepW * (i + 1) + stepW * 0.25;
        ctx.beginPath();
        ctx.moveTo(x1, H / 2);
        ctx.lineTo(x2, H / 2);
        ctx.stroke();
      }
      // Nodes
      for (let i = 0; i < pipelineSteps.length; i++) {
        const cx = stepW * i + stepW * 0.5;
        ctx.beginPath();
        ctx.arc(cx, H / 2, 6, 0, Math.PI * 2);
        ctx.fillStyle = pipelineSteps[i].color;
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 7px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pipelineSteps[i].id, cx, H / 2);
      }
      // Particles
      for (const p of particles) {
        p.x += p.speed;
        const segEnd = stepW * (p.seg + 1) + stepW * 0.25;
        if (p.x > segEnd) {
          p.x = stepW * p.seg + stepW * 0.75;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(61,124,94,0.5)';
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <canvas ref={canvasRef} className="w-full" style={{ height: 50 }} />
      <div className="flex justify-between mt-2">
        {pipelineSteps.map(s => (
          <div key={s.id} className="text-center flex-1 px-1">
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] font-bold" style={{ color: s.color }}>{s.id}</div>
            <div className="font-[family-name:var(--font-noto)] text-[9px] text-[#1C1814] font-medium leading-tight">{s.label}</div>
            <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977] mt-0.5 leading-tight">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3 px-4">
        <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#3D5E8C] bg-[rgba(61,94,140,0.08)] px-2 py-0.5 rounded-none">
          ÆLYA vérifie consentement à chaque transition
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#8C6E2A] bg-[rgba(140,110,42,0.08)] px-2 py-0.5 rounded-none">
          BURHAN hashe à chaque transition (Tx 504)
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN ─────────────────── */

export default function MynePage() {
  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      {/* Hero */}
      <div className="bg-[#0A1F15] text-white px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] tracking-[3px] text-[#3D7C5E] mb-3">SUBSIDIAIRE EIGEN · DONNÉES SOUVERAINES</div>
          <h1 className="font-[family-name:var(--font-playfair)] text-[48px] font-bold  leading-none flex items-center gap-4">
            <Database size={36} strokeWidth={1} className="text-[#3D7C5E]" />
            MYN&epsilon;
          </h1>
          <p className="font-[family-name:var(--font-playfair)] text-[20px]  text-[#D4B662] mt-3">
            My data, my price — Le Spotify des données
          </p>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-[rgba(255,255,255,0.7)] mt-2 max-w-3xl">
            L&apos;individu produit, poss&egrave;de et b&eacute;n&eacute;ficie de ses donn&eacute;es. Plateforme de mon&eacute;tisation de donn&eacute;es personnelles avec Differential Privacy.
          </p>

          {/* Critical banner */}
          <div className="mt-6 bg-[rgba(61,124,94,0.15)] border border-[rgba(61,124,94,0.3)] rounded-none-none px-5 py-3 inline-flex items-center gap-3">
            <Scale size={16} className="text-[#3D7C5E] shrink-0" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#3D7C5E]">
              MYN&epsilon; &ne; anonymisation. &AElig;LYA anonymise. MYN&epsilon; est le march&eacute;.
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Gauge KPIs */}
        <div className="flex gap-3 flex-wrap">
          {gaugeKPIs.map(kpi => (
            <GaugeKPI key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Pipeline Architecture T1→T5 */}
        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold  text-[#1C1814] mb-1">Pipeline d&apos;anonymisation T1 &rarr; T5</h2>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] mb-4">Le c&oelig;ur de MYN&epsilon; — chaque transition est audit&eacute;e et consent&eacute;e</p>
          <div className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-5">
            <PipelineViz />
          </div>
        </div>

        {/* Business Model */}
        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold  text-[#1C1814] mb-1">Mod&egrave;le &eacute;conomique</h2>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] mb-4">Le producteur de donn&eacute;es est r&eacute;mun&eacute;r&eacute; quand un dataset T5 est vendu</p>
          <div className="grid grid-cols-5 gap-3">
            {businessModel.map(bm => {
              const Icon = bm.icon;
              return (
                <div key={bm.step} className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-4 relative">
                  <div className="absolute top-2 right-3 font-[family-name:var(--font-playfair)] text-[28px] font-bold text-[rgba(61,124,94,0.1)]">{bm.step}</div>
                  <Icon size={16} className="text-[#3D7C5E] mb-2" />
                  <div className="font-[family-name:var(--font-noto)] text-[12px] text-[#1C1814] font-semibold">{bm.label}</div>
                  <div className="font-[family-name:var(--font-noto)] text-[10px] text-[#918977] mt-1 leading-snug">{bm.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data categories */}
        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold  text-[#1C1814] mb-1">100 couches de donn&eacute;es</h2>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] mb-4">Data brokers, technologies, r&eacute;glementation, march&eacute;</p>
          <div className="space-y-2">
            {dataVerticals.map(d => (
              <div key={d.range} className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-3 flex items-center gap-4">
                <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#3D7C5E] font-bold w-[50px] shrink-0">{d.range}</span>
                <div>
                  <div className="font-[family-name:var(--font-noto)] text-[12px] text-[#1C1814] font-medium">{d.label}</div>
                  <div className="font-[family-name:var(--font-noto)] text-[10px] text-[#918977]">{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridges */}
        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-[22px] font-bold  text-[#1C1814] mb-1">Ponts inter-entit&eacute;s</h2>
          <p className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977] mb-4">MYN&epsilon; est au centre du flux de donn&eacute;es de l&apos;&eacute;cosyst&egrave;me</p>
          <div className="grid grid-cols-2 gap-3">
            {bridges.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.entity} className="bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-none-none flex items-center justify-center shrink-0" style={{ backgroundColor: `${b.color}15` }}>
                    <Icon size={14} style={{ color: b.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#918977]">{b.direction}</span>
                      <span className="font-[family-name:var(--font-playfair)] text-[15px] font-bold " style={{ color: b.color }}>{b.entity}</span>
                    </div>
                    <div className="font-[family-name:var(--font-noto)] text-[11px] text-[#918977] mt-0.5">{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 mb-8 flex gap-3">
          <a href="/myne" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A1F15] text-[#3D7C5E] rounded-none font-[family-name:var(--font-jetbrains)] text-[10px] hover:bg-[#152E21] transition">
            Viewer 100 couches <ArrowRight size={12} />
          </a>
          <a href="https://myneps.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#3D7C5E] text-[#3D7C5E] rounded-none font-[family-name:var(--font-jetbrains)] text-[10px] hover:bg-[rgba(61,124,94,0.05)] transition">
            myneps.ai <ArrowRight size={12} />
          </a>
          <a href="/nexus" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D4CCBA] text-[#918977] rounded-none font-[family-name:var(--font-jetbrains)] text-[10px] hover:border-[#B8963E] transition">
            Nexus
          </a>
        </div>
      </div>
    </div>
  );
}

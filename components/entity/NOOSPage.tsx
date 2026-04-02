'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, ArrowRight, ChevronDown, ChevronRight,
  Lock, FileCheck, Database, BookOpen, Users,
  Cpu, Activity, Timer, Euro, BarChart3,
  Code2, Beaker, FileText, Shield, Zap
} from 'lucide-react';

/* ─────────────────── DATA ─────────────────── */

const GOLD = '#1E0A20';

const gaugeKPIs = [
  { label: 'Kappa', value: 0.68, target: 0.75, unit: '', icon: <Activity size={14} /> },
  { label: 'Items calibrés', value: 2847, target: 3000, unit: '', icon: <Database size={14} /> },
  { label: 'Latence engine', value: 1.8, target: 2.0, unit: 'ms', icon: <Timer size={14} /> },
  { label: 'MRR M12', value: 0, target: 22000, unit: '€', icon: <Euro size={14} /> },
  { label: 'Entries', value: 1842, target: 2000, unit: '', icon: <BarChart3 size={14} /> },
];

const pipelineNodes = [
  { id: 'noos-api', tech: 'TypeScript / Fastify', color: '#3178C6' },
  { id: 'noos-engine', tech: 'Rust / Axum', color: '#CE422B' },
  { id: 'noos-inference', tech: 'Python / MLX', color: '#3572A5' },
  { id: 'noos-burhan', tech: 'TypeScript / ethers.js', color: '#3178C6' },
  { id: 'noos-report', tech: 'Python / WeasyPrint', color: '#3572A5' },
];

type SprintStatus = 'done' | 'active' | 'planned';
interface Sprint {
  id: string;
  name: string;
  weeks: [number, number];
  agent: string;
  status: SprintStatus;
  color: string;
  tasks: string[];
  parallel?: boolean;
}

const sprints: Sprint[] = [
  { id: 'S01', name: 'Rust Engine', weeks: [1, 2], agent: 'Claude Code', status: 'done', color: '#3D7C5E', tasks: ['Axum scaffolding', 'SCID-5 parser', 'Scoring pipeline', 'Bench <2ms'] },
  { id: 'S02', name: 'Items Pr. Bayle', weeks: [3, 4], agent: 'Cowork', status: 'active', color: GOLD, tasks: ['Calibration 3000 items', 'Validation clinique', 'Export JSON-LD'] },
  { id: 'S03', name: 'Portails React', weeks: [5, 6], agent: 'Antigravity', status: 'planned', color: '#7B5EA7', tasks: ['Dashboard clinicien', 'Portail patient', 'Portail admin'] },
  { id: 'A01', name: 'ÆLYA Consent', weeks: [5, 6], agent: 'Claude Code', status: 'planned', color: '#3D5E8C', tasks: ['Consent flow', 'RGPD module', 'Audit trail'], parallel: true },
  { id: 'S04', name: 'Certification CE', weeks: [7, 10], agent: 'Réglementaire', status: 'planned', color: '#9C3D3D', tasks: ['Dossier technique', 'Classe IIa', 'MDR 2017/745', 'Audit notifié'] },
];

const dataCategories = [
  { range: '01-10', label: 'Annuaires', desc: 'Professionnels de santé, psychiatres, cliniques' },
  { range: '11-20', label: 'Établissements', desc: 'Hôpitaux, CMP, cliniques privées' },
  { range: '21-30', label: 'Réglementaire', desc: 'MDR, RGPD, HDS, certification CE' },
  { range: '31-40', label: 'Épidémiologie', desc: 'Prévalence, incidence, cohortes' },
  { range: '41-50', label: 'Concurrence', desc: 'Startups e-santé mentale, benchmarks' },
  { range: '51-60', label: 'Investisseurs', desc: 'VCs santé, family offices, BPI' },
  { range: '61-70', label: 'KOLs', desc: 'Leaders d\'opinion, Pr. Bayle, sociétés savantes' },
  { range: '71-80', label: 'Publications', desc: 'SCID-5, DSM-5, méta-analyses' },
  { range: '81-90', label: 'Budget santé', desc: 'Dépenses ONDAM, remboursement, T2A' },
  { range: '91-100', label: 'Roadmap', desc: 'Milestones, certification, go-to-market' },
];

const teamMembers = [
  { id: 'N-01', name: 'Anamnèse', role: 'Collecte données patients', layer: 'L1' },
  { id: 'N-02', name: 'Nosologie', role: 'Classification DSM-5 / CIM-11', layer: 'L1' },
  { id: 'N-03', name: 'Psychométrie', role: 'Scoring & calibration', layer: 'L1' },
  { id: 'N-04', name: 'Epidémio', role: 'Données épidémiologiques', layer: 'L1' },
  { id: 'N-05', name: 'Pharmaco', role: 'Interactions médicamenteuses', layer: 'L1' },
  { id: 'N-06', name: 'Réglementaire', role: 'MDR / CE / HDS', layer: 'L1' },
  { id: 'N-07', name: 'KOL Tracker', role: 'Veille leaders d\'opinion', layer: 'L1' },
  { id: 'N-08', name: 'Publications', role: 'Corpus scientifique', layer: 'L1' },
  { id: 'N-09', name: 'Budget Santé', role: 'Financement & remboursement', layer: 'L1' },
  { id: 'N-10', name: 'Market Intel', role: 'Veille concurrentielle', layer: 'L1' },
  { id: 'N-SUP', name: 'Superviseur Neuro', role: 'Orchestration pôle', layer: 'L2' },
];

const pfeSlots = [
  { title: 'PFE Data Science', focus: 'Pipeline ML / calibration' },
  { title: 'PFE Rust Systems', focus: 'Optimisation engine' },
  { title: 'PFE React/UX', focus: 'Portails clinicien & patient' },
  { title: 'PFE Réglementaire', focus: 'Dossier CE Classe IIa' },
];

const bridges = [
  { entity: 'ÆLYA', color: '#3D5E8C', type: 'consent', desc: 'Consent patient RGPD', icon: Lock },
  { entity: 'BURHAN', color: '#1E0A20', type: 'audit', desc: 'Audit Tx 501', icon: FileCheck },
  { entity: 'MYNε', color: '#3D7C5E', type: 'data', desc: 'Données anonymisées', icon: Database },
  { entity: 'YrKnown', color: '#7B5EA7', type: 'knowledge', desc: 'Savoir Pr. Bayle', icon: BookOpen },
];

/* ─────────────────── COMPONENTS ─────────────────── */

function GaugeKPI({ label, value, target, unit, icon }: typeof gaugeKPIs[0]) {
  const pct = Math.min((value / target) * 100, 100);
  const isComplete = value >= target;
  return (
    <div className="flex-1 min-w-[140px] bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] p-3 relative overflow-hidden">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[#1E0A20]">{icon}</span>
        <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] tracking-[1px] uppercase">{label}</span>
      </div>
      <div className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold text-[#1E0A20] leading-none">
        {typeof value === 'number' && value >= 1000 ? value.toLocaleString('fr-FR') : value}{unit && <span className="text-[14px] text-[rgba(30,10,32,0.60)] ml-0.5">{unit}</span>}
      </div>
      <div className="text-[8px] font-[family-name:var(--font-jetbrains)] text-[rgba(30,10,32,0.60)] mt-0.5">/ {typeof target === 'number' && target >= 1000 ? target.toLocaleString('fr-FR') : target}{unit}</div>
      <div className="mt-2 h-[3px] bg-[rgba(30,10,32,0.06)] rounded-none-full overflow-hidden">
        <div
          className="h-full rounded-none-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: isComplete ? '#3D7C5E' : GOLD }}
        />
      </div>
    </div>
  );
}

function NOOSArchitecture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = container.offsetWidth;
    const H = 60;
    canvas.width = W;
    canvas.height = H;

    const nodeW = W / pipelineNodes.length;
    const particles: { x: number; y: number; speed: number; seg: number }[] = [];
    for (let i = 0; i < pipelineNodes.length - 1; i++) {
      for (let j = 0; j < 3; j++) {
        particles.push({
          x: nodeW * i + nodeW * 0.5 + Math.random() * nodeW * 0.3,
          y: H / 2 + (Math.random() - 0.5) * 8,
          speed: 0.3 + Math.random() * 0.4,
          seg: i,
        });
      }
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      // connection lines
      ctx.strokeStyle = 'rgba(30,10,32,0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < pipelineNodes.length - 1; i++) {
        const x1 = nodeW * i + nodeW * 0.75;
        const x2 = nodeW * (i + 1) + nodeW * 0.25;
        ctx.beginPath();
        ctx.moveTo(x1, H / 2);
        ctx.lineTo(x2, H / 2);
        ctx.stroke();
      }
      // particles
      for (const p of particles) {
        const segStart = nodeW * p.seg + nodeW * 0.75;
        const segEnd = nodeW * (p.seg + 1) + nodeW * 0.25;
        p.x += p.speed;
        if (p.x > segEnd) p.x = segStart;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,150,62,${0.4 + Math.random() * 0.3})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ height: 60 }} />
      <div className="flex items-center gap-0 relative z-10">
        {pipelineNodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <div className="flex-1 bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] p-3 text-center hover:shadow-md transition-shadow" style={{ borderTop: `2px solid ${node.color}` }}>
              <div className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold text-[#1E0A20] tracking-wide">{node.id}</div>
              <div className="font-[family-name:var(--font-noto)] text-[8px] text-[rgba(30,10,32,0.60)] mt-1">{node.tech}</div>
            </div>
            {i < pipelineNodes.length - 1 && (
              <ArrowRight size={12} className="text-[#1E0A20] flex-shrink-0 mx-1" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function NOOSSprints() {
  const [hovered, setHovered] = useState<string | null>(null);
  const totalWeeks = 10;

  const statusColors: Record<SprintStatus, string> = {
    done: '#3D7C5E',
    active: GOLD,
    planned: 'rgba(30,10,32,0.60)',
  };

  return (
    <div className="space-y-2">
      {sprints.map((s) => {
        const left = ((s.weeks[0] - 1) / totalWeeks) * 100;
        const width = ((s.weeks[1] - s.weeks[0] + 1) / totalWeeks) * 100;
        return (
          <div
            key={s.id}
            className="relative flex items-center gap-3"
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-[60px] font-[family-name:var(--font-jetbrains)] text-[9px] text-[rgba(30,10,32,0.60)] text-right flex-shrink-0">{s.id}</div>
            <div className="flex-1 h-[28px] bg-[rgba(60,52,40,0.04)] rounded-none relative overflow-hidden">
              <div
                className="absolute top-0 h-full rounded-none flex items-center px-2 transition-all duration-300"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: `${s.color}${s.status === 'planned' ? '33' : 'CC'}`,
                }}
              >
                <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-white truncate drop-shadow-sm">{s.name}</span>
              </div>
              {/* week markers */}
              {Array.from({ length: totalWeeks }, (_, i) => (
                <div key={i} className="absolute top-0 h-full border-l border-[rgba(60,52,40,0.06)]" style={{ left: `${(i / totalWeeks) * 100}%` }} />
              ))}
            </div>
            <div className="w-[80px] font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] flex-shrink-0">{s.agent}</div>
            {/* tooltip */}
            {hovered === s.id && (
              <div className="absolute left-[80px] top-full z-20 mt-1 bg-[#1E0A20] text-[#FAF8FC] p-3 rounded-none shadow-lg min-w-[200px]">
                <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#1E0A20] mb-2">{s.id} · Sem {s.weeks[0]}-{s.weeks[1]}</div>
                <ul className="space-y-1">
                  {s.tasks.map(t => (
                    <li key={t} className="font-[family-name:var(--font-noto)] text-[9px] flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-none-full" style={{ backgroundColor: s.color }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
      {/* week labels */}
      <div className="flex items-center gap-3">
        <div className="w-[60px]" />
        <div className="flex-1 flex">
          {Array.from({ length: totalWeeks }, (_, i) => (
            <div key={i} className="flex-1 text-center font-[family-name:var(--font-jetbrains)] text-[7px] text-[rgba(30,10,32,0.35)]">S{i + 1}</div>
          ))}
        </div>
        <div className="w-[80px]" />
      </div>
    </div>
  );
}

function DataCard({ range, label, desc }: { range: string; label: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] p-3 cursor-pointer hover:shadow-sm transition-all"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#1E0A20] font-bold">{range}</span>
          <span className="font-[family-name:var(--font-cormorant)] text-[14px] font-bold italic text-[#1E0A20]">{label}</span>
        </div>
        {open ? <ChevronDown size={12} className="text-[rgba(30,10,32,0.60)]" /> : <ChevronRight size={12} className="text-[rgba(30,10,32,0.60)]" />}
      </div>
      {open && (
        <div className="mt-2 pt-2 border-t border-[rgba(60,52,40,0.06)] font-[family-name:var(--font-noto)] text-[10px] text-[rgba(30,10,32,0.60)]">
          {desc}
          <div className="mt-2 flex gap-2">
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] px-1.5 py-0.5 bg-[rgba(30,10,32,0.06)] text-[#1E0A20] rounded-none">10 couches</span>
            <a href={`/noos`} className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#3D5E8C] hover:underline flex items-center gap-0.5">
              Explorer <ArrowRight size={8} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function BridgeLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {bridges.map(b => {
        const Icon = b.icon;
        return (
          <a
            key={b.entity}
            href={`/entity/${b.entity.toLowerCase().replace('ε', 'e')}`}
            className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] p-3 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            style={{ borderLeft: `3px solid ${b.color}` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Icon size={12} style={{ color: b.color }} />
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold tracking-wider text-[#1E0A20] uppercase">{b.entity}</span>
            </div>
            <div className="font-[family-name:var(--font-noto)] text-[9px] text-[rgba(30,10,32,0.60)]">{b.desc}</div>
            <div className="flex items-center gap-1 mt-2 font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] group-hover:text-[#1E0A20] transition-colors">
              <span className="uppercase">{b.type}</span>
              <ArrowRight size={8} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        );
      })}
    </div>
  );
}

/* ─────────────────── SECTION HELPER ─────────────────── */

function Section({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[#1E0A20]">{icon}</span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[22px] font-bold italic text-[#1E0A20]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function NOOSPage() {
  return (
    <div className="min-h-screen bg-[#F5F2F8]">
      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-[#1E0A20] to-[#2A3040] text-white px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="font-[family-name:var(--font-jetbrains)] text-[8px] tracking-[3px] text-[#1E0A20] mb-3">SUBSIDIAIRE EIGEN</div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[42px] font-bold italic flex items-center gap-4">
            <Brain size={32} strokeWidth={1} className="text-[#1E0A20]" />
            NOOS
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-[rgba(30,10,32,0.35)] mt-2 max-w-2xl">
            Psychiatrie de précision — Screening algorithmique SCID-5
          </p>

          {/* KPI bar */}
          <div className="flex flex-wrap gap-3 mt-8">
            {gaugeKPIs.map(kpi => (
              <GaugeKPI key={kpi.label} {...kpi} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-8 pb-16">

        {/* Architecture */}
        <Section id="architecture" title="Architecture Pipeline" icon={<Cpu size={18} />}>
          <NOOSArchitecture />
        </Section>

        {/* Sprints */}
        <Section id="sprints" title="Sprints & Roadmap" icon={<Zap size={18} />}>
          <div className="flex gap-4 mb-4 flex-wrap">
            {[
              { color: '#3D7C5E', label: 'Done' },
              { color: GOLD, label: 'En cours' },
              { color: 'rgba(30,10,32,0.60)', label: 'Planifié' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-none-sm" style={{ backgroundColor: l.color }} />
                <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">{l.label}</span>
              </div>
            ))}
          </div>
          <NOOSSprints />
        </Section>

        {/* Données */}
        <Section id="donnees" title="Données — 10 Macro-catégories" icon={<Database size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {dataCategories.map(c => (
              <DataCard key={c.range} {...c} />
            ))}
          </div>
        </Section>

        {/* Équipe */}
        <Section id="equipe" title="Équipe — Pôle Neurosciences" icon={<Users size={18} />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {teamMembers.map(m => (
              <div
                key={m.id}
                className="bg-[#FAF8FC] border border-[rgba(30,10,32,0.08)] p-3"
                style={{ borderLeft: `3px solid ${m.layer === 'L2' ? '#3D5E8C' : GOLD}` }}
              >
                <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] tracking-wider mb-1">{m.id} · {m.layer}</div>
                <div className="font-[family-name:var(--font-cormorant)] text-[13px] font-bold italic text-[#1E0A20]">{m.name}</div>
                <div className="font-[family-name:var(--font-noto)] text-[9px] text-[rgba(30,10,32,0.60)] mt-0.5">{m.role}</div>
              </div>
            ))}
          </div>
          {/* PFE slots */}
          <div className="mt-4">
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)] tracking-[2px] uppercase mb-2">Postes PFE à recruter</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {pfeSlots.map(p => (
                <div key={p.title} className="bg-[rgba(184,150,62,0.06)] border border-dashed border-[rgba(30,10,32,0.12)] p-3">
                  <div className="font-[family-name:var(--font-cormorant)] text-[12px] font-bold italic text-[#1E0A20]">{p.title}</div>
                  <div className="font-[family-name:var(--font-noto)] text-[9px] text-[rgba(30,10,32,0.60)] mt-0.5">{p.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Ponts */}
        <Section id="ponts" title="Ponts Inter-Entités" icon={<ArrowRight size={18} />}>
          <BridgeLinks />
        </Section>
      </div>
    </div>
  );
}

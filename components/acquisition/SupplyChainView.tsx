'use client';

import { useState, useEffect, useMemo } from 'react';
import { C, GR, MN, SN, wrap, BRICKS } from './shared/constants';
import { StatCard } from './shared/StatCard';
import { Pill } from './shared/Pill';
import { fetchSupplyChain } from '@/lib/acquisition/api';
import type { SupplyChain } from '@/lib/acquisition/types';

/* ────── SECTOR CONFIG ────── */
const SECTOR_LABELS: Record<string, { label: string; color: string }> = {
  'Télécom':       { label: 'Telecom',        color: '#3D5E8C' },
  'Banque':        { label: 'Banque',          color: '#6E2A3D' },
  'Assurance':     { label: 'Assurance',       color: '#9C3D3D' },
  'Énergie':       { label: 'Energie',         color: '#B8963E' },
  'Pharma':        { label: 'Pharma',          color: '#3D7C5E' },
  'BTP':           { label: 'BTP/Infra',       color: '#B87D3E' },
  'INDUSTRIE':     { label: 'Industrie',       color: '#918977' },
  'TECH/FINTECH':  { label: 'Tech/Fintech',    color: '#7B5EA7' },
  'CONSEIL/AUDIT': { label: 'Conseil/Audit',   color: '#3D7C8C' },
  'LOGISTIQUE':    { label: 'Logistique',      color: '#5E6E3D' },
  'LUXE/RETAIL':   { label: 'Luxe/Retail',     color: '#9C3D5E' },
  'DFI':           { label: 'DFI/Institution', color: '#3D5E8C' },
  'MINES':         { label: 'Mines',           color: '#6B5E4C' },
};

const TIER_COLORS = ['#1E3A5F', '#2E5E8C', '#4A7AB5', '#7CA0D4', '#A8C4E8'];
const TIER_WIDTHS = ['15%', '35%', '55%', '75%', '100%'];

function brickPillColor(name: string): string {
  const map: Record<string, string> = { NOOS: C.noos, AELYA: C.aelya, 'MYNe': C.myne, BURHAN: C.burhan, YrKnown: C.yrknown, MIZAN: C.mizan, RAQIB: C.raqib };
  return map[name] || C.stone;
}

function parseBriques(str: string): string[] {
  const map: Record<string, string> = { N: 'NOOS', A: 'AELYA', M: 'MYNe', B: 'BURHAN', Y: 'YrKnown', Z: 'MIZAN', R: 'RAQIB' };
  return str.split('').filter(c => map[c]).map(c => map[c]);
}

export default function SupplyChainView() {
  const [chains, setChains] = useState<SupplyChain[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  useEffect(() => {
    fetchSupplyChain()
      .then(d => { setChains(d); })
      .catch(() => setChains([]))
      .finally(() => setLoading(false));
  }, []);

  // Group by sector
  const bySector = useMemo(() => {
    const map = new Map<string, SupplyChain[]>();
    chains.forEach(c => {
      const s = c.sector || 'Autre';
      if (!map.has(s)) map.set(s, []);
      map.get(s)!.push(c);
    });
    return map;
  }, [chains]);

  const sectors = useMemo(() => Array.from(bySector.keys()).sort(), [bySector]);

  // Auto-select first sector
  useEffect(() => {
    if (sectors.length > 0 && !selectedSector) setSelectedSector(sectors[0]);
  }, [sectors, selectedSector]);

  // Current companies for selected sector
  const sectorCompanies = selectedSector ? (bySector.get(selectedSector) || []) : [];

  // Auto-select first company in sector
  useEffect(() => {
    if (sectorCompanies.length > 0) {
      if (!selectedCompany || !sectorCompanies.find(c => c.company_id === selectedCompany)) {
        setSelectedCompany(sectorCompanies[0].company_id);
      }
    }
  }, [sectorCompanies, selectedCompany]);

  const chain = sectorCompanies.find(c => c.company_id === selectedCompany) || null;
  const sectorTheme = SECTOR_LABELS[selectedSector || ''] || { label: selectedSector || '', color: C.stone };

  // Totals across ALL chains
  const totalChains = chains.length;

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement supply chain...</div>;

  if (chains.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>Aucune donnee supply chain</div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      {/* Global header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: GR, fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: C.t1 }}>
          Supply Chain Intelligence
        </span>
        <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 1 }}>
          {totalChains} CHAINES · {sectors.length} SECTEURS · 500 TIERS
        </span>
      </div>

      {/* Sector tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, flexWrap: 'wrap' }}>
        {sectors.map(s => {
          const theme = SECTOR_LABELS[s] || { label: s, color: C.stone };
          const active = selectedSector === s;
          const count = bySector.get(s)?.length || 0;
          return (
            <button
              key={s}
              onClick={() => { setSelectedSector(s); setSelectedCompany(null); }}
              style={{
                border: active ? `2px solid ${theme.color}` : `1px solid ${C.div}`,
                background: active ? `${theme.color}18` : C.ivory,
                borderRadius: 3,
                padding: '5px 10px',
                cursor: 'pointer',
                fontFamily: MN,
                fontSize: 9,
                fontWeight: active ? 700 : 400,
                color: active ? theme.color : C.t2,
                letterSpacing: 0.5,
                transition: 'all 0.15s',
              }}
            >
              {theme.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Company selector within sector */}
      {sectorCompanies.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
          {sectorCompanies.map(ch => {
            const active = ch.company_id === selectedCompany;
            return (
              <button
                key={ch.company_id}
                onClick={() => setSelectedCompany(ch.company_id)}
                style={{
                  border: active ? `2px solid ${sectorTheme.color}` : `1px solid ${C.div}`,
                  background: active ? `${sectorTheme.color}15` : C.ivory,
                  borderRadius: 3,
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontFamily: GR,
                  fontSize: 11,
                  fontWeight: active ? 700 : 400,
                  fontStyle: 'italic',
                  color: active ? sectorTheme.color : C.t2,
                  transition: 'all 0.15s',
                }}
              >
                {ch.company_name}
              </button>
            );
          })}
        </div>
      )}

      {/* Selected chain detail */}
      {chain && (
        <>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: GR, fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: sectorTheme.color }}>
                {chain.company_name}
              </span>
              <span style={{ fontFamily: MN, fontSize: 9, color: C.t3, letterSpacing: 1 }}>
                {chain.sector}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 6 }}>
              <span style={{ fontFamily: MN, fontSize: 11, fontWeight: 700, color: C.t1 }}>
                {chain.total_nodes} noeuds
              </span>
              <span style={{ fontFamily: MN, fontSize: 11, fontWeight: 700, color: C.gold }}>
                {chain.total_revenue}
              </span>
            </div>
          </div>

          {/* Inverted pyramid cascade */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 24 }}>
            {chain.tiers.map((tier, idx) => {
              const tierColor = TIER_COLORS[Math.min(idx, 4)];
              const width = TIER_WIDTHS[Math.min(idx, 4)];
              const briques = parseBriques(tier.eigen_briques || '');

              return (
                <div
                  key={tier.id || idx}
                  style={{
                    width,
                    background: `${tierColor}14`,
                    border: `1px solid ${tierColor}4D`,
                    borderRadius: 3,
                    padding: '10px 14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: GR, fontWeight: 700, fontStyle: 'italic', fontSize: 12, color: tierColor }}>
                        Tier {tier.tier} — {tier.tier_name}
                      </div>
                      <div style={{ fontFamily: SN, fontSize: 8, color: C.t3, marginTop: 1 }}>
                        {tier.tier_type}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: MN, fontWeight: 700, fontSize: 10, color: tierColor }}>
                        {tier.count_entities}
                      </div>
                    </div>
                  </div>

                  {tier.examples && (
                    <div style={{ fontFamily: SN, fontSize: 8, color: C.t2, marginTop: 4, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                      {tier.examples}
                    </div>
                  )}

                  {tier.legal_force && (
                    <div style={{ fontFamily: SN, fontSize: 8, fontStyle: 'italic', color: C.ruby, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const }}>
                      {tier.legal_force}
                    </div>
                  )}

                  {briques.length > 0 && (
                    <div style={{ display: 'flex', gap: 3, marginTop: 4, flexWrap: 'wrap' }}>
                      {briques.map(b => (
                        <Pill key={b} label={b} color={brickPillColor(b)} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <StatCard label="Total noeuds" value={chain.total_nodes || '—'} color={sectorTheme.color} />
            <StatCard label="Revenue Eigen" value={chain.total_revenue || '—'} color={C.gold} />
            <StatCard label="CAC par noeud" value="~0" sub="Forcage legal = 0 CAC" color={C.emerald} />
          </div>

          {/* Prescriptor effect */}
          {chain.prescriptor_effect && (
            <div style={{
              background: `${sectorTheme.color}0C`,
              border: `1px solid ${sectorTheme.color}26`,
              borderRadius: 3,
              padding: '10px 14px',
              marginBottom: 12,
            }}>
              <div style={{ fontFamily: MN, fontSize: 7, letterSpacing: 1.5, textTransform: 'uppercase', color: C.t3, marginBottom: 4 }}>
                EFFET PRESCRIPTEUR
              </div>
              <div style={{ fontFamily: SN, fontSize: 10, color: C.t1, lineHeight: 1.5 }}>
                {chain.prescriptor_effect}
              </div>
            </div>
          )}

          {/* Killer insight */}
          {chain.killer_insight && (
            <div style={{
              background: `${C.gold}0F`,
              border: `1px solid ${C.gold}33`,
              borderRadius: 3,
              padding: '10px 14px',
            }}>
              <div style={{ fontFamily: MN, fontSize: 7, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold, marginBottom: 4 }}>
                KILLER INSIGHT
              </div>
              <div style={{ fontFamily: GR, fontStyle: 'italic', fontSize: 12, color: C.gold, lineHeight: 1.5 }}>
                {chain.killer_insight}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

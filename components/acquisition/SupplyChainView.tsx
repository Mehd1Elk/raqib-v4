'use client';

import { useState, useEffect } from 'react';
import { C, GR, MN, SN, wrap, BRICKS } from './shared/constants';
import { StatCard } from './shared/StatCard';
import { Pill } from './shared/Pill';
import { fetchSupplyChain } from '@/lib/acquisition/api';
import type { SupplyChain } from '@/lib/acquisition/types';

const COMPANY_THEMES: Record<string, { color: string; label: string }> = {
  TotalEnergies: { color: C.gold, label: 'TotalEnergies' },
  'BNP Paribas': { color: C.sapphire, label: 'BNP Paribas' },
  Sanofi: { color: C.noos, label: 'Sanofi' },
  Siemens: { color: C.yrknown, label: 'Siemens' },
  AXA: { color: C.ruby, label: 'AXA' },
};

const TIER_COLORS = ['#1E3A5F', '#2E5E8C', '#4A7AB5', '#7CA0D4', '#A8C4E8'];
const TIER_WIDTHS = ['15%', '35%', '55%', '75%', '100%'];

const INSIGHTS: Record<string, string> = {
  TotalEnergies: '1 signature = Eigen dans toute l\'industrie energetique',
  'BNP Paribas': 'Les ESN propagent Eigen de banque en banque — effet virus via Accenture/Capgemini',
  Sanofi: 'IQVIA utilise AELYA pour Sanofi puis pour 500 autres pharmas',
  Siemens: 'Le Mittelstand allemand entier via Kienbaum — 500+ clients GE',
  AXA: '30K courtiers propagent Eigen a TOUS les assureurs qu\'ils representent',
};

const LEGAL_FORCE_MAIN: Record<string, string> = {
  TotalEnergies: 'CS3D',
  'BNP Paribas': 'DORA',
  Sanofi: 'EU FMD',
  Siemens: 'LkSG',
  AXA: 'DDA',
};

function brickColor(key: string): string {
  return BRICKS.find(b => b.key === key)?.c || C.stone;
}

function parseBriques(str: string): string[] {
  const map: Record<string, string> = { N: 'NOOS', A: 'AELYA', M: 'MYNe', B: 'BURHAN', Y: 'YrKnown', Z: 'MIZAN', R: 'RAQIB' };
  return str.split('').filter(c => map[c]).map(c => map[c]);
}

function brickPillColor(name: string): string {
  const map: Record<string, string> = { NOOS: C.noos, AELYA: C.aelya, 'MYNe': C.myne, BURHAN: C.burhan, YrKnown: C.yrknown, MIZAN: C.mizan, RAQIB: C.raqib };
  return map[name] || C.stone;
}

export default function SupplyChainView() {
  const [chains, setChains] = useState<SupplyChain[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetchSupplyChain()
      .then(d => { setChains(d); })
      .catch(() => setChains([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ ...wrap, fontFamily: MN, fontSize: 10, color: C.t3 }}>Chargement supply chain...</div>;

  if (chains.length === 0) {
    return (
      <div style={{ ...wrap, textAlign: 'center' }}>
        <div style={{ fontFamily: GR, fontSize: 16, fontStyle: 'italic', color: C.t2, marginBottom: 8 }}>Aucune donnee supply chain</div>
        <div style={{ fontFamily: SN, fontSize: 11, color: C.t3 }}>Les 5 chaines de valeur seront seedees prochainement.</div>
      </div>
    );
  }

  const chain = chains[selected];
  const companyName = chain?.company_name || '';
  const theme = COMPANY_THEMES[companyName] || { color: C.gold, label: companyName };

  // Order companies for buttons
  const orderedNames = ['TotalEnergies', 'BNP Paribas', 'Sanofi', 'Siemens', 'AXA'];
  const orderedChains = orderedNames.map(name => chains.find(c => c.company_name.includes(name))).filter(Boolean) as SupplyChain[];
  // If ordering found nothing, fallback to original
  const displayChains = orderedChains.length > 0 ? orderedChains : chains;

  return (
    <div style={wrap}>
      {/* Company selector buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {displayChains.map((ch, i) => {
          const t = COMPANY_THEMES[ch.company_name] || { color: C.gold, label: ch.company_name };
          const active = chains[selected]?.company_id === ch.company_id;
          return (
            <button
              key={ch.company_id}
              onClick={() => setSelected(chains.findIndex(c => c.company_id === ch.company_id))}
              style={{
                border: active ? `2px solid ${t.color}` : `1px solid ${C.div}`,
                background: active ? `${t.color}15` : C.ivory,
                borderRadius: 3,
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: GR,
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                fontStyle: 'italic',
                color: active ? t.color : C.t2,
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {chain && (
        <>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: GR, fontSize: 22, fontWeight: 700, fontStyle: 'italic', color: theme.color }}>
                {companyName}
              </span>
              <span style={{ fontFamily: MN, fontSize: 10, color: C.t3 }}>
                SUPPLY CHAIN
              </span>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
              <span style={{ fontFamily: MN, fontSize: 11, fontWeight: 700, color: C.t1 }}>
                {chain.total_nodes} noeuds
              </span>
              <span style={{ fontFamily: MN, fontSize: 11, fontWeight: 700, color: C.gold }}>
                {chain.total_revenue}
              </span>
            </div>
          </div>

          {/* Inverted pyramid cascade */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 32 }}>
            {chain.tiers.map((tier, idx) => {
              const tierColor = TIER_COLORS[Math.min(idx, 4)];
              const width = TIER_WIDTHS[Math.min(idx, 4)];
              const briques = parseBriques(tier.eigen_briques);

              return (
                <div
                  key={tier.id || idx}
                  style={{
                    width,
                    background: `${tierColor}14`,
                    border: `1px solid ${tierColor}4D`,
                    borderRadius: 3,
                    padding: '12px 16px',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Top row: name + count/revenue */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: GR, fontWeight: 700, fontStyle: 'italic', fontSize: 13, color: tierColor }}>
                        {tier.tier_name}
                      </div>
                      <div style={{ fontFamily: SN, fontSize: 9, color: C.t3, marginTop: 2 }}>
                        {tier.tier_type}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: MN, fontWeight: 700, fontSize: 11, color: tierColor }}>
                        {tier.count_entities}
                      </div>
                      {tier.eigen_revenue && (
                        <div style={{ fontFamily: MN, fontSize: 10, color: C.gold }}>
                          {tier.eigen_revenue}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Examples */}
                  {tier.examples && (
                    <div style={{ fontFamily: SN, fontSize: 9, color: C.t2, marginTop: 6, lineHeight: 1.4 }}>
                      {tier.examples}
                    </div>
                  )}

                  {/* Legal force */}
                  {tier.legal_force && (
                    <div style={{ fontFamily: SN, fontSize: 9, fontStyle: 'italic', color: C.ruby, marginTop: 4 }}>
                      {tier.legal_force}
                    </div>
                  )}

                  {/* Brique pills */}
                  <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                    {briques.map(b => (
                      <Pill key={b} label={b} color={brickPillColor(b)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <StatCard label="Total noeuds" value={chain.total_nodes} color={theme.color} />
            <StatCard label="CAC par noeud" value="~0" sub="Forcage legal = 0 CAC" color={C.emerald} />
            <StatCard label="Forcage legal" value={LEGAL_FORCE_MAIN[companyName] || 'CS3D'} sub="Obligation reglementaire" color={C.ruby} />
          </div>

          {/* Insight box */}
          <div style={{
            background: `${C.gold}0F`,
            border: `1px solid ${C.gold}33`,
            borderRadius: 3,
            padding: '12px 16px',
          }}>
            <div style={{ fontFamily: GR, fontStyle: 'italic', fontSize: 12, color: C.gold, lineHeight: 1.5 }}>
              {INSIGHTS[companyName] || ''}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

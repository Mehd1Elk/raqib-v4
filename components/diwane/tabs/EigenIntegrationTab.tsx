'use client';

import type { ArtCountry } from '@/lib/diwane/types';

const HERMES = {
  camel: '#C19A6B',
  orange: '#E8600A',
  orangeBg: 'rgba(232,96,10,0.12)',
  brown: '#3C2415',
};

const BRICK_COLORS: Record<string, { bg: string; fg: string; border: string }> = {
  noos:     { bg: 'rgba(91,110,168,0.08)', fg: '#5B6EA8', border: '#5B6EA8' },
  aelya:    { bg: 'rgba(142,68,173,0.08)', fg: '#8E44AD', border: '#8E44AD' },
  myne:     { bg: 'rgba(232,96,10,0.08)',  fg: '#E8600A', border: '#E8600A' },
  burhan:   { bg: 'rgba(184,150,62,0.08)', fg: '#B8963E', border: '#B8963E' },
  yrknown:  { bg: 'rgba(211,84,0,0.08)',   fg: '#D35400', border: '#D35400' },
  diwane:   { bg: 'rgba(110,42,61,0.08)',   fg: '#6E2A3D', border: '#6E2A3D' },
  alguesov: { bg: 'rgba(0,128,128,0.08)',   fg: '#008080', border: '#008080' },
};

const STATUS_LABELS: Record<string, { bg: string; fg: string }> = {
  active:  { bg: 'rgba(74,124,89,0.12)', fg: '#4A7C59' },
  beta:    { bg: 'rgba(184,150,62,0.12)', fg: '#B8963E' },
  planned: { bg: 'rgba(145,137,119,0.12)', fg: '#918977' },
};

interface Props { country: ArtCountry }

const DEFAULT_BRICKS = [
  { id: 'noos', name: 'NOOS', artApplication: 'Scoring IA & expertise visuelle CNN/ViT pour authenticité, attribution, datation', features: ['Analyse stylistique IA', 'Comparaison base de données', 'Rapport expertise automatisé', 'Détection anomalies'], status: 'active' as const },
  { id: 'aelya', name: 'AELYA', artApplication: 'Consentement & données personnelles collectionneurs, RGPD art market', features: ['Consentement collectionneur', 'Anonymisation provenance', 'Droit à l\'oubli', 'Audit trail RGPD'], status: 'active' as const },
  { id: 'myne', name: 'MYNε', artApplication: 'Catalogue raisonné digital, provenance chain, pricing intelligence', features: ['Catalogue raisonné', 'Chaîne de provenance', 'Cotes temps réel', 'Alerte marché'], status: 'active' as const },
  { id: 'burhan', name: 'BURHAN', artApplication: 'Certificat authenticité blockchain, traçabilité on-chain, NFT certificat', features: ['Certificat hashé Tx 506', 'Provenance immuable', 'Smart contract vente', 'Interop ISCC'], status: 'active' as const },
  { id: 'yrknown', name: 'YrKnown', artApplication: 'Savoir-faire artisanal : zellige, poterie, tissage — LoRA expertise tacite', features: ['LoRA artisans', 'Techniques anciennes', 'Patrimoine immatériel', 'Formation apprentis'], status: 'beta' as const },
  { id: 'diwane', name: 'DIWANE', artApplication: 'Crédit Lombard art-backed, valorisation portefeuille, gestion collection', features: ['Scoring collatéral', 'LTV dynamique', 'Portfolio analytics', 'Rapport bancaire'], status: 'active' as const },
  { id: 'alguesov', name: 'AlgueSov', artApplication: 'Traçabilité pigments naturels, matériaux artistiques, sourcing durable', features: ['Traçabilité pigments', 'Certificat origine', 'Impact carbone', 'Label artisan'], status: 'planned' as const },
];

export function EigenIntegrationTab({ country: c }: Props) {
  const bricks = c.eigenBricks && c.eigenBricks.length > 0 ? c.eigenBricks : DEFAULT_BRICKS;

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-playfair)', color: HERMES.orange, fontSize: '1.15rem', marginBottom: 4 }}>
          Briques EIGEN appliquées au marché de l&apos;art
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted, #918977)', margin: 0 }}>
          7 modules souverains interconnectés pour la souveraineté artistique et la finance de l&apos;art.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {bricks.map((brick, i) => {
          const bc = BRICK_COLORS[brick.id] || { bg: HERMES.orangeBg, fg: HERMES.orange, border: HERMES.camel };
          const sc = STATUS_LABELS[brick.status || 'active'] || STATUS_LABELS.active;

          return (
            <div key={i} style={{
              border: `1px solid ${bc.border}`,
              borderLeft: `3px solid ${bc.border}`,
              borderRadius: 0,
              padding: 16,
              background: bc.bg,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: bc.fg,
                }}>{brick.name}</div>
                <span style={{
                  background: sc.bg,
                  color: sc.fg,
                  padding: '2px 8px',
                  borderRadius: 0,
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}>{brick.status || 'active'}</span>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text, #2A2318)', lineHeight: 1.5, marginBottom: 10 }}>
                {brick.artApplication}
              </div>

              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {brick.features.map((f, j) => (
                  <span key={j} style={{
                    background: `${bc.fg}14`,
                    color: bc.fg,
                    padding: '2px 8px',
                    borderRadius: 0,
                    fontSize: '0.63rem',
                    fontWeight: 500,
                  }}>{f}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

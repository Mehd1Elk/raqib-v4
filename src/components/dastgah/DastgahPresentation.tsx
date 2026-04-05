'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Eye, Layers, Camera, Scale, Cpu, Shield } from 'lucide-react';

/* ═══════════════════════════════════════════════
   DASTGAH — Presentation Module
   ═══════════════════════════════════════════════ */

const D = {
  bg: '#D60000',
  r1: '#AA0000', r2: '#BB0000', r3: '#CC0000', r4: '#DD0000',
  r5: '#EE4444', r6: '#FF7777', r7: '#FFA5A5',
  w: '#FFFFFF', wS: 'rgba(255,255,255,0.72)', wD: 'rgba(255,255,255,0.45)',
  fT: "'Cormorant Garamond',Georgia,serif",
  fB: "'DM Sans',system-ui,sans-serif",
  fM: "'JetBrains Mono',monospace",
} as const;

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      id={id}
      style={{
        opacity: 0,
        transform: 'translateY(32px)',
        transition: 'opacity 1s cubic-bezier(.23,1,.32,1), transform 1s cubic-bezier(.23,1,.32,1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: D.fM, fontSize: '9px', letterSpacing: '0.12em',
      textTransform: 'uppercase', color: D.r7, lineHeight: 1,
    }}>
      {text}
    </span>
  );
}

function SectionTitle({ text }: { text: string }) {
  return (
    <h2 style={{
      fontFamily: D.fT, fontSize: '28px', fontWeight: 400,
      color: D.w, margin: 0, lineHeight: 1.15,
    }}>
      {text}
    </h2>
  );
}

function Card({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      background: bg || D.r1,
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}>
      {children}
    </div>
  );
}

/* ── Data ── */

const CONNECTORS = [
  'Spotify', 'Apple Photos', 'Kindle', 'Goodreads', 'Letterboxd', 'Pinterest'
];

const EXTRACTION = [
  'Vision IA', 'OCR', 'Reverse Search', 'EXIF', 'Clustering'
];

const PIPELINE_STEPS = [
  { label: 'Sources', desc: 'Connecteurs bruts' },
  { label: 'Extraction', desc: 'Semantique IA' },
  { label: 'Qualification', desc: 'Validation user' },
  { label: 'Vestibule', desc: 'Staging zone' },
  { label: 'Dastgah', desc: 'Graphe final' },
];

const PHOTO_PATTERNS = [
  { motif: 'Espaces rouges immersifs', count: '12 occurrences', period: '2021 \u2192 2024' },
  { motif: 'Tranches de livres', count: '152 titres identifies', period: 'Bibliotheque complete' },
  { motif: 'Citations capturees', count: 'Screenshots 2h\u20134h du matin', period: 'Fragments nocturnes' },
];

const PARADIGMS = [
  {
    title: "Economie de l'influence",
    signal: 'Signal implicite',
    thesis: 'Ta singularite est un bruit a filtrer.',
    color: D.r1,
  },
  {
    title: "Economie de l'intention",
    signal: 'Signal explicite',
    thesis: 'Ta singularite a une valeur marchande.',
    color: D.r2,
  },
  {
    title: "Economie de l'authenticite",
    signal: 'Signal comportemental + intentionnel + temporel',
    thesis: 'Ta singularite est le signal a valoriser.',
    color: D.r3,
  },
];

const AUTHENTICITY_EFFECTS = [
  { name: 'Visibilite reflexive', desc: 'Voir le pattern que vos choix dessinent dans le temps.' },
  { name: 'Resistance a la convergence', desc: 'Preserver ce qui vous distingue face a la pression algorithmique.' },
  { name: 'Dignite du producteur', desc: 'Redonner la valeur au createur de gout, pas au curateur de masse.' },
];

const EIGEN_BRICKS = [
  { code: 'MYN\u03b5', name: 'Graphe relationnel', role: 'Structure les connexions entre objets culturels.' },
  { code: 'AELYA', name: 'Consentement connecteurs', role: 'Gere les autorisations et flux de donnees sources.' },
  { code: 'BURHAN', name: 'Audit trail provenance', role: 'Trace et certifie l\'origine de chaque objet ingere.' },
  { code: 'YrKnown', name: 'Tacite \u2192 Structure', role: 'Transforme le savoir implicite en donnees exploitables.' },
  { code: 'NOOS', name: 'Lectures croisees', role: 'Connecte les interpretations entre domaines culturels.' },
  { code: 'RAQIB', name: 'Metriques miroir', role: 'Mesure l\'identite culturelle via des indicateurs reflexifs.' },
  { code: 'MIZAN', name: 'Transactionnel', role: 'Gere la couche economique et les echanges de valeur.' },
];

const MOATS = [
  { icon: Layers, name: 'Data Moat', desc: 'Profondeur historique. Chaque jour ajoute du signal impossible a repliquer.' },
  { icon: Cpu, name: 'Model Moat', desc: 'Flywheel d\'apprentissage. Plus l\'utilisateur valide, plus le modele affine.' },
  { icon: Shield, name: 'Emotional Moat', desc: 'Attachement au moment de revelation. L\'experience est irreproductible.' },
];

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

export default function DastgahPresentation() {
  return (
    <div style={{
      background: D.bg,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '64px',
      padding: '48px 32px',
      borderRadius: '16px',
      fontFamily: D.fB,
      color: D.w,
      boxSizing: 'border-box',
    }}>

      {/* ══════ SECTION 1 — THESE ══════ */}
      <Section id="these">
        <SectionLabel text="01 \u2014 These" />
        <div style={{
          fontFamily: D.fT, fontSize: '36px', fontWeight: 400,
          color: D.w, lineHeight: 1.2, maxWidth: '640px',
          fontStyle: 'italic',
        }}>
          Le gout est une architecture.
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px',
        }}>
          {[
            {
              title: 'Capital cognitif visible',
              desc: 'Transformer une sensibilite dispersee en structure lisible et valorisable.',
            },
            {
              title: 'Beaute + Graphe + IA',
              desc: 'Allier curation esthetique, graphe relationnel et interpretation par intelligence artificielle.',
            },
            {
              title: 'Monde interieur revele',
              desc: 'Voir le monde interieur que vos choix dessinent, rendu visible pour la premiere fois.',
            },
          ].map((item, i) => (
            <Card key={i} bg={D.r1}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Eye size={14} color={D.r7} />
                </div>
                <span style={{
                  fontFamily: D.fM, fontSize: '11px', color: D.r7,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  {item.title}
                </span>
              </div>
              <span style={{
                fontFamily: D.fB, fontSize: '13px', color: D.wS, lineHeight: 1.5,
              }}>
                {item.desc}
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* ══════ SECTION 2 — ARCHITECTURE D'INGESTION ══════ */}
      <Section id="ingestion">
        <SectionLabel text="02 \u2014 Architecture d'ingestion" />
        <SectionTitle text="Trois couches, un flux" />

        {/* 3 couches */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '1', title: 'Connecteurs bruts', items: CONNECTORS },
            { num: '2', title: 'Extraction semantique', items: EXTRACTION },
            { num: '3', title: 'Qualification assistee', items: ['Pre-remplissage IA', 'Validation utilisateur'] },
          ].map((layer, i) => (
            <div key={i} style={{
              background: D.r1, borderRadius: '12px', padding: '20px',
              display: 'flex', flexDirection: 'column', gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontFamily: D.fM, fontSize: '10px', color: D.bg,
                  background: D.r7, borderRadius: '6px', padding: '3px 8px',
                  fontWeight: 600,
                }}>
                  {layer.num}
                </span>
                <span style={{
                  fontFamily: D.fM, fontSize: '11px', color: D.w,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {layer.title}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {layer.items.map((item, j) => (
                  <span key={j} style={{
                    fontFamily: D.fB, fontSize: '11px', color: D.wS,
                    background: 'rgba(255,255,255,0.08)', borderRadius: '8px',
                    padding: '5px 12px',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline visuel */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          overflowX: 'auto', paddingBottom: '4px',
        }}>
          {PIPELINE_STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <div style={{
                background: D.r1, borderRadius: '10px', padding: '14px 18px',
                display: 'flex', flexDirection: 'column', gap: '4px',
                minWidth: '110px', textAlign: 'center',
              }}>
                <span style={{ fontFamily: D.fM, fontSize: '10px', color: D.r7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {step.label}
                </span>
                <span style={{ fontFamily: D.fB, fontSize: '10px', color: D.wD }}>
                  {step.desc}
                </span>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <span style={{ fontFamily: D.fM, fontSize: '16px', color: D.r5, flexShrink: 0 }}>
                  \u2192
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* ══════ SECTION 3 — BIBLIOTHEQUE PHOTOGRAPHIEE ══════ */}
      <Section id="bibliotheque">
        <SectionLabel text="03 \u2014 Bibliotheque photographiee" />
        <SectionTitle text="Le moment de revelation" />

        <div style={{
          fontFamily: D.fB, fontSize: '13px', color: D.wS, lineHeight: 1.6,
          maxWidth: '560px',
        }}>
          Pipeline en 4 passes : tri signal/bruit, extraction semantique,
          clustering temporel, presentation et validation.
          Les photos d'espaces rouges sur 3 ans sont regroupees par resonance,
          pas par date.
        </div>

        {/* Passes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['Tri signal/bruit', 'Extraction semantique', 'Clustering temporel', 'Presentation/Validation'].map((pass, i) => (
            <div key={i} style={{
              fontFamily: D.fM, fontSize: '10px', color: D.w,
              background: D.r2, borderRadius: '8px', padding: '8px 16px',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.12)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px', color: D.r7,
              }}>
                {i + 1}
              </span>
              {pass}
            </div>
          ))}
        </div>

        {/* Mockup motifs detectes */}
        <div style={{
          background: D.r1, borderRadius: '12px', padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Camera size={14} color={D.r7} />
            <span style={{
              fontFamily: D.fM, fontSize: '9px', color: D.r7,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              Motifs detectes
            </span>
          </div>
          {PHOTO_PATTERNS.map((p, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
              borderRadius: '8px', borderLeft: `3px solid ${D.r5}`,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: D.fB, fontSize: '13px', color: D.w }}>
                  {p.motif}
                </span>
                <span style={{ fontFamily: D.fB, fontSize: '11px', color: D.wD }}>
                  {p.count}
                </span>
              </div>
              <span style={{
                fontFamily: D.fM, fontSize: '9px', color: D.r6,
                background: 'rgba(255,255,255,0.06)', borderRadius: '6px',
                padding: '4px 10px', whiteSpace: 'nowrap',
              }}>
                {p.period}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════ SECTION 4 — PARADIGME ══════ */}
      <Section id="paradigme">
        <SectionLabel text="04 \u2014 Paradigme" />
        <SectionTitle text="Trois economies du signal" />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {PARADIGMS.map((p, i) => (
            <div key={i} style={{
              flex: '1 1 220px', background: p.color, borderRadius: '12px',
              padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px',
              borderTop: `3px solid ${D.r5}`,
            }}>
              <span style={{
                fontFamily: D.fM, fontSize: '9px', color: D.r7,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                {p.signal}
              </span>
              <span style={{
                fontFamily: D.fT, fontSize: '18px', color: D.w, fontWeight: 400,
                lineHeight: 1.25,
              }}>
                {p.title}
              </span>
              <span style={{
                fontFamily: D.fB, fontSize: '13px', color: D.wS, lineHeight: 1.5,
                fontStyle: 'italic',
              }}>
                &laquo; {p.thesis} &raquo;
              </span>
            </div>
          ))}
        </div>

        {/* 3 effets authenticite */}
        <div style={{
          background: D.r1, borderRadius: '12px', padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '14px',
        }}>
          <span style={{
            fontFamily: D.fM, fontSize: '9px', color: D.r7,
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            Effets sur l'authenticite
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {AUTHENTICITY_EFFECTS.map((e, i) => (
              <div key={i} style={{
                display: 'flex', gap: '14px', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: D.r5, marginTop: '6px', flexShrink: 0,
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontFamily: D.fM, fontSize: '11px', color: D.w, letterSpacing: '0.02em' }}>
                    {e.name}
                  </span>
                  <span style={{ fontFamily: D.fB, fontSize: '12px', color: D.wS, lineHeight: 1.5 }}>
                    {e.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════ SECTION 5 — ARCHITECTURE EIGEN ══════ */}
      <Section id="eigen">
        <SectionLabel text="05 \u2014 Architecture Eigen" />
        <SectionTitle text="7 briques, un orchestrateur" />

        <div style={{
          fontFamily: D.fB, fontSize: '13px', color: D.wS, lineHeight: 1.6,
          maxWidth: '560px',
        }}>
          Eigen orchestre les 7 modules comme une API unifiee.
          Cout marginal par produit = frontend + prompt engineering.
          L'infrastructure est partagee, la valeur est composable.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {EIGEN_BRICKS.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              background: D.r1, borderRadius: '10px', padding: '16px 20px',
            }}>
              <span style={{
                fontFamily: D.fM, fontSize: '12px', color: D.r7,
                minWidth: '80px', letterSpacing: '0.04em',
              }}>
                {b.code}
              </span>
              <div style={{
                width: '1px', height: '28px', background: 'rgba(255,255,255,0.1)',
                flexShrink: 0,
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontFamily: D.fB, fontSize: '12px', color: D.w }}>
                  {b.name}
                </span>
                <span style={{ fontFamily: D.fB, fontSize: '11px', color: D.wD }}>
                  {b.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Orchestrateur */}
        <div style={{
          background: 'rgba(255,255,255,0.06)', borderRadius: '12px',
          padding: '20px', display: 'flex', alignItems: 'center', gap: '14px',
          borderLeft: `3px solid ${D.r5}`,
        }}>
          <Scale size={18} color={D.r6} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontFamily: D.fM, fontSize: '10px', color: D.r7, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Cout marginal
            </span>
            <span style={{ fontFamily: D.fB, fontSize: '13px', color: D.wS, lineHeight: 1.4 }}>
              Frontend + Prompt Engineering. L'infrastructure Eigen est le denominateur commun.
            </span>
          </div>
        </div>
      </Section>

      {/* ══════ SECTION 6 — AVANTAGE COMPETITIF ══════ */}
      <Section id="avantage">
        <SectionLabel text="06 \u2014 Avantage competitif" />
        <SectionTitle text="Trois fosses defensifs" />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {MOATS.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} style={{
                flex: '1 1 220px', background: D.r1, borderRadius: '12px',
                padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={D.r6} />
                </div>
                <span style={{
                  fontFamily: D.fM, fontSize: '11px', color: D.r7,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {m.name}
                </span>
                <span style={{ fontFamily: D.fB, fontSize: '13px', color: D.wS, lineHeight: 1.5 }}>
                  {m.desc}
                </span>
              </div>
            );
          })}
        </div>

        {/* Citation finale */}
        <div style={{
          background: D.r1, borderRadius: '12px', padding: '32px',
          borderLeft: `3px solid ${D.r6}`,
        }}>
          <div style={{
            fontFamily: D.fT, fontSize: '20px', fontWeight: 400,
            color: D.w, lineHeight: 1.4, fontStyle: 'italic',
          }}>
            &laquo; L'authenticite n'est pas ce que vous declarez aimer &mdash;
            c'est ce que vous ne pouvez pas vous empecher de regarder. &raquo;
          </div>
        </div>
      </Section>

    </div>
  );
}

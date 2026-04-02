const { useState, useCallback } = React;

// Design system
const C = {
  ivory: '#FDFAF3', cream: '#F7F3EA', gold: '#B8963E', noir: '#2C2925',
  t1: '#4A4640', t2: '#6B6560', t3: '#918977', div: '#D4CCBA', green: '#5B8C6E',
  goldLight: 'rgba(184,150,62,0.10)', greenLight: 'rgba(91,140,110,0.10)',
  redLight: 'rgba(180,60,60,0.08)', red: '#B43C3C', blue: '#4A6FA5',
  blueLight: 'rgba(74,111,165,0.10)', purple: '#7B5EA7', purpleLight: 'rgba(123,94,167,0.10)',
};
const F = { heading: 'Playfair Display, serif', mono: 'JetBrains Mono, monospace' };

const BRIQUES = [
  {
    id: 'aelya', name: 'AELYA', domain: 'Privacy & Consent',
    color: C.green, bg: C.greenLight,
    status: 'Production', version: 'v2.4.1',
    description: 'Gestion du consentement patient, anonymisation des donnees cliniques, conformite RGPD/HDS pour l\'ensemble de la plateforme NOOS.',
    dataFlows: [
      { direction: 'in', label: 'Consentements patients', freq: 'Temps reel' },
      { direction: 'out', label: 'Tokens d\'anonymisation', freq: 'Par session' },
      { direction: 'out', label: 'Rapports conformite RGPD', freq: 'Hebdomadaire' },
    ],
    capabilities: ['Consent Management Platform', 'Anonymisation differentielle', 'Audit trail RGPD', 'Data Processing Agreements'],
    metrics: { consentsManaged: '1.2M', anonymizationRate: '99.98%', rgpdAudits: 47 },
  },
  {
    id: 'burhan', name: 'BURHAN', domain: 'Blockchain & Preuve',
    color: C.gold, bg: C.goldLight,
    status: 'Production', version: 'v1.8.3',
    description: 'Tracabilite des prescriptions sur blockchain, chaine de preuve medicale, verification des credentials des praticiens.',
    dataFlows: [
      { direction: 'in', label: 'Prescriptions signees', freq: 'Par acte' },
      { direction: 'out', label: 'Preuves immutables', freq: 'Temps reel' },
      { direction: 'in', label: 'Credentials praticiens', freq: 'Mensuel' },
    ],
    capabilities: ['Prescription Ledger', 'Proof-of-Care chain', 'Credential Verification', 'Smart Contracts medicaux'],
    metrics: { txRecorded: '2.8M', blockTime: '1.2s', validationRate: '100%' },
  },
  {
    id: 'myne', name: 'MYNe', domain: 'Data & Marketplace',
    color: C.blue, bg: C.blueLight,
    status: 'Beta', version: 'v0.9.7',
    description: 'Marketplace de donnees patients anonymisees pour la recherche clinique, datasets epidemiologiques, monetisation ethique.',
    dataFlows: [
      { direction: 'out', label: 'Datasets anonymises', freq: 'Quotidien' },
      { direction: 'in', label: 'Requetes recherche', freq: 'Variable' },
      { direction: 'out', label: 'Royalties patients', freq: 'Mensuel' },
    ],
    capabilities: ['Data Clean Room', 'Federated Analytics', 'Synthetic Data Generation', 'Research API'],
    metrics: { datasetsPublished: 234, researchers: 89, revenueShared: '48K EUR' },
  },
  {
    id: 'yrknown', name: 'YrKnown', domain: 'Knowledge & Ontologie',
    color: C.purple, bg: C.purpleLight,
    status: 'Production', version: 'v3.1.0',
    description: 'Base de connaissances cliniques, ontologie DSM-5/CIM-11, protocoles therapeutiques evidence-based, aide a la decision.',
    dataFlows: [
      { direction: 'out', label: 'Ontologie DSM-5', freq: 'Statique + MaJ' },
      { direction: 'out', label: 'Protocoles therapeutiques', freq: 'Par diagnostic' },
      { direction: 'in', label: 'Feedback clinique', freq: 'Continu' },
    ],
    capabilities: ['DSM-5 Ontology Engine', 'Treatment Protocol Library', 'Clinical Decision Support', 'Evidence Grading'],
    metrics: { conditions: 547, protocols: 1283, evidenceArticles: '18.4K' },
  },
  {
    id: 'cgsa', name: 'CG SA', domain: 'Business & Croissance',
    color: C.red, bg: C.redLight,
    status: 'Active', version: 'N/A',
    description: 'Expansion marche (MENA, Europe), levee de fonds VC, showcases GITEX/VivaTech, strategie go-to-market.',
    dataFlows: [
      { direction: 'in', label: 'Pipeline commercial', freq: 'Hebdomadaire' },
      { direction: 'in', label: 'Investor reporting', freq: 'Trimestriel' },
      { direction: 'out', label: 'KPIs plateforme', freq: 'Temps reel' },
    ],
    capabilities: ['Market Expansion MENA', 'VC Fundraising (Series A)', 'GITEX 2026 Showcase', 'Channel Partnerships'],
    metrics: { markets: 4, fundraisingTarget: '8M EUR', partnerships: 12 },
  },
];

const NOOS_MODULES = [
  {
    name: 'Teleconsultation', status: 'Live', icon: '\u25CB',
    desc: 'Visioconference securisee HDS, salle d\'attente virtuelle, prescription en ligne, facturation automatisee Sesam Vitale.',
    stats: '12.4K sessions/mois', tech: 'WebRTC, Twilio, Stripe',
  },
  {
    name: 'Diagnostic IA', status: 'Live', icon: '\u25B3',
    desc: 'Modele NLP pour pre-diagnostic psychiatrique, scoring PHQ-9/GAD-7 automatise, detection de risque suicidaire, orientation therapeutique.',
    stats: 'Precision 94.2%', tech: 'GPT-4 fine-tuned, scikit-learn',
  },
  {
    name: 'Dossier Patient', status: 'Live', icon: '\u25A1',
    desc: 'Dossier medical partage interoperable (DMP), historique therapeutique complet, allergies, interactions medicamenteuses, timeline clinique.',
    stats: '340K dossiers actifs', tech: 'FHIR R4, HL7 v2, PostgreSQL',
  },
  {
    name: 'Pharmacovigilance', status: 'Beta', icon: '\u25C7',
    desc: 'Surveillance des effets secondaires en temps reel, alertes interactions, reporting ANSM automatise, base Theriaque integree.',
    stats: '2.1K alertes/mois', tech: 'Event streaming, Kafka',
  },
  {
    name: 'Analytics & Reporting', status: 'Live', icon: '\u2261',
    desc: 'Tableaux de bord pour etablissements, suivi cohortes, indicateurs qualite HAS, exports PMSI, benchmarking inter-etablissements.',
    stats: '48 etablissements', tech: 'Metabase, dbt, Snowflake',
  },
];

const METRICS = [
  { label: 'Patients actifs', value: '340K', sub: '+18% YoY', icon: '\u2022' },
  { label: 'Medecins', value: '2.1K', sub: 'Psychiatres & Generalistes', icon: '\u2022' },
  { label: 'Etablissements', value: '48', sub: 'Hopitaux & Cliniques', icon: '\u2022' },
  { label: 'Uptime SLA', value: '99.97%', sub: 'Sur 12 mois glissants', icon: '\u2022' },
  { label: 'Latence API', value: '12ms', sub: 'P95 (median 4ms)', icon: '\u2022' },
  { label: 'Conformite HDS', value: '100%', sub: 'Hebergeur Donnees Sante', icon: '\u2022' },
];

const TABS = [
  { id: 'ecosystem', label: 'Ecosysteme' },
  { id: 'connexions', label: 'Connexions' },
  { id: 'metrics', label: 'Metriques' },
  { id: 'modules', label: 'Modules' },
];

// Helpers

function el(tag, props) {
  var children = Array.prototype.slice.call(arguments, 2);
  return React.createElement.apply(React, [tag, props].concat(children));
}

function Label(text) {
  return el('span', {
    style: {
      fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase',
      letterSpacing: '0.12em', color: C.t3, display: 'inline-block',
    },
  }, text);
}

function Divider() {
  return el('div', { style: { height: 1, background: C.div, margin: '20px 0' } });
}

function StatusBadge(status, color) {
  var colors = { Production: C.green, Live: C.green, Beta: C.gold, Active: C.blue };
  var c = color || colors[status] || C.t3;
  return el('span', {
    style: {
      fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase',
      letterSpacing: '0.1em', color: c,
      background: c + '18', padding: '2px 8px', borderRadius: 0,
      display: 'inline-block',
    },
  }, status);
}

function FlowArrow(dir, color) {
  var isIn = dir === 'in';
  return el('div', {
    style: {
      fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase',
      letterSpacing: '0.1em', width: 64, textAlign: 'center', flexShrink: 0,
      color: isIn ? C.green : C.gold,
      background: isIn ? C.greenLight : C.goldLight,
      padding: '3px 8px', borderRadius: 0,
    },
  }, isIn ? 'NOOS \u2192' : '\u2190 NOOS');
}

// Ecosystem Tab

function EcosystemTab(props) {
  var selected = props.selectedBrique;
  var setSelected = props.setSelectedBrique;
  var hovered = props.hoveredBrique;
  var setHovered = props.setHoveredBrique;

  return el('div', null,
    // NOOS center card
    el('div', {
      style: {
        background: C.cream, border: '1px solid ' + C.div, borderRadius: 0,
        padding: '28px 32px', marginBottom: 28, position: 'relative',
      },
    },
      el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 } },
        el('div', null,
          Label('Plateforme Centrale'),
          el('h2', {
            style: { fontFamily: F.heading, fontWeight: 700,  fontSize: 28, margin: '6px 0 4px', color: C.noir },
          }, 'NOOS'),
          el('p', {
            style: { fontFamily: F.heading,  color: C.t2, fontSize: 15, margin: 0, maxWidth: 520, lineHeight: 1.5 },
          }, 'Plateforme SaaS de sante mentale couvrant l\'ensemble du parcours de soins : telepsychiatrie, diagnostic assiste par IA, suivi patient longitudinal, et dossier medical partage interoperable.')
        ),
        el('div', { style: { textAlign: 'right' } },
          StatusBadge('Production', C.green),
          el('div', {
            style: { fontFamily: F.mono, fontSize: 10, color: C.t3, marginTop: 6, letterSpacing: '0.05em' },
          }, 'v4.2.0 \u00b7 HDS Certifie'),
          el('div', {
            style: { fontFamily: F.mono, fontSize: 9, color: C.t3, marginTop: 3, letterSpacing: '0.05em' },
          }, 'Deploiement: OVHcloud eu-west-par')
        )
      ),
      el('div', { style: { display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' } },
        [
          { l: 'Patients', v: '340K' },
          { l: 'Medecins', v: '2.1K' },
          { l: 'Uptime', v: '99.97%' },
          { l: 'Latence P95', v: '12ms' },
        ].map(function (kpi) {
          return el('div', { key: kpi.l },
            el('div', { style: { fontFamily: F.heading, fontWeight: 700, fontSize: 22, color: C.gold } }, kpi.v),
            el('div', { style: { fontFamily: F.mono, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.1em' } }, kpi.l)
          );
        })
      )
    ),

    // Briques grid
    el('div', { style: { marginBottom: 8 } }, Label('Briques Connectees \u2014 5 Modules Eigen')),
    el('div', {
      style: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16, marginTop: 4,
      },
    },
      BRIQUES.map(function (b) {
        var isSelected = selected === b.id;
        var isHovered = hovered === b.id;
        return el('div', {
          key: b.id,
          onClick: function () { setSelected(isSelected ? null : b.id); },
          onMouseEnter: function () { setHovered(b.id); },
          onMouseLeave: function () { setHovered(null); },
          style: {
            background: isSelected ? b.bg : (isHovered ? C.cream : '#fff'),
            border: '1px solid ' + (isSelected ? b.color : C.div),
            borderRadius: 0, padding: '20px 22px', cursor: 'pointer',
            transition: 'all 0.25s ease',
            transform: isHovered && !isSelected ? 'translateY(-2px)' : 'none',
            boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
          },
        },
          el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
            el('div', { style: { display: 'flex', alignItems: 'baseline', gap: 10 } },
              el('span', {
                style: { fontFamily: F.heading, fontWeight: 700,  fontSize: 20, color: b.color },
              }, b.name),
              el('span', {
                style: { fontFamily: F.mono, fontSize: 9, color: C.t3, letterSpacing: '0.08em', textTransform: 'uppercase' },
              }, b.domain)
            ),
            StatusBadge(b.status, b.color)
          ),
          el('p', {
            style: { fontFamily: F.heading, fontSize: 13, color: C.t2,  margin: '4px 0 0', lineHeight: 1.5 },
          }, b.description),

          // Expanded detail panel
          isSelected && el('div', { style: { marginTop: 16 } },
            Divider(),

            // Data flows summary
            el('div', { style: { marginBottom: 14 } },
              Label('Flux de donnees'),
              el('div', { style: { marginTop: 8 } },
                b.dataFlows.map(function (flow, fi) {
                  return el('div', {
                    key: fi,
                    style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 },
                  },
                    FlowArrow(flow.direction),
                    el('span', { style: { fontFamily: F.heading,  fontSize: 13, color: C.t1 } }, flow.label),
                    el('span', { style: { fontFamily: F.mono, fontSize: 8, color: C.t3, marginLeft: 'auto', letterSpacing: '0.05em' } }, flow.freq)
                  );
                })
              )
            ),

            // Capabilities
            Label('Capabilities'),
            el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 } },
              b.capabilities.map(function (cap) {
                return el('span', {
                  key: cap,
                  style: {
                    fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase',
                    letterSpacing: '0.08em', padding: '3px 10px', borderRadius: 0,
                    background: b.bg, color: b.color, border: '1px solid ' + b.color + '30',
                  },
                }, cap);
              })
            ),

            // Metrics
            el('div', { style: { marginTop: 14 } },
              Label('Metriques Cles'),
              el('div', { style: { display: 'flex', gap: 24, marginTop: 8, flexWrap: 'wrap' } },
                Object.entries(b.metrics).map(function (entry) {
                  return el('div', { key: entry[0] },
                    el('div', {
                      style: { fontFamily: F.heading, fontWeight: 700, fontSize: 18, color: b.color },
                    }, String(entry[1])),
                    el('div', {
                      style: { fontFamily: F.mono, fontSize: 8, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.1em' },
                    }, entry[0].replace(/([A-Z])/g, ' $1').trim())
                  );
                })
              )
            ),

            // Version
            el('div', { style: { marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 } },
              Label('Version'),
              el('span', { style: { fontFamily: F.mono, fontSize: 11, color: C.t1 } }, b.version)
            )
          )
        );
      })
    )
  );
}

// Connexions Tab

function ConnexionsTab() {
  var expanded = useState(null);
  var expandedFlow = expanded[0];
  var setExpandedFlow = expanded[1];

  return el('div', null,
    Label('Flux de Donnees \u2014 NOOS vers Briques Eigen'),
    el('p', {
      style: { fontFamily: F.heading,  color: C.t2, fontSize: 14, margin: '6px 0 20px', maxWidth: 600, lineHeight: 1.5 },
    }, 'Chaque brique echange des donnees avec NOOS selon des protocoles securises, conformes HDS et traces sur la blockchain BURHAN.'),

    BRIQUES.map(function (b) {
      var isExpanded = expandedFlow === b.id;
      return el('div', {
        key: b.id,
        style: {
          background: '#fff', border: '1px solid ' + (isExpanded ? b.color : C.div),
          borderRadius: 0, marginBottom: 12, overflow: 'hidden', transition: 'all 0.2s',
        },
      },
        // Header
        el('div', {
          onClick: function () { setExpandedFlow(isExpanded ? null : b.id); },
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 22px', cursor: 'pointer',
            background: isExpanded ? b.bg : 'transparent',
            transition: 'background 0.2s',
          },
        },
          el('div', { style: { display: 'flex', alignItems: 'center', gap: 14 } },
            el('div', {
              style: { width: 8, height: 8, borderRadius: 0, background: b.color, flexShrink: 0 },
            }),
            el('span', {
              style: { fontFamily: F.heading, fontWeight: 700,  fontSize: 18, color: b.color },
            }, b.name),
            el('span', {
              style: { fontFamily: F.mono, fontSize: 9, color: C.t3, textTransform: 'uppercase', letterSpacing: '0.1em' },
            }, b.domain),
            el('span', {
              style: { fontFamily: F.mono, fontSize: 9, color: C.t3, letterSpacing: '0.05em' },
            }, '\u00b7 ' + b.dataFlows.length + ' flux')
          ),
          el('span', {
            style: {
              fontFamily: F.mono, fontSize: 14, color: isExpanded ? b.color : C.t3,
              transform: isExpanded ? 'rotate(90deg)' : 'none',
              transition: 'all 0.2s', display: 'inline-block',
            },
          }, '\u2192')
        ),

        // Expanded flows
        isExpanded && el('div', {
          style: { padding: '0 22px 20px', borderTop: '1px solid ' + C.div },
        },
          b.dataFlows.map(function (flow, fi) {
            return el('div', {
              key: fi,
              style: {
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 0',
                borderBottom: fi < b.dataFlows.length - 1 ? '1px solid ' + C.div : 'none',
              },
            },
              FlowArrow(flow.direction),
              el('div', { style: { flex: 1 } },
                el('div', {
                  style: { fontFamily: F.heading,  fontSize: 14, color: C.t1 },
                }, flow.label),
                el('div', {
                  style: { fontFamily: F.mono, fontSize: 9, color: C.t3, marginTop: 2, letterSpacing: '0.05em' },
                }, 'Frequence: ' + flow.freq)
              )
            );
          }),

          Divider(),

          // Connexion metadata
          el('div', { style: { display: 'flex', gap: 32, flexWrap: 'wrap' } },
            el('div', null,
              Label('Protocole'),
              el('div', { style: { fontFamily: F.mono, fontSize: 11, color: C.t1, marginTop: 4 } }, 'REST API / gRPC + mTLS')
            ),
            el('div', null,
              Label('Authentification'),
              el('div', { style: { fontFamily: F.mono, fontSize: 11, color: C.t1, marginTop: 4 } }, 'OAuth 2.0 + JWT signes')
            ),
            el('div', null,
              Label('Chiffrement'),
              el('div', { style: { fontFamily: F.mono, fontSize: 11, color: C.t1, marginTop: 4 } }, 'TLS 1.3 / AES-256-GCM')
            )
          ),

          el('div', { style: { marginTop: 14 } },
            el('p', {
              style: { fontFamily: F.heading,  fontSize: 13, color: C.t2, lineHeight: 1.5, margin: 0 },
            }, b.description)
          )
        )
      );
    }),

    // Architecture note
    Divider(),
    el('div', {
      style: { background: C.cream, borderRadius: 0, padding: '20px 24px', border: '1px solid ' + C.div },
    },
      Label('Architecture d\'Integration'),
      el('p', {
        style: { fontFamily: F.heading,  fontSize: 13, color: C.t2, lineHeight: 1.6, margin: '8px 0 0', maxWidth: 600 },
      }, 'Toutes les connexions passent par l\'API Gateway NOOS avec rate limiting, circuit breaker, et observabilite distribuee (OpenTelemetry). Les evenements critiques sont traces sur la blockchain BURHAN pour auditabilite.')
    )
  );
}

// Metrics Tab

function MetricsTab() {
  return el('div', null,
    Label('Indicateurs Cles de Performance \u2014 NOOS Platform'),
    el('p', {
      style: { fontFamily: F.heading,  color: C.t2, fontSize: 14, margin: '6px 0 24px', lineHeight: 1.5 },
    }, 'Donnees consolidees sur les 12 derniers mois glissants, mises a jour en temps reel.'),

    // KPI grid
    el('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 },
    },
      METRICS.map(function (m, i) {
        return el('div', {
          key: i,
          style: {
            background: '#fff', border: '1px solid ' + C.div, borderRadius: 0,
            padding: '24px 20px', textAlign: 'center',
          },
        },
          el('div', {
            style: { fontFamily: F.heading, fontWeight: 700, fontSize: 36, color: C.gold, lineHeight: 1.1 },
          }, m.value),
          el('div', {
            style: { fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.t1, marginTop: 10 },
          }, m.label),
          el('div', {
            style: { fontFamily: F.heading,  fontSize: 12, color: C.t3, marginTop: 4 },
          }, m.sub)
        );
      })
    ),

    Divider(),

    // Infrastructure
    Label('Infrastructure & Conformite'),
    el('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginTop: 12 },
    },
      [
        { label: 'Hebergement', value: 'OVHcloud HDS', detail: 'Region eu-west-par, 3 zones de disponibilite, auto-scaling K8s' },
        { label: 'Certification', value: 'HDS / ISO 27001', detail: 'Audit ANSSI conforme, certification renouvelee 2025' },
        { label: 'Chiffrement', value: 'AES-256 + TLS 1.3', detail: 'At rest (volumes) & in transit (API), cles rotees mensuellement' },
        { label: 'Backup & DR', value: 'RPO 1h / RTO 4h', detail: 'Multi-region, chiffre, tests de restauration trimestriels' },
        { label: 'Monitoring', value: 'Datadog + PagerDuty', detail: 'APM, logs centralises, alertes SLO, dashboards temps reel' },
        { label: 'CI/CD', value: 'GitLab CI + ArgoCD', detail: 'Deploiement GitOps, canary releases, rollback automatique' },
      ].map(function (item, i) {
        return el('div', {
          key: i,
          style: {
            background: C.cream, border: '1px solid ' + C.div, borderRadius: 0,
            padding: '18px 22px',
          },
        },
          Label(item.label),
          el('div', {
            style: { fontFamily: F.heading, fontWeight: 700,  fontSize: 17, color: C.noir, marginTop: 6 },
          }, item.value),
          el('div', {
            style: { fontFamily: F.mono, fontSize: 9, color: C.t3, marginTop: 6, letterSpacing: '0.03em', lineHeight: 1.5 },
          }, item.detail)
        );
      })
    ),

    Divider(),

    // SLA targets
    Label('Objectifs SLA \u2014 Engagements Contractuels'),
    el('div', {
      style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 12 },
    },
      [
        { metric: 'Disponibilite', target: '99.95%', actual: '99.97%', status: 'ok' },
        { metric: 'Latence API P95', target: '< 50ms', actual: '12ms', status: 'ok' },
        { metric: 'Temps de reponse support', target: '< 4h', actual: '1.2h', status: 'ok' },
        { metric: 'RTO (Recovery)', target: '< 8h', actual: '4h', status: 'ok' },
      ].map(function (sla, i) {
        return el('div', {
          key: i,
          style: {
            background: '#fff', border: '1px solid ' + C.div, borderRadius: 0,
            padding: '14px 18px',
          },
        },
          el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            Label(sla.metric),
            el('span', { style: { fontFamily: F.mono, fontSize: 9, color: C.green, letterSpacing: '0.05em' } }, '\u2713 CONFORME')
          ),
          el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 } },
            el('div', null,
              el('div', { style: { fontFamily: F.mono, fontSize: 8, color: C.t3, textTransform: 'uppercase' } }, 'Cible'),
              el('div', { style: { fontFamily: F.heading, fontWeight: 700, fontSize: 16, color: C.t1 } }, sla.target)
            ),
            el('div', { style: { textAlign: 'right' } },
              el('div', { style: { fontFamily: F.mono, fontSize: 8, color: C.t3, textTransform: 'uppercase' } }, 'Actuel'),
              el('div', { style: { fontFamily: F.heading, fontWeight: 700, fontSize: 16, color: C.green } }, sla.actual)
            )
          )
        );
      })
    )
  );
}

// Modules Tab

function ModulesTab() {
  var modState = useState(null);
  var activeModule = modState[0];
  var setActiveModule = modState[1];

  return el('div', null,
    Label('Modules Internes \u2014 NOOS Platform'),
    el('p', {
      style: { fontFamily: F.heading,  color: C.t2, fontSize: 14, margin: '6px 0 24px', lineHeight: 1.5 },
    }, 'Les cinq modules proprietaires constituant le coeur fonctionnel de la plateforme NOOS de sante mentale.'),

    NOOS_MODULES.map(function (mod, i) {
      var isActive = activeModule === i;
      return el('div', {
        key: i,
        onClick: function () { setActiveModule(isActive ? null : i); },
        style: {
          background: isActive ? C.cream : '#fff',
          border: '1px solid ' + (isActive ? C.gold : C.div),
          borderRadius: 0, padding: '20px 24px', marginBottom: 10,
          cursor: 'pointer', transition: 'all 0.2s',
        },
      },
        el('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
        },
          el('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            el('span', {
              style: { fontFamily: F.mono, fontSize: 14, color: C.gold, width: 20, textAlign: 'center' },
            }, mod.icon),
            el('span', {
              style: { fontFamily: F.heading, fontWeight: 700,  fontSize: 18, color: C.noir },
            }, mod.name),
            StatusBadge(mod.status)
          ),
          el('span', {
            style: { fontFamily: F.mono, fontSize: 10, color: C.t3, letterSpacing: '0.05em' },
          }, mod.stats)
        ),
        isActive && el('div', { style: { marginTop: 14 } },
          Divider(),
          el('p', {
            style: { fontFamily: F.heading,  fontSize: 14, color: C.t2, lineHeight: 1.6, margin: '0 0 12px' },
          }, mod.desc),
          el('div', { style: { display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' } },
            el('div', null,
              Label('Statistique principale'),
              el('div', {
                style: { fontFamily: F.heading, fontWeight: 700, fontSize: 22, color: C.gold, marginTop: 4 },
              }, mod.stats)
            ),
            el('div', null,
              Label('Stack technique'),
              el('div', {
                style: { fontFamily: F.mono, fontSize: 10, color: C.t1, marginTop: 4, letterSpacing: '0.03em' },
              }, mod.tech)
            )
          )
        )
      );
    }),

    Divider(),

    // Tech stack
    Label('Stack Technique Globale \u2014 NOOS'),
    el('div', {
      style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 },
    },
      ['Next.js 14', 'TypeScript', 'PostgreSQL 16', 'Redis 7', 'Kubernetes 1.29',
       'Terraform', 'OpenAI GPT-4', 'FHIR R4', 'HL7 v2', 'WebRTC',
       'Stripe Billing', 'Datadog APM', 'Kafka', 'ArgoCD', 'Vault',
      ].map(function (tech) {
        return el('span', {
          key: tech,
          style: {
            fontFamily: F.mono, fontSize: 9, textTransform: 'uppercase',
            letterSpacing: '0.08em', padding: '4px 12px', borderRadius: 0,
            background: C.cream, color: C.t1, border: '1px solid ' + C.div,
          },
        }, tech);
      })
    ),

    // Roadmap
    el('div', { style: { marginTop: 24 } },
      Label('Roadmap Q2-Q3 2026'),
      el('div', { style: { marginTop: 10 } },
        [
          { q: 'Q2', items: ['Integration FHIR R5', 'Module ePrescription v2', 'SDK Mobile (React Native)'] },
          { q: 'Q3', items: ['Federation identite ProSanteConnect', 'API ouverte partenaires', 'Extension DROM-COM'] },
        ].map(function (quarter) {
          return el('div', {
            key: quarter.q,
            style: { marginBottom: 14 },
          },
            el('div', {
              style: { fontFamily: F.heading, fontWeight: 700,  fontSize: 15, color: C.gold, marginBottom: 6 },
            }, quarter.q + ' 2026'),
            quarter.items.map(function (item, ii) {
              return el('div', {
                key: ii,
                style: {
                  fontFamily: F.mono, fontSize: 10, color: C.t2, letterSpacing: '0.03em',
                  padding: '4px 0', paddingLeft: 16,
                  borderLeft: '2px solid ' + C.div,
                  marginBottom: 2,
                },
              }, item);
            })
          );
        })
      )
    )
  );
}

// Main App

function App() {
  var tabState = useState('ecosystem');
  var tab = tabState[0];
  var setTab = tabState[1];
  var briqueState = useState(null);
  var selectedBrique = briqueState[0];
  var setSelectedBrique = briqueState[1];
  var hoverState = useState(null);
  var hoveredBrique = hoverState[0];
  var setHoveredBrique = hoverState[1];

  return el('div', {
    style: { background: C.ivory, minHeight: '100vh', fontFamily: F.heading, color: C.noir, padding: 0, margin: 0 },
  },
    // Header
    el('div', {
      style: { padding: '40px 40px 0', borderBottom: '1px solid ' + C.div, paddingBottom: 24 },
    },
      Label('Eigen Holding / Sante Mentale'),
      el('h1', {
        style: {
          fontFamily: F.heading,  fontWeight: 700,
          fontSize: 36, margin: '8px 0 4px', color: C.noir, lineHeight: 1.15,
        },
      }, 'NOOS \u2014 Ecosysteme Integral'),
      el('p', {
        style: {
          fontFamily: F.heading, fontSize: 16, color: C.t2,
           margin: '4px 0 16px', maxWidth: 620, lineHeight: 1.5,
        },
      }, 'Vue 360\u00b0 de la plateforme SaaS de sante mentale et de ses connexions aux cinq briques de l\'ecosysteme Eigen Holding.'),

      // Tab bar
      el('div', { style: { display: 'flex', gap: 0, marginTop: 8 } },
        TABS.map(function (t) {
          var isActive = tab === t.id;
          return el('button', {
            key: t.id,
            onClick: function () { setTab(t.id); setSelectedBrique(null); },
            style: {
              fontFamily: F.mono, fontSize: 10, textTransform: 'uppercase',
              letterSpacing: '0.1em', padding: '10px 20px',
              border: 'none', cursor: 'pointer',
              background: isActive ? C.cream : 'transparent',
              color: isActive ? C.gold : C.t3,
              borderBottom: isActive ? '2px solid ' + C.gold : '2px solid transparent',
              transition: 'all 0.2s',
            },
          }, t.label);
        })
      )
    ),

    // Body
    el('div', { style: { padding: '32px 40px 60px' } },
      tab === 'ecosystem' && EcosystemTab({
        selectedBrique: selectedBrique, setSelectedBrique: setSelectedBrique,
        hoveredBrique: hoveredBrique, setHoveredBrique: setHoveredBrique,
      }),
      tab === 'connexions' && ConnexionsTab(),
      tab === 'metrics' && MetricsTab(),
      tab === 'modules' && ModulesTab()
    ),

    // Footer
    el('div', {
      style: {
        padding: '20px 40px', borderTop: '1px solid ' + C.div,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      },
    },
      el('span', {
        style: { fontFamily: F.mono, fontSize: 9, color: C.t3, letterSpacing: '0.1em', textTransform: 'uppercase' },
      }, 'NOOS Ecosysteme Integral \u00b7 Eigen Holding'),
      el('span', {
        style: { fontFamily: F.mono, fontSize: 9, color: C.t3, letterSpacing: '0.05em' },
      }, 'Genere par RAQIB \u00b7 Mars 2026')
    )
  );
}

// Mount
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

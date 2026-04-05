'use client';
import { useState } from 'react';
import { T } from '@/lib/tahrik-tokens';

const SHIFT = {
  before: { title: "Version 1 — Le Sous-Marin Solitaire", frame: "BNI Casablanca = terrain d'entraînement personnel. Objectif : apprendre le tissu local, s'entraîner au pitch 60s, résoudre des problèmes PME pour accumuler des case studies, sortir du manoir. Posture : sous-marin pur, ne rien révéler, la Doctrine du Sous-Marin s'applique intégralement. Horizon : 12 mois, un seul chapter, 40 contacts. Le fondateur entre dans BNI pour LUI-MÊME." },
  after: { title: "Version 2 — Le Réseau de Sous-Marins", frame: "BNI Casablanca = PILOTE d'un modèle réplicable dans 6 villes du corridor. Objectif : maîtriser le format BNI à Casablanca pour le déployer (ou s'adosser à ses équivalents) à Dakar, Abidjan, Lagos, Accra, Londres, Paris. Chaque country director CG rejoint le réseau local de sa ville comme PREMIER ACTE opérationnel. L'infrastructure BNI (52 réunions/an, One-to-One, referrals, exclusivité par profession) devient le RITUEL HEBDOMADAIRE des chapitres CG naissants. Le fondateur entre dans BNI pour le SYSTÈME." },
  goShift: "Au Go, la différence entre un amateur et un professionnel : l'amateur pose des pierres pour gagner du territoire LOCAL. Le professionnel pose des pierres pour construire une INFLUENCE GLOBALE. La pierre BNI Casablanca n'est plus une pierre locale — c'est la première pierre d'un fuseki à 6 villes. Chaque leçon apprise à Casa sera répliquée à Dakar, Abidjan, Lagos."
};

const CHANGES = [
  { dimension: "La posture", before: "Sous-marin intégral. Ne rien révéler. 'Entrepreneur deeptech' et rien de plus. Le CG n'est jamais mentionné.", after: "Sous-marin pour EIGEN. Semi-surface pour CG. Tu peux parler du Cercle du Gazoduc comme 'réseau d'entrepreneurs du corridor atlantique' — c'est un réseau business, pas un secret. L'architecture technique d'Eigen reste sous-marine. La vision corridor peut être partagée.", eastern: "水の巻 Mizu no Maki — Le Livre de l'Eau de Musashi." },
  { dimension: "L'objectif", before: "Apprendre. Case studies. Intelligence locale. Sortir du manoir. Le BNI est un outil pour Mehdi.", after: "Apprendre le FORMAT pour le répliquer. Chaque réunion BNI est une étude de cas sur 'comment structurer un rite hebdomadaire de 40 professionnels'. Le BNI est un R&D pour les rituels CG.", eastern: "禮 Lǐ — Le BNI EST un système de rites." },
  { dimension: "Le pitch 60 s", before: "'Je suis entrepreneur deeptech entre la France et le Maroc...'", after: "'Je suis fondateur d'un réseau d'entrepreneurs et d'industriels qui connecte l'Europe et l'Afrique le long du corridor atlantique.' Ça ouvre des conversations TRÈS différentes.", eastern: "先手 Sente — Le pitch CG met Mehdi en sente." },
  { dimension: "Les One-to-One", before: "Écouter pour comprendre. Intelligence de marché. Identifier les pain points pour NOOS/BURHAN/ÆLYA. Doctrine Sun Tzu pure.", after: "Écouter pour comprendre ET pour recruter. Chaque One-to-One est un entretien de recrutement CG déguisé en café.", eastern: "間 Jiàn — L'espion de Sun Tzu a deux missions : collecter l'intelligence ET recruter des agents." },
  { dimension: "Le réseau international", before: "BNI Connect (355K membres, 76 pays) = ressource théorique non exploitée.", after: "BNI Connect = infrastructure OPÉRATIONNELLE du CG. Quand le country director CG de Dakar a besoin d'une introduction à un comptable sénégalais, il passe par BNI Dakar.", eastern: "طریق Tariq — La Route de la Soie n'a pas été CONSTRUITE — elle a été DÉCOUVERTE." },
  { dimension: "Le temps investi", before: "Risque de piège temporel. 2-4h/semaine pour un ROI incertain.", after: "Investissement stratégique à ROI systémique. Les 2-4h/semaine à BNI Casa produisent un PLAYBOOK réplicable dans 5 autres villes.", eastern: "布石 Fuseki — Au Go, les premières pierres semblent ne rien produire." }
];

const REPLICABLE = [
  { bni: "Réunion hebdomadaire structurée (90 min, même agenda)", cg: "Majlis CG hebdomadaire (format adapté : 60 min en ligne, 90 min en présentiel 1×/mois)", lesson: "La RÉGULARITÉ crée la confiance. Un réseau qui se voit 1×/an est un annuaire. Un réseau qui se voit 52×/an est une famille." },
  { bni: "Pitch 60 secondes (chaque membre présente son activité)", cg: "Tour de table corridor (chaque membre partage 1 opportunité ou 1 prob en 60s)", lesson: "Le pitch 60s force la clarté. Si tu ne peux pas décrire ta valeur en 60 secondes, tu ne la comprends pas toi-même." },
  { bni: "Exclusivité par profession (1 seul représentant par secteur)", cg: "Exclusivité par brique × pays (1 seul opérateur BURHAN santé au Sénégal)", lesson: "L'exclusivité élimine la compétition interne et crée la loyauté. Le membre sait que TOUS les referrals de son secteur lui reviennent." },
  { bni: "One-to-One (café en tête-à-tête, 2×/semaine recommandé)", cg: "Introduction Réciproque (3 intros qualifiées/trimestre — Pacte d'Introduction)", lesson: "Le One-to-One BNI et le Pacte CG forcent les connexions inter-membres pour densifier le réseau." },
  { bni: "Tracking referrals (CA généré, nombre de referrals donnés/reçus)", cg: "RAQIB tracking (introductions, deals, adoptions SDK, mandats)", lesson: "Ce qui est mesuré est respecté. BNI mesure tout — et c'est pourquoi les membres s'engagent." },
  { bni: "Convention nationale annuelle (tout le réseau se retrouve)", cg: "Forum de Dakhla (tout le corridor se retrouve, mai 2027)", lesson: "L'événement annuel est le rite de renouvellement de l'عصبيّة. Il cristallise l'identité collective." },
  { bni: "Givers Gain (donner d'abord, recevoir ensuite)", cg: "Cheval de Troie (donner un livrable gratuit avant discussion : AMANA, DIWANE)", lesson: "La générosité stratégique est le taux de conversion le plus élevé du marché." }
];

const MATRIX = [
  { city: "Casablanca", networks: [
    { name: "BNI Casa", type: "Referral", function: "Terreau chapitre mère + cascade supply chain + 40 secteurs d'intelligence", priority: "P0", timing: "Post-GITEX (avr. 2026)" },
    { name: "CFCIM", type: "Chambre commerce", function: "Pont filiales françaises au Maroc → corporates Paris. Pipeline B2B2C européen.", priority: "P0", timing: "Immédiat" },
    { name: "CEO Club Morocco", type: "Club dirigeants", function: "Accès C-level marocains. Recrutement membres CG profil 'Architectes'.", priority: "P0", timing: "S2 2026" },
    { name: "CFC Community", type: "Hub financier", function: "Légitimité institutionnelle. Événements Majlis.", priority: "P0", timing: "Permanent" }
  ]},
  { city: "Paris", networks: [
    { name: "French Tech / FT Africa", type: "Label/communauté", function: "Crédibilité institutional FR. Pipeline diaspora.", priority: "P1", timing: "S2 2026" },
    { name: "HEC Africa Club", type: "Alumni", function: "30+ MBA/Grande École d'origine africaine. Recrutement chapitre Paris.", priority: "P1", timing: "Juin 2026" },
    { name: "Station F", type: "Campus startup", function: "30+ résidents africains. Deal flow cohorte + accès Niel.", priority: "P0", timing: "S2 2026" }
  ]},
  { city: "Dakar", networks: [
    { name: "Chambre Franco-Sénégalaise", type: "Chambre commerce", function: "200+ entreprises françaises. Pipeline corporate + intelligence.", priority: "P1", timing: "Juin 2026" },
    { name: "CTIC Dakar", type: "Incubateur", function: "Premier incubateur tech Afrique Ouest. Deal flow.", priority: "P1", timing: "Juin 2026" },
    { name: "Attijariwafa / BCP", type: "Banque réseau", function: "Rail financier marocain au Sénégal.", priority: "P0", timing: "Immédiat" }
  ]},
  { city: "Abidjan", networks: [
    { name: "CGECI (patronat)", type: "Patronat", function: "Bridge CGEM-CGECI. 50+ entretiens clients.", priority: "P0", timing: "Juin 2026" },
    { name: "Club DSI Côte d'Ivoire", type: "Club sectoriel", function: "Décideurs IT grands groupes CI. Acheteurs directs.", priority: "P0", timing: "Juin 2026" }
  ]},
  { city: "Lagos", networks: [
    { name: "TVC Labs community", type: "VC/startup", function: "Connecteur central tech Nigeria. Pipeline fondateurs + investors.", priority: "P0", timing: "Post-ATS" },
    { name: "Lagos Chamber of Commerce", type: "Chambre", function: "PME/grands groupes nigérians.", priority: "P1", timing: "Juil. 2026" },
    { name: "CcHub / Moonshot", type: "Tech", function: "Meilleurs fondateurs tech Nigeria.", priority: "P1", timing: "Oct. 2026" }
  ]},
  { city: "Accra", networks: [
    { name: "Ghana Chamber of Commerce", type: "Chambre", function: "Intelligence fintech + assurance. Sandbox anglophone.", priority: "P1", timing: "S2 2026" }
  ]},
  { city: "Londres", networks: [
    { name: "MBBC", type: "Bi-national", function: "Pont Maroc-UK. Diaspora corporate marocaine.", priority: "P1", timing: "Mai 2026" },
    { name: "LSE/Imperial Africa", type: "Alumni", function: "Diaspora qualifiée. Recrutement longue distance.", priority: "P1", timing: "Mai 2026" },
    { name: "Helios / AfricInvest", type: "Fonds", function: "LP potentiels CG Invest.", priority: "P0", timing: "Mai 2026" }
  ]}
];

const TABS = ["Pilote Casa", "Playbook Rituel", "Matrice 7 Villes", "Pipeline CG Invest", "Cascade B2B", "عصبيّة"];

export default function ReseauxLocaux() {
  const [activeTab, setActiveTab] = useState(0);
  const [cityIdx, setCityIdx] = useState(0);

  return (
    <div style={{ backgroundColor: T.bg, padding: '24px', minHeight: '100%', fontFamily: '"DM Sans", sans-serif' }}>
      
      {/* HEADER TABS (Pills style) */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: `1px solid ${T.bdrH}`, paddingBottom: '16px', overflowX: 'auto', flexWrap: 'nowrap' }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '6px 12px',
              backgroundColor: activeTab === i ? T.card : 'transparent',
              border: `1px solid ${activeTab === i ? T.bdrH : T.bdr}`,
              color: activeTab === i ? T.txt : T.txtD,
              fontSize: '11px',
              fontFamily: '"DM Sans", sans-serif',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              borderRadius: '20px'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT TABS */}
      <div>
        
        {/* TAB 1 : Pilote Casa */}
        {activeTab === 0 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1, backgroundColor: T.bg2, padding: '16px', border: `1px solid ${T.bdr}`, borderRadius: '4px' }}>
                <div style={{ color: T.txt, fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{SHIFT.before.title}</div>
                <div style={{ color: T.txtS, fontSize: '12px', lineHeight: 1.5 }}>{SHIFT.before.frame}</div>
              </div>
              <div style={{ flex: 1, backgroundColor: T.bg2, padding: '16px', border: `1px solid ${T.bdrH}`, borderRadius: '4px' }}>
                <div style={{ color: T.txt, fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{SHIFT.after.title}</div>
                <div style={{ color: T.txtS, fontSize: '12px', lineHeight: 1.5 }}>{SHIFT.after.frame}</div>
              </div>
            </div>
            
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '14px', color: T.acc, marginBottom: '32px', textAlign: 'center', padding: '0 24px' }}>
              "{SHIFT.goShift}"
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {CHANGES.map((ch, i) => (
                <div key={i} style={{ backgroundColor: T.card, border: `1px solid ${T.bdr}`, borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: T.txtD, letterSpacing: '0.5px' }}>{ch.dimension.toUpperCase()}</div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1, color: T.txtS, fontSize: '12px', opacity: 0.5, textDecoration: 'line-through' }}>{ch.before}</div>
                    <div style={{ flex: 1, color: T.txt, fontSize: '12px' }}>{ch.after}</div>
                  </div>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '12px', color: T.acc }}>{ch.eastern}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2 : Playbook Rituel */}
        {activeTab === 1 && (
          <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {REPLICABLE.map((rep, i) => (
              <div key={i} style={{ backgroundColor: T.card, border: `1px solid ${T.bdr}`, padding: '12px', borderRadius: '4px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 40px minmax(0, 1fr)', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: T.txtS }}>{rep.bni}</div>
                  <div style={{ textAlign: 'center', color: '#00D4C0', fontSize: '14px' }}>→</div>
                  <div style={{ fontSize: '12px', color: T.txt }}>{rep.cg}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,212,192,0.08)', borderLeft: `2px solid ${T.acc}`, padding: '8px 12px', fontSize: '11px', color: T.txtS }}>
                  {rep.lesson}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3 : Matrice 7 Villes */}
        {activeTab === 2 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {MATRIX.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setCityIdx(i)}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: cityIdx === i ? T.bg2 : 'transparent',
                    border: `1px solid ${cityIdx === i ? T.acc : T.bdr}`,
                    color: cityIdx === i ? T.acc : T.txtD,
                    fontSize: '11px',
                    fontFamily: '"DM Sans", sans-serif',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {m.city}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MATRIX[cityIdx].networks.map((net, i) => (
                <div key={i} style={{ backgroundColor: T.card, border: `1px solid ${T.bdr}`, padding: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '180px' }}>
                    <div style={{ fontSize: '12px', color: T.txt, fontWeight: 500, marginBottom: '4px' }}>{net.name}</div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: T.txtD, border: `1px solid ${T.bdrH}`, padding: '2px 6px', display: 'inline-block', borderRadius: '2px' }}>{net.type}</div>
                  </div>
                  <div style={{ flex: 1, fontSize: '11px', color: T.txtS, lineHeight: 1.4 }}>
                    {net.function}
                  </div>
                  <div style={{ width: '80px', textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: net.priority === 'P0' ? T.acc : T.txtD, fontWeight: net.priority === 'P0' ? 600 : 400, marginBottom: '4px' }}>{net.priority}</div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: T.txtD }}>{net.timing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4 : Pipeline CG Invest */}
        {activeTab === 3 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', padding: '0 24px' }}>
              {[
                { n: "100+", l: "Identifiés" },
                { n: "20-30", l: "Qualifiés" },
                { n: "5-10", l: "Candidats" },
                { n: "2-3", l: "Sélection" }
              ].map((step, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 2 }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: T.card, border: `1px solid ${T.bdrH}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Cormorant Garamond", serif', fontSize: '20px', color: T.acc }}>
                      {step.n}
                    </div>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: T.txtD, letterSpacing: '0.5px' }}>{step.l.toUpperCase()}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ flex: 1, height: '1px', backgroundColor: T.bdr, margin: '0 16px', position: 'relative', top: '-12px' }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { city: 'Casablanca', subtitle: 'BNI + Technopark + Maroc Numeric Cluster', role: 'Cohorte 1 : les 8-12 premières startups viennent du vivier Casa.' },
                { city: 'Dakar', subtitle: 'CTIC Dakar + JokkoBNI + YUX Design', role: 'Cohorte 2 : startups sénégalaises NLP, UX, cloud souverain.' },
                { city: 'Lagos', subtitle: 'TVC Labs + Moonshot alumni + CcHub', role: 'Cohorte 3 : startups nigérianes fintech, energy tech, healthtech.' }
              ].map((c, i) => (
                <div key={i} style={{ backgroundColor: T.card, border: `1px solid ${T.bdr}`, padding: '16px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '13px', color: T.txt, fontWeight: 500, marginBottom: '4px' }}>{c.city}</div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: T.txtD, marginBottom: '12px' }}>{c.subtitle}</div>
                  <div style={{ fontSize: '11px', color: T.txtS, lineHeight: 1.4 }}>{c.role}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5 : Cascade B2B */}
        {activeTab === 4 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
              {[
                { t: "Phase 1 : Résolution locale", d: "Eigen résout les problèmes des PME BNI (création de case studies)." },
                { t: "Phase 2 : Contagion", d: "Les PME BNI parlent de BURHAN/ÆLYA à leurs clients corporates ('je suis déjà conforme')." },
                { t: "Phase 3 : Imposition Corporate", d: "Le corporate impose BURHAN à TOUS ses fournisseurs." },
                { t: "Phase 4 : Adoption accélérée", d: "Les fournisseurs dans le réseau BNI adoptent immédiatement. Les autres subissent la friction." }
              ].map((ph, i) => (
                <div key={i} style={{ backgroundColor: T.card, borderLeft: `2px solid ${T.acc}`, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: T.acc }}>0{i+1}</div>
                  <div>
                    <div style={{ fontSize: '12px', color: T.txt, fontWeight: 500, marginBottom: '2px' }}>{ph.t}</div>
                    <div style={{ fontSize: '11px', color: T.txtS }}>{ph.d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ backgroundColor: T.bg2, border: `1px solid ${T.bdr}`, padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: T.txt, fontWeight: 600, marginBottom: '4px' }}>Casablanca</div>
                <div style={{ fontSize: '11px', color: T.txtS, marginBottom: '8px' }}>BNI Casa → fournisseurs OCP, IAM, BMCE</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: T.txtD }}>Cascade Tier 2-3 vers Tier 1</div>
              </div>
              <div style={{ backgroundColor: T.bg2, border: `1px solid ${T.bdr}`, padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontSize: '12px', color: T.txt, fontWeight: 600, marginBottom: '4px' }}>Abidjan</div>
                <div style={{ fontSize: '11px', color: T.txtS, marginBottom: '8px' }}>CGECI → fournisseurs Orange CI, Bolloré, Total CI</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: T.txtD }}>Pont vers les corporates fr. en Afrique de l'Ouest</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6 : عصبيّة */}
        {activeTab === 5 && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{ textAlign: 'center', fontFamily: '"Cormorant Garamond", serif', fontSize: '22px', color: T.acc, marginBottom: '32px' }}>
              عصبيّة
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: "BNI Connect", count: "355K membres, 76 pays", desc: "Rail transversal. Un membre BNI de Casa peut demander une intro à Dakar.", tags: ["Monde", "Inter-chapitres"] },
                { name: "CFCIM & Chambres", count: "Francophonie", desc: "Les chambres françaises sont dans chaque ville francophone du corridor. Même culture business.", tags: ["Casa", "Dakar", "Abidjan"] },
                { name: "Alumni Networks", count: "HEC, Sciences Po, UM6P", desc: "Les alumni sont dans chaque ville. Un alumni UM6P à Lagos est un pont naturel vers le chapitre CG.", tags: ["Paris", "Londres", "Lagos"] }
              ].map((rail, i) => (
                <div key={i} style={{ backgroundColor: T.card, border: `1px solid ${T.bdr}`, padding: '16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ width: '150px' }}>
                    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: T.acc, marginBottom: '4px' }}>{rail.name}</div>
                    <div style={{ fontSize: '10px', color: T.txtD }}>{rail.count}</div>
                  </div>
                  <div style={{ flex: 1, fontSize: '12px', color: T.txtS, lineHeight: 1.4 }}>
                    {rail.desc}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {rail.tags.map(t => (
                      <span key={t} style={{ fontSize: '9px', color: T.txtD, backgroundColor: T.bg2, border: `1px solid ${T.bdrH}`, padding: '2px 8px', borderRadius: '10px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

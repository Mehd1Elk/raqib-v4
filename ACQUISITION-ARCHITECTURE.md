# Intelligence d'Acquisition — Architecture Complète

## CONTEXTE

Intelligence d'Acquisition est un module dynamique de RAQIB V4 (Eigen Holding SAS). C'est un CRM d'intelligence stratégique qui gère l'acquisition client pour les 7 briques Eigen (NOOS, ÆLYA, MYNε, BURHAN, YrKnown, RAQIB, MIZAN) sur le corridor Atlantique EU-Afrique.

L'entreprise est l'entité centrale. Quand on ajoute une entreprise, TOUS les onglets se peuplent automatiquement : briques applicables (calculées par secteur + taille + corridor), personas à cibler, réglementations qui forcent l'achat, tier dans la chaîne de valeur, projection revenue, cheval de troie suggéré, événements pertinents.

Base initiale : 396 entreprises pré-seedées (22 secteurs, 40 pays, corridor MA-NG-SN-CI-GH-BJ-TG-GN-MR-GM-FR-ES-PT).

Accessible via : raqib-v4.vercel.app/acquisition + lien dans la navigation principale RAQIB.

## DESIGN SYSTEM — EXACT RAQIB_Unified

Le design est IDENTIQUE au module RAQIB_Unified.jsx déjà dans le repo. Ne pas inventer de nouveau design.

### Palette

```typescript
const C = {
  ivory: "#FDFAF3", cream: "#F7F3EA", parchment: "#F0EBDE", linen: "#E8E2D2",
  sand: "#D4CCBA", taupe: "#B8AE9C", stone: "#918977", walnut: "#6B5E4C",
  espresso: "#3D3428", noir: "#1C1814",
  gold: "#B8963E", goldL: "#D4B662", goldD: "#8C6E2A",
  noos: "#3D5E8C", aelya: "#3D7C5E", myne: "#7B5EA7", burhan: "#B8963E",
  yrknown: "#B87D3E", raqib: "#3D7C8C", mizan: "#9C3D5E",
  ruby: "#9C3D3D", emerald: "#3D7C5E", sapphire: "#3D5E8C",
  div: "rgba(60,52,40,0.10)", divL: "rgba(60,52,40,0.04)",
  t1: "#2A2318", t2: "#6B5E4C", t3: "#918977", tm: "#B8AE9C",
};
```

### Typographie

- Titres : `"Cormorant Garamond", Georgia, serif` — italic, weight 700
- Corps : `"Noto Sans", system-ui, sans-serif` — weight 400/500/600
- Mono/Données : `"JetBrains Mono", monospace` — weight 400/600/700

### Composants partagés

- `Pill` : inline-block, border-radius 2px, fontSize 9, fontFamily mono, border 1px solid color+25
- `ScoreBadge` : score >= 90 emerald, >= 75 gold, >= 50 yrknown, < 50 ruby
- `thS` : table header — padding 8px 12px, fontSize 8, mono, letterSpacing 1.5, sticky top
- `tdS` : table cell — padding 8px 12px, fontSize 11, Noto Sans, borderBottom divL

### App Shell

- Sidebar : width 220px (collapsed 48px), background ivory, borderRight 1px solid div
- Logo : gold dot 6px + "Raqib" Cormorant 20px italic bold + "رقيب" Cormorant 13px sand
- Tab active : borderLeft 3px solid gold, background gold+15, fontWeight 700
- Sub-tabs : borderBottom 2px solid gold quand actif, Cormorant italic
- Footer : height 24px, mono 7px, "RAQIB V4 · INTELLIGENCE D'ACQUISITION"
- Horloge : temps réel en haut à droite, mono 9px

## STRUCTURE MODULE

```
src/
├── app/
│   └── acquisition/
│       ├── page.tsx                    # Page principale avec app shell
│       └── layout.tsx                  # Layout (metadata, fonts)
├── components/
│   └── acquisition/
│       ├── AcquisitionShell.tsx        # Sidebar + routing onglets + footer
│       ├── DashboardView.tsx           # Onglet 1 — KPIs, funnel, matrice
│       ├── CompaniesView.tsx           # Onglet 2 — Table 396 entreprises + fiches
│       ├── ContactsView.tsx            # Onglet 3 — Table contacts par persona
│       ├── PipelineView.tsx            # Onglet 4 — Kanban par stage
│       ├── BriquesMatrixView.tsx       # Onglet 5 — Matrice entreprises × briques
│       ├── CascadeView.tsx             # Onglet 6 — Parcours 6 personas par entreprise
│       ├── ForcageLegalView.tsx        # Onglet 7 — Réglementations × entreprises
│       ├── EventsView.tsx              # Onglet 8 — GITEX / ATS / VivaTech
│       ├── ProjectionView.tsx          # Onglet 9 — Revenue projection dynamique
│       ├── PlaybookView.tsx            # Onglet 10 — Scripts, objections, emails
│       └── shared/
│           ├── Pill.tsx
│           ├── ScoreBadge.tsx
│           ├── StatCard.tsx
│           ├── SectionTitle.tsx
│           └── constants.ts            # Palette C, fonts, styles thS/tdS
├── lib/
│   └── acquisition/
│       ├── types.ts                    # Interfaces TypeScript
│       ├── engine.ts                   # Moteur auto-population (briques, personas, regulations, tier, projection)
│       └── api.ts                      # Fonctions fetch vers /api/acquisition/*
└── app/
    └── api/
        └── acquisition/
            ├── companies/
            │   ├── route.ts            # GET (filtres) + POST
            │   └── [id]/
            │       └── route.ts        # GET (fiche complète) + PATCH
            ├── contacts/
            │   └── route.ts            # GET + POST
            ├── dashboard/
            │   └── route.ts            # GET (KPIs agrégés)
            ├── regulations/
            │   └── route.ts            # GET (avec matching auto)
            ├── events/
            │   └── route.ts            # GET
            ├── playbook/
            │   └── route.ts            # GET
            └── projection/
                └── route.ts            # GET (revenue dynamique)
```

## INTERFACES TYPESCRIPT

```typescript
// src/lib/acquisition/types.ts

export interface AcqCompany {
  id: string;
  name: string;
  hq: string;                          // ISO 2 code
  sector: string;                       // TEL, BNK, INS, ENR, PHR, BTP, TEC, LOG, CNS, LUX, MIN, DFI, AUT, DEF, MED, EDU, IMM, AGR, FMC, CHM, IND
  revenue_b: number;                    // milliards $
  employees_k: number;                  // milliers
  corridor_countries: string[];         // ISO 2 codes
  eigen_briques: string;                // "NAMZBR" — N=NOOS A=ÆLYA M=MYNε B=BURHAN Y=YrKnown Z=MIZAN R=RAQIB
  eigen_score: number;                  // 1-10
  tier: 'Tier 0' | 'Tier 1' | 'Tier 2' | 'Tier 3';
  pipeline_stage: 'identified' | 'qualified' | 'approached' | 'demo' | 'negotiation' | 'signed' | 'churned';
  priority: 'P0' | 'P1' | 'P2';
  website?: string;
  notes?: string;
  trojan_horse?: string;
  annual_value_estimate?: number;
  created_at: string;
  updated_at: string;
  // Champs calculés (non stockés, générés par le moteur)
  matched_regulations?: AcqRegulation[];
  suggested_personas?: PersonaType[];
  contacts?: AcqContact[];
}

export interface AcqContact {
  id: string;
  company_id: string;
  name: string;
  role: string;                         // Titre exact : "Group CTO", "VP People", etc.
  persona: PersonaType;
  email?: string;
  linkedin?: string;
  phone?: string;
  notes?: string;
  last_contact_date?: string;
  next_action?: string;
  priority: 'P0' | 'P1' | 'P2';
  company?: AcqCompany;                 // Join
}

export type PersonaType = 'drh' | 'dpo' | 'cto' | 'rse' | 'achats' | 'cfo';

export interface AcqRegulation {
  id: string;
  name: string;
  status: string;
  applies_to_sectors: string[];
  applies_to_min_employees: number;
  eigen_briques: string;
  description: string;
  deadline: string;
  penalty: string;
}

export interface AcqEvent {
  id: string;
  name: string;
  city: string;
  dates: string;
  days: number;
  targets: EventTarget[];
}

export interface EventTarget {
  company_name: string;
  contact_name: string;
  approach: string;
  priority: 'P0' | 'P1' | 'P2';
  zone: string;
  day: string;
}

export interface AcqPlaybook {
  id: string;
  persona: PersonaType;
  hook: string;
  script: string;
  objections: { objection: string; reponse: string }[];
  email_template: string;
  cac: string;
  ltv: string;
}

export interface DashboardKPIs {
  total_companies: number;
  p0_count: number;
  pipeline_active: number;     // stage !== 'identified'
  signed_count: number;
  total_revenue_estimate: number;
  by_stage: Record<string, number>;
  by_sector: Record<string, number>;
  by_priority: Record<string, number>;
}
```

## MOTEUR AUTO-POPULATION

```typescript
// src/lib/acquisition/engine.ts

// Calcul du tier depuis le revenue
export function computeTier(revenue_b: number): string {
  if (revenue_b >= 50) return 'Tier 0';
  if (revenue_b >= 5) return 'Tier 1';
  if (revenue_b >= 0.5) return 'Tier 2';
  return 'Tier 3';
}

// Calcul du score Eigen depuis les briques
export function computeScore(eigen_briques: string): number {
  const len = eigen_briques.replace(/[^NAMBYRZQ]/g, '').length;
  return Math.min(10, Math.max(1, Math.round(len * 1.5)));
}

// Calcul de la priorité
export function computePriority(score: number): 'P0' | 'P1' | 'P2' {
  if (score >= 9) return 'P0';
  if (score >= 7) return 'P1';
  return 'P2';
}

// Personas suggérés depuis les briques
export function computePersonas(eigen_briques: string): PersonaType[] {
  const personas: Set<PersonaType> = new Set();
  if (eigen_briques.includes('N')) personas.add('drh');   // NOOS = entry point DRH
  if (eigen_briques.includes('A')) personas.add('dpo');   // ÆLYA = DPO
  if (eigen_briques.includes('B')) { personas.add('cto'); personas.add('rse'); personas.add('achats'); }
  if (eigen_briques.includes('M')) { personas.add('cto'); personas.add('cfo'); }
  if (eigen_briques.includes('Z')) { personas.add('cfo'); personas.add('achats'); }
  if (eigen_briques.includes('Y')) personas.add('drh');   // YrKnown = DRH aussi
  if (eigen_briques.includes('R')) personas.add('rse');
  return Array.from(personas);
}

// Réglementations applicables
export function matchRegulations(company: AcqCompany, regulations: AcqRegulation[]): AcqRegulation[] {
  return regulations.filter(reg =>
    reg.applies_to_sectors.includes(company.sector) &&
    (company.employees_k * 1000) >= reg.applies_to_min_employees
  );
}

// Projection revenue annuel par entreprise
export function computeRevenue(tier: string): number {
  switch (tier) {
    case 'Tier 0': return 1950000;  // €150K abo + B2B2C 13× = €1.95M
    case 'Tier 1': return 150000;   // €30K abo + B2B2C 5× = €150K
    case 'Tier 2': return 15000;    // €5K abo + B2B2C 3× = €15K
    case 'Tier 3': return 1000;     // SDK free + tx = €1K
    default: return 0;
  }
}
```

## SUPABASE SCHEMA

Projet : ybwmmmvwhpnotxdysded (eu-west-1)
Tables préfixées acq_ pour éviter collision avec corridor_* et diwane_*.

5 tables :
- acq_companies (396 rows seed)
- acq_contacts (à peupler progressivement)
- acq_regulations (15 rows seed)
- acq_events (3 rows seed)
- acq_playbook (6 rows seed)

Voir section Interfaces TypeScript pour les colonnes exactes.

FK : acq_contacts.company_id → acq_companies.id ON DELETE CASCADE
Indexes : name, sector, hq, priority, pipeline_stage sur acq_companies ; persona, company_id sur acq_contacts
RLS : SELECT pour anon (lecture publique MVP), INSERT/UPDATE/DELETE pour authenticated

## 10 ONGLETS — VUE PAR VUE

### 1. Dashboard
KPIs : total entreprises, P0 count, pipeline actif, signés, revenue estimé. Funnel par stage. Matrice briques × secteurs. Top 10 par score.

### 2. Entreprises
Table 396 rows filtrable (secteur, HQ, priorité, stage, recherche texte, briques). Fiche détaillée par entreprise avec contacts, réglementations matchées, personas suggérés, projection revenue. 7 colonnes briques avec dots colorées.

### 3. Contacts
Table contacts filtrable par persona et entreprise. Fiche contact avec entreprise liée, hook adapté, prochaine action.

### 4. Pipeline
Vue kanban 7 colonnes (identified → signed + churned). Cards entreprise avec nom, secteur, score, priority. Changement de stage par bouton.

### 5. Briques × Cibles
Matrice 396 × 7 avec dots colorées. Filtrable par secteur, pays. Résumé : combien d'entreprises par brique.

### 6. Cascade
Sélectionner une entreprise → afficher le parcours 6 personas. Personas applicables en couleur pleine, non-applicables grisés. Pour chaque applicable : hook, produits, prix (depuis playbook).

### 7. Forçage Légal
Sélectionner une entreprise → afficher les réglementations qui la forcent. Vue globale : matrice secteurs × réglementations.

### 8. Événements
3 tabs : GITEX (7-9 avril, Marrakech) / ATS (29 mai, London) / VivaTech (17-20 juin, Paris). Cibles par événement avec entreprise, contact, approche, priorité.

### 9. Projection
Revenue par tier, par brique, par secteur. Projection Y1→Y4. Total EU vs Corridor. Calculé dynamiquement depuis le pipeline réel.

### 10. Playbook
6 tabs persona. Hook, script d'approche, 4-5 objections avec réponses, template email. Bouton "Adapter à [entreprise]" qui pré-remplit.

## DONNÉES SEED

### 396 entreprises
Source : eigen-targets-1000.jsx (fichier dans le repo ou uploadé). Array RAW de 396 entries au format [name, hq, sector, revenue_b, employees_k, corridor_countries[], eigen_briques].

### 22 secteurs
TEL (Télécom), BNK (Banque), INS (Assurance), ENR (Énergie), PHR (Pharma/Santé), BTP (BTP/Infrastructure), FMC (FMCG/Agroalimentaire), TEC (Tech/IT/Digital), LOG (Logistique/Transport), CNS (Conseil/Audit), AUT (Automobile), LUX (Luxe/Mode/Retail), MIN (Mines/Matériaux), AGR (Agriculture), AVA (Aviation), DEF (Défense/Sécurité), MED (Médias), EDU (Éducation), IMM (Immobilier), DFI (DFI/Institution), CHM (Chimie), IND (Industrie diverse).

### 7 briques
N=NOOS (IA santé, #3D5E8C), A=ÆLYA (consent, #3D7C5E), M=MYNε (data marketplace, #7B5EA7), B=BURHAN (audit trail, #B8963E), Y=YrKnown (knowledge, #B87D3E), Z=MIZAN (settlement, #9C3D5E), R=RAQIB (intelligence, #3D7C8C).

### 6 personas
DRH (#C94040) → achète NOOS, YrKnown. Entry point. CAC €3-8K.
DPO (#3D7A7A) → achète ÆLYA. Tiré par NOOS. CAC €5-15K.
CTO (#5A5ABE) → achète BURHAN, ÆLYA, MYNε. Tiré par DPO. CAC €2-10K.
RSE (#5A8E52) → achète NOOS RPS, BURHAN supply chain. Tiré par DRH. CAC €4-12K.
Achats (#B8860B) → achète BURHAN, MIZAN, RAQIB. Tiré par CTO. CAC €3-8K.
CFO (#7A4A7A) → achète MIZAN, RAQIB. Closing. CAC €10-30K.

### 15 réglementations
AI Act, EHDS, CS3D/CSDDD, DORA, PSD3, CSRD, EU FMD, LkSG, DDA, NIS2, eIDAS 2.0, Convention de Malabo, Stratégie IA UA, AfCFTA Digital, Loi 09-08 Maroc.

### 3 événements
GITEX Africa : Marrakech, 7-9 avril 2026, 3 jours.
ATS London : London Stock Exchange, 29 mai 2026, 1 jour.
VivaTech Paris : Paris Expo, 17-20 juin 2026, 4 jours.

# DIWANE-ARCHITECTURE.md

## CONTEXTE DIWANE

DIWANE (ديوان) est une venture Eigen co-fondée avec le directeur d'Atelier 21 (Casablanca, ami de la famille). Son concept : démocratiser l'expertise art par l'IA, imposer la transparence radicale sur le marché de l'art (le fondateur expose les faux de sa propre collection familiale de 100+ oeuvres de maîtres marocains), et créer un Art Lombard Credit via trois banques familiales (Kenza Bensallah → Crédit du Maroc, Brahim Benjeloun → Bank of Africa, un membre familial PDG → Al Barid Bank).

Constellation DIWANE : Atelier 21 + Christian Monjou (Stanford/Harvard, histoire de l'art) + Lambert (Lazard) + Eigen + 3 banques marocaines.

Le module DIWANE dans RAQIB couvre le marché de l'art des 49 pays du corridor (22 Afrique + 27 EU) — c'est un Bloomberg de l'art avec intelligence sur les artistes, galeries, musées, maisons de ventes, collectionneurs, prix, faux, réglementation, et intégration EIGEN.

---

## DESIGN SYSTEM — HERMÈS LUXURY

Le module DIWANE a son propre thème visuel : HERMÈS. Il est DISTINCT du thème sombre Corridor (Bloomberg) et du thème clair RAQIB (Ivory & Gold).

```css
.diwane-hermes-theme {
  /* Palette Hermès */
  --hermes-orange: #E8600A;
  --hermes-orange-light: #F28C38;
  --hermes-orange-glow: rgba(232,96,10,0.15);
  --hermes-cream: #FAF6F1;
  --hermes-cream-warm: #F5EDE3;
  --hermes-brown: #3C2415;
  --hermes-brown-light: #5E3D2A;
  --hermes-brown-muted: #8B6F5E;
  --hermes-camel: #C19A6B;
  --hermes-gold: #B8963E;
  --hermes-noir: #1A1410;
  --hermes-noir-surface: #241C14;
  --hermes-text: #F5EDE3;
  --hermes-text-muted: #A89585;
  --hermes-text-faint: #6B5E52;
  --hermes-border: #3A2E24;
  --hermes-border-warm: rgba(193,154,107,0.25);
  --hermes-green: #5A8A3A;
  --hermes-red: #A13544;

  /* Typographie */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Base */
  background: var(--hermes-noir);
  color: var(--hermes-text);
  font-family: var(--font-body);
  min-height: 100vh;
}

/* Accents signature Hermès */
.diwane-hermes-theme .accent { color: var(--hermes-orange); }
.diwane-hermes-theme .accent-camel { color: var(--hermes-camel); }

/* Cards avec touche cuir */
.diwane-hermes-theme .card {
  background: var(--hermes-noir-surface);
  border: 1px solid var(--hermes-border);
  border-radius: 4px; /* Plus angulaire que Corridor — luxe Hermès = minimal */
}

/* Boutons signature orange */
.diwane-hermes-theme .btn-primary {
  background: var(--hermes-orange);
  color: var(--hermes-cream);
  border: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.65rem;
  font-weight: 600;
}
```

### Principes

- Fond NOIR chaud (`#1A1410`, pas froid comme Corridor `#0A0A08`)
- Accent ORANGE Hermès (`#E8600A`) au lieu de l'or Corridor (`#C9A96E`)
- Touches CAMEL (`#C19A6B`) pour les éléments secondaires
- Typographie identique (Cormorant Garamond + DM Sans)
- Border-radius MINIMAL (2-4px) — Hermès est angulaire, pas arrondi
- Sensation de CUIR et de SELLERIE dans les textures (bordures subtiles, tons chauds)

---

## STRUCTURE DU MODULE DIWANE

Accessible depuis : Menu RAQIB → Sous-menu Entités → DIWANE

Route : `/diwane` (layout Hermès dédié, comme `/corridor` a son layout sombre)

### Navigation interne (barre horizontale)

```
[TOUS] [AFRIQUE] [UNION EUROPÉENNE] [ARTISTES] [GALERIES] [VENTES AUX ENCHÈRES] [EXPERTISE IA]
```

### Pages

```
/diwane                    — Dashboard art market (49 pays, stats macro, ticker, top artistes)
/diwane/[countryId]        — Fiche pays art (10 onglets)
/diwane/compare            — Comparateur marchés art
/diwane/expertise          — NOOS de l'Art (module expertise IA)
```

### 10 Onglets par fiche pays

1. **Vue d'ensemble** — Marché art du pays (taille, croissance, positionnement mondial)
2. **Artistes** — Top artistes du pays (vivants + historiques), cotes, records, galeries représentantes
3. **Galeries & Espaces** — Galeries d'art, centres d'art, espaces indépendants
4. **Musées & Institutions** — Musées beaux-arts, fondations, biennales, résidences
5. **Ventes aux Enchères** — Maisons de ventes actives, volumes, records, tendances
6. **Collectionneurs & Mécènes** — Grands collectionneurs, fondations privées, mécénat corporate
7. **Art Finance** — Marché du crédit art (Lombard Credit), fonds art, assurance oeuvres, ports francs
8. **Réglementation** — Patrimoine culturel, export/import oeuvres, fiscalité art, droit de suite
9. **Faux & Authentification** — Problématique contrefaçon, certificats, expertise scientifique (NOOS angle)
10. **DIWANE × EIGEN** — Intégration des 7 briques : BURHAN (provenance blockchain), NOOS (expertise IA), ÆLYA (droits artistes), MYNε (marketplace data art), YrKnown (savoir-faire restauration), RAQIB (intelligence marché), MIZAN (paiement oeuvres multi-devises)

---

## DONNÉES SPÉCIFIQUES DIWANE PAR PAYS

### Pour les 22 pays africains (focus art africain contemporain + patrimoine)

```typescript
interface DiwaneCountry {
  id: string;                    // ISO 2
  name: string;
  region: 'africa' | 'eu';

  // VUE D'ENSEMBLE
  artMarketSize: string;         // "$XXM" estimation
  artMarketGrowth: string;       // "+XX% sur 5 ans"
  worldRanking: string;          // "Xème marché art africain"
  keyMovements: string[];        // Mouvements artistiques (École de Dakar, Casablanca Group, Nsukka, etc.)
  majorEvents: string[];         // Biennales, foires (1-54, AKAA, Dak'Art, etc.)

  // ARTISTES
  artists: {
    name: string;
    born: string;                // "1935, Casablanca" ou "1980-"
    medium: string;              // "Peinture, Sculpture"
    movement: string;            // "École de Casablanca"
    auctionRecord: string;       // "$XXX,XXX — Christie's 2024"
    galleries: string[];         // Galeries représentantes
    collections: string[];       // Collections publiques majeures
    significance: string;        // 2 lignes
  }[];

  // GALERIES
  galleries: {
    name: string;
    city: string;
    founded: string;
    director: string;
    specialty: string;           // "Art contemporain africain", "Photographie"
    artists: string[];           // Artistes représentés (top 5)
    website: string;
    fairs: string[];             // Foires où la galerie expose (Art Basel, 1-54, AKAA, etc.)
  }[];

  // MUSÉES & INSTITUTIONS
  museums: {
    name: string;
    city: string;
    type: string;                // "Musée national", "Fondation privée", "Centre d'art"
    collection: string;          // Description collection
    director: string;
    visitors: string;            // "XXX,XXX/an"
    website: string;
  }[];

  // VENTES AUX ENCHÈRES
  auctions: {
    presence: string[];          // Maisons actives (Christie's, Sotheby's, Bonhams, Piasa, Artcurial...)
    totalVolume: string;         // Volume annuel art du pays aux enchères
    topSale: string;             // Record : "Artiste, Titre, $XXX,XXX, Maison, Date"
    trends: string;              // Tendance marché
    localHouses: string[];       // Maisons de ventes locales
  };

  // COLLECTIONNEURS & MÉCÈNES
  collectors: {
    name: string;
    type: string;                // "Privé", "Corporate", "Fondation"
    focus: string;               // "Art contemporain marocain"
    collection: string;          // "300+ oeuvres"
    publicAccess: boolean;       // Ouvert au public ?
  }[];

  // ART FINANCE
  artFinance: {
    lombardCredit: string;       // Disponibilité crédit Lombard dans le pays
    artFunds: string[];          // Fonds d'investissement art actifs
    insurance: string;           // Assureurs art
    freeports: string[];         // Ports francs / stockage art sécurisé
    taxIncentives: string;       // Avantages fiscaux mécénat/collection
  };

  // RÉGLEMENTATION
  regulation: {
    heritageProtection: string;  // Loi patrimoine culturel
    exportRules: string;         // Règles export oeuvres
    importRules: string;         // Droits de douane sur import art
    droitDeSuite: string;        // Droit de suite artiste (% sur reventes)
    taxOnSales: string;          // TVA / taxe sur ventes art
    antiMoneyLaundering: string; // Obligation AML marché art
    culturalRestitution: string; // Enjeux restitution (Bénin, Nigeria, etc.)
  };

  // FAUX & AUTHENTIFICATION
  authentication: {
    forgeryPrevalence: string;   // "Élevée", "Modérée", "Faible"
    mainRisks: string;           // Description des risques
    certificationBodies: string[]; // Organismes de certification
    scientificAnalysis: string;  // Labos d'analyse (C14, spectro, etc.)
    noosRelevance: string;       // Comment NOOS peut aider
  };

  // DIWANE × EIGEN
  eigenIntegration: {
    burhan: string;              // Rôle BURHAN (provenance blockchain)
    noos: string;                // Rôle NOOS (expertise IA, détection faux)
    aelya: string;               // Rôle ÆLYA (droits artistes, consentement reproduction)
    myne: string;                // Rôle MYNε (marketplace données art)
    yrknown: string;             // Rôle YrKnown (savoir-faire restauration, expertise tacite)
    raqib: string;               // Rôle RAQIB (intelligence marché art)
    mizan: string;               // Rôle MIZAN (paiement multi-devises oeuvres)
  };
}
```

### Pour les 27 pays EU (focus marché art, institutions, réglementation)

Fiches plus légères : marché art (taille, top galeries, top maisons de ventes, musées majeurs, réglementation, collectionneurs), pas de section faux/authentification détaillée.

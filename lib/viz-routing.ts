/**
 * Viz-routing: maps each layer (or category) to the appropriate visualization component.
 *
 * Component types:
 * - 'map:pin' | 'map:choropleth' | 'map:heat' | 'map:route' | 'map:insee'
 * - 'chart:bubble' | 'chart:treemap' | 'chart:bar' | 'chart:radar' | 'chart:funnel' | 'chart:heatmap'
 * - 'network:graph' | 'network:org' | 'network:inner' | 'network:synergy' | 'network:flow' | 'network:firewall'
 * - 'timeline:regulatory' | 'timeline:event' | 'timeline:fundraising' | 'timeline:milestone' | 'timeline:publication'
 * - 'table:comparison' | 'table:scoring' | 'table:data'
 */

export type VizType =
  | 'map:pin' | 'map:choropleth' | 'map:heat' | 'map:route' | 'map:insee'
  | 'chart:bubble' | 'chart:treemap' | 'chart:bar' | 'chart:radar' | 'chart:funnel' | 'chart:heatmap'
  | 'network:graph' | 'network:org' | 'network:inner' | 'network:synergy' | 'network:flow' | 'network:firewall'
  | 'timeline:regulatory' | 'timeline:event' | 'timeline:fundraising' | 'timeline:milestone' | 'timeline:publication'
  | 'table:comparison' | 'table:scoring' | 'table:data';

// ── Layer → Viz mapping ──────────────────────────────────────────────
export const VIZ_ROUTING: Record<string, VizType> = {
  // NOOS
  'n01': 'map:pin',             // Psychiatres par ville
  'n02': 'map:pin',             // Psychologues
  'n03': 'map:pin',             // Infirmiers
  'n11': 'map:pin',             // Hopitaux
  'n12': 'map:pin',             // Cliniques
  'n13': 'map:pin',             // CMP
  'n21': 'table:comparison',    // Reglementaire comparatif pays
  'n22': 'table:comparison',
  'n24': 'timeline:regulatory', // AI Act timeline
  'n31': 'map:choropleth',      // Prevalence SM
  'n32': 'map:choropleth',
  'n33': 'map:choropleth',      // Taux suicide
  'n41': 'chart:bubble',        // TAM marche
  'n42': 'chart:bubble',        // Concurrents
  'n51': 'chart:treemap',       // VC healthtech
  'n61': 'network:graph',       // KOLs
  'n71': 'chart:bar',           // Publications
  'n81': 'chart:radar',         // Geopolitique
  'n91': 'table:data',          // Operationnel

  // AELYA
  'a01': 'map:choropleth',      // Lois par pays
  'a11': 'chart:bubble',        // Technologies PET
  'a21': 'map:pin',             // DPO cabinets
  'a81': 'map:choropleth',      // Adequacy decisions

  // MYNe
  'm01': 'chart:treemap',       // Data brokers
  'm21': 'map:choropleth',      // Reglementaire
  'm33': 'network:flow',        // Data mesh

  // BURHAN
  'b21': 'chart:bar',           // Blockchains TPS/gas
  'b31': 'chart:bubble',        // Concurrents

  // YrKnown
  'y01': 'network:graph',       // Experts
  'y21': 'map:pin',             // Patrimoine UNESCO

  // DIWANE
  'd01': 'map:pin',             // Artistes
  'd11': 'map:pin',             // Galeries musees
  'd31': 'chart:bar',           // Credit Lombard
  'd41': 'chart:bubble',        // Marche art

  // AlgueSov
  's01': 'map:heat',            // Zones recolte
  's03': 'map:pin',             // Cooperatives
  's71': 'chart:heatmap',       // Donnees terrain

  // AMANA
  'am01': 'map:pin',            // ONG par pays
  'am02': 'map:pin',            // Associations Maroc
  'am21': 'network:graph',      // Reseau Holmarcom

  // CG SA
  'cg01': 'map:pin',            // Startups Maroc
  'cg02': 'map:pin',            // Startups Senegal
  'cg04': 'map:pin',            // Startups Nigeria
  'cg09': 'table:scoring',      // Grille notation
  'cg41': 'map:choropleth',     // PIB corridor
  'cg51': 'network:inner',      // Inner Circle
  'cg61': 'map:route',          // GITEX itineraire
  'cg68': 'map:route',          // Arc Conquete

  // Cercle du Gazoduc
  'cd01': 'network:org',        // Architecture organigramme
  'cd09': 'network:synergy',    // Synergies matrice
  'cd11': 'network:graph',      // Cooptation
  'cd31': 'network:graph',      // Partenariats
  'cd51': 'network:firewall',   // Gouvernance
  'cd81': 'table:data',         // Data room
};

// ── Category fallback ────────────────────────────────────────────────
export const CATEGORY_VIZ: Record<string, VizType> = {
  'CLINIQUE': 'map:pin',
  'ETABLISSEMENTS': 'map:pin',
  'REGLEMENTAIRE': 'timeline:regulatory',
  'EPIDEMIOLOGIE': 'map:choropleth',
  'MARCHE': 'chart:bubble',
  'INVESTISSEURS': 'chart:treemap',
  'RESEAU': 'network:graph',
  'SCIENTIFIQUE': 'chart:bar',
  'GEOPOLITIQUE': 'map:choropleth',
  'OPERATIONNEL': 'table:data',
  'HALIEUTIQUE': 'map:heat',
  'DEAL FLOW': 'map:pin',
  'EVENEMENTS': 'timeline:event',
  'ARCHITECTURE': 'network:org',
  'GOUVERNANCE': 'network:firewall',
  'PARTENARIATS': 'network:graph',
  'CHARITABLE': 'map:pin',
};

// ── Human-readable labels for each viz type (used in placeholder) ────
export const VIZ_LABELS: Record<VizType, string> = {
  'map:pin': 'Carte avec pins',
  'map:choropleth': 'Carte choroplethe',
  'map:heat': 'Carte de chaleur',
  'map:route': 'Carte itineraire',
  'map:insee': 'Carte INSEE France',
  'chart:bubble': 'Graphe a bulles',
  'chart:treemap': 'Treemap',
  'chart:bar': 'Diagramme a barres',
  'chart:radar': 'Radar 5 axes',
  'chart:funnel': 'Entonnoir',
  'chart:heatmap': 'Heatmap donnees terrain',
  'network:graph': 'Graphe reseau',
  'network:org': 'Organigramme',
  'network:inner': 'Cercle interieur',
  'network:synergy': 'Matrice synergies',
  'network:flow': 'Diagramme flux',
  'network:firewall': 'Diagramme gouvernance',
  'timeline:regulatory': 'Timeline reglementaire',
  'timeline:event': 'Timeline evenements',
  'timeline:fundraising': 'Timeline levees',
  'timeline:milestone': 'Timeline jalons',
  'timeline:publication': 'Timeline publications',
  'table:comparison': 'Tableau comparatif',
  'table:scoring': 'Tableau de notation',
  'table:data': 'Tableau de donnees',
};

/**
 * Resolve the visualization type for a given layer.
 * Falls back to category-based mapping, then to 'table:data'.
 */
export function resolveVizType(layerId: string, categoryLabel?: string): VizType {
  if (VIZ_ROUTING[layerId]) return VIZ_ROUTING[layerId];

  if (categoryLabel) {
    // Normalize: remove accents and uppercase
    const normalized = categoryLabel
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    if (CATEGORY_VIZ[normalized]) return CATEGORY_VIZ[normalized];
  }

  return 'table:data';
}

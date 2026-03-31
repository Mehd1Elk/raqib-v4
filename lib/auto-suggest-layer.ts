const COLUMN_HINTS: Record<string, string[]> = {
  'n01': ['psychiatre', 'medecin', 'rpps', 'specialite', 'cabinet'],
  'n11': ['hopital', 'clinique', 'etablissement', 'lits', 'service'],
  'n31': ['prevalence', 'incidence', 'epidemiologie', 'trouble', 'dsm'],
  'n41': ['concurrent', 'startup', 'valorisation', 'levee', 'digital'],
  'n51': ['fonds', 'vc', 'aum', 'investisseur', 'healthtech'],
  'n61': ['kol', 'expert', 'h_index', 'publications', 'chercheur'],
  'n71': ['publication', 'doi', 'journal', 'auteur', 'abstract'],
  'n81': ['budget', 'sante_mentale', 'pib', 'oms', 'pays'],
  'cg01': ['startup', 'maroc', 'fondateur', 'secteur', 'levee'],
  'cg04': ['startup', 'nigeria', 'fondateur', 'secteur', 'levee'],
  'cg41': ['pib', 'croissance', 'ide', 'population', 'pays'],
  'd01': ['artiste', 'mouvement', 'cote', 'enchere', 'galerie'],
  'd11': ['galerie', 'musee', 'exposition', 'collection'],
  's01': ['algue', 'espece', 'recolte', 'production', 'pecheur'],
  'am01': ['ong', 'association', 'beneficiaire', 'don', 'charitable'],
  'a01': ['rgpd', 'donnees', 'protection', 'cnil', 'autorite'],
  'b21': ['blockchain', 'tps', 'gas', 'consensus', 'smart'],
  'm01': ['courtier', 'broker', 'donnees', 'ca', 'marche'],
  'y01': ['expert', 'patrimoine', 'connaissance', 'tacite', 'institution'],
};

/**
 * Suggest the best matching layer based on column names.
 * Returns null if no strong match (score < 2).
 */
export function suggestLayer(columns: string[]): string | null {
  const colsLower = columns.map((c) =>
    c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
  );

  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [layerId, hints] of Object.entries(COLUMN_HINTS)) {
    const score = hints.filter((h) => colsLower.some((c) => c.includes(h))).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = layerId;
    }
  }

  return bestScore >= 2 ? bestMatch : null;
}

/**
 * Detect the best visualization based on column names and data shape.
 */
export function detectBestViz(columns: string[]): string {
  const colsLower = columns.map((c) => c.toLowerCase());
  const hasLatLng =
    colsLower.some((c) => c.includes('lat')) &&
    colsLower.some((c) => c.includes('lng') || c.includes('lon'));
  const hasCountry = colsLower.some((c) => c.includes('pays') || c.includes('country'));
  const hasCity = colsLower.some((c) => c.includes('ville') || c.includes('city'));
  const hasValue = colsLower.some(
    (c) => c.includes('valeur') || c.includes('value') || c.includes('montant') || c.includes('pib'),
  );
  const hasName = colsLower.some(
    (c) => c.includes('nom') || c.includes('name') || c.includes('artiste') || c.includes('entreprise'),
  );
  const hasDate = colsLower.some((c) => c.includes('date') || c.includes('annee') || c.includes('year'));
  const hasGeoJSON = colsLower.some((c) => c.includes('geometry') || c.includes('geojson'));

  if (hasGeoJSON) return 'ChoroplethMap';
  if (hasLatLng) return 'PinMap';
  if (hasCountry && hasValue) return 'ChoroplethMap';
  if ((hasCity || hasCountry) && hasName) return 'PinMap';
  if (hasName && hasValue && !hasCountry) return 'BubbleChart';
  if (hasDate && hasValue) return 'TimelineLineChart';
  if (hasDate) return 'EventTimeline';
  return 'DataTable';
}

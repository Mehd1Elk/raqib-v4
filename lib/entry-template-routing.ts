export type TemplateType = 'contact' | 'country' | 'startup' | 'regulation' | 'artist' | 'blockchain' | 'default';

export function detectTemplate(layerId: string, data: Record<string, any>): TemplateType {
  const cols = Object.keys(data).map(k => k.toLowerCase());

  // Par layer ID prefix
  if (['n01', 'n02', 'n03', 'n61', 'cg51', 'am02'].some(l => layerId.startsWith(l))) return 'contact';
  if (['cg41', 'cg42', 'cg43', 'cg44', 'cg45', 'n81', 'n83'].some(l => layerId.startsWith(l))) return 'country';
  if (['cg01', 'cg02', 'cg04', 'n41', 'n42'].some(l => layerId.startsWith(l))) return 'startup';
  if (['a01', 'a03', 'a81', 'n21', 'n22', 'n24', 'b01'].some(l => layerId.startsWith(l))) return 'regulation';
  if (['d01', 'd02'].some(l => layerId.startsWith(l))) return 'artist';
  if (['b21', 'b31'].some(l => layerId.startsWith(l))) return 'blockchain';

  // Par colonnes détectées dans la donnée
  if (cols.includes('nom') && (cols.includes('ville') || cols.includes('spécialité') || cols.includes('email'))) return 'contact';
  if (cols.includes('pays') && (cols.includes('pib') || cols.includes('pib_meur') || cols.includes('population'))) return 'country';
  if (cols.includes('artiste') || cols.includes('mouvement')) return 'artist';
  if (cols.includes('loi') || cols.includes('article') || cols.includes('sanctions_max')) return 'regulation';
  if (cols.includes('valorisation') || cols.includes('levée') || cols.includes('secteur')) return 'startup';

  return 'default';
}

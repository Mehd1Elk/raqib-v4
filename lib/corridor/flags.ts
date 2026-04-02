// flags.ts — Premium SVG flag rendering system for 49 countries

type FlagRenderer = (w: number, h: number) => string;

const flagRenderers: Record<string, FlagRenderer> = {

  // ─────────────────────────────────────────────
  // AFRICA (22 countries)
  // ─────────────────────────────────────────────

  // Morocco — Red background, green pentagram outline
  MA: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#C1272D" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <path d="M20 9.5l1.76 5.41h5.69l-4.61 3.35 1.76 5.41L20 20.32l-4.6 3.35 1.76-5.41-4.61-3.35h5.69z" fill="none" stroke="#006233" stroke-width="1.1" stroke-linejoin="round"/>
</svg>`,

  // Nigeria — Green-White-Green vertical tricolor
  NG: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#008751" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FFFFFF"/>
</svg>`,

  // Senegal — Green-Yellow-Red vertical tricolor, green star on yellow
  SN: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#00853F" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FDEF42"/>
  <rect x="26.67" y="0" width="13.33" height="30" fill="#E31B23"/>
  <path d="M20 11.2l1.2 3.68h3.87l-3.13 2.27 1.2 3.68L20 18.56l-3.14 2.27 1.2-3.68-3.13-2.27h3.87z" fill="#00853F"/>
</svg>`,

  // Cote d'Ivoire — Orange-White-Green vertical tricolor
  CI: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#F77F00" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FFFFFF"/>
  <rect x="26.67" y="0" width="13.33" height="30" fill="#009A44"/>
</svg>`,

  // Ghana — Red-Gold-Green horizontal tricolor, black star on gold
  GH: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#006B3F" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#CF0921"/>
  <rect x="0" y="10" width="40" height="10" fill="#FCD116"/>
  <path d="M20 12l1.2 3.68h3.87l-3.13 2.27 1.2 3.68L20 19.36l-3.14 2.27 1.2-3.68-3.13-2.27h3.87z" fill="#000000"/>
</svg>`,

  // Mauritania — Green background, gold crescent and star, red stripes
  MR: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#006233" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="3.5" fill="#D4AF37"/>
  <rect x="0" y="26.5" width="40" height="3.5" fill="#D4AF37"/>
  <path d="M22.5 10a5.5 5.5 0 1 1-9 0 4.3 4.3 0 1 0 9 0z" fill="#D4AF37"/>
  <path d="M20 9.5l0.8 2.46h2.59l-2.1 1.52 0.8 2.46L20 14.41l-2.09 1.53 0.8-2.46-2.1-1.52h2.59z" fill="#D4AF37"/>
</svg>`,

  // Gambia — Red, Blue (thin), Green horizontal stripes with white separators
  GM: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#3A7728" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="11" fill="#CE1126"/>
  <rect x="0" y="11" width="40" height="1.5" fill="#FFFFFF"/>
  <rect x="0" y="12.5" width="40" height="5" fill="#0C1C8C"/>
  <rect x="0" y="17.5" width="40" height="1.5" fill="#FFFFFF"/>
</svg>`,

  // Guinea-Bissau — Red-Yellow-Green vertical tricolor, black star on red
  GW: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#009E49" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13" height="30" fill="#CE1126"/>
  <rect x="13" y="0" width="27" height="15" fill="#F7D116"/>
  <path d="M6.5 12l1.0 3.09h3.25l-2.63 1.91 1.0 3.09L6.5 18.18l-2.62 1.91 1.0-3.09L2.25 15.09h3.25z" fill="#000000"/>
</svg>`,

  // Guinea — Red-Yellow-Green vertical tricolor
  GN: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#009460" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#CE1126"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#F7D116"/>
</svg>`,

  // Sierra Leone — Green-White-Blue horizontal tricolor
  SL: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#0072C6" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#1EB53A"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
</svg>`,

  // Liberia — Red-White horizontal stripes (11), blue canton with white star
  LR: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#BF0A30" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="2.73" width="40" height="2.73" fill="#FFFFFF"/>
  <rect x="0" y="8.18" width="40" height="2.73" fill="#FFFFFF"/>
  <rect x="0" y="13.64" width="40" height="2.73" fill="#FFFFFF"/>
  <rect x="0" y="19.09" width="40" height="2.73" fill="#FFFFFF"/>
  <rect x="0" y="24.55" width="40" height="2.73" fill="#FFFFFF"/>
  <rect x="0" y="0" width="14" height="14" fill="#002868"/>
  <path d="M7 2.5l1.18 3.62h3.8l-3.08 2.23 1.18 3.63L7 9.75l-3.08 2.23 1.18-3.63L2.02 6.12h3.8z" fill="#FFFFFF"/>
</svg>`,

  // Togo — Green-Yellow horizontal stripes (5) with red canton and white star
  TG: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#006A4E" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="6" width="40" height="6" fill="#FFD100"/>
  <rect x="0" y="18" width="40" height="6" fill="#FFD100"/>
  <rect x="0" y="0" width="14" height="18" fill="#D21034"/>
  <circle cx="7" cy="9" r="4" fill="#D21034"/>
  <path d="M7 4.5l1.08 3.32h3.49l-2.82 2.05 1.08 3.32L7 11.14l-2.83 2.05 1.08-3.32L2.43 7.82h3.49z" fill="#FFFFFF"/>
</svg>`,

  // Benin — Green left band, Yellow-Red horizontal right bands
  BJ: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#008751" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="13.33" y="0" width="26.67" height="15" fill="#FCD116"/>
  <rect x="13.33" y="15" width="26.67" height="15" fill="#E8112D"/>
</svg>`,

  // Cameroon — Green-Red-Yellow vertical tricolor, yellow star on red
  CM: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#CE1126" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#007A5E"/>
  <rect x="26.67" y="0" width="13.33" height="30" fill="#FCD116"/>
  <path d="M20 11l1.18 3.62h3.8l-3.08 2.23 1.18 3.63L20 18.43l-3.08 2.05 1.18-3.63-3.08-2.23h3.8z" fill="#FCD116"/>
</svg>`,

  // Gabon — Green-Yellow-Blue horizontal tricolor
  GA: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#009E60" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="10" width="40" height="10" fill="#FCD116"/>
  <rect x="0" y="20" width="40" height="10" fill="#003189"/>
</svg>`,

  // Republic of Congo — Green-Yellow diagonal, Red triangle right
  CG: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#009A44" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <polygon points="0,0 40,0 40,30" fill="#DC241F"/>
  <polygon points="0,0 40,30 0,30" fill="#009A44"/>
  <polygon points="16,0 24,0 40,30 32,30" fill="#FBDE4A"/>
</svg>`,

  // DR Congo — Light blue, red diagonal stripe with yellow border, yellow star
  CD: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#007FFF" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <polygon points="0,30 40,0 40,5 5,30" fill="#F7D618"/>
  <polygon points="0,25 35,0 40,0 5,30 0,30" fill="#CE1021"/>
  <path d="M4 21.5l0.9 2.77h2.91l-2.36 1.71 0.9 2.77L4 26.94l-2.35 1.81 0.9-2.77-2.36-1.71h2.91z" fill="#F7D618"/>
</svg>`,

  // Angola — Red-Black horizontal bicolor, yellow emblem (simplified cogwheel+machete+star)
  AO: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#CC0000" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="15" width="40" height="15" fill="#000000"/>
  <path d="M20 10.5 Q22.5 13 22.5 16 Q22.5 19 20 21.5 Q17.5 19 17.5 16 Q17.5 13 20 10.5z" fill="none" stroke="#FFD700" stroke-width="1.2"/>
  <line x1="15" y1="16" x2="25" y2="16" stroke="#FFD700" stroke-width="1.2"/>
  <path d="M20 12.5l0.8 2.46h2.59l-2.1 1.52 0.8 2.46L20 17.41l-2.09 1.53 0.8-2.46-2.1-1.52h2.59z" fill="#FFD700"/>
</svg>`,

  // Mali — Green-Yellow-Red vertical tricolor
  ML: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#CE1126" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#14B53A"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FCD116"/>
</svg>`,

  // Burkina Faso — Red-Green horizontal bicolor, yellow star
  BF: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#EF2B2D" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="15" width="40" height="15" fill="#009A00"/>
  <path d="M20 11l1.18 3.62h3.8l-3.08 2.23 1.18 3.63L20 18.43l-3.08 2.05 1.18-3.63-3.08-2.23h3.8z" fill="#EFC100"/>
</svg>`,

  // Niger — Orange-White-Green horizontal tricolor, orange circle in center
  NE: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#E05206" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
  <rect x="0" y="20" width="40" height="10" fill="#009A44"/>
  <circle cx="20" cy="15" r="3.5" fill="#E05206"/>
</svg>`,

  // Rwanda — Blue-Yellow-Green horizontal tricolor, yellow sun in blue band
  RW: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#20603D" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="15" fill="#20A0D6"/>
  <rect x="0" y="15" width="40" height="7.5" fill="#FAD201"/>
  <circle cx="31" cy="7.5" r="4" fill="#FAD201"/>
  <circle cx="31" cy="7.5" r="2" fill="#E5AC00"/>
  <line x1="31" y1="2" x2="31" y2="13" stroke="#FAD201" stroke-width="0.8"/>
  <line x1="25.5" y1="7.5" x2="36.5" y2="7.5" stroke="#FAD201" stroke-width="0.8"/>
  <line x1="27.1" y1="3.6" x2="34.9" y2="11.4" stroke="#FAD201" stroke-width="0.6"/>
  <line x1="34.9" y1="3.6" x2="27.1" y2="11.4" stroke="#FAD201" stroke-width="0.6"/>
</svg>`,

  // ─────────────────────────────────────────────
  // EUROPE (27 countries)
  // ─────────────────────────────────────────────

  // France — Blue-White-Red vertical tricolor
  FR: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#ED2939" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#002395"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FFFFFF"/>
</svg>`,

  // Germany — Black-Red-Gold horizontal tricolor
  DE: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#000000" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="10" width="40" height="10" fill="#DD0000"/>
  <rect x="0" y="20" width="40" height="10" fill="#FFCE00"/>
</svg>`,

  // Italy — Green-White-Red vertical tricolor
  IT: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#CE2B37" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#009246"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FFFFFF"/>
</svg>`,

  // Spain — Red-Yellow-Red horizontal (yellow is double width)
  ES: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#AA151B" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="7.5" width="40" height="15" fill="#F1BF00"/>
  <rect x="10" y="10" width="5" height="9" fill="#AA151B" opacity="0.5" rx="1"/>
  <rect x="9" y="11.5" width="7" height="1.5" fill="#AA151B" opacity="0.5"/>
</svg>`,

  // Netherlands — Red-White-Blue horizontal tricolor
  NL: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#AE1C28" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
  <rect x="0" y="20" width="40" height="10" fill="#21468B"/>
</svg>`,

  // Belgium — Black-Yellow-Red vertical tricolor
  BE: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#EF3340" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#000000"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FAE042"/>
</svg>`,

  // Austria — Red-White-Red horizontal tricolor
  AT: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#ED2939" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
</svg>`,

  // Poland — White-Red horizontal bicolor
  PL: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#DC143C" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="15" fill="#FFFFFF"/>
</svg>`,

  // Sweden — Blue background, yellow Nordic cross
  SE: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#006AA7" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="12" width="40" height="6" fill="#FECC02"/>
  <rect x="13" y="0" width="6" height="30" fill="#FECC02"/>
</svg>`,

  // Finland — White background, blue Nordic cross
  FI: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#FFFFFF" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="11.5" width="40" height="7" fill="#003580"/>
  <rect x="11.5" y="0" width="7" height="30" fill="#003580"/>
</svg>`,

  // Portugal — Green-Red vertical (2:3 ratio of bands), coat of arms simplified
  PT: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#FF0000" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="16" height="30" fill="#006600"/>
  <circle cx="16" cy="15" r="5.5" fill="#FFD700" stroke="#FF0000" stroke-width="0.5"/>
  <circle cx="16" cy="15" r="3.5" fill="#FFFFFF" stroke="#003399" stroke-width="0.8"/>
  <rect x="13.5" y="13" width="5" height="4" fill="#003399" opacity="0.7"/>
</svg>`,

  // Ireland — Green-White-Orange vertical tricolor
  IE: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#FF883E" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#169B62"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FFFFFF"/>
</svg>`,

  // Greece — Blue-White horizontal stripes (9), blue canton with white cross
  GR: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#0D5EAF" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="3.33" width="40" height="3.33" fill="#FFFFFF"/>
  <rect x="0" y="10" width="40" height="3.33" fill="#FFFFFF"/>
  <rect x="0" y="16.67" width="40" height="3.33" fill="#FFFFFF"/>
  <rect x="0" y="23.33" width="40" height="3.33" fill="#FFFFFF"/>
  <rect x="0" y="0" width="15" height="16.67" fill="#0D5EAF"/>
  <rect x="4.5" y="0" width="6" height="16.67" fill="#FFFFFF"/>
  <rect x="0" y="5.33" width="15" height="6" fill="#FFFFFF"/>
</svg>`,

  // Czech Republic — White-Red horizontal with blue triangle on hoist
  CZ: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#D7141A" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="15" fill="#FFFFFF"/>
  <polygon points="0,0 18,15 0,30" fill="#11457E"/>
</svg>`,

  // Romania — Blue-Yellow-Red vertical tricolor
  RO: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#CE1126" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="13.33" height="30" fill="#002B7F"/>
  <rect x="13.33" y="0" width="13.34" height="30" fill="#FCD116"/>
</svg>`,

  // Hungary — Red-White-Green horizontal tricolor
  HU: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#436F4D" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#CE2939"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
</svg>`,

  // Denmark — Red background, white Nordic cross (off-center to hoist)
  DK: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#C60C30" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="12" width="40" height="6" fill="#FFFFFF"/>
  <rect x="13" y="0" width="6" height="30" fill="#FFFFFF"/>
</svg>`,

  // Slovakia — White-Blue-Red horizontal tricolor, coat of arms simplified
  SK: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#EE1C25" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#FFFFFF"/>
  <rect x="0" y="10" width="40" height="10" fill="#0B4EA2"/>
  <path d="M13 7 Q13 20 20 23 Q27 20 27 7 Q21 9 13 7z" fill="#FFFFFF" stroke="#EE1C25" stroke-width="0.3"/>
  <rect x="17" y="13" width="6" height="8" fill="#EE1C25"/>
  <rect x="15" y="15" width="10" height="2" fill="#EE1C25"/>
  <path d="M17 11 Q20 9 23 11 Q20 13.5 17 11z" fill="#0B4EA2"/>
  <path d="M15 13 Q20 10 25 13" fill="#0B4EA2"/>
</svg>`,

  // Bulgaria — White-Green-Red horizontal tricolor
  BG: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#D62612" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#FFFFFF"/>
  <rect x="0" y="10" width="40" height="10" fill="#00966E"/>
</svg>`,

  // Croatia — Red-White-Blue horizontal tricolor, coat of arms in center
  HR: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#003DA5" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#FF0000"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
  <rect x="15" y="8" width="10" height="14" fill="#FFFFFF" stroke="#003DA5" stroke-width="0.5" rx="1"/>
  <rect x="15.5" y="8.5" width="2" height="2" fill="#FF0000"/>
  <rect x="17.5" y="8.5" width="2" height="2" fill="#FFFFFF"/>
  <rect x="19.5" y="8.5" width="2" height="2" fill="#FF0000"/>
  <rect x="21.5" y="8.5" width="2" height="2" fill="#FFFFFF"/>
  <rect x="23.5" y="8.5" width="1" height="2" fill="#FF0000"/>
  <rect x="15.5" y="10.5" width="2" height="2" fill="#FFFFFF"/>
  <rect x="17.5" y="10.5" width="2" height="2" fill="#FF0000"/>
  <rect x="19.5" y="10.5" width="2" height="2" fill="#FFFFFF"/>
  <rect x="21.5" y="10.5" width="2" height="2" fill="#FF0000"/>
  <rect x="23.5" y="10.5" width="1" height="2" fill="#FFFFFF"/>
</svg>`,

  // Lithuania — Yellow-Green-Red horizontal tricolor
  LT: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#BE3A34" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#FDB913"/>
  <rect x="0" y="10" width="40" height="10" fill="#006A44"/>
</svg>`,

  // Slovenia — White-Blue-Red horizontal tricolor, coat of arms on hoist
  SI: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#D50000" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#FFFFFF"/>
  <rect x="0" y="10" width="40" height="10" fill="#003DA5"/>
  <path d="M8 5 Q10 2 12 5 Q14 2 16 5 Q14 10 12 12 Q10 10 8 5z" fill="#003DA5"/>
  <rect x="9" y="6" width="1.5" height="3" fill="#D50000"/>
  <rect x="11" y="5" width="1.5" height="3" fill="#D50000"/>
  <rect x="13" y="6" width="1.5" height="3" fill="#D50000"/>
</svg>`,

  // Latvia — Dark red-White-Dark red horizontal tricolor
  LV: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#9E3039" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="12" width="40" height="6" fill="#FFFFFF"/>
</svg>`,

  // Estonia — Blue-Black-White horizontal tricolor
  EE: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#FFFFFF" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#0072CE"/>
  <rect x="0" y="10" width="40" height="10" fill="#000000"/>
</svg>`,

  // Cyprus — White background, orange map of island, olive branches
  CY: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#FFFFFF" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <path d="M13 11 Q16 9 20 10 Q24 9 27 11 Q29 14 27 17 Q25 19 20 20 Q15 19 13 17 Q11 14 13 11z" fill="#D47600" opacity="0.85"/>
  <path d="M12 21 Q16 22 20 23 Q24 22 28 21" fill="none" stroke="#4CAF50" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M12 21 Q10 19 12 21" fill="none" stroke="#4CAF50" stroke-width="0.8"/>
  <path d="M28 21 Q30 19 28 21" fill="none" stroke="#4CAF50" stroke-width="0.8"/>
</svg>`,

  // Luxembourg — Red-White-Light Blue horizontal tricolor
  LU: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#00A3E0" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="40" height="10" fill="#EF3340"/>
  <rect x="0" y="10" width="40" height="10" fill="#FFFFFF"/>
</svg>`,

  // Malta — White-Red vertical bicolor, George Cross on white
  MT: (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="30" rx="2" fill="#CF142B" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
  <rect x="0" y="0" width="20" height="30" fill="#FFFFFF"/>
  <rect x="5" y="7" width="10" height="16" rx="1" fill="none" stroke="#CF142B" stroke-width="1"/>
  <rect x="5" y="12.5" width="10" height="5" fill="#CF142B" opacity="0.25"/>
  <rect x="7.5" y="7" width="5" height="16" fill="#CF142B" opacity="0.25"/>
  <rect x="4" y="4" width="3" height="3" fill="#CF142B"/>
</svg>`,
};

export function getFlag(code: string, size: number = 40): string {
  const ratio = size / 40;
  const h = Math.round(30 * ratio);
  const fn = flagRenderers[code];
  if (!fn) {
    return `<svg width="${size}" height="${h}" viewBox="0 0 40 30" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="30" rx="2" fill="#333" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/><text x="20" y="18" text-anchor="middle" fill="#888" font-size="10" font-family="Inter,sans-serif">${code}</text></svg>`;
  }
  return fn(size, h);
}

export function getFlagCodes(): string[] {
  return Object.keys(flagRenderers);
}

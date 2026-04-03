import type React from 'react';

export const CLINICAL_TEAL_COLORS = {
  primary: "#5AACAC",
  primaryHover: "#4A9F9F",
  primaryLight: "rgba(90, 172, 172, 0.12)",
  steelRAQIB: "#4A6B8C",
  purpleMYNE: "#8E4A9F",
  greenAELYA: "#4CAF50",
  redDisruptive: "#F44336",
  goldBURHAN: "#D4AF37",
  bgDark: "#0B0C10",
  bgPanel: "#15161A",
  borderLight: "rgba(90, 172, 172, 0.12)",
  textMain: "#E0E6ED",
  textMuted: "#8A9BA8",
  // aliases used by new views
  accentTeal: "#5AACAC",
  accentGold: "#D4AF37",
  accentRed: "#F44336",
  accentAmber: "#F59E0B",
  accentGreen: "#4CAF50",
  accentPurple: "#8E4A9F",
  accentBlue: "#4A6B8C",
  bgMain: "#0B0C10",
  border: "rgba(90, 172, 172, 0.12)",
  textSecondary: "#8A9BA8",
};

export const COMMON_STYLES: Record<string, React.CSSProperties> = {
  card: {
    background: "#15161A",
    border: "1px solid rgba(90, 172, 172, 0.12)",
    borderRadius: "4px",
  },
  sectionTitle: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    color: "#5AACAC",
    margin: 0,
    marginBottom: "16px",
  },
  label: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "9px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: "#8A9BA8",
  },
  value: {
    fontFamily: "Geist, sans-serif",
    fontSize: "13px",
    color: "#E0E6ED",
    fontWeight: 600,
  },
  separator: {
    borderBottom: "1px solid rgba(90, 172, 172, 0.12)",
    paddingBottom: "8px",
    marginBottom: "8px",
  },
};

export const CLINICAL_TEAL_THEME = {
  fontFamily: {
    sidebarLogo: "Cormorant Garamond, serif",
    body: "Geist, sans-serif",
    mono: "JetBrains Mono, monospace"
  }
};

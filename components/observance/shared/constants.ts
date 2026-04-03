import type React from 'react';

export const CLINICAL_TEAL_COLORS = {
  primary: "#5AACAC",
  primaryHover: "#4A9F9F",
  primaryLight: "rgba(90, 172, 172, 0.12)",
  steelRAQIB: "#4A6B8C", // Bleu acier
  purpleMYNE: "#8E4A9F", // Violet MYNε
  greenAELYA: "#4CAF50", // Vert ÆLYA
  redDisruptive: "#F44336", // Rouge
  goldBURHAN: "#D4AF37", // Or BURHAN
  bgDark: "#0B0C10",
  bgPanel: "#15161A",
  borderLight: "rgba(90, 172, 172, 0.12)",
  textMain: "#E0E6ED",
  textMuted: "#8A9BA8",
  // Extended tokens for ANAS views
  accentRed: "#F44336",
  accentAmber: "#FF9800",
  accentBlue: "#5AACAC",
  accentTeal: "#5AACAC",
  accentGold: "#D4AF37",
  accentGreen: "#4CAF50",
  accentPurple: "#8E4A9F",
  bgMain: "#0B0C10",
  border: "rgba(90, 172, 172, 0.12)",
  textSecondary: "#8A9BA8",
};

export const COMMON_STYLES = {
  sectionTitle: {
    fontFamily: "Cormorant Garamond, serif",
    fontSize: "22px",
    fontWeight: 400,
    color: "#E0E6ED",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  card: {
    background: "#15161A",
    border: "0.5px solid rgba(90, 172, 172, 0.12)",
  } as React.CSSProperties,
  label: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "9px",
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
    color: "#8A9BA8",
  } as React.CSSProperties,
  value: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "13px",
    color: "#5AACAC",
    fontWeight: 600,
  } as React.CSSProperties,
  separator: {
    borderTop: "0.5px solid rgba(90, 172, 172, 0.12)",
    paddingTop: "8px",
    marginTop: "8px",
    display: "flex",
    width: "100%",
  } as React.CSSProperties,
};

export const CLINICAL_TEAL_THEME = {
  fontFamily: {
    sidebarLogo: "Cormorant Garamond, serif",
    body: "Geist, sans-serif",
    mono: "JetBrains Mono, monospace"
  }
};

export const CONFIANCE_COLORS = {
  background: {
    sidebar: "#1E0A20", // Prune RAQIB
    content: "#060610", // Noir profond teint bleu-nuit
    card: "#0E0E1C"
  },
  text: {
    primary: "#F0EDE6", // Nacre
    secondary: "rgba(0, 212, 184, 0.55)", // Cyan atténué
    tertiary: "rgba(200, 196, 188, 0.30)",
  },
  accent: {
    proof: "#00D4B8", // Cyan EIGEN (primaire)
    certification: "#C9A84C", // Or validation
    alert: "#E84040", // Rouge menace
    regulatory: "#4FC3F7", // Bleu clair
    entropy: "#FFD700", // Or vif signal
    decay: "#FF6B6B", // Corail décroissance
    burhan: "#C8A020" // Or sombre hash
  },
  scores: {
    green: "#38C060",
    orange: "#E89040",
    red: "#E84040"
  },
  border: "rgba(0, 212, 184, 0.08)"
};

export const CONFIANCE_TYPOGRAPHY = {
  scores: {
    fontFamily: "'Fira Code', monospace",
    fontWeight: 600
  },
  labels: {
    fontFamily: "'Fira Code', monospace",
    fontSize: "9px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase" as const
  },
  sectionTitles: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "20px",
    fontWeight: 300
  },
  subtitles: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    fontWeight: 600
  },
  tableData: {
    fontFamily: "'Fira Code', monospace",
    fontSize: "12px",
    fontWeight: 400
  }
};

export const CONFIANCE_STYLES = {
  borderRadius: "6px",
  border: `1px solid ${CONFIANCE_COLORS.border}`,
  separator: `0.5px solid ${CONFIANCE_COLORS.border}`,
  glow: "0 0 15px rgba(0, 212, 184, 0.06)"
};

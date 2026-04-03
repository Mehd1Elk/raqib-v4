export const BLOOMBERG_PRUNE_COLORS = {
  sidebarBg: '#1E0A20',
  contentBg: '#0A0610',
  cardBg: '#120D18',
  border: 'rgba(228,212,234,0.08)',
  textMain: '#F0EDE8',
  textSecondary: 'rgba(228,212,234,0.55)',
  textTertiary: 'rgba(228,212,234,0.30)',
  accentPositive: '#22C55E',
  accentNegative: '#EF4444',
  accentNeutral: '#E8E4DE',
};

export const COMMON_STYLES = {
  card: {
    backgroundColor: BLOOMBERG_PRUNE_COLORS.cardBg,
    border: `1px solid ${BLOOMBERG_PRUNE_COLORS.border}`,
    borderRadius: 0,
  },
  sectionTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '18px',
    fontWeight: 400,
    fontStyle: 'normal',
    color: BLOOMBERG_PRUNE_COLORS.textMain,
  },
  categoryLabel: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '9px',
    fontWeight: 500,
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: BLOOMBERG_PRUNE_COLORS.textSecondary,
  },
  tableData: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '12px',
    fontWeight: 400,
    color: BLOOMBERG_PRUNE_COLORS.textMain,
  },
  pricePositive: {
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 600,
    color: BLOOMBERG_PRUNE_COLORS.accentPositive,
  },
  priceNegative: {
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 600,
    color: BLOOMBERG_PRUNE_COLORS.accentNegative,
  },
  separator: {
    borderBottom: `0.5px solid ${BLOOMBERG_PRUNE_COLORS.border}`,
  }
};

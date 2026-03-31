/**
 * Maps EIGEN layer IDs to JSX/HTML artifact filenames in /public/artifacts/.
 * When a layer has a mapped artifact, VizRenderer renders ArtifactViewer
 * instead of the standard chart/table visualization.
 */
export const ARTIFACT_MAP: Record<string, string> = {
  // EIGEN Strategique — Interfaces & Demos (cat IX)
  'ei81': 'noos-platform-vitrine.jsx',
  'ei82': 'noos-platform-vitrine.jsx',
  'ei83': 'burhan-portals-demo.jsx',
  'ei84': 'aelya-masterplan.jsx',
  'ei85': 'cg-conquete-2026.jsx',
  'ei86': 'eigen-conquest-calendar.jsx',
  'ei87': 'raqib-corridor-intelligence.jsx',
  'ei88': 'noos-constitution-juridique-v2.jsx',
  'ei89': 'noos-ecosysteme-integral.jsx',
  // ei90 = Raqib V4 itself, no artifact

  // Cross-references from other categories
  'ei09': 'noos-plan-execution-ia.jsx',
  'ei10': 'noos-stagiaires-vs-ia.jsx',
  'ei22': 'eigen-conquest-calendar.jsx',
  'ei23': 'eigen-conquest-full.jsx',
  'ei24': 'cg-conquete-2026.jsx',
  'ei25': 'noos-gitex-future-health-prep.jsx',
  'ei29': 'raqib-corridor-intelligence.jsx',
  'ei36': 'burhan-portals-demo.jsx',
  'ei38': 'aelya-masterplan.jsx',
  'ei55': 'noos-constitution-juridique.jsx',
  'ei56': 'noos-constitution-juridique-v2.jsx',
  'ei57': 'noos-ecosysteme-integral.jsx',
  'ei58': 'noos-platform-vitrine.jsx',
  'ei59': 'noos-gitex-future-health-prep.jsx',
  'ei77': 'noos-cartographie-stages.jsx',
};

/** All unique artifact filenames */
export const ALL_ARTIFACTS = [...new Set(Object.values(ARTIFACT_MAP))].sort();

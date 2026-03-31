// ÆLYA Masterplan — Privacy-by-Design Consent & Anonymization Agent
// Eigen Holding SAS · Brique Souverainete des Donnees

const { useState } = React;

const C = {
  ivory: '#FDFAF3', cream: '#F7F3EA', gold: '#B8963E', noir: '#2C2925',
  t1: '#4A4640', t2: '#6B6560', t3: '#918977', sand: '#B5AD9E', div: '#D4CCBA',
  green: '#5B8C6E', red: '#C75B5B', blue: '#5B7B9E', purple: '#8B6B9E',
};

const MODULES = [
  { id: 'consent', name: 'Consent Manager', icon: '\uD83D\uDEE1\uFE0F', status: 'production', desc: 'Collecte granulaire du consentement RGPD/HIPAA avec versioning et audit trail', tech: ['OAuth 2.1', 'OpenID Connect', 'JWT'], metrics: { uptime: '99.97%', latency: '12ms', users: '340K' } },
  { id: 'anonymizer', name: 'Data Anonymizer', icon: '\uD83D\uDD12', status: 'production', desc: 'Pipeline de pseudonymisation/anonymisation avec k-anonymity et l-diversity', tech: ['ARX Framework', 'Differential Privacy', 'Python'], metrics: { datasets: '2.4M', kAnon: 'k=5', accuracy: '97.3%' } },
  { id: 'zkp', name: 'ZKP Engine', icon: '\uD83E\uDDEE', status: 'beta', desc: 'Zero-Knowledge Proofs pour verification d\'identite sans divulgation de donnees', tech: ['zk-SNARKs', 'Groth16', 'Circom'], metrics: { proofs: '180K/j', verify: '8ms', circuits: '42' } },
  { id: 'vault', name: 'Privacy Vault', icon: '\uD83C\uDFE6', status: 'production', desc: 'Stockage chiffre AES-256 avec tokenisation et cles rotatives HSM', tech: ['AES-256-GCM', 'HSM', 'HashiCorp Vault'], metrics: { records: '12M', encrypt: 'AES-256', rotation: '24h' } },
  { id: 'dpia', name: 'DPIA Automator', icon: '\uD83D\uDCCB', status: 'alpha', desc: 'Analyse d\'impact automatisee sur la protection des donnees personnelles', tech: ['NLP', 'Risk Scoring', 'Template Engine'], metrics: { reports: '847', avgTime: '4.2h', score: '98%' } },
  { id: 'portal', name: 'Rights Portal', icon: '\uD83D\uDC64', status: 'production', desc: 'Portail d\'exercice des droits RGPD : acces, rectification, effacement, portabilite', tech: ['React', 'GraphQL', 'PDF Gen'], metrics: { requests: '23K', response: '2.1j', csat: '94%' } },
];

const CONSENT_FLOW = [
  { step: 1, title: 'Collecte', desc: 'L\'utilisateur arrive sur la plateforme NOOS', color: C.blue },
  { step: 2, title: 'Information', desc: 'Presentation claire des finalites de traitement', color: C.purple },
  { step: 3, title: 'Choix granulaire', desc: 'Consentement par finalite : soins, recherche, analytics', color: C.gold },
  { step: 4, title: 'Enregistrement', desc: 'Stockage signe avec horodatage blockchain', color: C.green },
  { step: 5, title: 'Propagation', desc: 'Synchronisation vers tous les sous-traitants', color: C.blue },
  { step: 6, title: 'Audit Trail', desc: 'Preuve cryptographique immutable', color: C.purple },
];

const COMPLIANCE = [
  { reg: 'RGPD (UE)', status: 'conforme', articles: ['Art. 6 Base legale', 'Art. 7 Consentement', 'Art. 17 Effacement', 'Art. 20 Portabilite', 'Art. 25 Privacy by Design', 'Art. 35 DPIA'] },
  { reg: 'HIPAA (US)', status: 'conforme', articles: ['PHI Safeguards', 'Breach Notification', 'Minimum Necessary', 'BAA'] },
  { reg: 'Loi 09-08 (Maroc)', status: 'conforme', articles: ['Declaration CNDP', 'Transferts transfrontaliers', 'Droit acces/rectification'] },
  { reg: 'PDPA (Singapour)', status: 'en cours', articles: ['Consent Obligation', 'Purpose Limitation', 'Data Breach Notification'] },
  { reg: 'POPIA (Afrique du Sud)', status: 'en cours', articles: ['Conditions for Processing', 'Cross-border Transfer'] },
];

const ROADMAP = [
  { q: 'Q1 2025', items: ['Consent Manager v2.0', 'Privacy Vault HSM', 'Audit RGPD annuel'], done: true },
  { q: 'Q2 2025', items: ['ZKP Engine beta publique', 'DPIA Automator v1.0', 'Integration NOOS'], done: true },
  { q: 'Q3 2025', items: ['Certification ISO 27701', 'Portal multilingue FR/EN/AR', 'SDK mobile'], done: false },
  { q: 'Q4 2025', items: ['ZKP production', 'Federated Learning bridge', 'SOC 2 Type II'], done: false },
  { q: 'Q1 2026', items: ['AELYA SaaS launch', 'API marketplace', '100K entreprises cibles'], done: false },
  { q: 'Q2 2026', items: ['GITEX Dubai showcase', 'Expansion MENA', 'Partenariat CNDP'], done: false },
];

function Badge({ status }) {
  const col = { production: C.green, beta: C.gold, alpha: C.red, conforme: C.green, 'en cours': C.gold };
  return React.createElement('span', { style: { fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: col[status] || C.t3, border: '1px solid ' + (col[status] || C.t3), borderRadius: 3, padding: '1px 6px', letterSpacing: '0.5px', textTransform: 'uppercase' } }, status);
}

function App() {
  const [tab, setTab] = useState('architecture');
  const [sel, setSel] = useState(null);
  const [hover, setHover] = useState(null);
  const tabs = ['architecture', 'consent', 'zkp', 'compliance', 'roadmap'];

  return React.createElement('div', { style: { minHeight: '100vh', background: C.cream, fontFamily: 'system-ui, -apple-system, sans-serif' } },
    React.createElement('div', { style: { background: C.ivory, borderBottom: '1px solid ' + C.div, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 700, fontStyle: 'italic', color: C.noir } }, 'AELYA'),
        React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.t3, letterSpacing: '2px', marginTop: 2 } }, 'PRIVACY-BY-DESIGN \u00B7 CONSENT & ANONYMIZATION AGENT')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
        React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: C.green } }),
        React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.green } }, 'SYSTEM OPERATIONAL')
      )
    ),
    React.createElement('div', { style: { display: 'flex', gap: 0, borderBottom: '1px solid ' + C.div, background: C.ivory, paddingLeft: 24 } },
      tabs.map(function(t) { return React.createElement('button', { key: t, onClick: function() { setTab(t); }, style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '1px', padding: '10px 16px', border: 'none', cursor: 'pointer', background: tab === t ? C.cream : 'transparent', color: tab === t ? C.gold : C.t3, borderBottom: tab === t ? '2px solid ' + C.gold : '2px solid transparent' } }, t.toUpperCase()); })
    ),
    React.createElement('div', { style: { padding: 24, maxWidth: 1000, margin: '0 auto' } },

      tab === 'architecture' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: C.noir, marginBottom: 16 } }, 'Architecture Modulaire AELYA'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 } },
          MODULES.map(function(mod) {
            return React.createElement('div', { key: mod.id, onClick: function() { setSel(sel === mod.id ? null : mod.id); }, style: { background: C.ivory, border: '1px solid ' + (sel === mod.id ? C.gold : C.div), borderRadius: 8, padding: 16, cursor: 'pointer', transition: 'all 0.2s', boxShadow: sel === mod.id ? '0 2px 12px ' + C.gold + '22' : 'none' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: { fontSize: 20 } }, mod.icon),
                  React.createElement('span', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 700, color: C.noir } }, mod.name)
                ),
                React.createElement(Badge, { status: mod.status })
              ),
              React.createElement('p', { style: { fontSize: 12, color: C.t2, lineHeight: 1.5, marginBottom: 12 } }, mod.desc),
              React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: sel === mod.id ? 12 : 0 } },
                mod.tech.map(function(t) { return React.createElement('span', { key: t, style: { fontSize: 8, fontFamily: 'JetBrains Mono, monospace', background: C.cream, color: C.t3, padding: '2px 6px', borderRadius: 2 } }, t); })
              ),
              sel === mod.id && React.createElement('div', { style: { borderTop: '1px solid ' + C.div, paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 } },
                Object.entries(mod.metrics).map(function(entry) { return React.createElement('div', { key: entry[0], style: { textAlign: 'center' } },
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: C.gold, fontWeight: 700 } }, entry[1]),
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 7, color: C.t3, letterSpacing: '0.5px', marginTop: 2 } }, entry[0].toUpperCase())
                ); })
              )
            );
          })
        )
      ),

      tab === 'consent' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: C.noir, marginBottom: 24 } }, 'Flux de Consentement RGPD'),
        CONSENT_FLOW.map(function(step, i) {
          return React.createElement('div', { key: step.step, onMouseEnter: function() { setHover(i); }, onMouseLeave: function() { setHover(null); }, style: { display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24, position: 'relative' } },
            React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', background: hover === i ? step.color : C.ivory, border: '2px solid ' + step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: hover === i ? '#fff' : step.color, fontWeight: 700, transition: 'all 0.2s', flexShrink: 0 } }, step.step),
            React.createElement('div', { style: { flex: 1, background: C.ivory, border: '1px solid ' + (hover === i ? step.color : C.div), borderRadius: 8, padding: '12px 16px', transition: 'all 0.2s' } },
              React.createElement('div', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 700, color: C.noir, marginBottom: 4 } }, step.title),
              React.createElement('div', { style: { fontSize: 12, color: C.t2, lineHeight: 1.5 } }, step.desc)
            )
          );
        })
      ),

      tab === 'zkp' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: C.noir, marginBottom: 16 } }, 'Pipeline Zero-Knowledge Proof'),
        React.createElement('div', { style: { background: C.ivory, border: '1px solid ' + C.div, borderRadius: 8, padding: 24 } },
          React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 } },
            ['Identite Patient', 'Circuit Circom', 'Witness Generation', 'Groth16 Proof', 'Verification on-chain'].map(function(s, i) {
              var bgc = i === 0 ? C.blue + '15' : i === 4 ? C.green + '15' : C.gold + '10';
              var bdc = i === 0 ? C.blue : i === 4 ? C.green : C.gold;
              return React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 120px' } },
                i > 0 && React.createElement('span', { style: { color: C.sand, fontSize: 16 } }, '\u2192'),
                React.createElement('div', { style: { background: bgc, border: '1px solid ' + bdc + '40', borderRadius: 6, padding: '10px 14px', textAlign: 'center', flex: 1 } },
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.t1 } }, s)
                )
              );
            })
          ),
          React.createElement('div', { style: { marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 } },
            [{ l: 'Proofs/jour', v: '180K', t: '+23%' }, { l: 'Temps verif.', v: '8ms', t: '-12%' }, { l: 'Circuits actifs', v: '42', t: '+5' }, { l: 'Gas moyen', v: '~245K', t: '-8%' }].map(function(m) {
              return React.createElement('div', { key: m.l, style: { textAlign: 'center', padding: 12, background: C.cream, borderRadius: 6 } },
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: C.gold, fontWeight: 700 } }, m.v),
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.t3, marginTop: 4 } }, m.l),
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.green, marginTop: 2 } }, m.t)
              );
            })
          )
        )
      ),

      tab === 'compliance' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: C.noir, marginBottom: 16 } }, 'Matrice de Conformite'),
        COMPLIANCE.map(function(reg) {
          return React.createElement('div', { key: reg.reg, style: { background: C.ivory, border: '1px solid ' + C.div, borderRadius: 8, padding: 16, marginBottom: 12 } },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
              React.createElement('span', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 700, color: C.noir } }, reg.reg),
              React.createElement(Badge, { status: reg.status })
            ),
            React.createElement('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
              reg.articles.map(function(a) { return React.createElement('span', { key: a, style: { fontSize: 10, fontFamily: 'JetBrains Mono, monospace', background: C.cream, color: C.t2, padding: '3px 8px', borderRadius: 3, border: '1px solid ' + C.div } }, a); })
            )
          );
        })
      ),

      tab === 'roadmap' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: C.noir, marginBottom: 16 } }, 'Roadmap AELYA 2025\u20132026'),
        ROADMAP.map(function(q) {
          return React.createElement('div', { key: q.q, style: { display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' } },
            React.createElement('div', { style: { width: 80, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: q.done ? C.green : C.gold, fontWeight: 700, paddingTop: 4, flexShrink: 0 } }, q.q),
            React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: q.done ? C.green : C.div, border: '2px solid ' + (q.done ? C.green : C.gold), flexShrink: 0, marginTop: 4 } }),
            React.createElement('div', { style: { flex: 1, background: C.ivory, border: '1px solid ' + C.div, borderRadius: 8, padding: 12, opacity: q.done ? 1 : 0.8 } },
              q.items.map(function(item, j) {
                return React.createElement('div', { key: j, style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: j < q.items.length - 1 ? 6 : 0 } },
                  React.createElement('span', { style: { fontSize: 11, color: q.done ? C.green : C.t3 } }, q.done ? '\u2713' : '\u25CB'),
                  React.createElement('span', { style: { fontSize: 12, color: C.t1 } }, item)
                );
              })
            )
          );
        })
      )
    ),
    React.createElement('div', { style: { borderTop: '1px solid ' + C.div, padding: '12px 24px', background: C.ivory, display: 'flex', justifyContent: 'space-between' } },
      React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.t3, letterSpacing: '1px' } }, 'AELYA \u00B7 EIGEN HOLDING SAS \u00B7 BRIQUE SOUVERAINETE DES DONNEES'),
      React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.sand } }, 'v2.4.0 \u00B7 2026')
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

// BURHAN Portals Demo — 6 Blockchain Verification Portals
// Eigen Holding SAS · Brique Tracabilite & Preuve

const { useState } = React;

const C = {
  ivory: '#FDFAF3', cream: '#F7F3EA', gold: '#B8963E', noir: '#2C2925',
  t1: '#4A4640', t2: '#6B6560', t3: '#918977', sand: '#B5AD9E', div: '#D4CCBA',
  green: '#5B8C6E', red: '#C75B5B', blue: '#5B7B9E', purple: '#8B6B9E', orange: '#C7895B',
};

const PORTALS = [
  { id: 'patient', icon: '\uD83E\uDDD1\u200D\u2695\uFE0F', name: 'Portail Patient', color: C.blue, desc: 'Acces securise au dossier medical avec preuves blockchain', features: ['Dossier medical tokenise', 'Historique consentements', 'Preuves ZKP diagnostic', 'Export FHIR chiffre', 'Alertes medicamenteuses'], metrics: { users: '12.4K', sessions: '89K/mois', csat: '96%' }, screens: ['Dashboard sante', 'Historique consultations', 'Gestion consentements', 'Partage medecin'] },
  { id: 'medecin', icon: '\uD83D\uDC68\u200D\u2695\uFE0F', name: 'Portail Medecin', color: C.green, desc: 'Interface clinique avec verification blockchain identite patient', features: ['Verification identite ZKP', 'Prescription on-chain', 'Interoperabilite HL7/FHIR', 'Aide diagnostic IA', 'Teleconsultation securisee'], metrics: { doctors: '2.1K', rxs: '34K/mois', accuracy: '99.2%' }, screens: ['Consultations du jour', 'Dossier patient', 'Ordonnance blockchain', 'Statistiques'] },
  { id: 'admin', icon: '\uD83C\uDFE5', name: 'Portail Admin', color: C.gold, desc: 'Gestion etablissements, flux de donnees et monitoring compliance', features: ['Dashboard compliance temps reel', 'Gestion acces RBAC', 'Audit trail complet', 'Monitoring SLA', 'Reporting reglementaire'], metrics: { sites: '48', compliance: '98.7%', incidents: '0.3/m' }, screens: ['Vue d\'ensemble', 'Gestion utilisateurs', 'Compliance monitor', 'Incidents'] },
  { id: 'chercheur', icon: '\uD83D\uDD2C', name: 'Portail Chercheur', color: C.purple, desc: 'Acces donnees anonymisees pour recherche avec preuves consentement', features: ['Donnees k-anonymisees', 'Requetes federees', 'Proof-of-consent', 'Cohortes dynamiques', 'Export securise'], metrics: { users: '340', datasets: '1.2M', papers: '23' }, screens: ['Catalogue donnees', 'Query builder', 'Resultats cohortes', 'Publications'] },
  { id: 'regulateur', icon: '\u2696\uFE0F', name: 'Portail Regulateur', color: C.red, desc: 'Tableau de bord conformite avec verification proofs blockchain temps reel', features: ['Dashboard RGPD/HIPAA', 'Verification proofs on-chain', 'Rapports automatises', 'Alertes non-conformite', 'Historique sanctions'], metrics: { checks: '15K/j', violations: '2', response: '< 24h' }, screens: ['Conformite globale', 'Verification proofs', 'Rapports', 'Alertes'] },
  { id: 'auditeur', icon: '\uD83D\uDD0D', name: 'Portail Auditeur', color: C.orange, desc: 'Interface audit avec acces lecture seule a la chaine de preuves', features: ['Blockchain explorer', 'Trace complete des acces', 'Verification integrite', 'Rapport audit PDF', 'Certification ISO 27001'], metrics: { audits: '12/an', findings: '0', cert: 'ISO 27001' }, screens: ['Explorer blockchain', 'Journal acces', 'Integrite donnees', 'Certifications'] },
];

function App() {
  const [selId, setSelId] = useState('patient');
  const [screen, setScreen] = useState(0);
  var p = PORTALS.find(function(x) { return x.id === selId; });

  return React.createElement('div', { style: { minHeight: '100vh', background: C.cream, fontFamily: 'system-ui, -apple-system, sans-serif' } },
    React.createElement('div', { style: { background: C.ivory, borderBottom: '1px solid ' + C.div, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700,  color: C.noir } }, 'BURHAN'),
        React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.t3, letterSpacing: '2px', marginTop: 2 } }, 'BLOCKCHAIN VERIFICATION \u00B7 6 PORTAILS METIER')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
        React.createElement('div', { style: { width: 6, height: 6, borderRadius: 0, background: C.green } }),
        React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.green } }, 'ALL PORTALS ONLINE')
      )
    ),

    React.createElement('div', { style: { padding: 24, maxWidth: 1100, margin: '0 auto' } },
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 } },
        PORTALS.map(function(portal) {
          var isSel = selId === portal.id;
          return React.createElement('div', { key: portal.id, onClick: function() { setSelId(portal.id); setScreen(0); }, style: { background: C.ivory, border: '2px solid ' + (isSel ? portal.color : C.div), borderRadius: 0, padding: 16, cursor: 'pointer', transition: 'all 0.3s', boxShadow: isSel ? '0 4px 16px ' + portal.color + '22' : 'none', transform: isSel ? 'translateY(-2px)' : 'none' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 } },
              React.createElement('span', { style: { fontSize: 28 } }, portal.icon),
              React.createElement('div', null,
                React.createElement('div', { style: { fontFamily: 'Playfair Display, serif', fontSize: 14, fontWeight: 700, color: C.noir } }, portal.name),
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: portal.color, letterSpacing: '1px' } }, portal.id.toUpperCase())
              )
            ),
            React.createElement('p', { style: { fontSize: 11, color: C.t2, lineHeight: 1.5, margin: 0 } }, portal.desc)
          );
        })
      ),

      p && React.createElement('div', { style: { background: C.ivory, border: '1px solid ' + C.div, borderRadius: 0, overflow: 'hidden' } },
        React.createElement('div', { style: { background: p.color + '10', borderBottom: '1px solid ' + C.div, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
            React.createElement('span', { style: { fontSize: 32 } }, p.icon),
            React.createElement('div', null,
              React.createElement('div', { style: { fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700,  color: C.noir } }, p.name),
              React.createElement('div', { style: { fontSize: 12, color: C.t2, marginTop: 2 } }, p.desc)
            )
          ),
          React.createElement('div', { style: { display: 'flex', gap: 4, alignItems: 'center' } },
            React.createElement('div', { style: { width: 6, height: 6, borderRadius: 0, background: C.green } }),
            React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.green } }, 'ONLINE')
          )
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid ' + C.div } },
          Object.entries(p.metrics).map(function(e) {
            return React.createElement('div', { key: e[0], style: { padding: '14px 16px', textAlign: 'center', borderRight: '1px solid ' + C.div } },
              React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: p.color, fontWeight: 700 } }, e[1]),
              React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.t3, letterSpacing: '0.5px', marginTop: 4 } }, e[0].toUpperCase())
            );
          })
        ),
        React.createElement('div', { style: { display: 'flex', borderBottom: '1px solid ' + C.div, background: C.cream } },
          p.screens.map(function(s, i) {
            return React.createElement('button', { key: s, onClick: function() { setScreen(i); }, style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, padding: '8px 12px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', background: screen === i ? C.ivory : 'transparent', color: screen === i ? p.color : C.t3, borderBottom: screen === i ? '2px solid ' + p.color : '2px solid transparent' } }, s.toUpperCase());
          })
        ),
        React.createElement('div', { style: { padding: 20 } },
          React.createElement('div', { style: { background: C.cream, borderRadius: 0, border: '1px solid ' + C.div, padding: 16 } },
            React.createElement('div', { style: { fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: C.noir, marginBottom: 12 } }, p.screens[screen]),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } },
              p.features.map(function(f) {
                return React.createElement('div', { key: f, style: { background: C.ivory, border: '1px solid ' + C.div, borderRadius: 0, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6 } },
                  React.createElement('div', { style: { width: 4, height: 4, borderRadius: 0, background: p.color, flexShrink: 0 } }),
                  React.createElement('span', { style: { fontSize: 10, color: C.t1 } }, f)
                );
              })
            )
          )
        )
      )
    ),
    React.createElement('div', { style: { borderTop: '1px solid ' + C.div, padding: '12px 24px', background: C.ivory, display: 'flex', justifyContent: 'space-between' } },
      React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.t3, letterSpacing: '1px' } }, 'BURHAN \u00B7 EIGEN HOLDING SAS \u00B7 BRIQUE TRACABILITE & PREUVE'),
      React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.sand } }, 'v1.8.0 \u00B7 2026')
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

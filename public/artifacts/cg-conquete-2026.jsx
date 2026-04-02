// CG Conquete 2026 — Calendrier Conquete 7 Trips, 9 Villes
// Eigen Holding SAS · CG SA · Arc de Conquete

const { useState } = React;

const C = {
  ivory: '#FDFAF3', cream: '#F7F3EA', gold: '#B8963E', noir: '#2C2925',
  t1: '#4A4640', t2: '#6B6560', t3: '#918977', sand: '#B5AD9E', div: '#D4CCBA',
  green: '#5B8C6E', red: '#C75B5B', blue: '#5B7B9E', purple: '#8B6B9E',
};

const TRIPS = [
  { id: 1, name: 'GITEX Africa', city: 'Marrakech', country: 'Maroc', dates: '2-4 Juin 2026', status: 'confirmed', objectives: ['Lancement NOOS Mental Health', 'Demo BURHAN portails', 'CG Invest pitch 50 startups'], meetings: 24, budget: '45K\u20AC', color: '#E74C3C' },
  { id: 2, name: 'GITEX Dubai', city: 'Dubai', country: 'UAE', dates: '14-18 Oct 2026', status: 'confirmed', objectives: ['Stand Eigen 36m\u00B2', 'Demo Raqib live', 'Meetings VC Gulf'], meetings: 40, budget: '120K\u20AC', color: '#F39C12' },
  { id: 3, name: 'Web Summit', city: 'Lisbonne', country: 'Portugal', dates: '11-14 Nov 2026', status: 'planned', objectives: ['Pitch startup competition', 'Networking EU VCs', 'Press coverage'], meetings: 18, budget: '35K\u20AC', color: '#2ECC71' },
  { id: 4, name: 'Paris HealthTech', city: 'Paris', country: 'France', dates: '22-23 Jan 2026', status: 'completed', objectives: ['Launch NOOS France', 'Partnership CHU', 'RGPD showcase AELYA'], meetings: 15, budget: '20K\u20AC', color: '#3498DB' },
  { id: 5, name: 'Dakar Innovation', city: 'Dakar', country: 'Senegal', dates: '8-10 Mars 2026', status: 'completed', objectives: ['CG SA Senegal office', 'Partenariat DER/FJ', 'Pipeline 30 startups'], meetings: 20, budget: '25K\u20AC', color: '#9B59B6' },
  { id: 6, name: 'Lagos Tech Week', city: 'Lagos', country: 'Nigeria', dates: '15-17 Avril 2026', status: 'confirmed', objectives: ['Entry Nigeria market', 'VC meetings Flutterwave/Paystack', 'Regulatory mapping'], meetings: 22, budget: '30K\u20AC', color: '#1ABC9C' },
  { id: 7, name: 'Singapour FinTech', city: 'Singapour', country: 'Singapour', dates: '3-5 Dec 2026', status: 'planned', objectives: ['APAC expansion', 'MYNe data marketplace launch', 'SG regulatory compliance'], meetings: 16, budget: '55K\u20AC', color: '#E67E22' },
];

const CITIES = [
  { name: 'Casablanca', role: 'HQ', status: 'active', startups: 120, employees: 45 },
  { name: 'Paris', role: 'EU Hub', status: 'active', startups: 0, employees: 8 },
  { name: 'Dubai', role: 'Gulf Hub', status: 'setup', startups: 0, employees: 2 },
  { name: 'Dakar', role: 'West Africa', status: 'active', startups: 30, employees: 6 },
  { name: 'Lagos', role: 'Nigeria', status: 'planned', startups: 0, employees: 0 },
  { name: 'Marrakech', role: 'Events', status: 'active', startups: 15, employees: 0 },
  { name: 'Lisbonne', role: 'EU South', status: 'planned', startups: 0, employees: 0 },
  { name: 'Singapour', role: 'APAC', status: 'planned', startups: 0, employees: 0 },
  { name: 'Londres', role: 'Finance', status: 'planned', startups: 0, employees: 0 },
];

var KPIs = [
  { label: 'Trips planifies', value: '7', sub: '9 villes' },
  { label: 'Meetings cibles', value: '155', sub: '+40% vs 2025' },
  { label: 'Budget total', value: '330K\u20AC', sub: 'ROI attendu x8' },
  { label: 'Startups pipeline', value: '165', sub: 'across 22 pays' },
];

function StatusDot({ status }) {
  var col = { completed: C.green, confirmed: C.gold, planned: C.t3, active: C.green, setup: C.gold };
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
    React.createElement('div', { style: { width: 6, height: 6, borderRadius: 0, background: col[status] || C.t3 } }),
    React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: col[status] || C.t3, textTransform: 'uppercase', letterSpacing: '0.5px' } }, status)
  );
}

function App() {
  const [tab, setTab] = useState('timeline');
  const [selTrip, setSelTrip] = useState(null);

  return React.createElement('div', { style: { minHeight: '100vh', background: C.cream, fontFamily: 'system-ui, -apple-system, sans-serif' } },
    React.createElement('div', { style: { background: C.ivory, borderBottom: '1px solid ' + C.div, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700,  color: C.noir } }, 'Arc de Conquete 2026'),
        React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.t3, letterSpacing: '2px', marginTop: 2 } }, 'CG SA \u00B7 7 TRIPS \u00B7 9 VILLES \u00B7 22 PAYS')
      ),
      React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.gold } }, '2/7 COMPLETED')
    ),

    // KPI bar
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid ' + C.div, background: C.ivory } },
      KPIs.map(function(k) {
        return React.createElement('div', { key: k.label, style: { padding: '12px 16px', textAlign: 'center', borderRight: '1px solid ' + C.div } },
          React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: C.gold, fontWeight: 700 } }, k.value),
          React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.t3, marginTop: 2 } }, k.label.toUpperCase()),
          React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 7, color: C.sand, marginTop: 1 } }, k.sub)
        );
      })
    ),

    // Tabs
    React.createElement('div', { style: { display: 'flex', borderBottom: '1px solid ' + C.div, background: C.ivory, paddingLeft: 24 } },
      ['timeline', 'cities', 'budget'].map(function(t) {
        return React.createElement('button', { key: t, onClick: function() { setTab(t); }, style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '1px', padding: '10px 16px', border: 'none', cursor: 'pointer', background: tab === t ? C.cream : 'transparent', color: tab === t ? C.gold : C.t3, borderBottom: tab === t ? '2px solid ' + C.gold : '2px solid transparent' } }, t.toUpperCase());
      })
    ),

    React.createElement('div', { style: { padding: 24, maxWidth: 1000, margin: '0 auto' } },

      tab === 'timeline' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700,  color: C.noir, marginBottom: 20 } }, 'Timeline des 7 Trips'),
        TRIPS.map(function(trip) {
          var isOpen = selTrip === trip.id;
          return React.createElement('div', { key: trip.id, style: { marginBottom: 12 } },
            React.createElement('div', { onClick: function() { setSelTrip(isOpen ? null : trip.id); }, style: { display: 'flex', alignItems: 'center', gap: 16, background: C.ivory, border: '1px solid ' + (isOpen ? trip.color : C.div), borderRadius: isOpen ? '8px 8px 0 0' : 8, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s' } },
              React.createElement('div', { style: { width: 40, height: 40, borderRadius: 0, background: trip.color + '20', border: '2px solid ' + trip.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: trip.color, flexShrink: 0 } }, '#' + trip.id),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('span', { style: { fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: C.noir } }, trip.name),
                  React.createElement(StatusDot, { status: trip.status })
                ),
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.t3, marginTop: 2 } }, trip.city + ', ' + trip.country + ' \u00B7 ' + trip.dates)
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: C.gold, fontWeight: 700 } }, trip.meetings + ' mtgs'),
                React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.t3 } }, trip.budget)
              )
            ),
            isOpen && React.createElement('div', { style: { background: C.ivory, border: '1px solid ' + trip.color, borderTop: 'none', borderRadius: 0, 0 8px 8px', padding: 16 } },
              React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.gold, letterSpacing: '1px', marginBottom: 8 } }, 'OBJECTIFS'),
              trip.objectives.map(function(obj, i) {
                return React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
                  React.createElement('div', { style: { width: 4, height: 4, borderRadius: 0, background: trip.color, flexShrink: 0 } }),
                  React.createElement('span', { style: { fontSize: 12, color: C.t1 } }, obj)
                );
              })
            )
          );
        })
      ),

      tab === 'cities' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700,  color: C.noir, marginBottom: 16 } }, 'Les 9 Villes du Corridor'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 } },
          CITIES.map(function(city) {
            return React.createElement('div', { key: city.name, style: { background: C.ivory, border: '1px solid ' + C.div, borderRadius: 0, padding: 16 } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                React.createElement('span', { style: { fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: C.noir } }, city.name),
                React.createElement(StatusDot, { status: city.status })
              ),
              React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.gold, marginBottom: 8 } }, city.role),
              React.createElement('div', { style: { display: 'flex', gap: 16 } },
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 16, color: C.t1, fontWeight: 700 } }, city.startups),
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 7, color: C.t3 } }, 'STARTUPS')
                ),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 16, color: C.t1, fontWeight: 700 } }, city.employees),
                  React.createElement('div', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 7, color: C.t3 } }, 'TEAM')
                )
              )
            );
          })
        )
      ),

      tab === 'budget' && React.createElement('div', null,
        React.createElement('h2', { style: { fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700,  color: C.noir, marginBottom: 16 } }, 'Budget par Trip'),
        React.createElement('div', { style: { background: C.ivory, border: '1px solid ' + C.div, borderRadius: 0, padding: 20 } },
          TRIPS.map(function(trip) {
            var maxBudget = 120;
            var val = parseInt(trip.budget);
            var pct = (val / maxBudget * 100);
            return React.createElement('div', { key: trip.id, style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 } },
              React.createElement('div', { style: { width: 140, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.t1, flexShrink: 0 } }, trip.name),
              React.createElement('div', { style: { flex: 1, height: 20, background: C.cream, borderRadius: 0, overflow: 'hidden' } },
                React.createElement('div', { style: { width: pct + '%', height: '100%', background: trip.color, borderRadius: 0, transition: 'width 0.5s' } })
              ),
              React.createElement('div', { style: { width: 60, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.gold, textAlign: 'right', flexShrink: 0 } }, trip.budget)
            );
          }),
          React.createElement('div', { style: { borderTop: '1px solid ' + C.div, marginTop: 16, paddingTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 } },
            React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.t3 } }, 'TOTAL:'),
            React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: C.gold, fontWeight: 700 } }, '330K\u20AC')
          )
        )
      )
    ),

    React.createElement('div', { style: { borderTop: '1px solid ' + C.div, padding: '12px 24px', background: C.ivory, display: 'flex', justifyContent: 'space-between' } },
      React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.t3, letterSpacing: '1px' } }, 'CG SA \u00B7 ARC DE CONQUETE 2026 \u00B7 EIGEN HOLDING SAS'),
      React.createElement('span', { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 8, color: C.sand } }, 'v3.1.0 \u00B7 2026')
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

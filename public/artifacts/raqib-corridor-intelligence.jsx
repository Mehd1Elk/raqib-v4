const { useState, useMemo, useCallback } = React;

const COLORS = {
  ivory: '#FDFAF3', cream: '#F7F3EA', gold: '#B8963E', noir: '#2C2925',
  t1: '#4A4640', t2: '#6B6560', t3: '#918977', div: '#D4CCBA', green: '#5B8C6E',
  goldFaint: 'rgba(184,150,62,0.08)', greenFaint: 'rgba(91,140,110,0.12)',
  redFaint: 'rgba(180,60,60,0.08)', red: '#A0523C',
};
const FONT_H = 'Playfair Display, serif';
const FONT_M = 'JetBrains Mono, monospace';

const COUNTRIES = [
  { id:'MA', name:'Maroc', flag:'\u{1F1F2}\u{1F1E6}', region:'Africa', pib:140, startups:450, ide:3200, pop:37, status:'active', note:'HQ Casablanca \u2014 primary operations center, 3 offices, 45+ team members' },
  { id:'SN', name:'S\u00e9n\u00e9gal', flag:'\u{1F1F8}\u{1F1F3}', region:'Africa', pib:28, startups:120, ide:800, pop:17, status:'active', note:'Dakar hub \u2014 West Africa francophone gateway, fintech & agritech focus' },
  { id:'CI', name:"C\u00f4te d'Ivoire", flag:'\u{1F1E8}\u{1F1EE}', region:'Africa', pib:70, startups:95, ide:1100, pop:28, status:'active', note:'Abidjan fintech cluster \u2014 WAEMU financial capital, mobile money leader' },
  { id:'NG', name:'Nigeria', flag:'\u{1F1F3}\u{1F1EC}', region:'Africa', pib:440, startups:800, ide:5100, pop:220, status:'active', note:'Lagos tech ecosystem \u2014 largest African startup market, $2B+ annual VC' },
  { id:'GH', name:'Ghana', flag:'\u{1F1EC}\u{1F1ED}', region:'Africa', pib:77, startups:140, ide:3600, pop:33, status:'active', note:'Accra innovation zone \u2014 stable regulatory environment, AfCFTA secretariat' },
  { id:'KE', name:'Kenya', flag:'\u{1F1F0}\u{1F1EA}', region:'Africa', pib:110, startups:350, ide:1800, pop:55, status:'active', note:'Nairobi Silicon Savannah \u2014 M-Pesa origin, East Africa tech capital' },
  { id:'ZA', name:'Afrique du Sud', flag:'\u{1F1FF}\u{1F1E6}', region:'Africa', pib:400, startups:520, ide:4200, pop:60, status:'planned', note:'Johannesburg & Cape Town \u2014 deepest African capital markets, JSE listed' },
  { id:'EG', name:'\u00c9gypte', flag:'\u{1F1EA}\u{1F1EC}', region:'Africa', pib:475, startups:310, ide:9800, pop:105, status:'planned', note:'Cairo tech scene \u2014 100M+ population, fastest growing MENA startup ecosystem' },
  { id:'TN', name:'Tunisie', flag:'\u{1F1F9}\u{1F1F3}', region:'Africa', pib:46, startups:85, ide:950, pop:12, status:'active', note:'Tunis nearshore \u2014 strong engineering talent, EU proximity advantage' },
  { id:'RW', name:'Rwanda', flag:'\u{1F1F7}\u{1F1FC}', region:'Africa', pib:13, startups:60, ide:400, pop:14, status:'monitoring', note:'Kigali innovation city \u2014 best ease-of-business in Africa, tech-first governance' },
  { id:'AE', name:'UAE', flag:'\u{1F1E6}\u{1F1EA}', region:'Middle East', pib:500, startups:300, ide:22000, pop:10, status:'planned', note:'Dubai & Abu Dhabi \u2014 MENA financial hub, DIFC/ADGM regulatory sandboxes' },
  { id:'SA', name:'Arabie Saoudite', flag:'\u{1F1F8}\u{1F1E6}', region:'Middle East', pib:1100, startups:180, ide:19500, pop:36, status:'planned', note:'Riyadh Vision 2030 \u2014 $100B+ tech investment pipeline, NEOM smart city' },
  { id:'QA', name:'Qatar', flag:'\u{1F1F6}\u{1F1E6}', region:'Middle East', pib:220, startups:75, ide:4500, pop:3, status:'monitoring', note:'Doha fintech \u2014 QFC hub, sovereign wealth diversification into tech' },
  { id:'BH', name:'Bahrain', flag:'\u{1F1E7}\u{1F1ED}', region:'Middle East', pib:44, startups:55, ide:1800, pop:2, status:'monitoring', note:'Manama fintech hub \u2014 first Gulf fintech sandbox, crypto-friendly regulation' },
  { id:'OM', name:'Oman', flag:'\u{1F1F4}\u{1F1F2}', region:'Middle East', pib:105, startups:40, ide:5600, pop:5, status:'monitoring', note:'Muscat diversification \u2014 logistics corridor, Duqm special economic zone' },
  { id:'FR', name:'France', flag:'\u{1F1EB}\u{1F1F7}', region:'Europe', pib:2800, startups:200, ide:34000, pop:68, status:'active', note:'Paris operations \u2014 La French Tech, Station F, EU regulatory bridge' },
  { id:'PT', name:'Portugal', flag:'\u{1F1F5}\u{1F1F9}', region:'Europe', pib:280, startups:110, ide:8900, pop:10, status:'active', note:'Lisbon Web Summit host \u2014 digital nomad hub, growing VC scene' },
  { id:'GB', name:'UK', flag:'\u{1F1EC}\u{1F1E7}', region:'Europe', pib:3100, startups:250, ide:28000, pop:67, status:'active', note:'London fintech capital \u2014 largest European VC market, FCA sandbox' },
  { id:'DE', name:'Allemagne', flag:'\u{1F1E9}\u{1F1EA}', region:'Europe', pib:4200, startups:180, ide:36000, pop:84, status:'planned', note:'Berlin & Frankfurt \u2014 EU industrial powerhouse, deep B2B SaaS market' },
  { id:'NL', name:'Pays-Bas', flag:'\u{1F1F3}\u{1F1F1}', region:'Europe', pib:1000, startups:130, ide:18000, pop:18, status:'planned', note:'Amsterdam ecosystem \u2014 Adyen/Stripe EU, logistics & trade corridor' },
  { id:'SG', name:'Singapour', flag:'\u{1F1F8}\u{1F1EC}', region:'Asia', pib:400, startups:220, ide:92000, pop:6, status:'planned', note:'APAC gateway \u2014 MAS fintech sandbox, Southeast Asia deal flow hub' },
  { id:'IN', name:'Inde', flag:'\u{1F1EE}\u{1F1F3}', region:'Asia', pib:3700, startups:600, ide:85000, pop:1430, status:'monitoring', note:'Bangalore & Mumbai \u2014 3rd largest startup ecosystem globally, UPI payments' },
];

const REGIONS = ['Africa', 'Middle East', 'Europe', 'Asia'];
const REGION_COLORS = { Africa: '#B8963E', 'Middle East': '#A0523C', Europe: '#5B8C6E', Asia: '#6878A0' };
const STATUS_STYLES = {
  active:     { bg: COLORS.greenFaint, color: COLORS.green, label: 'Active' },
  planned:    { bg: COLORS.goldFaint,  color: COLORS.gold,  label: 'Planned' },
  monitoring: { bg: COLORS.redFaint,   color: COLORS.t3,    label: 'Monitoring' },
};
const TABS = [
  { key: 'corridor',  label: 'Corridor' },
  { key: 'by-region', label: 'By Region' },
  { key: 'rankings',  label: 'Rankings' },
  { key: 'strategy',  label: 'Strategy' },
];

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toLocaleString();
}

function Badge(props) {
  var s = STATUS_STYLES[props.status];
  return React.createElement('span', { style: {
    display: 'inline-block', padding: '2px 10px', borderRadius: 0, fontSize: 11,
    fontFamily: FONT_M, background: s.bg, color: s.color, fontWeight: 600, letterSpacing: 0.5
  } }, s.label);
}

function StatBox(props) {
  return React.createElement('div', { style: {
    textAlign: 'center', padding: '10px 16px', background: COLORS.cream, borderRadius: 0, minWidth: 90
  } },
    React.createElement('div', { style: { fontSize: 20, fontWeight: 700, color: props.accent || COLORS.noir, fontFamily: FONT_H } }, props.value),
    React.createElement('div', { style: { fontSize: 10, color: COLORS.t3, fontFamily: FONT_M, marginTop: 2 } },
      props.unit ? props.label + ' (' + props.unit + ')' : props.label)
  );
}

function CountryDetail(props) {
  var c = props.country;
  return React.createElement('div', {
    style: {
      position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'rgba(44,41,37,0.5)', backdropFilter: 'blur(6px)'
    },
    onClick: props.onClose
  },
    React.createElement('div', {
      style: {
        background: COLORS.ivory, borderRadius: 0, padding: 36, maxWidth: 520, width: '92%',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)', border: '1px solid ' + COLORS.div
      },
      onClick: function (e) { e.stopPropagation(); }
    },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
        React.createElement('div', { style: { fontSize: 28, fontFamily: FONT_H, color: COLORS.noir, fontWeight: 700 } }, c.flag + ' ' + c.name),
        React.createElement('button', {
          onClick: props.onClose,
          style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: COLORS.t3, lineHeight: 1 }
        }, '\u2715')
      ),
      React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' } },
        React.createElement(Badge, { status: c.status }),
        React.createElement('span', { style: {
          display: 'inline-block', padding: '2px 10px', borderRadius: 0, fontSize: 11,
          fontFamily: FONT_M, background: REGION_COLORS[c.region] + '18', color: REGION_COLORS[c.region], fontWeight: 600
        } }, c.region)
      ),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 } },
        React.createElement(StatBox, { label: 'PIB', value: '$' + fmt(c.pib) + 'B', accent: COLORS.gold }),
        React.createElement(StatBox, { label: 'Startups', value: String(c.startups), accent: COLORS.green }),
        React.createElement(StatBox, { label: 'IDE', value: '$' + fmt(c.ide) + 'M', accent: COLORS.noir }),
        React.createElement(StatBox, { label: 'Population', value: c.pop + 'M' })
      ),
      React.createElement('div', { style: {
        padding: 16, background: COLORS.cream, borderRadius: 0, fontFamily: FONT_M, fontSize: 12,
        color: COLORS.t2, lineHeight: 1.7, borderLeft: '3px solid ' + COLORS.gold
      } },
        React.createElement('strong', { style: { color: COLORS.noir } }, 'Strategic Intel: '),
        c.note
      ),
      React.createElement('div', { style: { marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' } },
        React.createElement('div', { style: {
          flex: 1, padding: 12, background: COLORS.cream, borderRadius: 0, textAlign: 'center'
        } },
          React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 10, color: COLORS.t3, marginBottom: 4 } }, 'IDE / CAPITA'),
          React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 18, fontWeight: 700, color: COLORS.gold } },
            '$' + (c.ide / c.pop).toFixed(0) + 'M')
        ),
        React.createElement('div', { style: {
          flex: 1, padding: 12, background: COLORS.cream, borderRadius: 0, textAlign: 'center'
        } },
          React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 10, color: COLORS.t3, marginBottom: 4 } }, 'STARTUP DENSITY'),
          React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 18, fontWeight: 700, color: COLORS.green } },
            (c.startups / c.pop).toFixed(1) + '/M')
        ),
        React.createElement('div', { style: {
          flex: 1, padding: 12, background: COLORS.cream, borderRadius: 0, textAlign: 'center'
        } },
          React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 10, color: COLORS.t3, marginBottom: 4 } }, 'PIB / CAPITA'),
          React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 18, fontWeight: 700, color: COLORS.t1 } },
            '$' + (c.pib * 1000 / c.pop).toFixed(0))
        )
      )
    )
  );
}

function CorridorTab(props) {
  var countries = props.countries, sortKey = props.sortKey, sortDir = props.sortDir;
  var sorted = countries.slice().sort(function (a, b) {
    var va = a[sortKey], vb = b[sortKey];
    if (typeof va === 'string') return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return sortDir === 'asc' ? va - vb : vb - va;
  });
  var cols = [
    { key: 'name', label: 'Country', w: '26%' },
    { key: 'region', label: 'Region', w: '12%' },
    { key: 'pib', label: 'PIB ($B)', w: '12%' },
    { key: 'startups', label: 'Startups', w: '12%' },
    { key: 'ide', label: 'IDE ($M)', w: '13%' },
    { key: 'pop', label: 'Pop (M)', w: '9%' },
    { key: 'status', label: 'Status', w: '16%' },
  ];
  var arrow = function (k) { return k === sortKey ? (sortDir === 'asc' ? ' \u25B2' : ' \u25BC') : ''; };

  return React.createElement('div', { style: { borderRadius: 0, overflow: 'hidden', border: '1px solid ' + COLORS.div } },
    React.createElement('div', { style: {
      display: 'flex', padding: '12px 18px', background: COLORS.cream, borderBottom: '2px solid ' + COLORS.div
    } },
      cols.map(function (c) {
        return React.createElement('div', { key: c.key, style: {
          width: c.w, fontFamily: FONT_M, fontSize: 10, color: COLORS.t3, cursor: 'pointer',
          fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', userSelect: 'none'
        }, onClick: function () { props.onSort(c.key); } }, c.label + arrow(c.key));
      })
    ),
    sorted.map(function (c, i) {
      return React.createElement('div', {
        key: c.id,
        onClick: function () { props.onSelect(c); },
        style: {
          display: 'flex', alignItems: 'center', padding: '11px 18px', cursor: 'pointer',
          borderBottom: '1px solid ' + COLORS.div,
          background: i % 2 === 0 ? COLORS.ivory : COLORS.cream,
          transition: 'background 0.15s'
        },
        onMouseEnter: function (e) { e.currentTarget.style.background = COLORS.goldFaint; },
        onMouseLeave: function (e) { e.currentTarget.style.background = i % 2 === 0 ? COLORS.ivory : COLORS.cream; }
      },
        React.createElement('div', { style: { width: '26%', fontFamily: FONT_H, fontSize: 15, fontWeight: 600, color: COLORS.noir } }, c.flag + ' ' + c.name),
        React.createElement('div', { style: { width: '12%', fontFamily: FONT_M, fontSize: 11, color: REGION_COLORS[c.region] } }, c.region),
        React.createElement('div', { style: { width: '12%', fontFamily: FONT_M, fontSize: 13, color: COLORS.t1 } }, '$' + c.pib),
        React.createElement('div', { style: { width: '12%', fontFamily: FONT_M, fontSize: 13, color: COLORS.green, fontWeight: 600 } }, String(c.startups)),
        React.createElement('div', { style: { width: '13%', fontFamily: FONT_M, fontSize: 13, color: COLORS.t1 } }, '$' + fmt(c.ide)),
        React.createElement('div', { style: { width: '9%', fontFamily: FONT_M, fontSize: 13, color: COLORS.t2 } }, String(c.pop)),
        React.createElement('div', { style: { width: '16%' } }, React.createElement(Badge, { status: c.status }))
      );
    })
  );
}

function RegionTab(props) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 28 } },
    REGIONS.map(function (region) {
      var group = COUNTRIES.filter(function (c) { return c.region === region; });
      var totPib = group.reduce(function (s, c) { return s + c.pib; }, 0);
      var totStartups = group.reduce(function (s, c) { return s + c.startups; }, 0);
      var totIde = group.reduce(function (s, c) { return s + c.ide; }, 0);
      var totPop = group.reduce(function (s, c) { return s + c.pop; }, 0);
      var activeCount = group.filter(function (c) { return c.status === 'active'; }).length;

      return React.createElement('div', { key: region, style: {
        background: COLORS.cream, borderRadius: 0, padding: 24, border: '1px solid ' + COLORS.div,
        borderLeft: '4px solid ' + REGION_COLORS[region]
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 } },
          React.createElement('div', null,
            React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 24, fontWeight: 700, color: REGION_COLORS[region] } }, region),
            React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 11, color: COLORS.t3, marginTop: 2 } },
              group.length + ' countries \u00B7 ' + activeCount + ' active')
          ),
          React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
            React.createElement(StatBox, { label: 'PIB', value: '$' + fmt(totPib) + 'B', accent: REGION_COLORS[region] }),
            React.createElement(StatBox, { label: 'Startups', value: fmt(totStartups), accent: COLORS.green }),
            React.createElement(StatBox, { label: 'IDE', value: '$' + fmt(totIde) + 'M' }),
            React.createElement(StatBox, { label: 'Pop', value: fmt(totPop) + 'M' })
          )
        ),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          group.map(function (c) {
            return React.createElement('div', {
              key: c.id,
              onClick: function () { props.onSelect(c); },
              style: {
                padding: '8px 16px', borderRadius: 0, background: COLORS.ivory, cursor: 'pointer',
                fontFamily: FONT_M, fontSize: 12, color: COLORS.t1, border: '1px solid ' + COLORS.div,
                transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 8
              },
              onMouseEnter: function (e) { e.currentTarget.style.borderColor = COLORS.gold; e.currentTarget.style.background = COLORS.goldFaint; },
              onMouseLeave: function (e) { e.currentTarget.style.borderColor = COLORS.div; e.currentTarget.style.background = COLORS.ivory; }
            },
              React.createElement('span', null, c.flag + ' ' + c.name),
              React.createElement('span', { style: { fontSize: 9, color: COLORS.t3 } }, '$' + c.pib + 'B')
            );
          })
        )
      );
    })
  );
}

function RankingsTab(props) {
  var metrics = [
    { key: 'pib', label: 'PIB ($B)', prefix: '$', suffix: 'B', color: COLORS.gold },
    { key: 'startups', label: 'Startups Tracked', prefix: '', suffix: '', color: COLORS.green },
    { key: 'ide', label: 'IDE Inflows ($M)', prefix: '$', suffix: 'M', color: '#6878A0' },
  ];
  return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 } },
    metrics.map(function (m) {
      var top = COUNTRIES.slice().sort(function (a, b) { return b[m.key] - a[m.key]; }).slice(0, 7);
      var maxVal = top[0][m.key];
      return React.createElement('div', { key: m.key, style: {
        background: COLORS.cream, borderRadius: 0, padding: 22, border: '1px solid ' + COLORS.div
      } },
        React.createElement('div', { style: {
          fontFamily: FONT_H, fontSize: 18, fontWeight: 700, color: COLORS.noir, marginBottom: 18,
          paddingBottom: 10, borderBottom: '2px solid ' + m.color, display: 'inline-block'
        } }, m.label),
        top.map(function (c, i) {
          return React.createElement('div', {
            key: c.id,
            onClick: function () { props.onSelect(c); },
            style: {
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', cursor: 'pointer',
              borderBottom: i < top.length - 1 ? '1px solid ' + COLORS.div : 'none'
            }
          },
            React.createElement('div', { style: {
              width: 24, height: 24, borderRadius: 0, flexShrink: 0,
              background: i === 0 ? m.color : i < 3 ? COLORS.div : 'transparent',
              color: i === 0 ? '#fff' : COLORS.t2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_M, fontSize: 10, fontWeight: 700,
              border: i >= 3 ? '1px solid ' + COLORS.div : 'none'
            } }, String(i + 1)),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: {
                fontFamily: FONT_H, fontSize: 14, fontWeight: 600, color: COLORS.noir,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              } }, c.flag + ' ' + c.name),
              React.createElement('div', { style: {
                height: 4, borderRadius: 0, background: COLORS.div, marginTop: 4, overflow: 'hidden'
              } },
                React.createElement('div', { style: {
                  height: '100%', borderRadius: 0, background: m.color,
                  width: (c[m.key] / maxVal * 100) + '%', transition: 'width 0.4s',
                  opacity: 0.7 + (1 - i / top.length) * 0.3
                } })
              )
            ),
            React.createElement('div', { style: {
              fontFamily: FONT_M, fontSize: 12, fontWeight: 700, color: m.color, minWidth: 64, textAlign: 'right'
            } }, m.prefix + fmt(c[m.key]) + m.suffix)
          );
        })
      );
    })
  );
}

function StrategyTab() {
  var tiers = [
    { tier: 'Tier 1 \u2014 Operational', color: COLORS.green,
      desc: 'Active presence with deployed teams, live deal pipeline, and local partnerships',
      ids: ['MA', 'SN', 'CI', 'NG', 'GH', 'KE', 'FR', 'PT', 'GB', 'TN'] },
    { tier: 'Tier 2 \u2014 Expansion (H2 2026)', color: COLORS.gold,
      desc: 'Partnerships signed, regulatory groundwork complete, launch scheduled H2 2026',
      ids: ['ZA', 'EG', 'AE', 'SA', 'DE', 'NL', 'SG'] },
    { tier: 'Tier 3 \u2014 Intelligence Only', color: COLORS.t3,
      desc: 'Market monitoring, data collection, and opportunity scoring active. Entry TBD.',
      ids: ['QA', 'BH', 'OM', 'RW', 'IN'] },
  ];
  var timeline = [
    { phase: 'Q2 2026', items: ['UAE soft launch via DIFC', 'South Africa JV partnership', 'Germany market scouting mission', 'Egypt regulatory filing'] },
    { phase: 'Q3 2026', items: ['Saudi Arabia Riyadh office', 'Netherlands Amsterdam hub', 'Singapore MAS licensing', 'South Africa operations go-live'] },
    { phase: 'Q4 2026', items: ['Egypt Cairo operations', 'India Bangalore pilot', 'Qatar QFC assessment', 'Germany Berlin office launch'] },
    { phase: 'Q1 2027', items: ['Bahrain CBB licensing', 'Oman Duqm zone study', 'Rwanda Kigali incubator', 'India Mumbai expansion'] },
  ];
  var kpis = [
    { label: 'Target Countries Active by EOY 2026', value: '17/22', color: COLORS.green },
    { label: 'Projected Corridor PIB Coverage', value: '$19.2T', color: COLORS.gold },
    { label: 'Target Startups Tracked', value: '5,000+', color: COLORS.green },
    { label: 'IDE Pipeline Access', value: '$420B+', color: COLORS.gold },
  ];

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 28 } },
    // KPI row
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 } },
      kpis.map(function (k) {
        return React.createElement('div', { key: k.label, style: {
          background: COLORS.cream, borderRadius: 0, padding: 18, textAlign: 'center',
          border: '1px solid ' + COLORS.div
        } },
          React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 26, fontWeight: 700, color: k.color } }, k.value),
          React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 10, color: COLORS.t3, marginTop: 4 } }, k.label)
        );
      })
    ),
    // Tiers
    React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 22, fontWeight: 700, color: COLORS.noir } }, 'Priority Tiers'),
    tiers.map(function (t) {
      var group = t.ids.map(function (id) { return COUNTRIES.find(function (c) { return c.id === id; }); }).filter(Boolean);
      return React.createElement('div', { key: t.tier, style: {
        background: COLORS.cream, borderRadius: 0, padding: 22, border: '1px solid ' + COLORS.div,
        borderLeft: '4px solid ' + t.color
      } },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 } },
          React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 18, fontWeight: 700, color: t.color } }, t.tier),
          React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 11, color: COLORS.t3 } }, group.length + ' countries')
        ),
        React.createElement('div', { style: { fontFamily: FONT_M, fontSize: 12, color: COLORS.t2, marginBottom: 14, lineHeight: 1.5 } }, t.desc),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          group.map(function (c) {
            return React.createElement('span', { key: c.id, style: {
              padding: '5px 14px', borderRadius: 0, background: COLORS.ivory, fontFamily: FONT_M,
              fontSize: 12, color: COLORS.t1, border: '1px solid ' + COLORS.div
            } }, c.flag + ' ' + c.name);
          })
        )
      );
    }),
    // Timeline
    React.createElement('div', { style: { fontFamily: FONT_H, fontSize: 22, fontWeight: 700, color: COLORS.noir, marginTop: 4 } }, 'Expansion Timeline'),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
      timeline.map(function (t) {
        return React.createElement('div', { key: t.phase, style: {
          background: COLORS.cream, borderRadius: 0, padding: 20, border: '1px solid ' + COLORS.div
        } },
          React.createElement('div', { style: {
            fontFamily: FONT_M, fontSize: 14, fontWeight: 700, color: COLORS.gold, marginBottom: 12,
            borderBottom: '1px solid ' + COLORS.div, paddingBottom: 8
          } }, t.phase),
          t.items.map(function (item, i) {
            return React.createElement('div', { key: i, style: {
              fontFamily: FONT_M, fontSize: 12, color: COLORS.t1, padding: '5px 0',
              display: 'flex', alignItems: 'center', gap: 10
            } },
              React.createElement('span', { style: { color: COLORS.gold, fontSize: 8, flexShrink: 0 } }, '\u25CF'),
              item
            );
          })
        );
      })
    )
  );
}

function App() {
  var _tab = useState('corridor');
  var tab = _tab[0], setTab = _tab[1];
  var _sortKey = useState('name');
  var sortKey = _sortKey[0], setSortKey = _sortKey[1];
  var _sortDir = useState('asc');
  var sortDir = _sortDir[0], setSortDir = _sortDir[1];
  var _selected = useState(null);
  var selected = _selected[0], setSelected = _selected[1];

  var handleSort = useCallback(function (key) {
    if (key === sortKey) {
      setSortDir(function (d) { return d === 'asc' ? 'desc' : 'asc'; });
    } else {
      setSortKey(key);
      setSortDir(key === 'name' || key === 'region' || key === 'status' ? 'asc' : 'desc');
    }
  }, [sortKey]);

  var totals = useMemo(function () {
    return {
      pib: COUNTRIES.reduce(function (s, c) { return s + c.pib; }, 0),
      startups: COUNTRIES.reduce(function (s, c) { return s + c.startups; }, 0),
      ide: COUNTRIES.reduce(function (s, c) { return s + c.ide; }, 0),
      pop: COUNTRIES.reduce(function (s, c) { return s + c.pop; }, 0),
      active: COUNTRIES.filter(function (c) { return c.status === 'active'; }).length,
    };
  }, []);

  return React.createElement('div', { style: {
    minHeight: '100vh', background: COLORS.ivory, fontFamily: FONT_H, color: COLORS.noir
  } },
    // Header
    React.createElement('div', { style: {
      padding: '32px 40px 24px', borderBottom: '1px solid ' + COLORS.div
    } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 } },
        React.createElement('div', null,
          React.createElement('div', { style: {
            fontSize: 11, fontFamily: FONT_M, color: COLORS.gold, letterSpacing: 2.5,
            textTransform: 'uppercase', marginBottom: 8
          } }, 'Eigen Intelligence \u00B7 Raqib'),
          React.createElement('h1', { style: {
            fontSize: 34, fontWeight: 700, margin: 0, color: COLORS.noir, lineHeight: 1.1
          } }, 'Corridor Dashboard'),
          React.createElement('div', { style: { fontSize: 14, color: COLORS.t2, marginTop: 8, fontFamily: FONT_M, fontSize: 12 } },
            '22 countries \u00B7 4 regions \u00B7 strategic intelligence layer')
        ),
        React.createElement('div', { style: { display: 'flex', gap: 14, flexWrap: 'wrap' } },
          React.createElement(StatBox, { label: 'PIB cumul\u00e9', value: '$' + fmt(totals.pib) + 'B', accent: COLORS.gold }),
          React.createElement(StatBox, { label: 'Startups', value: fmt(totals.startups), accent: COLORS.green }),
          React.createElement(StatBox, { label: 'IDE total', value: '$' + fmt(totals.ide) + 'M' }),
          React.createElement(StatBox, { label: 'Active', value: totals.active + '/22', accent: COLORS.green })
        )
      )
    ),
    // Tab bar
    React.createElement('div', { style: {
      display: 'flex', gap: 0, padding: '0 40px', borderBottom: '1px solid ' + COLORS.div, background: COLORS.cream
    } },
      TABS.map(function (t) {
        return React.createElement('button', {
          key: t.key,
          onClick: function () { setTab(t.key); },
          style: {
            padding: '14px 28px', fontFamily: FONT_M, fontSize: 12, fontWeight: 600,
            border: 'none', cursor: 'pointer', letterSpacing: 0.5, transition: 'all 0.15s',
            borderBottom: tab === t.key ? '2px solid ' + COLORS.gold : '2px solid transparent',
            color: tab === t.key ? COLORS.gold : COLORS.t3,
            background: 'transparent'
          }
        }, t.label);
      })
    ),
    // Content area
    React.createElement('div', { style: { padding: '28px 40px 60px' } },
      tab === 'corridor' && React.createElement(CorridorTab, {
        countries: COUNTRIES, sortKey: sortKey, sortDir: sortDir,
        onSort: handleSort, onSelect: setSelected
      }),
      tab === 'by-region' && React.createElement(RegionTab, { countries: COUNTRIES, onSelect: setSelected }),
      tab === 'rankings' && React.createElement(RankingsTab, { countries: COUNTRIES, onSelect: setSelected }),
      tab === 'strategy' && React.createElement(StrategyTab, null)
    ),
    // Detail modal
    selected && React.createElement(CountryDetail, { country: selected, onClose: function () { setSelected(null); } })
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

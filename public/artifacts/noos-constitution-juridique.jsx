const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Cormorant Garamond, serif';
const MF = 'JetBrains Mono, monospace';
const shareholders = [
  { name:'Eigen Holding SAS', pct:80, shares:4000, type:'Majority Shareholder', color:C.gold },
  { name:'Founders (3 co-founders)', pct:15, shares:750, type:'Founders Pool', color:C.green },
  { name:'ESOP Pool', pct:5, shares:250, type:'Employee Stock Option Plan', color:'#8B5CF6' },
];
const articles = [
  { num:'Art. 1', title:'Denomination', content:'The company is named NOOS, a societe par actions simplifiee (SAS) governed by French law, the present statutes, and applicable regulations pertaining to digital health enterprises.' },
  { num:'Art. 2', title:'Objet Social', content:'NOOS SAS has for its corporate purpose the design, development, and commercialization of digital health solutions including telemedicine platforms, AI-assisted diagnostics, patient monitoring systems, and pharmacovigilance tools for the African and international markets.' },
  { num:'Art. 3', title:'Siege Social', content:'The registered office is established at 15 Avenue des Champs-Elysees, 75008 Paris, France. It may be transferred to any other location by decision of the President, subject to ratification by the shareholders at the next annual general assembly.' },
  { num:'Art. 4', title:'Duree', content:'The company is formed for a duration of ninety-nine (99) years commencing from its registration with the Registre du Commerce et des Societes, unless earlier dissolved or extended by a decision of the shareholders.' },
  { num:'Art. 5', title:'Capital Social', content:'The share capital is fixed at fifty thousand euros (50,000 EUR) divided into five thousand (5,000) shares of ten euros (10 EUR) each, fully subscribed and paid up at the time of constitution. Shares are nominative and recorded in a share register maintained at the registered office.' },
  { num:'Art. 6', title:'Organes de Direction', content:'The company is managed by a President (Directeur General) who has the broadest powers to act in all circumstances on behalf of the company. A Directeur General Delegue may be appointed by the President to assist in the management of the company with delegated powers.' },
  { num:'Art. 7', title:'Assemblees Generales', content:'Collective decisions of shareholders are taken in general meetings, which may be held physically or by videoconference. Ordinary decisions require a simple majority of votes cast. Extraordinary decisions (amendments to statutes, capital increases or decreases) require a two-thirds majority of votes cast.' },
  { num:'Art. 8', title:'Exercice Social', content:'The financial year begins on January 1 and ends on December 31 of each year. The first financial year shall exceptionally run from the date of incorporation to December 31, 2026.' },
  { num:'Art. 9', title:'Repartition des Benefices', content:'Net profits, after deduction of the legal reserve (five percent until reaching ten percent of capital), shall be distributed as dividends or carried forward to subsequent financial years as decided by the ordinary general assembly. The President may propose interim dividends.' },
  { num:'Art. 10', title:'Dissolution et Liquidation', content:'The company may be dissolved by decision of the extraordinary general assembly or by operation of law. Upon dissolution, one or more liquidators shall be appointed by the shareholders to wind up the affairs of the company.' },
];
const structure = {
  entity:'NOOS SAS',
  capital:'50,000 EUR',
  shares:'5,000 shares at 10 EUR',
  jurisdiction:'France',
  registration:'RCS Paris (pending)',
  president:'TBD - Co-founder 1',
  dg_delegue:'TBD - Co-founder 2',
  commissaire:'Not required (below threshold)',
  fiscal_year:'Jan 1 - Dec 31',
  duration:'99 years',
};
const timeline = [
  { date:'Jan 2026', event:'Statuts drafted', status:'done' },
  { date:'Feb 2026', event:'Notarial deposit of capital', status:'done' },
  { date:'Feb 2026', event:'RCS registration filing', status:'progress' },
  { date:'Mar 2026', event:'KBIS certificate received', status:'pending' },
  { date:'Mar 2026', event:'Bank account operational', status:'pending' },
  { date:'Apr 2026', event:'First board resolution', status:'pending' },
];
const TABS = ['structure','articles','shareholders'];

function App() {
  const [tab, setTab] = useState('structure');
  const [hover, setHover] = useState(null);
  const [expandedArt, setExpandedArt] = useState(null);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:24 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t), onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius:6, cursor:'pointer', transition:'all 0.2s' }
    }, t))
  );

  const structureView = h('div', null,
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, marginBottom:16 } },
      ...Object.entries(structure).map(([k,v],i) => h('div', { key:i, onMouseEnter:()=>setHover('s-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='s-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:8, padding:16, transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1, marginBottom:4 } }, k.replace(/_/g,' ')),
        h('div', { style:{ fontFamily:HF, fontSize:17, fontWeight:600, color:C.noir } }, v)
      ))
    ),
    h('div', { style:{ background:C.cream, border:'1px solid '+C.div, borderRadius:10, padding:20, textAlign:'center', marginBottom:16 } },
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1.5, marginBottom:10 } }, 'Corporate Hierarchy'),
      h('div', { style:{ display:'flex', justifyContent:'center', alignItems:'center', gap:12 } },
        h('div', { style:{ fontFamily:HF, fontSize:15, fontWeight:700, color:C.gold, padding:'10px 18px', border:'2px solid '+C.gold, borderRadius:8, background:C.gold+'08' } }, 'Eigen Holding SAS'),
        h('div', { style:{ fontFamily:MF, fontSize:20, color:C.t3 } }, '\u2192'),
        h('div', { style:{ fontFamily:HF, fontSize:15, fontWeight:700, color:C.noir, padding:'10px 18px', border:'2px solid '+C.noir, borderRadius:8 } }, 'NOOS SAS'),
      ),
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, marginTop:8 } }, '80% ownership | Full operational control')
    ),
    h('div', { style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:16 } },
      h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir, marginBottom:12 } }, 'Incorporation Timeline'),
      ...timeline.map((t,i) => {
        const sc = { done:C.green, progress:C.gold, pending:C.t3 };
        return h('div', { key:i, style:{ display:'flex', alignItems:'center', gap:12, padding:'8px 0', borderBottom: i<timeline.length-1 ? '1px solid '+C.div+'66' : 'none' } },
          h('div', { style:{ width:10, height:10, borderRadius:'50%', background:sc[t.status], flexShrink:0 } }),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, width:70 } }, t.date),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir, flex:1 } }, t.event),
          h('div', { style:{ fontFamily:MF, fontSize:9, padding:'2px 8px', borderRadius:10, background:sc[t.status]+'22', color:sc[t.status], textTransform:'uppercase' } }, t.status)
        );
      })
    )
  );

  const articlesView = h('div', { style:{ display:'flex', flexDirection:'column', gap:6 } },
    h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, marginBottom:8 } }, articles.length+' articles | Click to expand'),
    ...articles.map((a,i) => h('div', { key:i, onClick:()=>setExpandedArt(expandedArt===i?null:i),
      onMouseEnter:()=>setHover('a-'+i), onMouseLeave:()=>setHover(null),
      style:{ background: hover==='a-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:8, padding:14,
        cursor:'pointer', transition:'all 0.2s', borderLeft:'3px solid '+(expandedArt===i ? C.gold : 'transparent') }
    },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
        h('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
          h('span', { style:{ fontFamily:MF, fontSize:11, color:C.gold, fontWeight:700, width:50 } }, a.num),
          h('span', { style:{ fontFamily:HF, fontSize:17, fontWeight:600, color:C.noir } }, a.title)
        ),
        h('span', { style:{ fontFamily:MF, fontSize:14, color:C.t3, transition:'transform 0.2s', transform: expandedArt===i ? 'rotate(90deg)':'none' } }, '\u25B6')
      ),
      expandedArt===i && h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1, lineHeight:1.7, marginTop:12, paddingTop:12, borderTop:'1px solid '+C.div } }, a.content)
    ))
  );

  const total = shareholders.reduce((s,x)=>s+x.pct,0);
  const shareholdersView = h('div', null,
    h('div', { style:{ display:'flex', height:28, borderRadius:14, overflow:'hidden', marginBottom:20 } },
      ...shareholders.map((s,i) => h('div', { key:i, style:{ width:s.pct+'%', background:s.color, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s' },
        onMouseEnter:()=>setHover('sh-'+i), onMouseLeave:()=>setHover(null) },
        s.pct >= 10 && h('span', { style:{ fontFamily:MF, fontSize:9, color:'#fff', fontWeight:700 } }, s.pct+'%')
      ))
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 } },
      ...shareholders.map((s,i) => h('div', { key:i, onMouseEnter:()=>setHover('shd-'+i), onMouseLeave:()=>setHover(null),
        style:{ display:'flex', alignItems:'center', justifyContent:'space-between', background: hover==='shd-'+i ? C.cream : C.ivory,
          border:'1px solid '+C.div, borderRadius:10, padding:16, transition:'all 0.2s' }
      },
        h('div', { style:{ display:'flex', alignItems:'center', gap:12 } },
          h('div', { style:{ width:16, height:16, borderRadius:4, background:s.color } }),
          h('div', null,
            h('div', { style:{ fontFamily:HF, fontSize:17, fontWeight:700, color:C.noir } }, s.name),
            h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, s.type)
          )
        ),
        h('div', { style:{ textAlign:'right' } },
          h('div', { style:{ fontFamily:HF, fontSize:26, fontWeight:700, color:s.color } }, s.pct+'%'),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, s.shares.toLocaleString()+' shares')
        )
      ))
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 } },
      ...[ ['Par Value','10 EUR',C.gold], ['Total Shares','5,000',C.noir], ['Capital','50,000 EUR',C.green] ].map(([l,v,c],i) =>
        h('div', { key:i, style:{ background:C.cream, borderRadius:8, padding:14, textAlign:'center' } },
          h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:c } }, v),
          h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase' } }, l)
        )
      )
    )
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:820, margin:'0 auto' } },
      h('div', { style:{ display:'flex', alignItems:'center', gap:12, marginBottom:4 } },
        h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:0 } }, 'NOOS Constitution Juridique'),
        h('span', { style:{ fontFamily:MF, fontSize:10, padding:'3px 10px', borderRadius:20, background:C.gold+'22', color:C.gold } }, 'v1')
      ),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:24 } }, 'SAS | Capital 50K EUR | RCS Paris | '+articles.length+' articles'),
      tabBar,
      tab==='structure' && structureView,
      tab==='articles' && articlesView,
      tab==='shareholders' && shareholdersView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

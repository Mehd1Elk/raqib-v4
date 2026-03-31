const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Cormorant Garamond, serif';
const MF = 'JetBrains Mono, monospace';
const shareholders = [
  { name:'Eigen Holding SAS', pct:65, prev:80, shares:13000, color:C.gold },
  { name:'Founders (3 co-founders)', pct:15, prev:15, shares:3000, color:C.green },
  { name:'Investors (Series Seed)', pct:15, prev:0, shares:3000, color:'#3B82F6' },
  { name:'ESOP Pool', pct:5, prev:5, shares:1000, color:'#8B5CF6' },
];
const changes = [
  { field:'Capital Social', v1:'50,000 EUR', v2:'200,000 EUR', type:'major' },
  { field:'Nombre d\'actions', v1:'5,000 shares', v2:'20,000 shares', type:'major' },
  { field:'Eigen Holding %', v1:'80%', v2:'65%', type:'major' },
  { field:'New: Investors', v1:'N/A', v2:'15% (Series Seed)', type:'new' },
  { field:'Advisory Board', v1:'Not present', v2:'3-member advisory board', type:'new' },
  { field:'International Expansion', v1:'Not addressed', v2:'Art. 11: Subsidiaries in 3 African markets', type:'new' },
  { field:'Anti-Dilution', v1:'Not present', v2:'Weighted-average anti-dilution for investors', type:'new' },
  { field:'Drag-Along / Tag-Along', v1:'Not present', v2:'Standard provisions added (Art. 13)', type:'new' },
  { field:'Board Composition', v1:'President only', v2:'President + 2 board members + 1 investor seat', type:'major' },
  { field:'Vesting Schedule', v1:'Not specified', v2:'4-year vesting, 1-year cliff for ESOP', type:'new' },
  { field:'Commissaire aux Comptes', v1:'Not required', v2:'Required (above 200K threshold)', type:'major' },
  { field:'Preemption Rights', v1:'Basic', v2:'Enhanced with 30-day notice period', type:'major' },
];
const governance = [
  { role:'President (CEO)', holder:'Co-founder 1', powers:'Full executive authority, represents company, signs contracts up to 500K EUR', category:'executive' },
  { role:'Directeur General Delegue', holder:'Co-founder 2', powers:'Operations, technology, delegated signing authority up to 100K EUR', category:'executive' },
  { role:'Board Member', holder:'Co-founder 3', powers:'Strategy, clinical oversight, quality governance', category:'board' },
  { role:'Investor Board Seat', holder:'Lead Investor Rep', powers:'Observer rights, veto on expenditures >100K EUR, board meeting attendance', category:'investor' },
  { role:'Advisory Board Chair', holder:'Industry Expert (Health)', powers:'Quarterly strategic counsel, market access advisory', category:'advisory' },
  { role:'Advisory Board Member', holder:'Industry Expert (Tech)', powers:'Technology roadmap review, partnership introductions', category:'advisory' },
  { role:'Advisory Board Member', holder:'Industry Expert (Africa)', powers:'Pan-African expansion strategy, government relations', category:'advisory' },
];
const catColors = { executive:C.gold, board:C.green, investor:'#3B82F6', advisory:'#8B5CF6' };
const TABS = ['structure','changes','governance'];

function App() {
  const [tab, setTab] = useState('structure');
  const [hover, setHover] = useState(null);
  const [showDiff, setShowDiff] = useState(true);
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
      ...[ ['Entity','NOOS SAS'],['Capital','200,000 EUR'],['Shares','20,000 at 10 EUR'],['Jurisdiction','France + 3 African subsidiaries'],
           ['Registration','RCS Paris B 912 XXX XXX'],['Fiscal Year','Jan 1 - Dec 31'],['Governance','Board of 4 + Advisory Board of 3'],['Auditor','Required (above 200K threshold)'],
           ['Duration','99 years'],['Registered Office','15 Av. Champs-Elysees, Paris']
      ].map(([k,v],i) => h('div', { key:i, onMouseEnter:()=>setHover('s-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='s-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:8, padding:14, transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1, marginBottom:4 } }, k),
        h('div', { style:{ fontFamily:HF, fontSize:16, fontWeight:600, color:C.noir } }, v)
      ))
    ),
    h('div', { style:{ marginBottom:16 } },
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1, marginBottom:8 } }, 'Cap Table v2'),
      h('div', { style:{ display:'flex', height:32, borderRadius:16, overflow:'hidden', marginBottom:12 } },
        ...shareholders.map((s,i) => h('div', { key:i, style:{ width:s.pct+'%', background:s.color, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' },
          onMouseEnter:()=>setHover('bar-'+i), onMouseLeave:()=>setHover(null) },
          s.pct >= 10 && h('span', { style:{ fontFamily:MF, fontSize:9, color:'#fff', fontWeight:700 } }, s.pct+'%')
        ))
      ),
      h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8 } },
        ...shareholders.map((s,i) => h('div', { key:i, onMouseEnter:()=>setHover('sh-'+i), onMouseLeave:()=>setHover(null),
          style:{ display:'flex', alignItems:'center', justifyContent:'space-between', background: hover==='sh-'+i ? C.cream : C.ivory,
            border:'1px solid '+C.div, borderRadius:8, padding:12, transition:'all 0.2s' }
        },
          h('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
            h('div', { style:{ width:12, height:12, borderRadius:3, background:s.color } }),
            h('div', null,
              h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1 } }, s.name),
              h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3 } }, s.shares.toLocaleString()+' shares')
            )
          ),
          h('div', { style:{ textAlign:'right' } },
            h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:s.color } }, s.pct+'%'),
            s.prev !== s.pct && h('div', { style:{ fontFamily:MF, fontSize:9, color: s.prev > s.pct ? '#D4443B' : C.green } },
              (s.prev > s.pct ? '\u2193' : s.prev < s.pct ? '\u2191' : '') + ' from '+s.prev+'%')
          )
        ))
      )
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 } },
      ...[ ['Par Value','10 EUR',C.gold], ['Shares','20,000',C.noir], ['Capital','200K EUR',C.green], ['Shareholders','4','#3B82F6'] ].map(([l,v,c],i) =>
        h('div', { key:i, style:{ background:C.cream, borderRadius:8, padding:12, textAlign:'center' } },
          h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:c } }, v),
          h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase' } }, l)
        )
      )
    )
  );

  const typeColors = { major:'#D4443B', new:C.green, minor:C.gold };
  const changesView = h('div', null,
    h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 } },
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, changes.length+' changes from v1 to v2'),
      h('div', { style:{ display:'flex', gap:8 } },
        ...['major','new'].map(t => {
          const cnt = changes.filter(c=>c.type===t).length;
          return h('span', { key:t, style:{ fontFamily:MF, fontSize:9, padding:'2px 8px', borderRadius:10,
            background:typeColors[t]+'22', color:typeColors[t] } }, cnt+' '+t);
        })
      )
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'160px 1fr 1fr 60px', gap:8, padding:'8px 12px', background:C.cream, borderRadius:6, marginBottom:6 } },
      ...['Field','v1 (Previous)','v2 (Current)','Type'].map((l,i) =>
        h('div', { key:i, style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l))
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:4 } },
      ...changes.map((c,i) => h('div', { key:i, onMouseEnter:()=>setHover('c-'+i), onMouseLeave:()=>setHover(null),
        style:{ display:'grid', gridTemplateColumns:'160px 1fr 1fr 60px', gap:8, alignItems:'center',
          background: hover==='c-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:6, padding:'10px 12px', transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600 } }, c.field),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, textDecoration: c.type==='major'?'line-through':'none' } }, c.v1),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600 } }, c.v2),
        h('div', { style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:10, textAlign:'center',
          background:typeColors[c.type]+'22', color:typeColors[c.type], textTransform:'uppercase' } }, c.type)
      ))
    )
  );

  const governanceView = h('div', null,
    h('div', { style:{ display:'flex', gap:8, marginBottom:16 } },
      ...Object.entries(catColors).map(([cat,color]) => {
        const cnt = governance.filter(g=>g.category===cat).length;
        return h('div', { key:cat, style:{ fontFamily:MF, fontSize:9, padding:'4px 10px', borderRadius:12,
          background:color+'15', border:'1px solid '+color+'44', color } }, cat+' ('+cnt+')');
      })
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:12 } },
      ...governance.map((g,i) => h('div', { key:i, onMouseEnter:()=>setHover('g-'+i), onMouseLeave:()=>setHover(null),
        style:{ display:'flex', alignItems:'flex-start', gap:16, background: hover==='g-'+i ? C.cream : C.ivory,
          border:'1px solid '+C.div, borderRadius:10, padding:16, transition:'all 0.2s',
          borderLeft:'4px solid '+catColors[g.category] }
      },
        h('div', { style:{ width:40, height:40, borderRadius:'50%', background:catColors[g.category]+'22',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:HF, fontSize:18, fontWeight:700, color:catColors[g.category], flexShrink:0 } }, (i+1)),
        h('div', { style:{ flex:1 } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:2 } },
            h('span', { style:{ fontFamily:HF, fontSize:17, fontWeight:700, color:C.noir } }, g.role),
            h('span', { style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:8,
              background:catColors[g.category]+'22', color:catColors[g.category], textTransform:'uppercase' } }, g.category)
          ),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.gold, marginBottom:4 } }, g.holder),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t2, lineHeight:1.5 } }, g.powers)
        )
      ))
    )
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:900, margin:'0 auto' } },
      h('div', { style:{ display:'flex', alignItems:'center', gap:12, marginBottom:4 } },
        h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:0 } }, 'NOOS Constitution Juridique'),
        h('span', { style:{ fontFamily:MF, fontSize:10, padding:'3px 10px', borderRadius:20, background:C.green+'22', color:C.green } }, 'v2 - Updated')
      ),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:24 } }, 'SAS | Capital 200K EUR | 4 shareholders | Board + Advisory | '+changes.length+' changes from v1'),
      tabBar,
      tab==='structure' && structureView,
      tab==='changes' && changesView,
      tab==='governance' && governanceView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Playfair Display, serif';
const MF = 'JetBrains Mono, monospace';
const poles = [
  { name:'Usine', agents:120, daily:'2,400 tasks', color:'#3B82F6',
    tasks:['Code generation & review','Infrastructure management','CI/CD automation','Database optimization','API endpoint creation'],
    status:'operational', uptime:99.2, efficiency:87 },
  { name:'Marketing', agents:145, daily:'4,350 outputs', color:C.gold,
    tasks:['Content creation (5 languages)','Social media scheduling','SEO optimization','Email campaigns','Ad copy generation'],
    status:'operational', uptime:98.8, efficiency:92 },
  { name:'QA', agents:160, daily:'12,800 tests', color:C.green,
    tasks:['Automated test execution','Regression testing','Performance benchmarking','Security scanning','Accessibility audits'],
    status:'operational', uptime:99.5, efficiency:95 },
  { name:'Blueprint', agents:50, daily:'150 designs', color:'#8B5CF6',
    tasks:['Architecture diagrams','UI mockup generation','Data flow modeling','System documentation','API specification'],
    status:'scaling', uptime:97.5, efficiency:78 },
  { name:'Cognitif', agents:25, daily:'500 analyses', color:'#C17B3A',
    tasks:['Strategic analysis','Market research synthesis','Competitive intelligence','Trend forecasting','Decision support'],
    status:'beta', uptime:96.0, efficiency:72 },
  { name:'Fantomes', agents:20, daily:'200 audits', color:'#D4443B',
    tasks:['Shadow testing production','Chaos engineering','Failure simulation','Recovery validation','Compliance checking'],
    status:'beta', uptime:94.5, efficiency:68 },
];
const totalAgents = poles.reduce((s,p)=>s+p.agents,0);
const TABS = ['overview','by-pole','output','performance'];

function App() {
  const [tab, setTab] = useState('overview');
  const [hover, setHover] = useState(null);
  const [selectedPole, setSelectedPole] = useState(null);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:24 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t), onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius: 0, cursor:'pointer', transition:'all 0.2s' }
    }, t.replace('-',' ')))
  );

  const overviewView = h('div', null,
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 } },
      ...[ ['Total Agents',totalAgents,C.noir],['Poles',6,C.gold],['Daily Output','20,400+',C.green] ].map(([l,v,c],i) =>
        h('div', { key:i, onMouseEnter:()=>setHover('ov-'+i), onMouseLeave:()=>setHover(null),
          style:{ background: hover==='ov-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:20, textAlign:'center', transition:'all 0.2s' }
        },
          h('div', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:c } }, v),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l)
        )
      )
    ),
    h('div', { style:{ display:'flex', height:32, borderRadius: 0, overflow:'hidden', marginBottom:16 } },
      ...poles.map((p,i) => h('div', { key:i, style:{ width:(p.agents/totalAgents*100)+'%', background:p.color, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' },
        onMouseEnter:()=>setHover('bar-'+i), onMouseLeave:()=>setHover(null), onClick:()=>{ setSelectedPole(i); setTab('by-pole'); } },
        (p.agents/totalAgents*100) > 8 && h('span', { style:{ fontFamily:MF, fontSize:9, color:'#fff', fontWeight:700 } }, p.agents)
      ))
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 } },
      ...poles.map((p,i) => h('div', { key:i, onMouseEnter:()=>setHover('p-'+i), onMouseLeave:()=>setHover(null),
        onClick:()=>{ setSelectedPole(i); setTab('by-pole'); },
        style:{ background: hover==='p-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:14,
          cursor:'pointer', transition:'all 0.2s', borderLeft:'4px solid '+p.color }
      },
        h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir } }, p.name),
        h('div', { style:{ fontFamily:MF, fontSize:20, fontWeight:700, color:p.color, margin:'4px 0' } }, p.agents+' agents'),
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, p.daily+'/day')
      ))
    )
  );

  const byPoleView = h('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
    ...poles.map((p,i) => h('div', { key:i, onMouseEnter:()=>setHover('bp-'+i), onMouseLeave:()=>setHover(null),
      style:{ background: hover==='bp-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:20,
        borderLeft:'5px solid '+p.color, transition:'all 0.2s' }
    },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 } },
        h('div', null,
          h('span', { style:{ fontFamily:HF, fontSize:22, fontWeight:700, color:C.noir } }, p.name),
          h('span', { style:{ fontFamily:MF, fontSize:11, color:p.color, marginLeft:12 } }, p.agents+' agents')
        ),
        h('div', { style:{ fontFamily:MF, fontSize:10, padding:'3px 10px', borderRadius: 0,
          background: p.status==='operational' ? C.green+'22' : C.gold+'22', color: p.status==='operational' ? C.green : C.gold,
          textTransform:'uppercase' } }, p.status)
      ),
      h('div', { style:{ display:'flex', flexWrap:'wrap', gap:6 } },
        ...p.tasks.map((t,j) => h('span', { key:j, style:{ fontFamily:MF, fontSize:10, padding:'4px 10px', borderRadius: 0, background:p.color+'15', color:C.t1 } }, t))
      )
    ))
  );

  const outputView = h('div', null,
    h('div', { style:{ background:C.cream, borderRadius: 0, padding:20, marginBottom:16 } },
      h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:C.noir, marginBottom:12 } }, 'Daily Output Summary'),
      ...poles.map((p,i) => h('div', { key:i, style:{ display:'flex', alignItems:'center', gap:10, marginBottom:10 } },
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1, width:90 } }, p.name),
        h('div', { style:{ flex:1, height:10, background:C.div, borderRadius: 0, overflow:'hidden' } },
          h('div', { style:{ width:(p.agents/160*100)+'%', height:'100%', background:p.color, borderRadius: 0, } })
        ),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:p.color, fontWeight:600, width:110, textAlign:'right' } }, p.daily)
      ))
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 } },
      ...[ ['Weekly Total','142,800+',C.noir], ['Monthly Total','612,000+',C.gold], ['Cost per Task','0.003 EUR',C.green], ['Avg Response','1.2s','#3B82F6'] ].map(([l,v,c],i) =>
        h('div', { key:i, style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:16, textAlign:'center' } },
          h('div', { style:{ fontFamily:HF, fontSize:24, fontWeight:700, color:c } }, v),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase' } }, l)
        )
      )
    )
  );

  const perfView = h('div', { style:{ display:'flex', flexDirection:'column', gap:12 } },
    h('div', { style:{ display:'grid', gridTemplateColumns:'120px repeat(3,1fr)', gap:8, padding:'8px 12px', background:C.cream, borderRadius: 0, } },
      ...['Pole','Uptime','Efficiency','Status'].map((h2,i) => h('div', { key:i, style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, h2))
    ),
    ...poles.map((p,i) => h('div', { key:i, onMouseEnter:()=>setHover('pf-'+i), onMouseLeave:()=>setHover(null),
      style:{ display:'grid', gridTemplateColumns:'120px repeat(3,1fr)', gap:8, padding:'12px', alignItems:'center',
        background: hover==='pf-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, transition:'all 0.2s' }
    },
      h('div', { style:{ fontFamily:HF, fontSize:16, fontWeight:700, color:C.noir } }, p.name),
      h('div', null,
        h('div', { style:{ fontFamily:MF, fontSize:14, color: p.uptime>=99 ? C.green : p.uptime>=97 ? C.gold : '#D4443B', fontWeight:600 } }, p.uptime+'%'),
        h('div', { style:{ height:4, background:C.div, borderRadius: 0, marginTop:4, overflow:'hidden' } },
          h('div', { style:{ width:p.uptime+'%', height:'100%', background: p.uptime>=99 ? C.green : C.gold, borderRadius: 0, } })
        )
      ),
      h('div', null,
        h('div', { style:{ fontFamily:MF, fontSize:14, color: p.efficiency>=90 ? C.green : p.efficiency>=75 ? C.gold : '#D4443B', fontWeight:600 } }, p.efficiency+'%'),
        h('div', { style:{ height:4, background:C.div, borderRadius: 0, marginTop:4, overflow:'hidden' } },
          h('div', { style:{ width:p.efficiency+'%', height:'100%', background: p.efficiency>=90 ? C.green : C.gold, borderRadius: 0, } })
        )
      ),
      h('div', { style:{ fontFamily:MF, fontSize:10, padding:'3px 10px', borderRadius: 0, display:'inline-block',
        background: p.status==='operational' ? C.green+'22' : C.gold+'22', color: p.status==='operational' ? C.green : C.gold, textTransform:'uppercase' } }, p.status)
    ))
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:960, margin:'0 auto' } },
      h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:'0 0 4px' } }, 'NOOS AI Execution Plan'),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:24 } }, totalAgents+' AI agents across 6 operational poles'),
      tabBar,
      tab==='overview' && overviewView,
      tab==='by-pole' && byPoleView,
      tab==='output' && outputView,
      tab==='performance' && perfView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

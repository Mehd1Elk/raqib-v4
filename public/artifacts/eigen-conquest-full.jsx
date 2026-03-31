const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Cormorant Garamond, serif';
const MF = 'JetBrains Mono, monospace';
const phases = [
  { id:1, name:'Foundation', period:'Q1-Q2 2026', color:C.gold, status:'active', progress:42,
    objectives:['Legal entity setup (NOOS SAS)','Recruit core team (15 people)','MVP platform launch','Secure 10 pilot clients','GITEX Africa presence','Dakar Innovation Forum','Seed documentation complete'],
    kpis:[
      {label:'Team Size',target:'15',current:'12',pct:80,unit:'people'},
      {label:'Pilot Clients',target:'10',current:'6',pct:60,unit:'clients'},
      {label:'Platform Uptime',target:'99.5%',current:'99.2%',pct:99,unit:'%'},
      {label:'Revenue',target:'100K',current:'45K',pct:45,unit:'EUR'},
      {label:'NPS Score',target:'50+',current:'42',pct:84,unit:'pts'},
      {label:'Code Coverage',target:'80%',current:'72%',pct:90,unit:'%'}
    ],
    risks:[
      {desc:'Regulatory delays in health sector',severity:'high',mitigation:'Parallel legal tracks in 3 jurisdictions',impact:'3-month delay possible'},
      {desc:'Talent acquisition in Africa',severity:'medium',mitigation:'Remote-first model + competitive ESOP',impact:'Slower feature delivery'},
      {desc:'MVP scope creep',severity:'medium',mitigation:'Strict 8-week sprint cycles with feature freeze',impact:'Budget overrun 15%'},
      {desc:'Currency fluctuation (EUR/XOF)',severity:'low',mitigation:'Multi-currency treasury strategy',impact:'5% margin impact'}
    ]},
  { id:2, name:'Expansion', period:'Q3-Q4 2026', color:C.green, status:'upcoming', progress:0,
    objectives:['Scale to 50 active clients','Launch in 3 African markets','GITEX Dubai + Web Summit','Series A fundraise (2M EUR)','Platform v2 with AI diagnostics','ISO 13485 pre-audit','Strategic partnerships (3+)'],
    kpis:[
      {label:'Active Clients',target:'50',current:'--',pct:0,unit:'clients'},
      {label:'Markets',target:'3',current:'1',pct:33,unit:'countries'},
      {label:'Revenue',target:'500K',current:'--',pct:0,unit:'EUR'},
      {label:'AI Accuracy',target:'95%',current:'--',pct:0,unit:'%'},
      {label:'Team Size',target:'30',current:'--',pct:0,unit:'people'},
      {label:'MRR Growth',target:'20%',current:'--',pct:0,unit:'m/m'}
    ],
    risks:[
      {desc:'Market entry barriers in Nigeria/Senegal',severity:'high',mitigation:'Local partnerships + government relations',impact:'6-month delay per market'},
      {desc:'Fundraising timeline risk',severity:'high',mitigation:'Dual track: VC fundraise + revenue growth',impact:'Runway < 6 months'},
      {desc:'Platform scalability under load',severity:'medium',mitigation:'Cloud-native architecture, load testing Q2',impact:'Service degradation'},
      {desc:'Competition from US/EU entrants',severity:'medium',mitigation:'Africa-first design advantage + local team',impact:'Market share erosion'}
    ]},
  { id:3, name:'Scale', period:'2027', color:'#8B5CF6', status:'planned', progress:0,
    objectives:['100+ enterprise clients','Expand to 10 markets across Africa','Revenue target 2M EUR','ISO 13485 certification','Strategic partnerships with 3 health ministries','Series B preparation','Open Casablanca + Lagos offices'],
    kpis:[
      {label:'Clients',target:'100+',current:'--',pct:0,unit:'enterprise'},
      {label:'Markets',target:'10',current:'--',pct:0,unit:'countries'},
      {label:'Revenue',target:'2M',current:'--',pct:0,unit:'EUR'},
      {label:'Team',target:'80+',current:'--',pct:0,unit:'people'},
      {label:'Retention',target:'95%',current:'--',pct:0,unit:'clients'},
      {label:'Gross Margin',target:'70%',current:'--',pct:0,unit:'%'}
    ],
    risks:[
      {desc:'Pan-African regulatory complexity',severity:'high',mitigation:'Dedicated compliance team per region',impact:'Cannot operate in 3+ markets'},
      {desc:'Competition from US/EU players',severity:'medium',mitigation:'Africa-first design + local data sovereignty',impact:'Pricing pressure'},
      {desc:'Cash burn rate acceleration',severity:'high',mitigation:'Path to profitability by Q3 2027',impact:'Need bridge round'},
      {desc:'Key person dependency',severity:'medium',mitigation:'Leadership depth + succession planning',impact:'Execution slowdown'}
    ]},
];
const TABS = ['phases','kpis','risks'];

function App() {
  const [tab, setTab] = useState('phases');
  const [hover, setHover] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(0);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const overallProgress = h('div', { style:{ display:'flex', gap:4, height:8, borderRadius:4, overflow:'hidden', marginBottom:20 } },
    ...phases.map((p,i) => h('div', { key:i, style:{ flex:1, background: p.progress > 0 ? p.color : C.div, position:'relative' } },
      p.progress > 0 && h('div', { style:{ position:'absolute', top:0, left:0, width:p.progress+'%', height:'100%', background:p.color, opacity:0.6 } })
    ))
  );

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:24 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t),
      onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius:6, cursor:'pointer', transition:'all 0.2s' }
    }, t))
  );

  const phasesView = h('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
    ...phases.map((p,i) => h('div', { key:i,
      onMouseEnter:()=>setHover('p-'+i), onMouseLeave:()=>setHover(null),
      style:{ background: hover==='p-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:12, padding:24,
        borderLeft:'5px solid '+p.color, transition:'all 0.25s', transform: hover==='p-'+i?'translateX(4px)':'none',
        cursor:'pointer' },
      onClick:()=>setExpandedPhase(expandedPhase===i?null:i)
    },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:expandedPhase===i?16:0 } },
        h('div', null,
          h('div', { style:{ fontFamily:HF, fontSize:24, fontWeight:700, color:C.noir } }, 'Phase '+p.id+': '+p.name),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3 } }, p.period)
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
          p.progress > 0 && h('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
            h('div', { style:{ width:60, height:6, background:C.div, borderRadius:3, overflow:'hidden' } },
              h('div', { style:{ width:p.progress+'%', height:'100%', background:p.color, borderRadius:3 } })
            ),
            h('span', { style:{ fontFamily:MF, fontSize:10, color:p.color } }, p.progress+'%')
          ),
          h('div', { style:{ fontFamily:MF, fontSize:10, padding:'4px 12px', borderRadius:20,
            background:p.color+'22', color:p.color, textTransform:'uppercase', letterSpacing:1 } }, p.status),
          h('span', { style:{ fontFamily:MF, fontSize:14, color:C.t3, transition:'transform 0.2s',
            transform: expandedPhase===i ? 'rotate(90deg)':'none' } }, '\u25B6')
        )
      ),
      expandedPhase===i && h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:8,
        paddingTop:12, borderTop:'1px solid '+C.div } },
        ...p.objectives.map((o,j) => h('div', { key:j, style:{ display:'flex', alignItems:'flex-start', gap:8,
          fontFamily:MF, fontSize:11, color:C.t1, padding:'6px 10px', borderRadius:6, background:p.color+'08',
          border:'1px solid '+p.color+'22' } },
          h('span', { style:{ color:p.color, fontWeight:700, flexShrink:0 } }, (j+1)+'.'), o
        ))
      )
    ))
  );

  const kpisView = h('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
    ...phases.map((p,i) => h('div', { key:i, style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius:12, padding:20 } },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 } },
        h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:p.color } }, 'Phase '+p.id+': '+p.name),
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, p.kpis.length+' KPIs tracked')
      ),
      h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 } },
        ...p.kpis.map((k,j) => h('div', { key:j, onMouseEnter:()=>setHover('k-'+i+'-'+j), onMouseLeave:()=>setHover(null),
          style:{ background: hover==='k-'+i+'-'+j ? C.cream : 'transparent', border:'1px solid '+C.div, borderRadius:8, padding:14, transition:'all 0.2s' }
        },
          h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase', letterSpacing:1, marginBottom:4 } }, k.label),
          h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'baseline', margin:'6px 0' } },
            h('span', { style:{ fontFamily:HF, fontSize:22, fontWeight:700, color:C.noir } }, k.current),
            h('span', { style:{ fontFamily:MF, fontSize:9, color:C.t3 } }, 'target: '+k.target+' '+k.unit)
          ),
          h('div', { style:{ height:5, background:C.div, borderRadius:3, overflow:'hidden' } },
            h('div', { style:{ width:k.pct+'%', height:'100%', background:p.color, borderRadius:3, transition:'width 0.5s' } })
          )
        ))
      )
    ))
  );

  const sevColor = { high:'#D4443B', medium:C.gold, low:C.green };
  const risksView = h('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
    ...phases.map((p,i) => h('div', { key:i, style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius:12, padding:20 } },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 } },
        h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:p.color } }, 'Phase '+p.id+' Risks'),
        h('div', { style:{ display:'flex', gap:6 } },
          ...['high','medium','low'].map(s => {
            const count = p.risks.filter(r=>r.severity===s).length;
            return count > 0 && h('span', { key:s, style:{ fontFamily:MF, fontSize:9, padding:'2px 8px', borderRadius:10,
              background:sevColor[s]+'22', color:sevColor[s] } }, count+' '+s);
          })
        )
      ),
      ...p.risks.map((r,j) => h('div', { key:j, onMouseEnter:()=>setHover('r-'+i+'-'+j), onMouseLeave:()=>setHover(null),
        style:{ display:'flex', gap:12, padding:12, marginBottom:8, background: hover==='r-'+i+'-'+j ? C.cream:'transparent',
          borderRadius:8, border:'1px solid '+C.div, transition:'all 0.2s' }
      },
        h('div', { style:{ width:10, height:10, borderRadius:'50%', background:sevColor[r.severity], marginTop:4, flexShrink:0 } }),
        h('div', { style:{ flex:1 } },
          h('div', { style:{ fontFamily:MF, fontSize:12, color:C.noir, marginBottom:3 } }, r.desc),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, marginBottom:2 } }, 'Mitigation: '+r.mitigation),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:sevColor[r.severity] } }, 'Impact: '+r.impact)
        )
      ))
    ))
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:940, margin:'0 auto' } },
      h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:'0 0 4px' } }, 'Eigen Conquest Strategy'),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:16 } }, '3-Phase growth plan | 2026-2027'),
      overallProgress,
      tabBar,
      tab==='phases' && phasesView,
      tab==='kpis' && kpisView,
      tab==='risks' && risksView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

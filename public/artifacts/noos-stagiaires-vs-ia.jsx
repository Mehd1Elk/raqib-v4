const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Cormorant Garamond, serif';
const MF = 'JetBrains Mono, monospace';
const metrics = [
  { label:'Headcount', intern:'25 interns', ai:'800 agents', winner:'ai', ratio:'32x' },
  { label:'Cost / Hour', intern:'12 EUR/h', ai:'0.08 EUR/h', winner:'ai', ratio:'150x cheaper' },
  { label:'Monthly Cost', intern:'52,000 EUR', ai:'18,400 EUR', winner:'ai', ratio:'2.8x cheaper' },
  { label:'Output / Day', intern:'~200 tasks', ai:'~20,400 tasks', winner:'ai', ratio:'102x' },
  { label:'Availability', intern:'8h/day, Mon-Fri', ai:'24/7/365', winner:'ai', ratio:'4.2x' },
  { label:'Error Rate', intern:'5-15%', ai:'2-5%', winner:'ai', ratio:'3x lower' },
  { label:'Learning Speed', intern:'Weeks to months', ai:'Minutes to hours', winner:'ai', ratio:'1000x faster' },
  { label:'Scalability', intern:'Linear (hiring)', ai:'Instant (deploy)', winner:'ai', ratio:'Infinite' },
  { label:'Creativity', intern:'High (human insight)', ai:'Medium (pattern-based)', winner:'intern', ratio:'Humans lead' },
  { label:'Empathy / EQ', intern:'High (natural)', ai:'Low (simulated)', winner:'intern', ratio:'Humans lead' },
  { label:'Complex Judgment', intern:'Strong (contextual)', ai:'Limited (rule-based)', winner:'intern', ratio:'Humans lead' },
  { label:'Client Relations', intern:'Personal touch', ai:'Automated responses', winner:'intern', ratio:'Humans lead' },
];
const economics = {
  intern: { count:25, monthly:52000, annual:624000, cost_per_task:2.60, onboarding:'2-4 weeks', turnover:'40%/year' },
  ai: { count:800, monthly:18400, annual:220800, cost_per_task:0.009, onboarding:'Instant', turnover:'0%' },
  hybrid: { saving_pct:65, optimal_ratio:'25 humans + 800 AI', description:'AI handles volume and repetition. Humans provide creativity, judgment, and client relationships.' },
};
const recommendations = [
  { title:'Adopt Hybrid Model', desc:'Combine 25 interns for creative/relational work with 800 AI agents for volume tasks. Estimated 65% cost reduction vs all-human team.', priority:'critical' },
  { title:'AI for Repetitive Tasks', desc:'Route all testing, content generation, data processing, and monitoring to AI agents. Frees humans for high-value work.', priority:'high' },
  { title:'Humans for Strategy', desc:'Keep client relations, strategic planning, creative direction, and complex judgment in human hands. AI as copilot, not replacement.', priority:'high' },
  { title:'Progressive Training', desc:'Train interns to supervise and optimize AI agents. Create a new role: AI Operations Coordinator.', priority:'medium' },
  { title:'Quality Assurance Layer', desc:'Human review of AI output for critical tasks. Automated QA for routine tasks. Hybrid QA for sensitive content.', priority:'medium' },
  { title:'Monthly ROI Review', desc:'Track cost-per-task, error rates, and output quality monthly. Adjust human/AI ratio based on data.', priority:'low' },
];
const TABS = ['comparison','economics','recommendations'];

function App() {
  const [tab, setTab] = useState('comparison');
  const [hover, setHover] = useState(null);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:24 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t), onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius:6, cursor:'pointer', transition:'all 0.2s' }
    }, t))
  );

  const compView = h('div', null,
    h('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 } },
      h('div', { style:{ textAlign:'center', padding:16, background:C.cream, borderRadius:10, border:'2px solid '+C.green } },
        h('div', { style:{ fontSize:28 } }, '\uD83D\uDC64'),
        h('div', { style:{ fontFamily:HF, fontSize:22, fontWeight:700, color:C.noir } }, '25 Interns'),
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, 'Human workforce')
      ),
      h('div', { style:{ textAlign:'center', padding:16, background:C.cream, borderRadius:10, border:'2px solid '+C.gold } },
        h('div', { style:{ fontSize:28 } }, '\uD83E\uDD16'),
        h('div', { style:{ fontFamily:HF, fontSize:22, fontWeight:700, color:C.noir } }, '800 AI Agents'),
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, 'Artificial workforce')
      )
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:6 } },
      h('div', { style:{ display:'grid', gridTemplateColumns:'130px 1fr 1fr 100px', gap:8, padding:'8px 12px', background:C.cream, borderRadius:6 } },
        ...['Metric','Interns','AI Agents','Advantage'].map((l,i) => h('div', { key:i, style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l))
      ),
      ...metrics.map((m,i) => h('div', { key:i, onMouseEnter:()=>setHover('m-'+i), onMouseLeave:()=>setHover(null),
        style:{ display:'grid', gridTemplateColumns:'130px 1fr 1fr 100px', gap:8, padding:'10px 12px', alignItems:'center',
          background: hover==='m-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:6, transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600 } }, m.label),
        h('div', { style:{ fontFamily:MF, fontSize:11, color: m.winner==='intern' ? C.green : C.t2,
          fontWeight: m.winner==='intern' ? 700 : 400 } }, m.intern),
        h('div', { style:{ fontFamily:MF, fontSize:11, color: m.winner==='ai' ? C.gold : C.t2,
          fontWeight: m.winner==='ai' ? 700 : 400 } }, m.ai),
        h('div', { style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:10, textAlign:'center',
          background: m.winner==='ai' ? C.gold+'22' : C.green+'22', color: m.winner==='ai' ? C.gold : C.green } }, m.ratio)
      ))
    )
  );

  const ecoView = h('div', null,
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:20 } },
      ...[ ['Interns (25)', economics.intern, C.green], ['AI Agents (800)', economics.ai, C.gold], ['Hybrid Model', null, '#8B5CF6'] ].map(([label, data, color], i) =>
        h('div', { key:i, onMouseEnter:()=>setHover('eco-'+i), onMouseLeave:()=>setHover(null),
          style:{ background: hover==='eco-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:20,
            borderTop:'4px solid '+color, transition:'all 0.2s' }
        },
          h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color, marginBottom:12 } }, label),
          data ? h('div', null,
            ...Object.entries(data).map(([k,v],j) => h('div', { key:j, style:{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:'1px solid '+C.div+'66' } },
              h('span', { style:{ fontFamily:MF, fontSize:10, color:C.t3, textTransform:'uppercase' } }, k.replace(/_/g,' ')),
              h('span', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600 } }, typeof v==='number' ? v.toLocaleString()+(k.includes('cost') && !k.includes('task') ? ' EUR' : k.includes('task') ? ' EUR' : '') : String(v))
            ))
          ) : h('div', null,
            h('div', { style:{ fontFamily:HF, fontSize:28, fontWeight:700, color:'#8B5CF6', textAlign:'center', margin:'12px 0' } }, '65% savings'),
            h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, marginBottom:8 } }, economics.hybrid.optimal_ratio),
            h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1, lineHeight:1.5 } }, economics.hybrid.description)
          )
        )
      )
    ),
    h('div', { style:{ background:C.cream, borderRadius:10, padding:20 } },
      h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir, marginBottom:12 } }, 'Cost Comparison (Annual)'),
      ...[ ['All Interns (25)', 624000, 100], ['All AI (800)', 220800, 35], ['Hybrid (25+800)', 220800+52000, 44] ].map(([l,v,pct],i) =>
        h('div', { key:i, style:{ display:'flex', alignItems:'center', gap:10, marginBottom:10 } },
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1, width:130 } }, l),
          h('div', { style:{ flex:1, height:10, background:C.div, borderRadius:5, overflow:'hidden' } },
            h('div', { style:{ width:pct+'%', height:'100%', background: i===2 ? '#8B5CF6' : i===1 ? C.gold : C.green, borderRadius:5 } })
          ),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600, width:90, textAlign:'right' } }, v.toLocaleString()+' EUR')
        )
      )
    )
  );

  const prioColors = { critical:'#D4443B', high:C.gold, medium:'#3B82F6', low:C.t3 };
  const recView = h('div', null,
    h('div', { style:{ textAlign:'center', padding:20, background:C.cream, borderRadius:10, marginBottom:20 } },
      h('div', { style:{ fontFamily:HF, fontSize:24, fontWeight:700, color:C.noir } }, 'Recommended: Hybrid Model'),
      h('div', { style:{ fontFamily:MF, fontSize:12, color:C.t2, marginTop:4 } }, 'AI handles volume. Humans provide intelligence and empathy.')
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:12 } },
      ...recommendations.map((r,i) => h('div', { key:i, onMouseEnter:()=>setHover('rec-'+i), onMouseLeave:()=>setHover(null),
        style:{ display:'flex', gap:16, background: hover==='rec-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:16,
          transition:'all 0.2s', borderLeft:'4px solid '+(prioColors[r.priority]||C.t3) }
      },
        h('div', { style:{ width:36, height:36, borderRadius:'50%', background:(prioColors[r.priority]||C.t3)+'22',
          display:'flex', alignItems:'center', justifyContent:'center', fontFamily:HF, fontSize:18, fontWeight:700,
          color:prioColors[r.priority]||C.t3, flexShrink:0 } }, (i+1)),
        h('div', { style:{ flex:1 } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:4 } },
            h('span', { style:{ fontFamily:HF, fontSize:17, fontWeight:700, color:C.noir } }, r.title),
            h('span', { style:{ fontFamily:MF, fontSize:9, padding:'2px 8px', borderRadius:10,
              background:(prioColors[r.priority])+'22', color:prioColors[r.priority], textTransform:'uppercase' } }, r.priority)
          ),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t2, lineHeight:1.5 } }, r.desc)
        )
      ))
    )
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:900, margin:'0 auto' } },
      h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:'0 0 4px' } }, 'Stagiaires vs IA: Comparative Analysis'),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:24 } }, '25 human interns vs 800 AI agents | Hybrid model recommendation'),
      tabBar,
      tab==='comparison' && compView,
      tab==='economics' && ecoView,
      tab==='recommendations' && recView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

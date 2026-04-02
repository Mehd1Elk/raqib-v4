const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Playfair Display, serif';
const MF = 'JetBrains Mono, monospace';
const overview = {
  booth:'36m\u00B2 Premium Stand - Hall 7, Position A12', budget:'120,000 EUR',
  dates:'June 2-5, 2026', location:'Marrakech, Morocco',
  meetings:40, press_kits:200, demos_per_day:8, team_size:12,
};
const demos = [
  { name:'Teleconsultation Live', duration:'15 min', tech:'WebRTC + AI Triage', lead:'Dr. Amara', status:'ready',
    description:'Live video consultation with AI-powered symptom triage and real-time medical note generation.' },
  { name:'AI Diagnostic Engine', duration:'10 min', tech:'Computer Vision + NLP', lead:'CTO', status:'ready',
    description:'Demonstrate AI-assisted diagnosis on dermatology and radiology cases with explainable results.' },
  { name:'Patient Dashboard', duration:'12 min', tech:'React + Real-time Data', lead:'Product Lead', status:'rehearsal',
    description:'Interactive patient monitoring dashboard with IoT integration and automated alerts.' },
  { name:'Pharmacovigilance Alert', duration:'8 min', tech:'ML Pipeline + SMS API', lead:'Data Lead', status:'rehearsal',
    description:'Automated adverse drug reaction detection with WHO-VigiBase integration and SMS reporting.' },
  { name:'Mobile App Walkthrough', duration:'10 min', tech:'Flutter + Offline Mode', lead:'Mobile Lead', status:'in-progress',
    description:'Complete mobile app tour showcasing offline-first design for areas with limited connectivity.' },
];
const team = [
  { name:'CEO / Co-founder', role:'Keynote, VIP meetings, investor dinners', days:'All 4 days', priority:'critical' },
  { name:'CTO', role:'Tech demos, partner meetings, architecture talks', days:'All 4 days', priority:'critical' },
  { name:'CMO', role:'Press relations, social media, booth marketing', days:'All 4 days', priority:'critical' },
  { name:'Dr. Amara (Clinical)', role:'Teleconsult demo, medical panel speaker', days:'Day 1-3', priority:'high' },
  { name:'Product Lead', role:'Dashboard demos, user feedback sessions', days:'All 4 days', priority:'high' },
  { name:'Data Lead', role:'Pharma demo, data partnership discussions', days:'Day 2-4', priority:'high' },
  { name:'Mobile Lead', role:'App demo, technical Q&A, hackathon judge', days:'Day 1-3', priority:'medium' },
  { name:'BD Manager 1', role:'African market meetings (West Africa)', days:'All 4 days', priority:'high' },
  { name:'BD Manager 2', role:'EU/ME market meetings, investor intros', days:'All 4 days', priority:'high' },
  { name:'Marketing Coord', role:'Booth management, press kits, social', days:'All 4 days', priority:'medium' },
  { name:'Design Lead', role:'Booth setup, visual materials, signage', days:'Day 0-2', priority:'medium' },
  { name:'Operations', role:'Logistics, travel, catering, AV setup', days:'All 4 days', priority:'critical' },
];
const logistics = [
  { category:'Booth & Stand', items:['36m2 custom stand design & build','4 demo stations (55" touchscreens)','Private meeting room (6-seat, glass)','Branded LED backdrop + spot lighting','Flooring, furniture, power distribution'], budget:45000, status:75 },
  { category:'Travel & Accommodation', items:['12 round-trip flights (Paris-Marrakech)','Hotel: 48 room-nights (4-star)','Airport transfers + ground transport','Visa processing (3 team members)','Travel insurance for full team'], budget:28000, status:90 },
  { category:'Marketing Materials', items:['200 premium press kits (leather folders)','5,000 brochures (EN/FR/AR)','2-minute company video production','Social media campaign (3-week)','Banner stands + pull-up displays'], budget:22000, status:60 },
  { category:'Technology', items:['Demo environment (dedicated cloud)','Backup internet (dual 4G routers)','Presentation hardware (iPads, clickers)','Recording equipment (2 cameras)','Live streaming setup for keynote'], budget:15000, status:40 },
  { category:'Hospitality', items:['VIP dinner event (20 guests, rooftop)','Daily catering at booth (4 days)','Premium gift bags (50 VIP contacts)','Event tickets for partner invites','Coffee & refreshment station at booth'], budget:10000, status:30 },
];
const meetings = [
  { category:'Investors', count:8, confirmed:5 },
  { category:'Government/Ministry', count:6, confirmed:3 },
  { category:'Partners', count:10, confirmed:7 },
  { category:'Press/Media', count:8, confirmed:6 },
  { category:'Potential Clients', count:8, confirmed:4 },
];
const TABS = ['overview','demos','team','logistics'];

function App() {
  const [tab, setTab] = useState('overview');
  const [hover, setHover] = useState(null);
  const [expandedDemo, setExpandedDemo] = useState(null);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:24 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t), onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius: 0, cursor:'pointer', transition:'all 0.2s' }
    }, t))
  );

  const kpiCards = [['Budget','120K EUR',C.gold],['Team','12 people',C.green],['Meetings','40 scheduled','#3B82F6'],['Demos','5 scenarios','#8B5CF6'],['Press Kits','200 copies',C.t1],['Stand','36m\u00B2','#C17B3A']];
  const overviewView = h('div', null,
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 } },
      ...kpiCards.map(([l,v,c],i) => h('div', { key:i, onMouseEnter:()=>setHover('kpi-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='kpi-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:16, textAlign:'center',
          transition:'all 0.2s', transform: hover==='kpi-'+i ? 'translateY(-2px)':'none' }
      },
        h('div', { style:{ fontFamily:HF, fontSize:24, fontWeight:700, color:c } }, v),
        h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l)
      ))
    ),
    h('div', { style:{ background:C.cream, borderRadius: 0, padding:16, marginBottom:16 } },
      h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir, marginBottom:12 } }, 'Meetings Breakdown'),
      ...meetings.map((m,i) => h('div', { key:i, style:{ display:'flex', alignItems:'center', gap:10, marginBottom:8 } },
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1, width:120 } }, m.category),
        h('div', { style:{ flex:1, height:8, background:C.div, borderRadius: 0, overflow:'hidden' } },
          h('div', { style:{ width:(m.confirmed/m.count*100)+'%', height:'100%', background:C.green, borderRadius: 0, } })
        ),
        h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, width:60, textAlign:'right' } }, m.confirmed+'/'+m.count)
      ))
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 } },
      ...Object.entries(overview).map(([k,v],i) => h('div', { key:i, style:{ display:'flex', justifyContent:'space-between', padding:'10px 14px',
        background:C.ivory, border:'1px solid '+C.div, borderRadius: 0, } },
        h('span', { style:{ fontFamily:MF, fontSize:11, color:C.t3, textTransform:'uppercase' } }, k.replace(/_/g,' ')),
        h('span', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600 } }, String(v))
      ))
    )
  );

  const statusC = { ready:C.green, rehearsal:C.gold, 'in-progress':'#3B82F6' };
  const demosView = h('div', { style:{ display:'flex', flexDirection:'column', gap:10 } },
    ...demos.map((d,i) => h('div', { key:i, onClick:()=>setExpandedDemo(expandedDemo===i?null:i),
      onMouseEnter:()=>setHover('d-'+i), onMouseLeave:()=>setHover(null),
      style:{ background: hover==='d-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:16,
        cursor:'pointer', transition:'all 0.2s', borderLeft:'4px solid '+(statusC[d.status]||C.t3) }
    },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
        h('div', null,
          h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir } }, d.name),
          h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, d.duration+' | '+d.tech+' | Lead: '+d.lead)
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
          h('div', { style:{ fontFamily:MF, fontSize:9, padding:'3px 10px', borderRadius: 0,
            background:(statusC[d.status]||C.t3)+'22', color:statusC[d.status]||C.t3, textTransform:'uppercase' } }, d.status),
          h('span', { style:{ fontFamily:MF, fontSize:14, color:C.t3, transition:'transform 0.2s',
            transform: expandedDemo===i ? 'rotate(90deg)':'none' } }, '\u25B6')
        )
      ),
      expandedDemo===i && h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t2, lineHeight:1.6, marginTop:10, paddingTop:10, borderTop:'1px solid '+C.div } }, d.description)
    ))
  );

  const prioColor = { critical:'#D4443B', high:C.gold, medium:C.t3 };
  const teamView = h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 } },
    ...team.map((t,i) => h('div', { key:i, onMouseEnter:()=>setHover('t-'+i), onMouseLeave:()=>setHover(null),
      style:{ background: hover==='t-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:14, transition:'all 0.2s',
        transform: hover==='t-'+i ? 'translateY(-2px)':'none', borderTop:'3px solid '+(prioColor[t.priority]||C.t3) }
    },
      h('div', { style:{ fontFamily:HF, fontSize:14, fontWeight:700, color:C.noir, marginBottom:4 } }, t.name),
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t2, marginBottom:6, lineHeight:1.4 } }, t.role),
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
        h('span', { style:{ fontFamily:MF, fontSize:9, color:C.gold } }, t.days),
        h('span', { style:{ fontFamily:MF, fontSize:8, padding:'2px 6px', borderRadius: 0,
          background:(prioColor[t.priority])+'22', color:prioColor[t.priority], textTransform:'uppercase' } }, t.priority)
      )
    ))
  );

  const totalBudget = logistics.reduce((s,l)=>s+l.budget,0);
  const avgStatus = Math.round(logistics.reduce((s,l)=>s+l.status,0)/logistics.length);
  const logisticsView = h('div', null,
    h('div', { style:{ display:'flex', gap:12, marginBottom:16 } },
      ...[ ['Total Budget',totalBudget.toLocaleString()+' EUR',C.gold], ['Avg Readiness',avgStatus+'%',avgStatus>60?C.green:C.gold], ['Categories','5 tracks','#3B82F6'] ].map(([l,v,c],i) =>
        h('div', { key:i, style:{ flex:1, background:C.cream, borderRadius: 0, padding:12, textAlign:'center' } },
          h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:c } }, v),
          h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase' } }, l)
        )
      )
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:14 } },
      ...logistics.map((l,i) => h('div', { key:i, onMouseEnter:()=>setHover('l-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='l-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:18, transition:'all 0.2s' }
      },
        h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
          h('div', { style:{ fontFamily:HF, fontSize:19, fontWeight:700, color:C.noir } }, l.category),
          h('div', { style:{ fontFamily:MF, fontSize:12, color:C.gold, fontWeight:600 } }, l.budget.toLocaleString()+' EUR')
        ),
        h('div', { style:{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 } },
          ...l.items.map((it,j) => h('span', { key:j, style:{ fontFamily:MF, fontSize:9, padding:'3px 8px', borderRadius: 0, background:C.div+'88', color:C.t1 } }, it))
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
          h('div', { style:{ flex:1, height:6, background:C.div, borderRadius: 0, overflow:'hidden' } },
            h('div', { style:{ width:l.status+'%', height:'100%', background: l.status>=75 ? C.green : l.status>=50 ? C.gold : '#3B82F6', borderRadius: 0, } })
          ),
          h('span', { style:{ fontFamily:MF, fontSize:10, color:C.t3, width:40, textAlign:'right' } }, l.status+'%')
        )
      ))
    )
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:960, margin:'0 auto' } },
      h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:'0 0 4px' } }, 'GITEX Future Health Preparation'),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:24 } }, 'June 2-5, 2026 | Marrakech, Morocco | 36m\u00B2 Premium Stand | Budget: 120K EUR'),
      tabBar,
      tab==='overview' && overviewView,
      tab==='demos' && demosView,
      tab==='team' && teamView,
      tab==='logistics' && logisticsView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

const { useState, useMemo } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Cormorant Garamond, serif';
const MF = 'JetBrains Mono, monospace';
const DEPTS = ['Tech','Clinical','Business','Research','Legal'];
const deptColors = { Tech:'#3B82F6', Clinical:'#5B8C6E', Business:'#B8963E', Research:'#8B5CF6', Legal:'#C17B3A' };
const statuses = ['open','filled','planned'];
const statusColors = { open:C.green, filled:C.t3, planned:C.gold };
const internships = [
  {title:'Frontend React Developer',dept:'Tech',duration:'6 months',skills:['React','TypeScript','Tailwind'],status:'filled',level:'M1/M2',location:'Paris'},
  {title:'Backend Node.js Engineer',dept:'Tech',duration:'6 months',skills:['Node.js','PostgreSQL','API'],status:'filled',level:'M2',location:'Paris'},
  {title:'DevOps / Cloud Infra',dept:'Tech',duration:'6 months',skills:['AWS','Docker','CI/CD'],status:'open',level:'M2',location:'Remote'},
  {title:'Mobile Flutter Developer',dept:'Tech',duration:'4 months',skills:['Flutter','Dart','Firebase'],status:'open',level:'M1',location:'Paris'},
  {title:'AI/ML Engineer',dept:'Tech',duration:'6 months',skills:['Python','TensorFlow','NLP'],status:'planned',level:'M2/PhD',location:'Paris'},
  {title:'Data Engineer',dept:'Tech',duration:'6 months',skills:['Spark','Airflow','SQL'],status:'planned',level:'M2',location:'Remote'},
  {title:'Clinical Data Analyst',dept:'Clinical',duration:'6 months',skills:['R','SPSS','Medical Data'],status:'filled',level:'M2',location:'Paris'},
  {title:'Telehealth Coordinator',dept:'Clinical',duration:'4 months',skills:['Healthcare','UX','Protocols'],status:'open',level:'M1',location:'Dakar'},
  {title:'Pharmacovigilance Analyst',dept:'Clinical',duration:'6 months',skills:['Drug Safety','Reporting','FDA'],status:'open',level:'M2',location:'Paris'},
  {title:'Clinical Trials Assistant',dept:'Clinical',duration:'6 months',skills:['GCP','CRFs','Monitoring'],status:'planned',level:'M2',location:'Paris'},
  {title:'Medical Writer',dept:'Clinical',duration:'4 months',skills:['Scientific Writing','Regulatory'],status:'planned',level:'M1/M2',location:'Remote'},
  {title:'Business Development Rep',dept:'Business',duration:'6 months',skills:['Sales','CRM','B2B'],status:'filled',level:'M1',location:'Paris'},
  {title:'Marketing Growth Hacker',dept:'Business',duration:'6 months',skills:['SEO','Content','Analytics'],status:'filled',level:'M2',location:'Paris'},
  {title:'Partnership Manager',dept:'Business',duration:'4 months',skills:['Negotiation','Strategy'],status:'open',level:'M2',location:'Casablanca'},
  {title:'Financial Analyst',dept:'Business',duration:'6 months',skills:['Excel','Modeling','Fundraising'],status:'open',level:'M2',location:'Paris'},
  {title:'Product Manager',dept:'Business',duration:'6 months',skills:['Agile','Roadmapping','Metrics'],status:'planned',level:'M2',location:'Paris'},
  {title:'UX Researcher',dept:'Research',duration:'6 months',skills:['User Research','Figma','Testing'],status:'filled',level:'M2',location:'Paris'},
  {title:'Biostatistician',dept:'Research',duration:'6 months',skills:['R','SAS','Clinical Stats'],status:'open',level:'PhD',location:'Paris'},
  {title:'Health Economics Analyst',dept:'Research',duration:'4 months',skills:['HEOR','Modeling'],status:'planned',level:'M2',location:'Remote'},
  {title:'AI Ethics Researcher',dept:'Research',duration:'6 months',skills:['Ethics','Policy','AI Bias'],status:'planned',level:'M2/PhD',location:'Paris'},
  {title:'NLP Research Intern',dept:'Research',duration:'6 months',skills:['NLP','LLMs','Evaluation'],status:'open',level:'M2',location:'Paris'},
  {title:'Legal Compliance Intern',dept:'Legal',duration:'6 months',skills:['Healthcare Law','GDPR','Contracts'],status:'filled',level:'M2',location:'Paris'},
  {title:'IP & Patent Analyst',dept:'Legal',duration:'4 months',skills:['Patent Law','Research','Filing'],status:'open',level:'M2',location:'Paris'},
  {title:'Regulatory Affairs',dept:'Legal',duration:'6 months',skills:['CE Marking','FDA','ISO 13485'],status:'planned',level:'M2',location:'Paris'},
  {title:'Data Privacy Officer Asst',dept:'Legal',duration:'6 months',skills:['GDPR','HIPAA','Auditing'],status:'open',level:'M1/M2',location:'Remote'},
];
const TABS = ['all','by-department','stats'];

function App() {
  const [tab, setTab] = useState('all');
  const [hover, setHover] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);
  const filtered = useMemo(() => {
    let list = filter==='all' ? internships : internships.filter(x=>x.status===filter);
    if (searchText) list = list.filter(x => x.title.toLowerCase().includes(searchText.toLowerCase()) || x.skills.some(s=>s.toLowerCase().includes(searchText.toLowerCase())));
    return list;
  }, [filter, searchText]);

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:20 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t), onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 18px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius:6, cursor:'pointer', transition:'all 0.2s' }
    }, t.replace('-',' ')))
  );

  const statusFilter = h('div', { style:{ display:'flex', gap:6, marginBottom:12, alignItems:'center' } },
    ...['all',...statuses].map(s => h('button', { key:s, onClick:()=>setFilter(s),
      style:{ padding:'4px 12px', fontFamily:MF, fontSize:10, borderRadius:20, cursor:'pointer', transition:'all 0.2s',
        background: filter===s ? (statusColors[s]||C.noir)+'22' : 'transparent',
        color: filter===s ? (statusColors[s]||C.noir) : C.t3, border:'1px solid '+C.div }
    }, s)),
    h('input', { placeholder:'Search title or skill...', value:searchText,
      onChange:e=>setSearchText(e.target.value),
      style:{ marginLeft:'auto', padding:'6px 12px', fontFamily:MF, fontSize:10, border:'1px solid '+C.div,
        borderRadius:6, background:C.ivory, color:C.noir, outline:'none', width:180 }
    })
  );

  const allView = h('div', null, statusFilter,
    h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, marginBottom:8 } }, filtered.length+' positions shown'),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:10 } },
      ...filtered.map((intern,i) => h('div', { key:i, onMouseEnter:()=>setHover('i-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='i-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:8, padding:14,
          borderLeft:'4px solid '+deptColors[intern.dept], transition:'all 0.2s', transform: hover==='i-'+i?'translateY(-2px)':'none',
          boxShadow: hover==='i-'+i ? '0 4px 12px rgba(0,0,0,0.06)':'none' }
      },
        h('div', { style:{ fontFamily:MF, fontSize:12, color:C.noir, fontWeight:600, marginBottom:4 } }, intern.title),
        h('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:6 } },
          h('span', { style:{ fontFamily:MF, fontSize:10, color:deptColors[intern.dept] } }, intern.dept),
          h('span', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, intern.duration)
        ),
        h('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:6 } },
          h('span', { style:{ fontFamily:MF, fontSize:9, color:C.t3 } }, intern.level),
          h('span', { style:{ fontFamily:MF, fontSize:9, color:C.t3 } }, intern.location)
        ),
        h('div', { style:{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:8 } },
          ...intern.skills.map((s,j) => h('span', { key:j, style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:4, background:C.div+'88', color:C.t1 } }, s))
        ),
        h('div', { style:{ fontFamily:MF, fontSize:10, padding:'2px 8px', borderRadius:12, display:'inline-block',
          background:statusColors[intern.status]+'22', color:statusColors[intern.status], textTransform:'uppercase', letterSpacing:1 } }, intern.status)
      ))
    )
  );

  const byDeptView = h('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
    ...DEPTS.map(d => {
      const deptInterns = internships.filter(x=>x.dept===d);
      const openCount = deptInterns.filter(x=>x.status==='open').length;
      return h('div', { key:d, style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:16 } },
        h('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:8 } },
          h('div', { style:{ width:12, height:12, borderRadius:'50%', background:deptColors[d] } }),
          h('span', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:C.noir } }, d),
          h('span', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, deptInterns.length+' positions'),
          openCount > 0 && h('span', { style:{ fontFamily:MF, fontSize:9, padding:'2px 8px', borderRadius:10, background:C.green+'22', color:C.green, marginLeft:4 } }, openCount+' open')
        ),
        h('div', { style:{ display:'flex', height:6, borderRadius:3, overflow:'hidden', marginBottom:10 } },
          ...statuses.map(s => { const cnt = deptInterns.filter(x=>x.status===s).length;
            return cnt > 0 && h('div', { key:s, style:{ width:(cnt/deptInterns.length*100)+'%', background:statusColors[s] } }); })
        ),
        h('div', { style:{ display:'flex', flexWrap:'wrap', gap:8 } },
          ...deptInterns.map((x,j) => h('div', { key:j, onMouseEnter:()=>setHover('bd-'+d+j), onMouseLeave:()=>setHover(null),
            style:{ fontFamily:MF, fontSize:11, padding:'6px 10px', borderRadius:6,
              background: hover==='bd-'+d+j ? statusColors[x.status]+'25' : statusColors[x.status]+'15',
              border:'1px solid '+statusColors[x.status]+'44', color:C.t1, transition:'all 0.2s' } }, x.title))
        )
      );
    })
  );

  const stats = { total:25, open:internships.filter(x=>x.status==='open').length, filled:internships.filter(x=>x.status==='filled').length, planned:internships.filter(x=>x.status==='planned').length };
  const locations = {};
  internships.forEach(x => { locations[x.location] = (locations[x.location]||0)+1; });
  const statsView = h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 } },
    ...[['Total Positions',stats.total,C.noir],['Open',stats.open,C.green],['Filled',stats.filled,C.t3],['Planned',stats.planned,C.gold]].map(([l,v,c],i) =>
      h('div', { key:i, onMouseEnter:()=>setHover('st-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='st-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:20, textAlign:'center', transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:HF, fontSize:36, fontWeight:700, color:c } }, v),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l)
      )
    ),
    h('div', { style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:20 } },
      h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir, marginBottom:12 } }, 'By Department'),
      ...DEPTS.map(d => { const count = internships.filter(x=>x.dept===d).length; return h('div', { key:d, style:{ display:'flex', alignItems:'center', gap:10, marginBottom:8 } },
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t1, width:70 } }, d),
        h('div', { style:{ flex:1, height:8, background:C.div, borderRadius:4, overflow:'hidden' } },
          h('div', { style:{ width:(count/25*100)+'%', height:'100%', background:deptColors[d], borderRadius:4 } })
        ),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, width:20, textAlign:'right' } }, count)
      ); })
    ),
    h('div', { style:{ background:C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:20 } },
      h('div', { style:{ fontFamily:HF, fontSize:18, fontWeight:700, color:C.noir, marginBottom:12 } }, 'By Location'),
      ...Object.entries(locations).sort((a,b)=>b[1]-a[1]).map(([loc,cnt],i) =>
        h('div', { key:i, style:{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:'1px solid '+C.div+'44' } },
          h('span', { style:{ fontFamily:MF, fontSize:11, color:C.t1 } }, loc),
          h('span', { style:{ fontFamily:MF, fontSize:11, color:C.gold, fontWeight:600 } }, cnt)
        )
      )
    )
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:960, margin:'0 auto' } },
      h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:'0 0 4px' } }, 'NOOS Cartographie des Stages'),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginBottom:24 } }, '25 internship positions across 5 departments'),
      tabBar,
      tab==='all' && allView,
      tab==='by-department' && byDeptView,
      tab==='stats' && statsView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

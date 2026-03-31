const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Cormorant Garamond, serif';
const MF = 'JetBrains Mono, monospace';
const events = [
  { month:0, day:20, label:'Paris HealthTech', type:'conference', color:C.gold, location:'Paris, France', priority:'high' },
  { month:1, day:10, label:'Board Meeting Q1', type:'internal', color:C.t2, location:'Remote', priority:'medium' },
  { month:2, day:15, label:'Dakar Innovation Forum', type:'conference', color:C.green, location:'Dakar, Senegal', priority:'high' },
  { month:3, day:8, label:'Lagos Tech Week', type:'conference', color:'#C17B3A', location:'Lagos, Nigeria', priority:'high' },
  { month:3, day:25, label:'Q1 Financial Close', type:'deadline', color:'#D4443B', location:'Internal', priority:'critical' },
  { month:4, day:12, label:'Investor Update', type:'internal', color:C.t2, location:'Remote', priority:'medium' },
  { month:5, day:2, label:'GITEX Africa', type:'major', color:'#D4443B', location:'Marrakech, Morocco', priority:'critical' },
  { month:5, day:15, label:'Q2 Review Deadline', type:'deadline', color:C.t2, location:'Internal', priority:'high' },
  { month:6, day:5, label:'Product Roadmap Review', type:'internal', color:'#8B5CF6', location:'Remote', priority:'medium' },
  { month:7, day:20, label:'Team Offsite', type:'internal', color:C.green, location:'Marrakech', priority:'medium' },
  { month:8, day:30, label:'Q3 KPI Checkpoint', type:'deadline', color:C.t2, location:'Internal', priority:'high' },
  { month:9, day:14, label:'GITEX Dubai', type:'major', color:'#D4443B', location:'Dubai, UAE', priority:'critical' },
  { month:10, day:4, label:'Web Summit Lisbon', type:'major', color:'#8B5CF6', location:'Lisbon, Portugal', priority:'critical' },
  { month:10, day:20, label:'Series A Close Target', type:'deadline', color:'#D4443B', location:'Internal', priority:'critical' },
  { month:11, day:10, label:'Singapore FinTech', type:'conference', color:C.green, location:'Singapore', priority:'high' },
  { month:11, day:28, label:'Year-End Review', type:'internal', color:C.t2, location:'Paris', priority:'high' },
];
const milestones = [
  { q:'Q1', color:C.gold, items:[
    { text:'Legal entity setup complete', done:true },
    { text:'First 5 hires onboarded', done:true },
    { text:'MVP Beta launch', done:false },
    { text:'Dakar Innovation presence', done:false },
    { text:'Seed round documentation', done:true }
  ]},
  { q:'Q2', color:C.green, items:[
    { text:'GITEX Africa 36m2 booth', done:false },
    { text:'Series A prep materials', done:false },
    { text:'10 pilot clients signed', done:false },
    { text:'Platform v1.5 release', done:false },
    { text:'Marketing campaign launch', done:false }
  ]},
  { q:'Q3', color:'#3B82F6', items:[
    { text:'Platform v2 with AI diagnostics', done:false },
    { text:'50 active clients target', done:false },
    { text:'Regulatory approval (2 markets)', done:false },
    { text:'Team scaled to 25', done:false },
    { text:'Revenue target 250K EUR', done:false }
  ]},
  { q:'Q4', color:'#8B5CF6', items:[
    { text:'GITEX Dubai keynote speaker', done:false },
    { text:'Web Summit demo showcase', done:false },
    { text:'Revenue 500K EUR', done:false },
    { text:'Scale to 3 African markets', done:false },
    { text:'Series A close (2M EUR)', done:false }
  ]},
];
const deadlines = [
  { date:'Jan 31', task:'Company registration filing', status:'done', owner:'Legal', priority:'critical' },
  { date:'Feb 15', task:'Office lease signing', status:'done', owner:'Operations', priority:'high' },
  { date:'Mar 01', task:'MVP feature freeze', status:'done', owner:'Tech', priority:'critical' },
  { date:'Mar 15', task:'Dakar pitch deck final', status:'done', owner:'Business', priority:'high' },
  { date:'Apr 15', task:'Q1 board report', status:'progress', owner:'CEO', priority:'high' },
  { date:'May 01', task:'GITEX Africa registration', status:'progress', owner:'Marketing', priority:'critical' },
  { date:'Jun 30', task:'Q2 financial close', status:'pending', owner:'Finance', priority:'critical' },
  { date:'Jul 15', task:'Series A term sheet', status:'pending', owner:'CEO', priority:'critical' },
  { date:'Sep 01', task:'Regulatory submission', status:'pending', owner:'Legal', priority:'critical' },
  { date:'Oct 01', task:'GITEX Dubai logistics', status:'pending', owner:'Operations', priority:'high' },
  { date:'Nov 01', task:'Web Summit prep complete', status:'pending', owner:'Marketing', priority:'high' },
  { date:'Nov 15', task:'Annual strategy review', status:'pending', owner:'CEO', priority:'medium' },
  { date:'Dec 15', task:'Singapore FinTech wrap-up', status:'pending', owner:'Business', priority:'medium' },
  { date:'Dec 31', task:'Year-end audit', status:'pending', owner:'Finance', priority:'critical' },
];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_IN = [31,28,31,30,31,30,31,31,30,31,30,31];
const TABS = ['calendar','milestones','deadlines'];
const typeLabels = { major:'Major Event', conference:'Conference', deadline:'Deadline', internal:'Internal' };

function App() {
  const [tab, setTab] = useState('calendar');
  const [hover, setHover] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const summary = h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 } },
    ...[
      ['Events', events.length, C.gold],
      ['Major', events.filter(e=>e.type==='major').length, '#D4443B'],
      ['Deadlines', deadlines.length, C.green],
      ['Countries', '7', '#8B5CF6']
    ].map(([l,v,c],i) => h('div', { key:i, onMouseEnter:()=>setHover('sum-'+i), onMouseLeave:()=>setHover(null),
      style:{ background: hover==='sum-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:8,
        padding:14, textAlign:'center', transition:'all 0.2s' }
    },
      h('div', { style:{ fontFamily:HF, fontSize:26, fontWeight:700, color:c } }, v),
      h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l)
    ))
  );

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:20 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t),
      onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius:6, cursor:'pointer',
        transition:'all 0.2s' }
    }, t))
  );

  const calendarView = h('div', null,
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 } },
      ...MONTHS.map((m, i) => {
        const evts = events.filter(e => e.month === i);
        const isSelected = selectedMonth === i;
        return h('div', { key:m, onClick:()=>setSelectedMonth(isSelected ? null : i),
          onMouseEnter:()=>setHover('m-'+i), onMouseLeave:()=>setHover(null),
          style:{ background: isSelected ? C.cream : hover==='m-'+i ? C.cream : C.ivory,
            border: isSelected ? '2px solid '+C.gold : '1px solid '+C.div, borderRadius:8,
            padding:12, transition:'all 0.2s', cursor:'pointer',
            transform: hover==='m-'+i ? 'translateY(-2px)':'none',
            boxShadow: hover==='m-'+i ? '0 4px 12px rgba(0,0,0,0.08)':'none' }
        },
          h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6,
            borderBottom:'1px solid '+C.div, paddingBottom:6 } },
            h('span', { style:{ fontFamily:HF, fontSize:17, fontWeight:700, color:C.noir } }, m + ' 2026'),
            evts.length > 0 && h('span', { style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:10,
              background:C.gold+'22', color:C.gold } }, evts.length)
          ),
          h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, marginBottom:6 } }, DAYS_IN[i]+' days'),
          evts.length === 0
            ? h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3, fontStyle:'italic' } }, 'No events')
            : evts.map((ev, j) => h('div', { key:j, style:{ display:'flex', alignItems:'center', gap:6, marginBottom:4 } },
                h('div', { style:{ width:7, height:7, borderRadius:'50%', background:ev.color, flexShrink:0 } }),
                h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t1, lineHeight:1.3 } }, ev.label)
              ))
        );
      })
    ),
    selectedMonth !== null && h('div', { style:{ marginTop:16, background:C.cream, borderRadius:10, padding:16,
      border:'1px solid '+C.div } },
      h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:C.noir, marginBottom:12 } },
        MONTHS[selectedMonth]+' 2026 Details'),
      events.filter(e=>e.month===selectedMonth).length === 0
        ? h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3 } }, 'No events this month')
        : events.filter(e=>e.month===selectedMonth).map((ev,j) =>
          h('div', { key:j, style:{ display:'flex', alignItems:'center', gap:12, padding:'8px 0',
            borderBottom:'1px solid '+C.div+'66' } },
            h('div', { style:{ width:10, height:10, borderRadius:'50%', background:ev.color, flexShrink:0 } }),
            h('div', { style:{ flex:1 } },
              h('div', { style:{ fontFamily:MF, fontSize:12, color:C.noir, fontWeight:600 } }, ev.label),
              h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, ev.location+' | Day '+ev.day)
            ),
            h('span', { style:{ fontFamily:MF, fontSize:9, padding:'2px 8px', borderRadius:10,
              background:ev.color+'22', color:ev.color, textTransform:'uppercase' } }, typeLabels[ev.type]||ev.type)
          )
        )
    )
  );

  const milestonesView = h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 } },
    ...milestones.map((ms, i) => {
      const doneCount = ms.items.filter(x=>x.done).length;
      return h('div', { key:i, onMouseEnter:()=>setHover('ms-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='ms-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius:10, padding:20,
          borderLeft:'4px solid '+ms.color, transition:'all 0.2s' }
      },
        h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 } },
          h('span', { style:{ fontFamily:HF, fontSize:22, fontWeight:700, color:ms.color } }, ms.q + ' 2026'),
          h('span', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, doneCount+'/'+ms.items.length+' done')
        ),
        h('div', { style:{ height:4, background:C.div, borderRadius:2, marginBottom:12, overflow:'hidden' } },
          h('div', { style:{ width:(doneCount/ms.items.length*100)+'%', height:'100%', background:ms.color, borderRadius:2 } })
        ),
        ...ms.items.map((it, j) => h('div', { key:j, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:8 } },
          h('div', { style:{ width:16, height:16, borderRadius:4, border:'2px solid '+(it.done?C.green:C.div),
            background: it.done ? C.green : 'transparent', display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:10, color:'#fff', flexShrink:0 } }, it.done ? '\u2713' : ''),
          h('div', { style:{ fontFamily:MF, fontSize:11, color: it.done ? C.t3 : C.t1,
            textDecoration: it.done ? 'line-through' : 'none' } }, it.text)
        ))
      );
    })
  );

  const statusColor = { done:C.green, progress:C.gold, pending:C.t3 };
  const prioColor = { critical:'#D4443B', high:C.gold, medium:C.t3 };
  const deadlinesView = h('div', { style:{ display:'flex', flexDirection:'column', gap:6 } },
    h('div', { style:{ display:'grid', gridTemplateColumns:'65px 1fr 80px 80px 70px', gap:8, padding:'8px 12px',
      background:C.cream, borderRadius:6 } },
      ...['Date','Task','Owner','Priority','Status'].map((l,i) =>
        h('div', { key:i, style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l))
    ),
    ...deadlines.map((d, i) => h('div', { key:i, onMouseEnter:()=>setHover('dl-'+i), onMouseLeave:()=>setHover(null),
      style:{ display:'grid', gridTemplateColumns:'65px 1fr 80px 80px 70px', gap:8, alignItems:'center',
        padding:'10px 12px', background: hover==='dl-'+i ? C.cream : C.ivory, border:'1px solid '+C.div,
        borderRadius:6, transition:'all 0.2s' }
    },
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, d.date),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir } }, d.task),
      h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t2 } }, d.owner),
      h('div', { style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:10, textAlign:'center',
        background:(prioColor[d.priority]||C.t3)+'22', color:prioColor[d.priority]||C.t3,
        textTransform:'uppercase' } }, d.priority),
      h('div', { style:{ fontFamily:MF, fontSize:9, padding:'2px 6px', borderRadius:10, textAlign:'center',
        background:statusColor[d.status]+'22', color:statusColor[d.status],
        textTransform:'uppercase' } }, d.status)
    ))
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32, fontFamily:HF } },
    h('div', { style:{ maxWidth:960, margin:'0 auto' } },
      h('div', { style:{ marginBottom:20 } },
        h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:0 } }, 'Eigen Conquest Calendar 2026'),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3, marginTop:4 } }, 'Strategic events, milestones & deadlines')
      ),
      summary,
      tabBar,
      tab === 'calendar' && calendarView,
      tab === 'milestones' && milestonesView,
      tab === 'deadlines' && deadlinesView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

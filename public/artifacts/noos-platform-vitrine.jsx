const { useState } = React;
const C = { ivory:'#FDFAF3', cream:'#F7F3EA', gold:'#B8963E', noir:'#2C2925', t1:'#4A4640', t2:'#6B6560', t3:'#918977', div:'#D4CCBA', green:'#5B8C6E' };
const HF = 'Playfair Display, serif';
const MF = 'JetBrains Mono, monospace';
const features = [
  { icon:'\uD83C\uDFE5', name:'Teleconsultation', desc:'HD video consultations with AI-powered triage, multi-language support, and automatic medical note generation. Connect patients to specialists across Africa in real-time.',
    stats:['99.9% uptime','<200ms latency','15+ languages'] },
  { icon:'\uD83E\uDDE0', name:'Diagnostic IA', desc:'AI-assisted diagnostic engine trained on 2M+ African clinical cases. Supports dermatology, radiology, and pathology with explainable AI results.',
    stats:['94% accuracy','2s avg response','50+ conditions'] },
  { icon:'\uD83D\uDCCA', name:'Suivi Patient', desc:'Comprehensive patient monitoring dashboard with IoT device integration, automated alerts, medication tracking, and longitudinal health records.',
    stats:['Real-time sync','HIPAA compliant','Offline mode'] },
  { icon:'\uD83D\uDC8A', name:'Pharmacovigilance', desc:'Automated adverse drug reaction detection, WHO-VigiBase integration, SMS-based reporting for rural areas, and regulatory compliance automation.',
    stats:['WHO compliant','SMS reporting','Auto-alerts'] },
];
const pricing = [
  { tier:'Starter', price:'Free', period:'forever', color:C.t2, features:['5 teleconsultations/mo','Basic patient records','Email support','1 practitioner','Community access'], cta:'Get Started' },
  { tier:'Pro', price:'299 EUR', period:'/month', color:C.gold, features:['Unlimited consultations','AI diagnostics','Priority support','10 practitioners','API access','Custom branding'], cta:'Start Free Trial', popular:true },
  { tier:'Enterprise', price:'Custom', period:'contact us', color:C.noir, features:['Unlimited everything','Dedicated infrastructure','24/7 SLA support','Unlimited practitioners','White-label solution','On-premise option','Custom integrations'], cta:'Contact Sales' },
];
const testimonials = [
  { name:'Dr. Fatima K.', role:'Chief Medical Officer, Casablanca', text:'NOOS transformed how we deliver care to remote communities. The AI diagnostic accuracy is remarkable.' },
  { name:'Prof. Adebayo O.', role:'Hospital Director, Lagos', text:'The pharmacovigilance module alone saved us hundreds of hours of manual reporting each quarter.' },
  { name:'Marie D.', role:'Health Ministry Advisor, Dakar', text:'A platform built for Africa, by people who understand African healthcare challenges.' },
];
const TABS = ['features','pricing','about'];

function App() {
  const [tab, setTab] = useState('features');
  const [hover, setHover] = useState(null);
  const h = (tag, props, ...ch) => React.createElement(tag, props, ...ch);

  const tabBar = h('div', { style:{ display:'flex', gap:8, marginBottom:24 } },
    ...TABS.map(t => h('button', { key:t, onClick:()=>setTab(t), onMouseEnter:()=>setHover('tab-'+t), onMouseLeave:()=>setHover(null),
      style:{ padding:'8px 20px', fontFamily:MF, fontSize:11, textTransform:'uppercase', letterSpacing:1.5,
        background: tab===t ? C.gold : hover==='tab-'+t ? C.cream : 'transparent',
        color: tab===t ? C.ivory : C.t1, border:'1px solid '+C.div, borderRadius: 0, cursor:'pointer', transition:'all 0.2s' }
    }, t))
  );

  const hero = h('div', { style:{ textAlign:'center', padding:'40px 20px', marginBottom:24, background:'linear-gradient(135deg, '+C.noir+' 0%, '+C.t1+' 100%)', borderRadius: 0, } },
    h('div', { style:{ fontFamily:MF, fontSize:11, color:C.gold, textTransform:'uppercase', letterSpacing:3, marginBottom:8 } }, 'The Future of African Healthcare'),
    h('h2', { style:{ fontFamily:HF, fontSize:36, fontWeight:700, color:C.ivory, margin:'0 0 12px' } }, 'NOOS Health Platform'),
    h('div', { style:{ fontFamily:MF, fontSize:13, color:C.div, maxWidth:500, margin:'0 auto', lineHeight:1.6 } },
      'AI-powered telemedicine, diagnostics, and patient monitoring designed for the African continent.'),
    h('div', { style:{ display:'flex', justifyContent:'center', gap:24, marginTop:20 } },
      ...[ ['2M+','Clinical Cases'],['15+','Languages'],['99.9%','Uptime'] ].map(([v,l],i) =>
        h('div', { key:i }, h('div', { style:{ fontFamily:HF, fontSize:24, fontWeight:700, color:C.gold } }, v),
          h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3 } }, l))
      )
    )
  );

  const featuresView = h('div', null, hero,
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 } },
      ...features.map((f,i) => h('div', { key:i, onMouseEnter:()=>setHover('f-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='f-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:24,
          transition:'all 0.25s', transform: hover==='f-'+i ? 'translateY(-4px)':'none',
          boxShadow: hover==='f-'+i ? '0 8px 24px rgba(0,0,0,0.08)':'none' }
      },
        h('div', { style:{ fontSize:32, marginBottom:12 } }, f.icon),
        h('div', { style:{ fontFamily:HF, fontSize:22, fontWeight:700, color:C.noir, marginBottom:8 } }, f.name),
        h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t2, lineHeight:1.6, marginBottom:12 } }, f.desc),
        h('div', { style:{ display:'flex', gap:8, flexWrap:'wrap' } },
          ...f.stats.map((s,j) => h('span', { key:j, style:{ fontFamily:MF, fontSize:9, padding:'3px 8px', borderRadius: 0, background:C.gold+'15', color:C.gold } }, s))
        )
      ))
    )
  );

  const pricingView = h('div', null,
    h('div', { style:{ textAlign:'center', marginBottom:24 } },
      h('h2', { style:{ fontFamily:HF, fontSize:28, fontWeight:700, color:C.noir } }, 'Simple, Transparent Pricing'),
      h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3 } }, 'Start free, scale as you grow')
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, alignItems:'start' } },
      ...pricing.map((p,i) => h('div', { key:i, onMouseEnter:()=>setHover('pr-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='pr-'+i ? C.cream : C.ivory, border: p.popular ? '2px solid '+C.gold : '1px solid '+C.div,
          borderRadius: 0, padding:24, transition:'all 0.25s', transform: hover==='pr-'+i ? 'translateY(-4px)':'none',
          boxShadow: p.popular ? '0 8px 24px rgba(184,150,62,0.15)':'none', position:'relative' }
      },
        p.popular && h('div', { style:{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', fontFamily:MF, fontSize:9,
          padding:'3px 12px', borderRadius: 0, background:C.gold, color:C.ivory, textTransform:'uppercase', letterSpacing:1 } }, 'Most Popular'),
        h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:p.color, marginBottom:4 } }, p.tier),
        h('div', { style:{ display:'flex', alignItems:'baseline', gap:4, marginBottom:4 } },
          h('span', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir } }, p.price),
          h('span', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, p.period)
        ),
        h('div', { style:{ borderTop:'1px solid '+C.div, margin:'12px 0', paddingTop:12 } },
          ...p.features.map((f,j) => h('div', { key:j, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:6 } },
            h('span', { style:{ color:C.green, fontSize:12 } }, '\u2713'),
            h('span', { style:{ fontFamily:MF, fontSize:11, color:C.t1 } }, f)
          ))
        ),
        h('div', { onMouseEnter:()=>setHover('cta-'+i), onMouseLeave:()=>setHover(null),
          style:{ marginTop:16, padding:'10px 0', textAlign:'center', borderRadius: 0, fontFamily:MF, fontSize:11,
            textTransform:'uppercase', letterSpacing:1, cursor:'pointer', transition:'all 0.2s',
            background: p.popular ? C.gold : 'transparent', color: p.popular ? C.ivory : C.gold,
            border: p.popular ? 'none' : '1px solid '+C.gold } }, p.cta)
      ))
    )
  );

  const numbers = [['10+','Partner Hospitals',C.gold],['3','African Markets',C.green],['50K+','Patients Served','#3B82F6'],['24/7','Support Available','#8B5CF6']];
  const aboutView = h('div', null,
    h('div', { style:{ textAlign:'center', padding:'30px 20px', marginBottom:20, background:C.cream, borderRadius: 0, } },
      h('h2', { style:{ fontFamily:HF, fontSize:28, fontWeight:700, color:C.noir, margin:'0 0 8px' } }, 'Built for Africa. By Africa.'),
      h('div', { style:{ fontFamily:MF, fontSize:12, color:C.t2, maxWidth:500, margin:'0 auto', lineHeight:1.6 } },
        'NOOS is a subsidiary of Eigen, building next-generation healthcare infrastructure for the continent that needs it most.')
    ),
    h('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 } },
      ...numbers.map(([v,l,c],i) => h('div', { key:i, onMouseEnter:()=>setHover('nb-'+i), onMouseLeave:()=>setHover(null),
        style:{ textAlign:'center', padding:14, background: hover==='nb-'+i ? C.cream : C.ivory, border:'1px solid '+C.div,
          borderRadius: 0, transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:HF, fontSize:24, fontWeight:700, color:c } }, v),
        h('div', { style:{ fontFamily:MF, fontSize:9, color:C.t3, textTransform:'uppercase', letterSpacing:1 } }, l)
      ))
    ),
    h('div', { style:{ fontFamily:HF, fontSize:20, fontWeight:700, color:C.noir, marginBottom:12 } }, 'What Our Users Say'),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:12 } },
      ...testimonials.map((t,i) => h('div', { key:i, onMouseEnter:()=>setHover('ts-'+i), onMouseLeave:()=>setHover(null),
        style:{ background: hover==='ts-'+i ? C.cream : C.ivory, border:'1px solid '+C.div, borderRadius: 0, padding:20,
          borderLeft:'3px solid '+C.gold, transition:'all 0.2s' }
      },
        h('div', { style:{ fontFamily:HF, fontSize:15, color:C.t1,  lineHeight:1.6, marginBottom:10 } }, '"'+t.text+'"'),
        h('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
          h('div', { style:{ width:32, height:32, borderRadius: 0, background:C.gold+'22', display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:HF, fontSize:14, fontWeight:700, color:C.gold } }, t.name[0]),
          h('div', null,
            h('div', { style:{ fontFamily:MF, fontSize:11, color:C.noir, fontWeight:600 } }, t.name),
            h('div', { style:{ fontFamily:MF, fontSize:10, color:C.t3 } }, t.role)
          )
        )
      ))
    )
  );

  return h('div', { style:{ background:C.ivory, minHeight:'100vh', padding:32 } },
    h('div', { style:{ maxWidth:900, margin:'0 auto' } },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 } },
        h('div', null,
          h('h1', { style:{ fontFamily:HF, fontSize:32, fontWeight:700, color:C.noir, margin:0 } }, 'NOOS Platform'),
          h('div', { style:{ fontFamily:MF, fontSize:11, color:C.t3 } }, 'Digital Health for Africa')
        ),
        h('div', { style:{ fontFamily:MF, fontSize:10, padding:'6px 14px', borderRadius: 0, background:C.green+'22', color:C.green } }, 'Live')
      ),
      tabBar,
      tab==='features' && featuresView,
      tab==='pricing' && pricingView,
      tab==='about' && aboutView
    )
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

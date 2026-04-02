const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// Title & Subtitle
content = content.replace(
  /<h1 className="font-\[family-name:var\(--font-playfair\)\] text-\[32px\] font-bold\s+text-noir">([\s\S]*?)<\/h1>/g,
  '<h1 className="font-[family-name:var(--font-playfair)] text-[32px] font-normal uppercase tracking-[3px] text-noir">$1</h1>'
);
content = content.replace(
  /<span className="font-normal text-\[22px\] text-gold">/g,
  '<span className="font-normal text-[32px] text-gold tracking-[3px]">'
);
content = content.replace(
  /<p className="font-\[family-name:var\(--font-jetbrains\)\] text-\[10px\] text-t3 tracking-\[2px\]">/g,
  '<p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-medium tracking-[2px] text-[rgba(255,255,255,0.50)]">'
);

// Buttons
content = content.replace(
  /<a href="\/eigen" className="px-4 py-2 bg-gold text-white font-\[family-name:var\(--font-jetbrains\)\] text-\[10px\] tracking-wider rounded-none hover:bg-gold-d transition">/g,
  '<a href="/eigen" className="px-4 py-2 bg-gold text-white font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold uppercase tracking-[2px] rounded-none hover:bg-gold-d transition">'
);
content = content.replace(
  /<a href="\/upload" className="px-4 py-2 border border-stone text-stone font-\[family-name:var\(--font-jetbrains\)\] text-\[10px\] tracking-wider rounded-none hover:border-gold hover:text-gold transition">/g,
  '<a href="/upload" className="px-4 py-2 border border-stone text-stone font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold uppercase tracking-[2px] rounded-none hover:border-gold hover:text-gold transition">'
);
content = content.replace(
  /<a href="\/vault" className="px-3 py-2 text-\[10px\] font-\[family-name:var\(--font-jetbrains\)\] tracking-wider text-\[#7B5EA7\] border border-\[#7B5EA7\] rounded-none hover:bg-\[#7B5EA7\] hover:text-white transition">/g,
  '<a href="/vault" className="px-3 py-2 text-[10px] font-[family-name:var(--font-jetbrains)] font-semibold uppercase tracking-[2px] text-[#7B5EA7] border border-[#7B5EA7] rounded-none hover:bg-[#7B5EA7] hover:text-white transition">'
);

// Cards Modules Labels
content = content.replace(/text-\[9px\](.*?) tracking-\[3px\]/g, 'text-[9px]$1 font-semibold tracking-[3px] uppercase'); // Eigen
content = content.replace(/text-\[9px\](.*?) tracking-\[2px\]( mb-[0-9]+.*?)/g, 'text-[9px]$1 font-semibold tracking-[3px] uppercase$2'); // NEXUS, DASHBOARD, DATA, COMITE

// Card titles -> Playfair 20px weight 400 NORMAL
// Matches: <div className="font-[family-name:var(--font-playfair)] text-[24px] font-bold  mb-2">EIGEN Stratégique</div>
content = content.replace(
  /<div className="font-\[family-name:var\(--font-playfair\)\] text-\[(?:16|20|24)px\] font-bold(.*?)">/g,
  '<div className="font-[family-name:var(--font-playfair)] text-[20px] font-normal$1">'
);

// Descriptions -> Geist 12px weight 400
content = content.replace(
  /<div className="font-\[family-name:var\(--font-noto\)\] text-\[(?:10|11)px\]( text-.*?) mb-([0-9]+)">/g,
  '<div className="font-[family-name:var(--font-noto)] text-[12px] font-normal$1 mb-$2">'
);

// Pills -> JetBrains Mono 8px weight 600 letterspacing 1px
content = content.replace(
  /<span className="font-\[family-name:var\(--font-jetbrains\)\] text-\[7px\]/g,
  '<span className="font-[family-name:var(--font-jetbrains)] text-[8px] font-semibold tracking-[1px]'
);

// Activité Récente
content = content.replace(
  /<h2 className="font-\[family-name:var\(--font-playfair\)\] text-\[20px\] font-bold\s+text-noir">Activité Récente<\/h2>/g,
  '<h2 className="font-[family-name:var(--font-playfair)] text-[18px] font-normal uppercase tracking-[2px] text-noir">Activité Récente</h2>'
);

// Bottom bar
content = content.replace(
  /<span className="text-\[7px\] (text-tm|text-gold) font-\[family-name:var\(--font-jetbrains\)\]">/g,
  '<span className="text-[9px] font-medium $1 font-[family-name:var(--font-jetbrains)]">'
);

// Zero border-radius and exact uniform borders
content = content.replace(
  /<a href="\/eigen" className="col-span-1 row-span-2 bg-noir text-white rounded-none-none p-6 hover:ring-2 hover:ring-gold transition group no-underline">/g,
  '<a href="/eigen" className="col-span-1 row-span-2 bg-noir text-white p-6 hover:ring-2 hover:ring-gold transition group no-underline" style={{ border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/nexus" className="bg-noir text-gold-l rounded-none-none p-5 hover:ring-1 hover:ring-gold transition no-underline group">/g,
  '<a href="/nexus" className="bg-noir text-gold-l p-5 hover:ring-1 hover:ring-gold transition no-underline group" style={{ border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/dashboards\/investor" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">/g,
  '<a href="/dashboards/investor" className="bg-ivory p-5 hover:border-gold transition no-underline" style={{ border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/data" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">/g,
  '<a href="/data" className="bg-ivory p-5 hover:border-gold transition no-underline" style={{ border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/stats" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">/g,
  '<a href="/stats" className="bg-ivory p-5 hover:border-gold transition no-underline" style={{ border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/eigen\?tab=board" className="bg-ivory border border-div rounded-none-none p-5 hover:border-gold transition no-underline">/g,
  '<a href="/eigen?tab=board" className="bg-ivory p-5 hover:border-gold transition no-underline" style={{ border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/eigen\?tab=terminal" className="bg-noir text-gold-l rounded-none-none p-5 hover:ring-1 hover:ring-gold transition no-underline">/g,
  '<a href="/eigen?tab=terminal" className="bg-noir text-gold-l p-5 hover:ring-1 hover:ring-gold transition no-underline" style={{ border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 0 }}>'
);
content = content.replace(
  /<a href="\/corridor" className="rounded-none-none p-5 hover:ring-1 hover:ring-\[rgba\(201,169,110,0\.5\)\] transition no-underline" style={{ background: \'linear-gradient\(135deg, #0A0A08 0%, #1A1918 100%\)\', border: \'1px solid rgba\(201,169,110,0\.25\)\', color: \'#E8E5DE\' }}>/g,
  '<a href="/corridor" className="p-5 hover:ring-1 hover:ring-[rgba(201,169,110,0.5)] transition no-underline" style={{ background: \'linear-gradient(135deg, #0A0A08 0%, #1A1918 100%)\', border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 0, color: \'#E8E5DE\' }}>'
);

// gap 16px
content = content.replace(/gap-4/g, 'gap-[16px]');

// Fix inline styles with Playfair Display (removing italic / Cormorant)
content = content.replace(/fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', color: '#C9A96E'/g, "fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: 'normal', color: '#C9A96E'");


fs.writeFileSync('app/page.tsx', content, 'utf8');


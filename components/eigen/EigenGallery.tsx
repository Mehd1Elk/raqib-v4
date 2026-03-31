'use client';

import { useState } from 'react';

type ItemType = 'docx' | 'jsx' | 'antigravity';
type Category = 'Architecture' | 'Acquisition' | 'Conquête' | 'Observance' | 'Memorandum' | 'NOOS' | 'CG' | 'Réseau' | 'Interfaces' | 'Vision';

interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  type: ItemType;
  date: string;
  size: string;
}

const mockData: GalleryItem[] = [
  { id: '1', title: 'Mémorandum d\'Investissement', category: 'Memorandum', type: 'docx', date: '01 Avr 2026', size: '45 pages' },
  { id: '2', title: 'Dashboard V4 Auth Flow', category: 'Interfaces', type: 'jsx', date: '30 Mar 2026', size: '342 lignes' },
  { id: '3', title: 'Conception Agent CC-D', category: 'Architecture', type: 'antigravity', date: '28 Mar 2026', size: '1 artifact' },
  { id: '4', title: 'Roadmap Q3 2026', category: 'Vision', type: 'docx', date: '15 Mar 2026', size: '12 pages' },
  { id: '5', title: 'Composant Terminal', category: 'Interfaces', type: 'jsx', date: '02 Avr 2026', size: '150 lignes' },
  { id: '6', title: 'Data Room Structure', category: 'CG', type: 'docx', date: '20 Mar 2026', size: '18 pages' },
  { id: '7', title: 'Algorithme NOOS Pattern', category: 'NOOS', type: 'antigravity', date: '25 Mar 2026', size: '3 artifacts' },
  { id: '8', title: 'Target Holmarcom 2026', category: 'Conquête', type: 'docx', date: '12 Mar 2026', size: '5 pages' },
];

const TypeBadge = ({ type }: { type: ItemType }) => {
  const styles = {
    docx: 'bg-blue-100 text-blue-800 border-blue-200',
    jsx: 'bg-purple-100 text-purple-800 border-purple-200',
    antigravity: 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <span className={`text-[8px] font-[family-name:var(--font-jetbrains)] px-1.5 py-[2px] rounded border uppercase tracking-widest ${styles[type]}`}>
      {type}
    </span>
  );
};

export function EigenGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [filterCat, setFilterCat] = useState<Category | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<ItemType | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  
  const categories: (Category | 'ALL')[] = ['ALL', 'Architecture', 'Acquisition', 'Conquête', 'Observance', 'Memorandum', 'NOOS', 'CG', 'Réseau', 'Interfaces', 'Vision'];

  const filtered = mockData.filter(item => {
    if (filterCat !== 'ALL' && item.category !== filterCat) return false;
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#FDFAF3] font-[family-name:var(--font-jetbrains)]">
      {/* Top Filter Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-[#D4CCBA] bg-white gap-4 w-full sticky top-0 z-10">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <select 
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as Category | 'ALL')}
            className="bg-[#FDFAF3] border border-[#D4CCBA] text-[#1C1814] text-[10px] px-2 py-1 outline-none"
          >
            {categories.map(c => <option key={c} value={c}>{c === 'ALL' ? 'Catégorie' : c}</option>)}
          </select>
          
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ItemType | 'ALL')}
            className="bg-[#FDFAF3] border border-[#D4CCBA] text-[#1C1814] text-[10px] px-2 py-1 outline-none"
          >
            <option value="ALL">Type de doc</option>
            <option value="docx">DOCX</option>
            <option value="jsx">JSX</option>
            <option value="antigravity">ANTIGRAVITY</option>
          </select>

          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#FDFAF3] border border-[#D4CCBA] text-[10px] px-2 py-1 w-[200px] outline-none placeholder-[#918977]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 border transition-colors ${viewMode === 'grid' ? 'border-[#B8963E] bg-[#F2EFE8] text-[#B8963E]' : 'border-[#D4CCBA] text-[#918977] hover:bg-[#F2EFE8]'}`}
          >
            {/* Grid Icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </button>
          <button 
            onClick={() => setViewMode('carousel')}
            className={`p-1.5 border transition-colors ${viewMode === 'carousel' ? 'border-[#B8963E] bg-[#F2EFE8] text-[#B8963E]' : 'border-[#D4CCBA] text-[#918977] hover:bg-[#F2EFE8]'}`}
          >
            {/* Carousel Icon */}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className={`gap-6 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'flex flex-row overflow-x-auto pb-4 snap-x'}`}>
          {filtered.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white border border-[#D4CCBA] p-3 flex flex-col gap-3 transition-all duration-300 hover:scale-102 hover:shadow-[0_4px_12px_rgba(184,150,62,0.15)] hover:border-[#B8963E] cursor-pointer ${viewMode === 'carousel' ? 'w-[260px] shrink-0 snap-center' : ''}`}
            >
              {/* Thumbnail 200x140px approx via aspect ratio */}
              <div className="w-full h-[140px] bg-[#F2EFE8] flex items-center justify-center border border-[#E8E2D2]">
                 <span className="text-4xl text-[#D4CCBA]">{item.type === 'jsx' ? '⚛️' : item.type === 'docx' ? '📝' : '🤖'}</span>
              </div>
              
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-[family-name:var(--font-cormorant)] text-[13px] font-bold italic text-[#1C1814] leading-snug">
                    {item.title}
                  </h4>
                  <TypeBadge type={item.type} />
                </div>
                
                <div className="flex items-center justify-between text-[#918977] text-[8px] mt-auto">
                  <span>{item.date}</span>
                  <span>{item.size}</span>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
             <div className="col-span-full py-12 text-center text-[#918977] text-[11px]">
               Aucun document trouvé.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

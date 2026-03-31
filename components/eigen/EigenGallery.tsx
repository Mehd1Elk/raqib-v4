'use client';

import { useState, useRef } from 'react';
import { Search, Upload, LayoutGrid, Rows3, FileText, Code2, Cpu, ExternalLink, MoreVertical, Pencil, Trash2, Copy, FolderOpen } from 'lucide-react';

type ItemType = 'docx' | 'jsx' | 'antigravity';
type Category = 'Architecture' | 'Acquisition' | 'Conquête' | 'Observance' | 'Memorandum' | 'NOOS' | 'CG' | 'Réseau' | 'Interfaces' | 'Vision';

interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  type: ItemType;
  date: string;
  size: string;
  filename?: string;
}

const mockData: GalleryItem[] = [
  { id: '1', title: "Mémorandum d'Investissement", category: 'Memorandum', type: 'docx', date: '01 Avr 2026', size: '45 pages' },
  { id: '2', title: 'Dashboard V4 Auth Flow', category: 'Interfaces', type: 'jsx', date: '30 Mar 2026', size: '342 lignes', filename: 'raqib-v4-source.jsx' },
  { id: '3', title: 'Conception Agent CC-D', category: 'Architecture', type: 'antigravity', date: '28 Mar 2026', size: '1 artifact' },
  { id: '4', title: 'Roadmap Q3 2026', category: 'Vision', type: 'docx', date: '15 Mar 2026', size: '12 pages' },
  { id: '5', title: 'Composant Terminal EIGEN', category: 'Interfaces', type: 'jsx', date: '02 Avr 2026', size: '150 lignes', filename: 'noos-platform-vitrine.jsx' },
  { id: '6', title: 'Data Room Structure CG', category: 'CG', type: 'docx', date: '20 Mar 2026', size: '18 pages' },
  { id: '7', title: 'Algorithme NOOS Pattern', category: 'NOOS', type: 'antigravity', date: '25 Mar 2026', size: '3 artifacts' },
  { id: '8', title: 'Target Holmarcom 2026', category: 'Conquête', type: 'docx', date: '12 Mar 2026', size: '5 pages' },
  { id: '9', title: 'ÆLYA Masterplan', category: 'Architecture', type: 'jsx', date: '29 Mar 2026', size: '280 lignes', filename: 'aelya-masterplan.jsx' },
  { id: '10', title: 'BURHAN Portals Demo', category: 'Interfaces', type: 'jsx', date: '28 Mar 2026', size: '200 lignes', filename: 'burhan-portals-demo.jsx' },
  { id: '11', title: 'Conquête 2026 Calendar', category: 'Conquête', type: 'jsx', date: '27 Mar 2026', size: '190 lignes', filename: 'eigen-conquest-calendar.jsx' },
  { id: '12', title: 'Corridor Intelligence', category: 'Réseau', type: 'jsx', date: '26 Mar 2026', size: '250 lignes', filename: 'raqib-corridor-intelligence.jsx' },
];

function TypeIcon({ type, size = 14 }: { type: ItemType; size?: number }) {
  switch (type) {
    case 'jsx': return <Code2 size={size} strokeWidth={1.5} />;
    case 'docx': return <FileText size={size} strokeWidth={1.5} />;
    case 'antigravity': return <Cpu size={size} strokeWidth={1.5} />;
  }
}

const TYPE_STYLES: Record<ItemType, { bg: string; text: string; border: string }> = {
  docx: { bg: 'bg-[#3D5E8C10]', text: 'text-[#3D5E8C]', border: 'border-[#3D5E8C30]' },
  jsx: { bg: 'bg-[#7B5EA710]', text: 'text-[#7B5EA7]', border: 'border-[#7B5EA730]' },
  antigravity: { bg: 'bg-[#9C3D3D10]', text: 'text-[#9C3D3D]', border: 'border-[#9C3D3D30]' },
};

function ArtifactThumbnail({ item }: { item: GalleryItem }) {
  const style = TYPE_STYLES[item.type];

  if ((item.type === 'jsx' || item.type === 'antigravity') && item.filename) {
    return (
      <div className="w-full h-[140px] overflow-hidden rounded-t-lg bg-[#F7F3EA] relative">
        <iframe
          src={`/artifacts/${item.filename}`}
          sandbox="allow-scripts"
          className="absolute inset-0 w-[800px] h-[560px] origin-top-left border-0"
          style={{ transform: 'scale(0.25)', pointerEvents: 'none' }}
          title={item.title}
        />
        <div className={`absolute top-2 right-2 px-2 py-0.5 ${style.bg} ${style.text} font-[family-name:var(--font-jetbrains)] text-[7px] rounded border ${style.border}`}>
          {item.type.toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-[140px] rounded-t-lg ${style.bg} flex flex-col items-center justify-center relative`}>
      <TypeIcon type={item.type} size={28} />
      <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] mt-2">{item.type.toUpperCase()}</div>
      <div className={`absolute top-2 right-2 px-2 py-0.5 ${style.bg} ${style.text} font-[family-name:var(--font-jetbrains)] text-[7px] rounded border ${style.border}`}>
        {item.type.toUpperCase()}
      </div>
    </div>
  );
}

function CardActions({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="p-1 hover:bg-[rgba(184,150,62,0.08)] rounded">
        <MoreVertical size={14} className="text-[#918977]" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-[160px] bg-[#FDFAF3] border border-div rounded-lg shadow-lg z-30 py-1">
          <button onClick={(e) => { e.stopPropagation(); onOpen(); setOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(184,150,62,0.08)] text-[#6B5E4C]">
            <ExternalLink size={12} /> <span className="font-[family-name:var(--font-noto)] text-[10px]">Ouvrir</span>
          </button>
          <button className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(184,150,62,0.08)] text-[#6B5E4C]">
            <Pencil size={12} /> <span className="font-[family-name:var(--font-noto)] text-[10px]">Modifier</span>
          </button>
          <button className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(184,150,62,0.08)] text-[#6B5E4C]">
            <Copy size={12} /> <span className="font-[family-name:var(--font-noto)] text-[10px]">Dupliquer</span>
          </button>
          <div className="border-t border-div my-1" />
          <button className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(156,61,61,0.05)] text-[#9C3D3D]">
            <Trash2 size={12} /> <span className="font-[family-name:var(--font-noto)] text-[10px]">Supprimer</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function EigenGallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCat, setFilterCat] = useState<Category | 'ALL'>('ALL');
  const [filterType, setFilterType] = useState<ItemType | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [viewer, setViewer] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: (Category | 'ALL')[] = ['ALL', 'Architecture', 'Acquisition', 'Conquête', 'Observance', 'Memorandum', 'NOOS', 'CG', 'Réseau', 'Interfaces', 'Vision'];

  const filtered = mockData.filter(item => {
    if (filterCat !== 'ALL' && item.category !== filterCat) return false;
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#FDFAF3]">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-div bg-ivory gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-[240px]">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#918977]" />
            <input
              type="text"
              placeholder="Recherche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-cream border border-div text-[10px] font-[family-name:var(--font-jetbrains)] pl-8 pr-2 py-1.5 outline-none focus:border-gold rounded"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as Category | 'ALL')}
            className="bg-cream border border-div text-noir text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1.5 outline-none rounded"
          >
            {categories.map(c => <option key={c} value={c}>{c === 'ALL' ? 'Catégorie' : c}</option>)}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ItemType | 'ALL')}
            className="bg-cream border border-div text-noir text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1.5 outline-none rounded"
          >
            <option value="ALL">Type</option>
            <option value="docx">DOCX</option>
            <option value="jsx">JSX</option>
            <option value="antigravity">ANTIGRAVITY</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gold rounded text-gold hover:bg-[rgba(184,150,62,0.05)] transition font-[family-name:var(--font-jetbrains)] text-[9px]"
          >
            <Upload size={12} strokeWidth={1.5} />
            AJOUTER
          </button>
          <div className="flex border border-div rounded overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gold text-white' : 'text-stone hover:bg-cream'}`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-gold text-white' : 'text-stone hover:bg-cream'}`}
            >
              <Rows3 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="font-[family-name:var(--font-jetbrains)] text-[9px] text-t3 mb-4">
          {filtered.length} document{filtered.length !== 1 ? 's' : ''}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setViewer(item)}
                className="bg-white border border-div rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gold cursor-pointer group"
              >
                <ArtifactThumbnail item={item} />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-[family-name:var(--font-cormorant)] text-[13px] font-bold italic text-noir leading-snug flex-1">
                      {item.title}
                    </h4>
                    <CardActions onOpen={() => setViewer(item)} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-[family-name:var(--font-jetbrains)] text-[8px] px-1.5 py-0.5 bg-cream text-t3 rounded">{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-t3 text-[8px] font-[family-name:var(--font-jetbrains)]">
                    <span>{item.date}</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item) => {
              const style = TYPE_STYLES[item.type];
              return (
                <div
                  key={item.id}
                  onClick={() => setViewer(item)}
                  className="flex items-center gap-4 px-4 py-3 bg-white border border-div rounded-lg hover:border-gold transition cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${style.bg} ${style.text}`}>
                    <TypeIcon type={item.type} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-[family-name:var(--font-cormorant)] text-[13px] font-bold italic text-noir truncate">{item.title}</div>
                    <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3">{item.category}</div>
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3">{item.date}</div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3">{item.size}</div>
                  <span className={`font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}>
                    {item.type.toUpperCase()}
                  </span>
                  <CardActions onOpen={() => setViewer(item)} />
                </div>
              );
            })}
          </div>
        )}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-t3 text-[11px] font-[family-name:var(--font-noto)]">
            Aucun document trouvé.
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center" onClick={() => setShowUpload(false)}>
          <div className="bg-ivory rounded-lg w-[480px] p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-[family-name:var(--font-cormorant)] text-[18px] font-bold italic text-noir mb-4">Ajouter à la galerie</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-sand rounded-lg p-8 text-center hover:border-gold transition cursor-pointer mb-4"
            >
              <Upload size={24} className="mx-auto mb-2 text-stone" strokeWidth={1.5} />
              <p className="font-[family-name:var(--font-noto)] text-[11px] text-stone">
                Glisser un fichier ici ou <span className="text-gold underline">parcourir</span>
              </p>
              <p className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3 mt-1">JSX · HTML · DOCX · PDF · PNG · SVG</p>
              <input type="file" hidden ref={fileInputRef} accept=".jsx,.html,.docx,.pdf,.png,.svg" />
            </div>
            <div className="space-y-3">
              <input placeholder="Titre" className="w-full font-[family-name:var(--font-cormorant)] text-[14px] italic border-b border-sand pb-1 bg-transparent focus:border-gold outline-none" />
              <select className="w-full font-[family-name:var(--font-jetbrains)] text-[10px] text-stone border border-sand rounded px-2 py-1.5 bg-transparent">
                <option value="">Catégorie...</option>
                {categories.filter(c => c !== 'ALL').map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea placeholder="Description..." className="w-full font-[family-name:var(--font-noto)] text-[11px] border border-sand rounded px-2 py-1.5 bg-transparent h-20 resize-none focus:border-gold outline-none" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowUpload(false)} className="px-4 py-2 font-[family-name:var(--font-jetbrains)] text-[10px] text-stone">Annuler</button>
              <button className="px-4 py-2 bg-gold text-white font-[family-name:var(--font-jetbrains)] text-[10px] rounded hover:bg-gold-d transition">Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* Viewer Modal */}
      {viewer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-8" onClick={() => setViewer(null)}>
          <div className="bg-ivory rounded-lg w-full max-w-[900px] h-[80vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-div">
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-[16px] font-bold italic text-noir">{viewer.title}</h3>
                <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-t3">{viewer.category} · {viewer.date} · {viewer.size}</div>
              </div>
              <button onClick={() => setViewer(null)} className="p-1 hover:bg-cream rounded text-stone">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-cream">
              {viewer.filename ? (
                <iframe src={`/artifacts/${viewer.filename}`} className="w-full h-full border-0" title={viewer.title} sandbox="allow-scripts" />
              ) : (
                <div className="flex items-center justify-center h-full text-stone font-[family-name:var(--font-jetbrains)] text-[11px]">
                  Aperçu non disponible pour ce type de document
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, LayoutGrid, Rows3, Search, Pencil, Trash2, Copy, MoreVertical, X, FileText, Code2, Cpu, Archive } from 'lucide-react';
import { ArtifactViewer } from '@/components/ArtifactViewer';
import { useToast } from '@/components/ui/Toast';

// ------- Types -------

type ItemType = 'docx' | 'jsx' | 'html' | 'antigravity';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  type: ItemType;
  date: string;
  size: string;
  filename: string;
  description?: string;
}

// ------- Version groups -------

const VERSION_GROUPS: Record<string, string[]> = {
  'Constitution juridique NOOS': ['noos-constitution-juridique-v2.jsx', 'noos-constitution-juridique.jsx'],
};

function getVersionGroup(filename: string): { group: string; files: string[] } | null {
  for (const [group, files] of Object.entries(VERSION_GROUPS)) {
    if (files.includes(filename)) return { group, files };
  }
  return null;
}

// ------- Categories -------

const CATEGORIES = [
  'Architecture & Agents IA', 'Stratégie d\'Acquisition', 'Conquête 2026',
  'Observance & Tractation', 'Memorandum & Positionnement', 'NOOS Deep Dive',
  'CG Invest & Fundraising', 'Réseau & Advisory', 'Interfaces & Démos', 'Vision & Philosophie',
];

// ------- Static data -------

const staticItems: GalleryItem[] = [
  { id: 'a1', title: 'ÆLYA Masterplan', category: 'Architecture & Agents IA', type: 'jsx', date: '30 Mar 2026', size: '16.7 KB', filename: 'aelya-masterplan.jsx' },
  { id: 'a2', title: 'BURHAN Portals Demo', category: 'Interfaces & Démos', type: 'jsx', date: '29 Mar 2026', size: '10.2 KB', filename: 'burhan-portals-demo.jsx' },
  { id: 'a3', title: 'CG Conquête 2026', category: 'Conquête 2026', type: 'jsx', date: '28 Mar 2026', size: '14.0 KB', filename: 'cg-conquete-2026.jsx' },
  { id: 'a4', title: 'Eigen Conquest Calendar', category: 'Conquête 2026', type: 'jsx', date: '27 Mar 2026', size: '14.3 KB', filename: 'eigen-conquest-calendar.jsx' },
  { id: 'a5', title: 'Eigen Conquest Full', category: 'Conquête 2026', type: 'jsx', date: '26 Mar 2026', size: '12.2 KB', filename: 'eigen-conquest-full.jsx' },
  { id: 'a6', title: 'NOOS Cartographie Stages', category: 'NOOS Deep Dive', type: 'jsx', date: '25 Mar 2026', size: '13.4 KB', filename: 'noos-cartographie-stages.jsx' },
  { id: 'a7', title: 'Constitution Juridique NOOS V2', category: 'NOOS Deep Dive', type: 'jsx', date: '24 Mar 2026', size: '12.4 KB', filename: 'noos-constitution-juridique-v2.jsx' },
  { id: 'a8', title: 'Constitution Juridique NOOS V1', category: 'NOOS Deep Dive', type: 'jsx', date: '20 Mar 2026', size: '12.6 KB', filename: 'noos-constitution-juridique.jsx' },
  { id: 'a9', title: 'NOOS Écosystème Intégral', category: 'NOOS Deep Dive', type: 'jsx', date: '23 Mar 2026', size: '32.2 KB', filename: 'noos-ecosysteme-integral.jsx' },
  { id: 'a10', title: 'NOOS GITEX Future Health Prep', category: 'Stratégie d\'Acquisition', type: 'jsx', date: '22 Mar 2026', size: '13.5 KB', filename: 'noos-gitex-future-health-prep.jsx' },
  { id: 'a11', title: 'NOOS Plan Exécution IA', category: 'Architecture & Agents IA', type: 'jsx', date: '21 Mar 2026', size: '10.4 KB', filename: 'noos-plan-execution-ia.jsx' },
  { id: 'a12', title: 'NOOS Platform Vitrine', category: 'Interfaces & Démos', type: 'jsx', date: '20 Mar 2026', size: '11.5 KB', filename: 'noos-platform-vitrine.jsx' },
  { id: 'a13', title: 'NOOS Stagiaires vs IA', category: 'Observance & Tractation', type: 'jsx', date: '19 Mar 2026', size: '11.5 KB', filename: 'noos-stagiaires-vs-ia.jsx' },
  { id: 'a14', title: 'RAQIB Corridor Intelligence', category: 'Architecture & Agents IA', type: 'jsx', date: '18 Mar 2026', size: '29.7 KB', filename: 'raqib-corridor-intelligence.jsx' },
  { id: 'a15', title: 'RAQIB V4 Source', category: 'Interfaces & Démos', type: 'jsx', date: '17 Mar 2026', size: '87.2 KB', filename: 'raqib-v4-source.jsx' },
  { id: 'd1', title: 'Mémorandum d\'Investissement Europe', category: 'Memorandum & Positionnement', type: 'docx', date: '01 Avr 2026', size: '45 pages', filename: 'eigen-memorandum-europe-v2.docx' },
  { id: 'd2', title: 'Data Room CG Invest', category: 'CG Invest & Fundraising', type: 'docx', date: '30 Mar 2026', size: '18 pages', filename: 'cg-invest-noos-aelya-myne-yrknown-v2.docx' },
  { id: 'd3', title: 'Roadmap Q3 2026', category: 'Vision & Philosophie', type: 'docx', date: '15 Mar 2026', size: '12 pages', filename: 'roadmap-q3-2026.docx' },
  { id: 'd4', title: 'Target Holmarcom 2026', category: 'Conquête 2026', type: 'docx', date: '12 Mar 2026', size: '5 pages', filename: 'target-holmarcom-2026.docx' },
  { id: 'd5', title: 'Stratégie Réseau Advisory', category: 'Réseau & Advisory', type: 'docx', date: '10 Mar 2026', size: '8 pages', filename: 'strategie-reseau-advisory.docx' },
];

// ------- Type styles -------

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  docx: { bg: 'bg-[#3D5E8C10]', text: 'text-[#3D5E8C]', border: 'border-[#3D5E8C30]' },
  jsx: { bg: 'bg-[#7B5EA710]', text: 'text-[#7B5EA7]', border: 'border-[#7B5EA730]' },
  html: { bg: 'bg-[#3D7C5E10]', text: 'text-[#3D7C5E]', border: 'border-[#3D7C5E30]' },
  antigravity: { bg: 'bg-[#9C3D3D10]', text: 'text-[#9C3D3D]', border: 'border-[#9C3D3D30]' },
};

function TypeIcon({ type, size = 14 }: { type: string; size?: number }) {
  switch (type) {
    case 'jsx': case 'html': return <Code2 size={size} strokeWidth={1.5} />;
    case 'docx': return <FileText size={size} strokeWidth={1.5} />;
    default: return <Cpu size={size} strokeWidth={1.5} />;
  }
}

// ------- Upload Modal -------

function UploadModal({ file, onClose, onConfirm }: { file: File; onClose: () => void; onConfirm: (meta: { title: string; category: string; description: string }) => void }) {
  const [title, setTitle] = useState(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#FDFAF3] rounded-none-none w-[480px] max-h-[80vh] overflow-auto shadow-xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(60,52,40,0.10)]">
          <span className="font-[family-name:var(--font-playfair)] text-[16px] font-bold ">Ajouter à la galerie</span>
          <button onClick={onClose}><X size={16} className="text-[#918977]" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#F7F3EA] rounded-none-none">
            <FileText size={20} className="text-[#B8963E]" />
            <div>
              <div className="font-[family-name:var(--font-jetbrains)] text-[10px] text-[#1C1814]">{file.name}</div>
              <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{(file.size / 1024).toFixed(1)} KB</div>
            </div>
          </div>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre"
            className="w-full font-[family-name:var(--font-playfair)] text-[14px]  border-b border-[#D4CCBA] pb-1 bg-transparent focus:border-[#B8963E] outline-none" />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full font-[family-name:var(--font-jetbrains)] text-[10px] text-[#918977] border border-[#D4CCBA] rounded-none px-2 py-1.5 bg-transparent focus:border-[#B8963E] outline-none">
            <option value="">Catégorie...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..."
            className="w-full font-[family-name:var(--font-noto)] text-[11px] border border-[#D4CCBA] rounded-none px-2 py-1.5 bg-transparent h-16 resize-none focus:border-[#B8963E] outline-none" />
        </div>
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-[rgba(60,52,40,0.10)]">
          <button onClick={onClose} className="px-4 py-2 font-[family-name:var(--font-jetbrains)] text-[10px] text-[#918977]">Annuler</button>
          <button onClick={() => onConfirm({ title, category, description })}
            className="px-4 py-2 bg-[#B8963E] text-white font-[family-name:var(--font-jetbrains)] text-[10px] rounded-none hover:bg-[#9A7B32] transition">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

// ------- Edit Modal -------

function EditModal({ item, onClose, onSave }: { item: GalleryItem; onClose: () => void; onSave: (updated: Partial<GalleryItem>) => void }) {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [description, setDescription] = useState(item.description || '');

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-[#FDFAF3] rounded-none-none w-[480px] max-h-[80vh] overflow-auto shadow-xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(60,52,40,0.10)]">
          <span className="font-[family-name:var(--font-playfair)] text-[16px] font-bold ">Modifier le document</span>
          <button onClick={onClose}><X size={16} className="text-[#918977]" /></button>
        </div>
        <div className="p-5 space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre"
            className="w-full font-[family-name:var(--font-playfair)] text-[14px]  border-b border-[#D4CCBA] pb-1 bg-transparent focus:border-[#B8963E] outline-none" />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full font-[family-name:var(--font-jetbrains)] text-[10px] text-[#918977] border border-[#D4CCBA] rounded-none px-2 py-1.5 bg-transparent focus:border-[#B8963E] outline-none">
            <option value="">Catégorie...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description..."
            className="w-full font-[family-name:var(--font-noto)] text-[11px] border border-[#D4CCBA] rounded-none px-2 py-1.5 bg-transparent h-16 resize-none focus:border-[#B8963E] outline-none" />
        </div>
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-[rgba(60,52,40,0.10)]">
          <button onClick={onClose} className="px-4 py-2 font-[family-name:var(--font-jetbrains)] text-[10px] text-[#918977]">Annuler</button>
          <button onClick={() => onSave({ title, category, description })}
            className="px-4 py-2 bg-[#B8963E] text-white font-[family-name:var(--font-jetbrains)] text-[10px] rounded-none hover:bg-[#9A7B32] transition">
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

// ------- Context Menu -------

function CardContextMenu({ onEdit, onDuplicate, onDelete }: { onEdit: () => void; onDuplicate: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={e => { e.stopPropagation(); setOpen(!open); }} className="p-1 rounded-none hover:bg-[rgba(184,150,62,0.08)]">
        <MoreVertical size={14} className="text-[#918977]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-[160px] bg-[#FDFAF3] border border-[rgba(60,52,40,0.10)] rounded-none-none shadow-lg z-30 py-1">
            <button onClick={e => { e.stopPropagation(); onEdit(); setOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(184,150,62,0.08)] font-[family-name:var(--font-noto)] text-[10px] text-[#6B5E4C]"><Pencil size={11} /> Modifier</button>
            <button onClick={e => { e.stopPropagation(); onDuplicate(); setOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(184,150,62,0.08)] font-[family-name:var(--font-noto)] text-[10px] text-[#6B5E4C]"><Copy size={11} /> Dupliquer</button>
            <div className="border-t border-[rgba(60,52,40,0.10)] my-1" />
            <button onClick={e => { e.stopPropagation(); onDelete(); setOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-[rgba(156,61,61,0.05)] text-[#9C3D3D] font-[family-name:var(--font-noto)] text-[10px]"><Trash2 size={11} /> Supprimer</button>
          </div>
        </>
      )}
    </div>
  );
}

// ------- Version History -------

function VersionHistory({ files }: { files: string[] }) {
  return (
    <div className="mt-3 pt-3 border-t border-[rgba(60,52,40,0.10)]">
      <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] tracking-wider mb-2">HISTORIQUE DES VERSIONS</div>
      {files.map((filename, i) => (
        <div key={filename} className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold text-[#B8963E]">V{files.length - i}</span>
            <span className="font-[family-name:var(--font-noto)] text-[10px] text-[#1C1814]">{filename}</span>
          </div>
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{i === 0 ? 'Actuelle' : 'Archivée'}</span>
        </div>
      ))}
    </div>
  );
}

// ------- Artifact Thumbnail -------

function ArtifactThumbnail({ item }: { item: GalleryItem }) {
  const style = TYPE_STYLES[item.type] || TYPE_STYLES.docx;

  if ((item.type === 'jsx' || item.type === 'html') && item.filename) {
    return (
      <div className="w-full h-[140px] overflow-hidden bg-[#F7F3EA] relative">
        <iframe
          src={`/artifacts/${item.filename}`}
          sandbox="allow-scripts"
          className="absolute inset-0 w-[800px] h-[560px] origin-top-left border-0"
          style={{ transform: 'scale(0.25)', pointerEvents: 'none' }}
          title={item.title}
          loading="lazy"
        />
        <div className={`absolute top-2 right-2 px-2 py-0.5 ${style.bg} ${style.text} font-[family-name:var(--font-jetbrains)] text-[7px] rounded-none border ${style.border}`}>
          {item.type.toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-[140px] ${style.bg} flex flex-col items-center justify-center relative`}>
      <TypeIcon type={item.type} size={28} />
      <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] mt-2">{item.type.toUpperCase()}</div>
      <div className={`absolute top-2 right-2 px-2 py-0.5 ${style.bg} ${style.text} font-[family-name:var(--font-jetbrains)] text-[7px] rounded-none border ${style.border}`}>
        {item.type.toUpperCase()}
      </div>
    </div>
  );
}

// ======= MAIN COMPONENT =======

export function EigenGallery() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<GalleryItem[]>(staticItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCat, setFilterCat] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(false);

  // Modals
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [viewer, setViewer] = useState<GalleryItem | null>(null);

  // File selection
  const handleFileSelect = (f: File) => { setUploadFile(f); };

  // Upload confirm
  const handleUploadConfirm = (meta: { title: string; category: string; description: string }) => {
    if (!uploadFile) return;
    const ext = uploadFile.name.split('.').pop()?.toLowerCase() || '';
    const typeMap: Record<string, ItemType> = { jsx: 'jsx', html: 'html', docx: 'docx', pdf: 'docx', pptx: 'docx', png: 'docx', svg: 'docx' };
    const newItem: GalleryItem = {
      id: `upload-${Date.now()}`,
      title: meta.title || uploadFile.name,
      category: meta.category || 'Vision & Philosophie',
      type: typeMap[ext] || 'docx',
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
      size: `${(uploadFile.size / 1024).toFixed(1)} KB`,
      filename: uploadFile.name,
      description: meta.description,
    };
    setItems(prev => [newItem, ...prev]);
    setUploadFile(null);
    toast('success', `"${newItem.title}" ajouté à la galerie`);
  };

  // Drag & Drop
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragging(true); }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFileSelect(f);
  }, []);

  // Edit save
  const handleSaveEdit = (updated: Partial<GalleryItem>) => {
    if (!editItem) return;
    setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...updated } : i));
    setEditItem(null);
    toast('success', 'Document modifié');
  };

  // Duplicate
  const handleDuplicate = (item: GalleryItem) => {
    const dup = { ...item, id: `dup-${Date.now()}`, title: `${item.title} (copie)` };
    setItems(prev => [dup, ...prev]);
    toast('info', `"${item.title}" dupliqué`);
  };

  // Delete
  const handleDelete = (item: GalleryItem) => {
    setItems(prev => prev.filter(i => i.id !== item.id));
    toast('info', `"${item.title}" supprimé`);
  };

  // Click on card — open viewer for JSX/HTML
  const handleCardClick = (item: GalleryItem) => {
    if (item.type === 'jsx' || item.type === 'html') {
      setViewer(item);
    }
  };

  // Filtering
  const filtered = items.filter(item => {
    if (filterCat !== 'ALL' && item.category !== filterCat) return false;
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const uniqueCategories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="flex flex-col h-full bg-[#FDFAF3]" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {/* Drag overlay */}
      {dragging && (
        <div className="fixed inset-0 z-40 bg-[#B8963E10] border-2 border-dashed border-[#B8963E] flex items-center justify-center pointer-events-none">
          <div className="bg-[#FDFAF3] px-8 py-4 rounded-none-none shadow-lg">
            <span className="font-[family-name:var(--font-jetbrains)] text-[12px] text-[#B8963E]">Déposer le fichier ici</span>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-[#D4CCBA] bg-[#FDFAF3] gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1">
          {/* Upload button */}
          <button onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-[#B8963E] rounded-none text-[#B8963E] hover:bg-[rgba(184,150,62,0.05)] transition font-[family-name:var(--font-jetbrains)] text-[9px]">
            <Upload size={12} strokeWidth={1.5} />
            AJOUTER
          </button>
          <input ref={fileRef} type="file" hidden accept=".jsx,.html,.docx,.pdf,.png,.svg,.pptx"
            onChange={e => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0]); e.target.value = ''; }} />

          <a href="/vault" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#7B5EA7] text-[#7B5EA7] rounded-none font-[family-name:var(--font-jetbrains)] text-[9px] hover:bg-[#7B5EA7] hover:text-white transition">
            <Archive size={12} /> VAULT — 111
          </a>

          <div className="relative flex-1 max-w-[220px]">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#918977]" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#F7F3EA] border border-[#D4CCBA] text-[10px] font-[family-name:var(--font-jetbrains)] pl-8 pr-2 py-1.5 outline-none rounded-none focus:border-[#B8963E] placeholder-[#918977]" />
          </div>

          <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
            className="bg-[#F7F3EA] border border-[#D4CCBA] text-[#1C1814] text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1.5 outline-none rounded-none">
            <option value="ALL">Catégorie</option>
            {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="bg-[#F7F3EA] border border-[#D4CCBA] text-[#1C1814] text-[10px] font-[family-name:var(--font-jetbrains)] px-2 py-1.5 outline-none rounded-none">
            <option value="ALL">Type</option>
            <option value="docx">DOCX</option>
            <option value="jsx">JSX</option>
            <option value="html">HTML</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977]">{filtered.length} doc{filtered.length > 1 ? 's' : ''}</span>
          <div className="flex border border-[#D4CCBA] rounded-none overflow-hidden">
            <button onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#B8963E] text-white' : 'text-[#918977] hover:bg-[#F7F3EA]'}`}>
              <LayoutGrid size={14} />
            </button>
            <button onClick={() => setViewMode('list')}
              className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#B8963E] text-white' : 'text-[#918977] hover:bg-[#F7F3EA]'}`}>
              <Rows3 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(item => {
              const vg = getVersionGroup(item.filename);
              return (
                <div key={item.id}
                  className="bg-white border border-[#D4CCBA] rounded-none-none overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-[#B8963E] group">
                  <div className="cursor-pointer" onClick={() => handleCardClick(item)}>
                    <ArtifactThumbnail item={item} />
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <h4 className="font-[family-name:var(--font-playfair)] text-[13px] font-bold  text-[#1C1814] leading-snug cursor-pointer hover:text-[#B8963E] transition-colors flex-1"
                        onClick={() => handleCardClick(item)}>
                        {item.title}
                      </h4>
                      <CardContextMenu onEdit={() => setEditItem(item)} onDuplicate={() => handleDuplicate(item)} onDelete={() => handleDelete(item)} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[8px] px-1.5 py-0.5 bg-[#F2EFE8] text-[#918977] rounded-none">{item.category}</span>
                      {vg && (
                        <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 bg-[#3D5E8C15] text-[#3D5E8C] rounded-none">
                          V{vg.files.length} · {vg.files.length} versions
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[#918977] text-[8px] font-[family-name:var(--font-jetbrains)]">
                      <span>{item.date}</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(item => {
              const vg = getVersionGroup(item.filename);
              const style = TYPE_STYLES[item.type] || TYPE_STYLES.docx;
              return (
                <div key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="flex items-center gap-4 px-4 py-3 bg-white border border-[#D4CCBA] rounded-none-none hover:border-[#B8963E] transition cursor-pointer">
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center ${style.bg} ${style.text}`}>
                    <TypeIcon type={item.type} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-[family-name:var(--font-playfair)] text-[13px] font-bold  text-[#1C1814] truncate">{item.title}</span>
                      {vg && <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1 py-0.5 bg-[#3D5E8C15] text-[#3D5E8C] rounded-none shrink-0">V{vg.files.length}</span>}
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{item.category}</div>
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{item.date}</div>
                  <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{item.size}</div>
                  <span className={`font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 rounded-none border ${style.bg} ${style.text} ${style.border}`}>
                    {item.type.toUpperCase()}
                  </span>
                  <div onClick={e => e.stopPropagation()}>
                    <CardContextMenu onEdit={() => setEditItem(item)} onDuplicate={() => handleDuplicate(item)} onDelete={() => handleDelete(item)} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[#918977] text-[11px] font-[family-name:var(--font-noto)]">Aucun document trouvé.</div>
        )}
      </div>

      {/* Upload Modal */}
      {uploadFile && (
        <UploadModal file={uploadFile} onClose={() => setUploadFile(null)} onConfirm={handleUploadConfirm} />
      )}

      {/* Edit Modal */}
      {editItem && (
        <EditModal item={editItem} onClose={() => setEditItem(null)} onSave={handleSaveEdit} />
      )}

      {/* Fullscreen Viewer */}
      {viewer && (viewer.type === 'jsx' || viewer.type === 'html') && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-8" onClick={() => setViewer(null)}>
          <div className="bg-[#FDFAF3] rounded-none-none w-full max-w-[900px] h-[80vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#D4CCBA]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[16px] font-bold  text-[#1C1814]">{viewer.title}</h3>
                  {(() => { const vg = getVersionGroup(viewer.filename); return vg ? <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 bg-[#3D5E8C15] text-[#3D5E8C] rounded-none">V{vg.files.length}</span> : null; })()}
                </div>
                <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{viewer.category} · {viewer.date} · {viewer.size}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.open(`/artifacts/${viewer.filename}`, '_blank')}
                  className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] hover:text-[#B8963E] px-2 py-1 border border-[#D4CCBA] rounded-none transition-colors">
                  OUVRIR SÉPARÉMENT
                </button>
                <button onClick={() => setViewer(null)} className="p-1 hover:bg-[#F2EFE8] rounded-none text-[#918977]">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-[#F7F3EA]">
              {viewer.filename ? (
                <ArtifactViewer artifactName={viewer.filename} height={typeof window !== 'undefined' ? window.innerHeight * 0.65 : 500} />
              ) : (
                <div className="flex items-center justify-center h-full text-[#918977] font-[family-name:var(--font-jetbrains)] text-[11px]">
                  Aperçu non disponible pour ce type de document
                </div>
              )}
            </div>
            {/* Version History in viewer */}
            {(() => { const vg = getVersionGroup(viewer.filename); return vg ? <div className="px-5 py-3 border-t border-[#D4CCBA]"><VersionHistory files={vg.files} /></div> : null; })()}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Calendar, AlertTriangle, Check, X, Pencil, ChevronDown, Plus, Flag, Trash2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/Toast';

// ------- Types -------

type Priority = 'P0' | 'P1' | 'P2';
type ColumnStatus = 'planned' | 'in_progress' | 'waiting' | 'done';
type UIStatus = 'PLANNING' | 'IN_PROGRESS' | 'WAITING' | 'DONE';

interface ConquestCard {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  responsible: string;
  priority: Priority;
  entity?: string;
  entityColor?: string;
  progress: number;
  columnStatus: ColumnStatus;
  blockers: string[];
  notes: string;
  validated: boolean;
  position: number;
}

// ------- Mapping helpers -------

const statusToColumn: Record<UIStatus, ColumnStatus> = { PLANNING: 'planned', IN_PROGRESS: 'in_progress', WAITING: 'waiting', DONE: 'done' };
const columnToStatus: Record<ColumnStatus, UIStatus> = { planned: 'PLANNING', in_progress: 'IN_PROGRESS', waiting: 'WAITING', done: 'DONE' };

// ------- Default data (seeded if DB empty) -------

const SEED_CARDS: ConquestCard[] = [
  { id: 'seed-1', title: 'Incorporation CFC SA', columnStatus: 'in_progress', deadline: '15 avril', priority: 'P1', responsible: 'MR', entity: 'CG SA', entityColor: '#162B20', progress: 60, description: 'Finalisation des statuts et enregistrement au CFC Casablanca.', blockers: [], notes: '', validated: false, position: 0 },
  { id: 'seed-2', title: 'GITEX Africa Marrakech', columnStatus: 'in_progress', deadline: '7 avril', priority: 'P0', responsible: 'EE', entity: 'EIGEN', entityColor: '#B8963E', progress: 75, description: 'Stand, pitch deck, démos NOOS + BURHAN.', blockers: ['Badge exposant en attente'], notes: '', validated: false, position: 1 },
  { id: 'seed-3', title: 'LOI Holmarcom BURHAN pilot', columnStatus: 'planned', priority: 'P0', responsible: 'YB', entity: 'BURHAN', entityColor: '#7B5EA7', progress: 20, description: 'Letter of Intent pour le pilote blockchain Holmarcom.', blockers: [], notes: '', validated: false, position: 2 },
  { id: 'seed-4', title: 'Intro Elaia via Thomas', columnStatus: 'planned', priority: 'P0', responsible: 'MR', entity: 'CG SA', entityColor: '#162B20', progress: 10, description: '', blockers: [], notes: '', validated: false, position: 3 },
  { id: 'seed-5', title: 'ATS London', columnStatus: 'planned', deadline: 'mai', priority: 'P1', responsible: 'EE', entity: 'NOOS', entityColor: '#3D5E8C', progress: 5, description: '', blockers: [], notes: '', validated: false, position: 4 },
  { id: 'seed-6', title: 'VivaTech Paris', columnStatus: 'planned', deadline: 'juin', priority: 'P2', responsible: 'YB', entity: 'EIGEN', entityColor: '#B8963E', progress: 0, description: '', blockers: [], notes: '', validated: false, position: 5 },
  { id: 'seed-7', title: 'Recrutement P0 (4 stagiaires)', columnStatus: 'in_progress', priority: 'P0', responsible: 'HR', progress: 50, description: 'Rust, Psychométricien, Réglementaire, Chief of Staff', blockers: [], notes: '', validated: false, position: 6, entity: undefined, entityColor: undefined },
  { id: 'seed-8', title: 'Data room CG V1', columnStatus: 'in_progress', priority: 'P1', responsible: 'ME', entity: 'CG SA', entityColor: '#162B20', progress: 80, description: '', blockers: [], notes: '', validated: false, position: 7 },
];

// ------- Supabase persistence -------

async function saveCardToDb(card: ConquestCard) {
  const supabase = createClient();
  await supabase.from('conquest_cards').upsert({
    id: card.id,
    title: card.title,
    description: card.description,
    deadline: null, // stored as text in the card, deadline column is DATE type - we skip formal dates
    responsible: card.responsible,
    priority: card.priority,
    entity: card.entity || null,
    entity_color: card.entityColor || null,
    progress: card.progress,
    column_status: card.columnStatus,
    blockers: card.blockers,
    notes: card.notes,
    validated: card.validated,
    position: card.position,
    updated_at: new Date().toISOString(),
  });
}

async function deleteCardFromDb(id: string) {
  const supabase = createClient();
  await supabase.from('conquest_cards').delete().eq('id', id);
}

async function loadCardsFromDb(): Promise<ConquestCard[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('conquest_cards')
    .select('*')
    .order('position', { ascending: true });
  if (error || !data) return null;
  if (data.length === 0) return null;
  return data.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) || '',
    deadline: undefined, // we use the title/description for deadlines display
    responsible: (row.responsible as string) || '',
    priority: (row.priority as Priority) || 'P1',
    entity: (row.entity as string) || undefined,
    entityColor: (row.entity_color as string) || undefined,
    progress: (row.progress as number) || 0,
    columnStatus: (row.column_status as ColumnStatus) || 'planned',
    blockers: (row.blockers as string[]) || [],
    notes: (row.notes as string) || '',
    validated: (row.validated as boolean) || false,
    position: (row.position as number) || 0,
  }));
}

async function seedDb(cards: ConquestCard[]) {
  const supabase = createClient();
  for (const card of cards) {
    await supabase.from('conquest_cards').upsert({
      id: card.id,
      title: card.title,
      description: card.description,
      responsible: card.responsible,
      priority: card.priority,
      entity: card.entity || null,
      entity_color: card.entityColor || null,
      progress: card.progress,
      column_status: card.columnStatus,
      blockers: card.blockers,
      notes: card.notes,
      validated: card.validated,
      position: card.position,
      updated_at: new Date().toISOString(),
    });
  }
}

// ------- Styles -------

const COLUMNS: { id: UIStatus; dbStatus: ColumnStatus; label: string; color: string; bg: string }[] = [
  { id: 'PLANNING', dbStatus: 'planned', label: 'À PLANIFIER', color: '#918977', bg: 'bg-[#F2EFE8]' },
  { id: 'IN_PROGRESS', dbStatus: 'in_progress', label: 'EN COURS', color: '#B8963E', bg: 'bg-[#FCF5E3]' },
  { id: 'WAITING', dbStatus: 'waiting', label: 'EN ATTENTE', color: '#B87D3E', bg: 'bg-[#FDF3EA]' },
  { id: 'DONE', dbStatus: 'done', label: 'TERMINÉ', color: '#3D7C5E', bg: 'bg-[#EBF5F0]' },
];

const PRIORITY_STYLES: Record<Priority, string> = {
  P0: 'text-[#9C3D3D] bg-[#9C3D3D10] border-[#9C3D3D30]',
  P1: 'text-[#B87D3E] bg-[#B87D3E10] border-[#B87D3E30]',
  P2: 'text-[#918977] bg-[#91897710] border-[#91897730]',
};

// ------- Single Card Component -------

function ConquestCardUI({ card, onUpdate, onDelete, onDragStart }: {
  card: ConquestCard;
  onUpdate: (c: ConquestCard) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const progressColor = card.progress === 100 ? '#3D7C5E' : card.progress > 50 ? '#B8963E' : '#B87D3E';

  return (
    <div
      draggable
      onDragStart={() => onDragStart(card.id)}
      className={`bg-white border rounded-none-none overflow-hidden transition-all hover:shadow-md cursor-grab active:cursor-grabbing ${
        card.validated ? 'opacity-60 border-[#3D7C5E40]' : card.priority === 'P0' ? 'border-[#9C3D3D30]' : 'border-[#D4CCBA]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#D4CCBA]">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="w-2 h-2 rounded-none-none shrink-0"
            style={{ backgroundColor: card.priority === 'P0' ? '#9C3D3D' : card.priority === 'P1' ? '#B87D3E' : '#918977' }} />
          {editingTitle ? (
            <input
              defaultValue={card.title}
              onBlur={e => { onUpdate({ ...card, title: e.target.value }); setEditingTitle(false); }}
              onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
              autoFocus
              className="font-[family-name:var(--font-playfair)] text-[12px] font-bold  bg-transparent border-b border-[#B8963E] outline-none w-full"
            />
          ) : (
            <span
              className="font-[family-name:var(--font-playfair)] text-[12px] font-bold  truncate cursor-text"
              onClick={e => { e.stopPropagation(); setEditingTitle(true); }}>
              {card.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <span className={`px-1 py-0.5 border rounded-none-[2px] text-[8px] font-[family-name:var(--font-jetbrains)] leading-none ${PRIORITY_STYLES[card.priority]}`}>
            {card.priority}
          </span>
          <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }} className="p-0.5 hover:text-[#B8963E]">
            <ChevronDown size={12} strokeWidth={1.5} className={`text-[#918977] transition ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2">
        {card.deadline && (
          <div className="flex items-center gap-1 mb-1.5">
            <Calendar size={10} strokeWidth={1.5} className="text-[#918977]" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977]">{card.deadline}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] bg-[#F2EFE8] text-[#1C1814] px-1.5 py-0.5 rounded-none border border-[#D4CCBA] font-bold">{card.responsible}</span>
          {card.entity && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 rounded-none"
              style={{ backgroundColor: (card.entityColor || '#918977') + '15', color: card.entityColor }}>
              {card.entity}
            </span>
          )}
          {card.blockers.length > 0 && (
            <span className="flex items-center gap-0.5 font-[family-name:var(--font-jetbrains)] text-[7px] text-[#9C3D3D]">
              <AlertTriangle size={9} /> {card.blockers.length}
            </span>
          )}
        </div>
        {/* Progress */}
        <div className="w-full h-1.5 bg-[#F2EFE8] rounded-none-none overflow-hidden">
          <div className="h-full rounded-none-none transition-all duration-500" style={{ width: `${card.progress}%`, backgroundColor: progressColor }} />
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#918977] mt-0.5 text-right">{card.progress}%</div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-3 py-3 border-t border-[#D4CCBA] bg-[#F7F3EA]">
          {/* Description */}
          <textarea
            defaultValue={card.description}
            placeholder="Ajouter une description..."
            onBlur={e => onUpdate({ ...card, description: e.target.value })}
            className="w-full font-[family-name:var(--font-noto)] text-[10px] bg-transparent border border-[#D4CCBA] rounded-none p-2 min-h-[50px] resize-none focus:border-[#B8963E] outline-none mb-2"
          />

          {/* Progress slider */}
          <div className="mb-2">
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] tracking-wider mb-1">PROGRESSION</div>
            <input type="range" min={0} max={100} step={5}
              defaultValue={card.progress}
              onChange={e => onUpdate({ ...card, progress: parseInt(e.target.value) })}
              className="w-full h-1 accent-[#B8963E]" />
          </div>

          {/* Priority select */}
          <div className="mb-2">
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] tracking-wider mb-1">PRIORITÉ</div>
            <div className="flex gap-1">
              {(['P0', 'P1', 'P2'] as Priority[]).map(p => (
                <button key={p} onClick={() => onUpdate({ ...card, priority: p })}
                  className={`px-2 py-0.5 rounded-none text-[8px] font-[family-name:var(--font-jetbrains)] border transition ${card.priority === p ? PRIORITY_STYLES[p] + ' font-bold' : 'border-[#D4CCBA] text-[#918977]'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Blockers */}
          <div className="mb-2">
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#918977] tracking-wider mb-1">BLOCKERS</div>
            {card.blockers.map((blocker, i) => (
              <div key={i} className="flex items-center gap-1 mb-1">
                <AlertTriangle size={10} className="text-[#9C3D3D] shrink-0" />
                <input
                  defaultValue={blocker}
                  onBlur={e => {
                    const newBlockers = [...card.blockers];
                    newBlockers[i] = e.target.value;
                    onUpdate({ ...card, blockers: newBlockers.filter(Boolean) });
                  }}
                  className="flex-1 font-[family-name:var(--font-noto)] text-[9px] bg-transparent border-b border-[#D4CCBA] focus:border-[#9C3D3D] outline-none"
                />
                <button onClick={() => onUpdate({ ...card, blockers: card.blockers.filter((_, j) => j !== i) })}>
                  <X size={10} className="text-[#918977] hover:text-[#9C3D3D]" />
                </button>
              </div>
            ))}
            <button onClick={() => onUpdate({ ...card, blockers: [...card.blockers, ''] })}
              className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#B8963E] hover:underline">
              + Ajouter un blocker
            </button>
          </div>

          {/* Notes */}
          <textarea
            defaultValue={card.notes}
            placeholder="Notes..."
            onBlur={e => onUpdate({ ...card, notes: e.target.value })}
            className="w-full font-[family-name:var(--font-noto)] text-[9px] bg-[#FDFAF3] border border-[#D4CCBA] rounded-none p-2 min-h-[40px] resize-none focus:border-[#B8963E] outline-none mb-2"
          />

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#D4CCBA]">
            {!card.validated ? (
              <button onClick={() => onUpdate({ ...card, validated: true, progress: 100, columnStatus: 'done' })}
                className="flex items-center gap-1 px-2 py-1 bg-[#3D7C5E10] text-[#3D7C5E] rounded-none hover:bg-[#3D7C5E20] transition">
                <Check size={10} /><span className="font-[family-name:var(--font-jetbrains)] text-[8px]">VALIDER</span>
              </button>
            ) : (
              <button onClick={() => onUpdate({ ...card, validated: false, progress: Math.min(card.progress, 90), columnStatus: 'in_progress' })}
                className="flex items-center gap-1 px-2 py-1 bg-[#B87D3E10] text-[#B87D3E] rounded-none hover:bg-[#B87D3E20] transition">
                <X size={10} /><span className="font-[family-name:var(--font-jetbrains)] text-[8px]">INVALIDER</span>
              </button>
            )}
            <button onClick={() => onDelete(card.id)}
              className="flex items-center gap-1 px-2 py-1 ml-auto text-[#9C3D3D] hover:bg-[#9C3D3D10] rounded-none transition">
              <Trash2 size={10} /><span className="font-[family-name:var(--font-jetbrains)] text-[8px]">SUPPRIMER</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ======= MAIN COMPONENT =======

export function EigenConquest() {
  const { toast } = useToast();
  const [cards, setCards] = useState<ConquestCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Load from DB on mount
  useEffect(() => {
    (async () => {
      try {
        const dbCards = await loadCardsFromDb();
        if (dbCards && dbCards.length > 0) {
          setCards(dbCards);
        } else {
          // Seed DB with default data
          await seedDb(SEED_CARDS);
          setCards(SEED_CARDS);
        }
      } catch {
        setCards(SEED_CARDS);
      }
      setLoading(false);
    })();
  }, []);

  // Debounced save
  const debouncedSave = useCallback((card: ConquestCard) => {
    if (saveTimeoutRef.current[card.id]) clearTimeout(saveTimeoutRef.current[card.id]);
    saveTimeoutRef.current[card.id] = setTimeout(() => {
      saveCardToDb(card);
    }, 500);
  }, []);

  // Update card
  const handleUpdate = useCallback((updated: ConquestCard) => {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    debouncedSave(updated);
  }, [debouncedSave]);

  // Drag & Drop between columns
  const handleDrop = useCallback((targetStatus: ColumnStatus) => {
    if (!draggedId) return;
    setCards(prev => {
      const newCards = prev.map(c => {
        if (c.id === draggedId) {
          const updated = { ...c, columnStatus: targetStatus };
          debouncedSave(updated);
          return updated;
        }
        return c;
      });
      return newCards;
    });
    setDraggedId(null);
  }, [draggedId, debouncedSave]);

  // Delete card
  const handleDelete = useCallback((id: string) => {
    const card = cards.find(c => c.id === id);
    setCards(prev => prev.filter(c => c.id !== id));
    deleteCardFromDb(id);
    toast('info', `"${card?.title || 'Jalon'}" supprimé`);
  }, [cards, toast]);

  // Validate shortcut (called from card)
  const handleUpdateWithToast = useCallback((updated: ConquestCard) => {
    const prev = cards.find(c => c.id === updated.id);
    handleUpdate(updated);
    if (updated.validated && !prev?.validated) {
      toast('success', `"${updated.title}" validé`);
    } else if (!updated.validated && prev?.validated) {
      toast('warning', `"${updated.title}" invalidé`);
    }
  }, [cards, handleUpdate, toast]);

  // Add new card
  const addCard = useCallback(() => {
    const newCard: ConquestCard = {
      id: `custom-${Date.now()}`,
      title: 'Nouveau jalon',
      description: '',
      responsible: 'ME',
      priority: 'P1',
      progress: 0,
      columnStatus: 'planned',
      blockers: [],
      notes: '',
      validated: false,
      position: cards.length,
    };
    setCards(prev => [newCard, ...prev]);
    saveCardToDb(newCard);
    toast('info', 'Nouveau jalon créé');
  }, [cards.length, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#FDFAF3]">
        <Loader2 size={20} className="animate-spin text-[#B8963E]" />
        <span className="ml-2 font-[family-name:var(--font-jetbrains)] text-[11px] text-[#918977]">Chargement des jalons...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FDFAF3]">
      {/* Header */}
      <div className="shrink-0 px-6 py-3 border-b border-[#D4CCBA] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag size={14} strokeWidth={1.5} className="text-[#B8963E]" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-[#1C1814] font-bold">CONQUÊTE 2026</span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-[#918977]">{cards.length} jalons</span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[7px] text-[#3D7C5E] bg-[#3D7C5E10] px-1.5 py-0.5 rounded-none">
            {cards.filter(c => c.validated).length} validés
          </span>
        </div>
        <button onClick={addCard}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-[#B8963E] rounded-none text-[#B8963E] hover:bg-[rgba(184,150,62,0.05)] transition font-[family-name:var(--font-jetbrains)] text-[9px]">
          <Plus size={12} />
          NOUVEAU JALON
        </button>
      </div>

      {/* Kanban columns */}
      <div className="flex flex-1 gap-4 overflow-x-auto p-5">
        {COLUMNS.map(col => {
          const colCards = cards.filter(c => c.columnStatus === col.dbStatus);
          return (
            <div key={col.id}
              className={`flex-1 min-w-[280px] max-w-[340px] flex flex-col border border-[#D4CCBA] rounded-none-none overflow-hidden ${col.bg} ${draggedId ? 'ring-1 ring-dashed ring-[#B8963E30]' : ''}`}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col.dbStatus)}>
              <div className="px-4 py-3 border-b border-[#D4CCBA] bg-white flex justify-between items-center" style={{ borderTop: `2px solid ${col.color}` }}>
                <span className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold tracking-widest uppercase text-[#1C1814]">{col.label}</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-[8px] bg-[#F2EFE8] px-2 py-0.5 border border-[#D4CCBA] rounded-none-none text-[#918977]">{colCards.length}</span>
              </div>
              <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
                {colCards.map(card => (
                  <ConquestCardUI
                    key={card.id}
                    card={card}
                    onUpdate={handleUpdateWithToast}
                    onDelete={handleDelete}
                    onDragStart={setDraggedId}
                  />
                ))}
                {colCards.length === 0 && (
                  <div className="text-center py-6 text-[#918977] font-[family-name:var(--font-jetbrains)] text-[9px]">
                    Aucun jalon
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

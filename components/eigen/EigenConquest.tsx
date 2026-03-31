'use client';

import { useState } from 'react';
import { Calendar, AlertTriangle, Check, X, Pencil, ChevronDown, Plus, Flag } from 'lucide-react';

type Priority = 'P0' | 'P1' | 'P2';
type Status = 'PLANNING' | 'IN_PROGRESS' | 'WAITING' | 'DONE';

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  assignee: string;
  priority: Priority;
  status: Status;
  entity?: string;
  entityColor?: string;
  progress: number;
  blockers?: string[];
  notes?: string;
  validated?: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Incorporation CFC SA', status: 'IN_PROGRESS', deadline: '15 avril', priority: 'P1', assignee: 'MR', entity: 'CG SA', entityColor: '#162B20', progress: 60, description: 'Finalisation des statuts et enregistrement au CFC Casablanca.' },
  { id: '2', title: 'GITEX Africa Marrakech', status: 'IN_PROGRESS', deadline: '7 avril', priority: 'P0', assignee: 'EE', entity: 'EIGEN', entityColor: '#B8963E', progress: 75, description: 'Stand, pitch deck, démos NOOS + BURHAN.', blockers: ['Badge exposant en attente'] },
  { id: '3', title: 'LOI Holmarcom BURHAN pilot', status: 'PLANNING', priority: 'P0', assignee: 'YB', entity: 'BURHAN', entityColor: '#7B5EA7', progress: 20, description: 'Letter of Intent pour le pilote blockchain Holmarcom.' },
  { id: '4', title: 'Intro Elaia via Thomas', status: 'PLANNING', priority: 'P0', assignee: 'MR', entity: 'CG SA', entityColor: '#162B20', progress: 10 },
  { id: '5', title: 'ATS London', status: 'PLANNING', deadline: 'mai', priority: 'P1', assignee: 'EE', entity: 'NOOS', entityColor: '#3D5E8C', progress: 5 },
  { id: '6', title: 'VivaTech Paris', status: 'PLANNING', deadline: 'juin', priority: 'P2', assignee: 'YB', entity: 'EIGEN', entityColor: '#B8963E', progress: 0 },
  { id: '7', title: 'Recrutement P0 (4 stagiaires)', status: 'IN_PROGRESS', priority: 'P0', assignee: 'HR', progress: 50, description: 'Rust, Psychométricien, Réglementaire, Chief of Staff' },
  { id: '8', title: 'Data room CG V1', status: 'IN_PROGRESS', priority: 'P1', assignee: 'ME', entity: 'CG SA', entityColor: '#162B20', progress: 80 },
];

const COLUMNS: { id: Status; label: string; color: string; bg: string }[] = [
  { id: 'PLANNING', label: 'À PLANIFIER', color: '#918977', bg: 'bg-[#F2EFE8]' },
  { id: 'IN_PROGRESS', label: 'EN COURS', color: '#B8963E', bg: 'bg-[#FCF5E3]' },
  { id: 'WAITING', label: 'EN ATTENTE', color: '#B87D3E', bg: 'bg-[#FDF3EA]' },
  { id: 'DONE', label: 'TERMINÉ', color: '#3D7C5E', bg: 'bg-[#EBF5F0]' },
];

const PRIORITY_STYLES: Record<Priority, string> = {
  P0: 'text-[#9C3D3D] bg-[#9C3D3D10] border-[#9C3D3D30]',
  P1: 'text-[#B87D3E] bg-[#B87D3E10] border-[#B87D3E30]',
  P2: 'text-[#918977] bg-[#91897710] border-[#91897730]',
};

function ConquestCard({ task, onUpdate, onDragStart }: { task: Task; onUpdate: (t: Task) => void; onDragStart: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);

  const progressColor = task.progress === 100 ? '#3D7C5E' : task.progress > 50 ? '#B8963E' : '#B87D3E';

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      className={`bg-white border rounded-lg overflow-hidden transition-all hover:shadow-md cursor-grab active:cursor-grabbing ${
        task.validated ? 'opacity-50 border-[#3D7C5E40]' : task.priority === 'P0' ? 'border-[#9C3D3D30]' : 'border-div'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-div">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: task.priority === 'P0' ? '#9C3D3D' : task.priority === 'P1' ? '#B87D3E' : '#918977' }}
          />
          {editing ? (
            <input
              defaultValue={task.title}
              onBlur={e => { onUpdate({ ...task, title: e.target.value }); setEditing(false); }}
              onKeyDown={e => { if (e.key === 'Enter') { e.currentTarget.blur(); } }}
              autoFocus
              className="font-[family-name:var(--font-cormorant)] text-[12px] font-bold italic bg-transparent border-b border-gold outline-none w-full"
            />
          ) : (
            <span
              className="font-[family-name:var(--font-cormorant)] text-[12px] font-bold italic truncate cursor-text"
              onClick={(e) => { e.stopPropagation(); setEditing(true); }}
            >
              {task.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <span className={`px-1 py-0.5 border rounded-[2px] text-[8px] font-[family-name:var(--font-jetbrains)] leading-none ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
          <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} className="p-0.5 hover:text-gold">
            <ChevronDown size={12} strokeWidth={1.5} className={`text-stone transition ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2">
        {task.deadline && (
          <div className="flex items-center gap-1 mb-1.5">
            <Calendar size={10} strokeWidth={1.5} className="text-stone" />
            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-stone">{task.deadline}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] bg-cream text-noir px-1.5 py-0.5 rounded border border-div font-bold">{task.assignee}</span>
          {task.entity && (
            <span className="font-[family-name:var(--font-jetbrains)] text-[7px] px-1.5 py-0.5 rounded" style={{ backgroundColor: (task.entityColor || '#918977') + '15', color: task.entityColor }}>
              {task.entity}
            </span>
          )}
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-parchment rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${task.progress}%`, backgroundColor: progressColor }} />
        </div>
        <div className="font-[family-name:var(--font-jetbrains)] text-[7px] text-stone mt-0.5 text-right">{task.progress}%</div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-3 py-3 border-t border-div bg-cream">
          <textarea
            defaultValue={task.description || ''}
            placeholder="Ajouter une description..."
            onBlur={e => onUpdate({ ...task, description: e.target.value })}
            className="w-full font-[family-name:var(--font-noto)] text-[10px] bg-transparent border border-div rounded p-2 min-h-[50px] resize-none focus:border-gold outline-none mb-2"
          />
          {/* Blockers */}
          <div className="mb-2">
            <div className="font-[family-name:var(--font-jetbrains)] text-[8px] text-stone tracking-wider mb-1">BLOCKERS</div>
            {(task.blockers || []).map((blocker, i) => (
              <div key={i} className="flex items-center gap-1 mb-1">
                <AlertTriangle size={10} className="text-[#9C3D3D] shrink-0" />
                <input
                  defaultValue={blocker}
                  onBlur={e => {
                    const newBlockers = [...(task.blockers || [])];
                    newBlockers[i] = e.target.value;
                    onUpdate({ ...task, blockers: newBlockers.filter(Boolean) });
                  }}
                  className="flex-1 font-[family-name:var(--font-noto)] text-[9px] bg-transparent border-b border-div focus:border-[#9C3D3D] outline-none"
                />
                <button onClick={() => onUpdate({ ...task, blockers: (task.blockers || []).filter((_, j) => j !== i) })}>
                  <X size={10} className="text-stone hover:text-[#9C3D3D]" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onUpdate({ ...task, blockers: [...(task.blockers || []), ''] })}
              className="font-[family-name:var(--font-jetbrains)] text-[8px] text-gold hover:underline"
            >
              + Ajouter un blocker
            </button>
          </div>
          {/* Notes */}
          <textarea
            defaultValue={task.notes || ''}
            placeholder="Notes..."
            onBlur={e => onUpdate({ ...task, notes: e.target.value })}
            className="w-full font-[family-name:var(--font-noto)] text-[9px] bg-ivory border border-div rounded p-2 min-h-[40px] resize-none focus:border-gold outline-none mb-2"
          />
          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-div">
            {!task.validated ? (
              <button onClick={() => onUpdate({ ...task, validated: true, progress: 100, status: 'DONE' })} className="flex items-center gap-1 px-2 py-1 bg-[#3D7C5E10] text-[#3D7C5E] rounded hover:bg-[#3D7C5E20] transition">
                <Check size={10} /><span className="font-[family-name:var(--font-jetbrains)] text-[8px]">VALIDER</span>
              </button>
            ) : (
              <button onClick={() => onUpdate({ ...task, validated: false })} className="flex items-center gap-1 px-2 py-1 bg-[#B87D3E10] text-[#B87D3E] rounded hover:bg-[#B87D3E20] transition">
                <X size={10} /><span className="font-[family-name:var(--font-jetbrains)] text-[8px]">INVALIDER</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function EigenConquest() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDrop = (status: Status) => {
    if (draggedTaskId) {
      setTasks(tasks.map((t) => t.id === draggedTaskId ? { ...t, status } : t));
      setDraggedTaskId(null);
    }
  };

  const handleUpdate = (updated: Task) => {
    setTasks(tasks.map(t => t.id === updated.id ? updated : t));
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'Nouveau jalon',
      status: 'PLANNING',
      priority: 'P2',
      assignee: 'ME',
      progress: 0,
    };
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFAF3]">
      <div className="shrink-0 px-6 py-3 border-b border-div flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flag size={14} strokeWidth={1.5} className="text-gold" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-noir font-bold">CONQUÊTE 2026</span>
          <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-stone">{tasks.length} jalons</span>
        </div>
        <button
          onClick={addTask}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gold rounded text-gold hover:bg-[rgba(184,150,62,0.05)] transition font-[family-name:var(--font-jetbrains)] text-[9px]"
        >
          <Plus size={12} />
          NOUVEAU JALON
        </button>
      </div>

      <div className="flex flex-1 gap-4 overflow-x-auto p-5">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div
              key={col.id}
              className={`flex-1 min-w-[280px] max-w-[340px] flex flex-col border border-div rounded-lg overflow-hidden ${col.bg} ${draggedTaskId ? 'ring-1 ring-dashed ring-gold/30' : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="px-4 py-3 border-b border-div bg-white flex justify-between items-center" style={{ borderTop: `2px solid ${col.color}` }}>
                <span className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold tracking-widest uppercase text-noir">{col.label}</span>
                <span className="font-[family-name:var(--font-jetbrains)] text-[8px] bg-cream px-2 py-0.5 border border-div rounded-full text-stone">{colTasks.length}</span>
              </div>
              <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
                {colTasks.map((task) => (
                  <ConquestCard key={task.id} task={task} onUpdate={handleUpdate} onDragStart={setDraggedTaskId} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

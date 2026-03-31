'use client';

import { useState } from 'react';

type Priority = 'P0' | 'P1' | 'P2';
type Status = 'PLANNING' | 'IN_PROGRESS' | 'WAITING' | 'DONE';

interface Task {
  id: string;
  title: string;
  deadline?: string;
  assignee: string;
  priority: Priority;
  status: Status;
  isOverdue?: boolean;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Incorporation CFC SA', status: 'IN_PROGRESS', deadline: '15 avril', priority: 'P1', assignee: 'MR' },
  { id: '2', title: 'GITEX Africa Marrakech', status: 'IN_PROGRESS', deadline: '7 avril', priority: 'P0', assignee: 'EE' },
  { id: '3', title: 'LOI Holmarcom BURHAN pilot', status: 'PLANNING', priority: 'P0', assignee: 'YB' },
  { id: '4', title: 'Intro Elaia via Thomas', status: 'PLANNING', priority: 'P0', assignee: 'MR' },
  { id: '5', title: 'ATS London', status: 'PLANNING', deadline: 'mai', priority: 'P1', assignee: 'EE' },
  { id: '6', title: 'VivaTech Paris', status: 'PLANNING', deadline: 'juin', priority: 'P2', assignee: 'YB' },
  { id: '7', title: 'Recrutement P0 (4 stagiaires)', status: 'IN_PROGRESS', priority: 'P0', assignee: 'HR' },
  { id: '8', title: 'Data room CG V1', status: 'IN_PROGRESS', priority: 'P1', assignee: 'ME' },
];

const COLUMNS: { id: Status; label: string; color: string; bg: string }[] = [
  { id: 'PLANNING', label: 'À PLANIFIER', color: '#918977', bg: 'bg-[#F2EFE8]' },
  { id: 'IN_PROGRESS', label: 'EN COURS', color: '#B8963E', bg: 'bg-[#FCF5E3]' },
  { id: 'WAITING', label: 'EN ATTENTE', color: '#B87D3E', bg: 'bg-[#FDF3EA]' },
  { id: 'DONE', label: 'TERMINÉ', color: '#3D7C5E', bg: 'bg-[#EBF5F0]' },
];

export function EigenConquest() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedTaskId(id);
  };

  const handleDrop = (status: Status) => {
    if (draggedTaskId) {
      setTasks(tasks.map((t) => t.id === draggedTaskId ? { ...t, status } : t));
      setDraggedTaskId(null);
    }
  };

  const priorityColor = (p: Priority) => {
    switch(p) {
      case 'P0': return 'text-red-600 bg-red-50 border-red-200';
      case 'P1': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'P2': return 'text-[#918977] bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex h-full gap-5 overflow-x-auto p-6 bg-[#FDFAF3] font-[family-name:var(--font-jetbrains)] text-[10px]">
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter(t => t.status === col.id);
        
        return (
          <div 
            key={col.id}
            className={`flex-1 min-w-[280px] max-w-[340px] flex flex-col h-full border border-[#D4CCBA] ${col.bg} transition-colors ${draggedTaskId ? 'hover:bg-opacity-50' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
          >
            {/* Column Header */}
            <div 
              className="px-4 py-3 border-b border-[#D4CCBA] flex justify-between items-center bg-white"
              style={{ borderTop: `2px solid ${col.color}` }}
            >
              <span className="font-bold tracking-widest uppercase text-[#1C1814]">
                {col.label}
              </span>
              <span className="bg-[#FDFAF3] px-2 py-0.5 border border-[#D4CCBA] rounded-full text-[#918977]">
                {colTasks.length}
              </span>
            </div>

            {/* Column Body */}
            <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto w-full h-full">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="bg-white border border-[#D4CCBA] p-3 shadow-sm hover:shadow-md hover:border-[#B8963E] transition-all cursor-grab active:cursor-grabbing group relative"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h5 className="font-[family-name:var(--font-cormorant)] text-[12px] font-bold italic text-[#1C1814] leading-snug">
                      {task.title}
                    </h5>
                    <div className="flex gap-1">
                       <span className={`px-1 py-0.5 border rounded-[2px] leading-none ${priorityColor(task.priority)}`}>
                         {task.priority}
                       </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[#918977] text-[9px] mt-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span> {/* Mock entity dot */}
                      {task.deadline && (
                        <span className={`flex items-center gap-1 ${task.isOverdue ? 'text-red-500 font-bold' : ''}`}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {task.deadline}
                        </span>
                      )}
                    </div>
                    
                    <span className="bg-[#F2EFE8] text-[#1C1814] px-1.5 py-1 rounded inline-flex font-bold leading-none border border-[#D4CCBA]">
                      {task.assignee}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

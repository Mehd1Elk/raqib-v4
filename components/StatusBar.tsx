'use client';

import { useState, useEffect } from 'react';
import { Database, Cpu, Clock, Calendar, Wifi, WifiOff } from 'lucide-react';

export default function StatusBar() {
  const [supabaseStatus, setSupabaseStatus] = useState<'connected' | 'disconnected'>('connected');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // GITEX deadline: October 2026
  const gitexDate = new Date('2026-10-12');
  const daysToGitex = Math.max(0, Math.ceil((gitexDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[22px] bg-[#1E0A20] flex items-center justify-between px-4 z-50 border-t border-[rgba(212,182,98,0.15)]">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          {supabaseStatus === 'connected'
            ? <Wifi size={10} className="text-[#3D7C5E]" />
            : <WifiOff size={10} className="text-[#9C3D3D]" />
          }
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">Supabase</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Database size={10} className="text-[#1E0A20]" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">16 384 entries</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Cpu size={10} className="text-[#3D7C5E]" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">16 agents actifs</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <Calendar size={10} className={daysToGitex <= 30 ? 'text-[#9C3D3D]' : 'text-[rgba(30,10,32,0.60)]'} />
          <span className={`font-[family-name:var(--font-jetbrains)] text-[8px] ${daysToGitex <= 30 ? 'text-[#9C3D3D]' : 'text-[rgba(30,10,32,0.60)]'}`}>
            GITEX dans {daysToGitex}j
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={10} className="text-[rgba(30,10,32,0.60)]" />
          <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[rgba(30,10,32,0.60)]">
            {now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </span>
        </span>
        <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-[#1E0A20]">
          RAQIB V4 · EIGEN HOLDING SAS
        </span>
      </div>
    </div>
  );
}

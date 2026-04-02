"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowRight, Lock, FileCheck, Database, Brain, ShieldCheck, Coins, Zap } from 'lucide-react';
import { ENTITIES } from '@/lib/constants';

const ICONS: Record<string, React.ElementType> = {
  consent: Lock,
  audit: FileCheck,
  data: Database,
  knowledge: Brain,
  proof: ShieldCheck,
  cert: FileCheck,
  invest: Coins,
  command: Zap
};

interface WormholePathSegment {
  sourceEntry: any;
  metadata: any;
  timestamp: number;
}

export default function WormholeBreadcrumb() {
  const [path, setPath] = useState<WormholePathSegment[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = sessionStorage.getItem('wormholePath');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPath(parsed);
        } catch (e) {
          console.error(e);
        }
      }
    };

    handleStorageChange();
    
    // Create an observer for sessionstorage changes within same window
    window.addEventListener('storage', handleStorageChange);
    // Poll because sessionStorage doesn't reliably fire events in same window
    const interval = setInterval(handleStorageChange, 500);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [pathname]); // also update when navigated

  if (!path || path.length === 0) return null;

  const handleClear = () => {
    sessionStorage.removeItem('wormholePath');
    setPath([]);
  };

  const inferEntityId = (entry: any): string => {
    if (entry?.entity) return entry.entity.toLowerCase();
    if (entry?.layer_id) {
       const letter = entry.layer_id.toLowerCase()[0];
       switch(letter) {
         case 'n': return 'NOOS';
         case 'a': return 'ÆLYA';
         case 'm': return 'MYNε';
         case 'b': return 'BURHAN';
         case 'y': return 'YrKnown';
         case 'd': return 'DIWANE';
         case 's': return 'AlgueSov';
         case 'c': return 'CG';
         case 'e': return 'EIGEN';
       }
    }
    return 'NOOS';
  };

  const getEntityName = (id: string) => {
     const res = ENTITIES.find(e => e.id.toLowerCase() === id.toLowerCase() || e.name.toLowerCase() === id.toLowerCase());
     return res ? res.name : id.toUpperCase();
  };

  // Build breadcrumb segments map
  return (
    <div className="flex flex-wrap items-center px-4 py-2 text-[10px] font-mono border-b border-div bg-cream h-10 overflow-x-auto whitespace-nowrap gap-1">
      <span className="font-bold text-violet mr-2 tracking-widest uppercase text-[8px] flex items-center gap-1">
        <Zap size={10} />
        TRAJECTOIRE
      </span>

      {path.map((segment, i) => {
        const Icon = ICONS[segment.metadata.type] || ArrowRight;
        const sourceName = segment.sourceEntry?.data?.nom || segment.sourceEntry?.data?.titre || segment.sourceEntry?.title || "Entité inconnue";
        const sourceLayer = segment.sourceEntry?.layer_id || "?";
        const sourceEntity = getEntityName(inferEntityId(segment.sourceEntry));

        return (
          <React.Fragment key={i}>
            {/* The Source node (if first element, or we keep printing each node?) */}
            {i === 0 && (
              <span className="text-t1 font-semibold flex items-center gap-1">
                {sourceEntity} <span className="text-t3">&gt;</span> {sourceLayer} <span className="text-t3">&gt;</span> {sourceName}
              </span>
            )}
            
            {/* The flow arrow */}
            <span className="mx-2 text-violet font-bold flex items-center bg-violet/10 px-2 py-[2px] rounded-none border border-violet/20">
              <span className="text-[8px] mr-1">→</span>
              <Icon size={10} className="mr-1" />
              <span className="text-[8px] uppercase tracking-wider">{segment.metadata.type}</span>
              <span className="text-[8px] ml-1">→</span>
            </span>

            {/* The target node representation will be the source of i+1 or if it's the last, the current pathname */}
            {i === path.length - 1 ? (
              <span className="text-t1 font-semibold border-b border-dashed border-t1 pb-[1px]">
                  {getEntityName(segment.metadata.entity)} <span className="text-t3">&gt;</span> Destination courante
              </span>
            ) : (
               <span className="text-t1 font-semibold flex items-center gap-1">
                {getEntityName(inferEntityId(path[i+1].sourceEntry))} <span className="text-t3">&gt;</span> {path[i+1].sourceEntry.layer_id} <span className="text-t3">&gt;</span> {path[i+1].sourceEntry.data?.nom || path[i+1].sourceEntry.data?.titre || "..."}
              </span>
            )}
          </React.Fragment>
        );
      })}

      <button onClick={handleClear} className="ml-auto text-t3 hover:text-ruby uppercase tracking-[0.2em] text-[8px] pl-4">
        ✕ RESET
      </button>
    </div>
  );
}

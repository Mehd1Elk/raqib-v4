import React, { useEffect, useState, useMemo } from 'react';
import { X, ArrowRight, Database, FileCheck, Brain, Lock, Coins, ShieldCheck, Zap } from 'lucide-react';
import { WORMHOLE_MATRIX, WormholeRule } from '@/lib/wormhole-connections';
import { ENTITIES, C } from '@/lib/constants';

interface WormholeConnection {
  entity: string;
  entityColor: string;
  type: WormholeRule['type'];
  label: string;
  description: string;
  preview: string;
  targetPath: string;
}

const ICONS: Record<WormholeRule['type'], React.ElementType> = {
  consent: Lock,
  audit: FileCheck,
  data: Database,
  knowledge: Brain,
  proof: ShieldCheck,
  cert: FileCheck,
  invest: Coins,
  command: Zap
};

const getEntityDetails = (id: string) => {
  const e = ENTITIES.find(e => e.id === id);
  return {
    name: e?.name || id.toUpperCase(),
    color: e?.color || '#7B5EA7'
  };
};

const inferEntityId = (entry: any): string => {
  if (entry?.entity) return entry.entity.toLowerCase();
  if (entry?.layer_id) {
    const layer = entry.layer_id.toLowerCase();
    if (layer.startsWith('n')) return 'noos';
    if (layer.startsWith('a')) return 'aelya';
    if (layer.startsWith('m')) return 'myne';
    if (layer.startsWith('b')) return 'burhan';
    if (layer.startsWith('y')) return 'yrknown';
    if (layer.startsWith('d')) return 'diwane';
    if (layer.startsWith('s')) return 'alguesov';
    if (layer.startsWith('am')) return 'amana';
    if (layer.startsWith('e')) return 'eigen';
    if (layer.startsWith('c')) return 'cg';
  }
  return 'noos'; // default fallback
};

export default function WormholePanel({ 
  entry, 
  onClose,
  onTraverse 
}: { 
  entry: any; 
  onClose: () => void;
  onTraverse: (targetEntity: string, targetPath: string, connectionMetadata: any) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // start entrance animation
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setMounted(false);
    setTimeout(onClose, 200);
  };

  const handleTraverse = (conn: WormholeConnection) => {
    setMounted(false);
    // pass traverse immediately, let context handle the rest (150ms delay for unmount is handled by the animation state locally before it disappears in context if it was unmounted inside context, but context now keeps it mounted? Wait, context unmounts it on traverse. Let's let the context just unmount it and handle flashes.)
    setTimeout(() => {
      onTraverse(conn.entity, conn.targetPath, conn);
    }, 150);
  };

  // Compute connections
  const connections = useMemo(() => {
    const results: WormholeConnection[] = [];
    const sourceEntityId = inferEntityId(entry);
    const rules = WORMHOLE_MATRIX[sourceEntityId] || [];

    for (const rule of rules) {
      if (rule.condition(entry)) {
        const targetEntity = getEntityDetails(rule.target);
        const randomTx = Math.floor(Math.random() * 899 + 100);
        
        let path = `/nexus`; // generic fallback
        if (rule.targetLayerPrefix) {
           path = `/${rule.target}/${rule.targetLayerPrefix}0${Math.floor(Math.random()*4)+1}`; 
        } else {
           path = `/${rule.target}`;
        }
        
        results.push({
          entity: rule.target,
          entityColor: targetEntity.color,
          type: rule.type,
          label: rule.label,
          description: rule.description,
          preview: rule.targetLayerPrefix ? `${rule.targetLayerPrefix}...` : `[${rule.target.toUpperCase()} ENTITY]`,
          targetPath: path
        });
      }
    }
    return results;
  }, [entry]);

  const gradientColors = connections.map(c => c.entityColor).join(', ') || '#7B5EA7, #7B5EA7';

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-sm transition-opacity duration-200" 
           style={{ opacity: mounted ? 1 : 0 }} 
           onClick={handleClose} />
      
      <div 
        className="fixed top-0 right-0 h-full w-[350px] bg-ivory z-[101] shadow-2xl flex flex-col transition-transform duration-200"
        style={{ 
          transform: mounted ? 'translateX(0)' : 'translateX(100%)',
          borderLeft: `3px solid transparent`,
          borderImage: `linear-gradient(to bottom, ${gradientColors}) 1`
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-div">
          <h3 className="font-['Playfair_Display'] text-title text-t1 font-bold  tracking-tight flex items-center gap-2">
            <Zap className="text-violet" size={18} />
            Connexions
          </h3>
          <button onClick={handleClose} className="p-1 hover:bg-divL rounded-none text-t2 transition">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {connections.length === 0 ? (
            <div className="text-t3 text-sm  py-8 text-center font-serif">
              Aucune connexion identifiée
            </div>
          ) : (
            connections.map((conn, i) => {
              const Icon = ICONS[conn.type] || Database;
              const sourceEntity = getEntityDetails(inferEntityId(entry));
              const targetEntity = getEntityDetails(conn.entity);

              return (
                <div key={i} className="bg-white border border-div rounded-none-none overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between p-3 border-b border-div bg-cream">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-none-none" style={{ backgroundColor: conn.entityColor }} />
                      <span className="font-mono text-micro font-bold tracking-widest text-[#1C1814] uppercase">
                        {targetEntity.name}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-none border border-div text-t2 uppercase flex items-center gap-1 bg-white">
                      <Icon size={8} /> {conn.type}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-white">
                    <h4 className="font-serif text-[14px] font-bold text-t1 mb-1">{conn.label}</h4>
                    <p className="text-[10px] text-t2 leading-relaxed mb-3">
                      {conn.description}
                    </p>
                    
                    <button 
                      onClick={() => handleTraverse(conn)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-div font-mono text-[10px] font-bold tracking-widest hover:border-violet hover:text-white hover:bg-violet transition-colors group"
                    >
                      TRAVERSER 
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="p-3 border-t border-div bg-cream text-center font-mono text-[8px] text-t3 uppercase tracking-[0.2em]">
          Wormhole · EIGEN Architecture
        </div>
      </div>
    </>
  );
}

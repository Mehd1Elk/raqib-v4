"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import WormholePanel from './WormholePanel';
import { useRouter } from 'next/navigation';

interface WormholeContextType {
  showWormhole: boolean;
  setShowWormhole: (show: boolean) => void;
  entry: any | null;
  setEntry: (entry: any) => void;
  traverse: (targetEntity: string, targetPath: string, connectionMetadata: any) => void;
}

const WormholeContext = createContext<WormholeContextType>({
  showWormhole: false,
  setShowWormhole: () => {},
  entry: null,
  setEntry: () => {},
  traverse: () => {},
});

export const useWormhole = () => useContext(WormholeContext);

export function WormholeProvider({ children }: { children: React.ReactNode }) {
  const [showWormhole, setShowWormhole] = useState(false);
  const [entry, setEntry] = useState<any | null>(null);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const router = useRouter();

  // Check if we need to auto-open wormhole based on sessionStorage flag
  useEffect(() => {
    const shouldOpen = sessionStorage.getItem('wormholeOpenNext');
    if (shouldOpen === 'true') {
      setShowWormhole(true);
      sessionStorage.removeItem('wormholeOpenNext');
    }
  }, []);

  const traverse = (targetEntity: string, targetPath: string, connectionMetadata: any) => {
    // slide-out effect
    setShowWormhole(false);
    
    // flash effect
    setFlashColor(connectionMetadata.entityColor || '#7B5EA7');
    
    setTimeout(() => {
      // Store traversal path in sessionStorage for breadcrumb
      const existingPathStr = sessionStorage.getItem('wormholePath');
      const existingPath = existingPathStr ? JSON.parse(existingPathStr) : [];
      
      const newPath = [...existingPath, {
        sourceEntry: entry,
        metadata: connectionMetadata
      }];
      sessionStorage.setItem('wormholePath', JSON.stringify(newPath));
      sessionStorage.setItem('wormholeOpenNext', 'true');
      
      router.push(targetPath);
      
      setTimeout(() => {
        setFlashColor(null);
      }, 50); // Flash end
    }, 150); // slide-out ends
  };

  return (
    <WormholeContext.Provider value={{ showWormhole, setShowWormhole, entry, setEntry, traverse }}>
      {children}
      {showWormhole && entry && (
        <WormholePanel entry={entry} onClose={() => setShowWormhole(false)} onTraverse={traverse} />
      )}
      {flashColor && (
        <div 
          className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-50"
          style={{ backgroundColor: flashColor, opacity: 0.08 }}
        />
      )}
    </WormholeContext.Provider>
  );
}

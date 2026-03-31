'use client';

import { useMap } from 'react-leaflet';
import { Plus, Minus } from 'lucide-react';

export function CustomZoomControl() {
  const map = useMap();
  return (
    <div className="leaflet-bottom leaflet-right" style={{ marginBottom: 12, marginRight: 12 }}>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => map.zoomIn()}
          className="w-7 h-7 bg-ivory border border-div rounded flex items-center justify-center hover:border-gold transition-colors cursor-pointer"
          aria-label="Zoom avant"
        >
          <Plus size={12} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => map.zoomOut()}
          className="w-7 h-7 bg-ivory border border-div rounded flex items-center justify-center hover:border-gold transition-colors cursor-pointer"
          aria-label="Zoom arriere"
        >
          <Minus size={12} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

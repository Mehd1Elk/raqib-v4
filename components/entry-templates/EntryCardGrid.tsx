'use client';

import { detectTemplate, type TemplateType } from '@/lib/entry-template-routing';
import { useWormhole } from '@/components/wormhole/WormholeContext';
import { Link2 } from 'lucide-react';
import ContactCard from './ContactCard';
import CountryCard from './CountryCard';
import StartupCard from './StartupCard';
import RegulationCard from './RegulationCard';
import ArtistCard from './ArtistCard';

function TemplateCard({ type, data }: { type: TemplateType; data: Record<string, any> }) {
  switch (type) {
    case 'contact': return <ContactCard data={data} />;
    case 'country': return <CountryCard data={data} />;
    case 'startup': return <StartupCard data={data} />;
    case 'regulation': return <RegulationCard data={data} />;
    case 'artist': return <ArtistCard data={data} />;
    default: return null;
  }
}

interface EntryCardGridProps {
  layerId: string;
  entries: Array<{ id: string; data: Record<string, any> }>;
}

export function EntryCardGrid({ layerId, entries }: EntryCardGridProps) {
  const { setShowWormhole, setEntry } = useWormhole();

  if (entries.length === 0) return null;

  const firstData = entries[0]?.data ?? {};
  const template = detectTemplate(layerId, firstData);

  if (template === 'default' || template === 'blockchain') return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {entries.map((entry) => (
        <div key={entry.id} className="relative group/card cursor-default">
          <TemplateCard type={template} data={entry.data} />
          <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setEntry({ id: entry.id, layer_id: layerId, data: entry.data });
                setShowWormhole(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#7B5EA7] text-[#7B5EA7] rounded font-['JetBrains_Mono'] text-[8px] hover:bg-[#7B5EA7] hover:text-white transition shadow-sm"
            >
              <Link2 size={12} strokeWidth={1.5} /> CONNEXIONS
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

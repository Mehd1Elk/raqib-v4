'use client';

import { detectTemplate, type TemplateType } from '@/lib/entry-template-routing';
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
  if (entries.length === 0) return null;

  const firstData = entries[0]?.data ?? {};
  const template = detectTemplate(layerId, firstData);

  if (template === 'default' || template === 'blockchain') return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {entries.map((entry) => (
        <TemplateCard key={entry.id} type={template} data={entry.data} />
      ))}
    </div>
  );
}

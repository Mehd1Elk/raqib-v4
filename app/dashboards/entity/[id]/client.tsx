'use client';

import { PlatformPie } from '@/components/dashboards/PlatformPie';
import { PresentationMode } from '@/components/dashboards/PresentationMode';

interface Props {
  platformData: { platform_code: string; count: number }[];
}

const SECTIONS = [
  { id: 's-progress', label: 'Progression' },
  { id: 's-top-layers', label: 'Top couches' },
  { id: 's-platforms', label: 'Plateformes' },
  { id: 's-entries', label: 'Entries recentes' },
];

export function EntityDashboardClient({ platformData }: Props) {
  return (
    <>
      <PlatformPie data={platformData} />
      <PresentationMode sections={SECTIONS}>{null}</PresentationMode>
    </>
  );
}

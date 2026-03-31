'use client';

import { PresentationMode } from '@/components/dashboards/PresentationMode';

const SECTIONS = [
  { id: 's-kpis', label: 'KPIs' },
  { id: 's-investors', label: 'Investisseurs' },
  { id: 's-architecture', label: 'Architecture' },
  { id: 's-dataroom', label: 'Data room' },
  { id: 's-comparables', label: 'Comparables' },
];

export function LondonClient() {
  return <PresentationMode sections={SECTIONS}>{null}</PresentationMode>;
}

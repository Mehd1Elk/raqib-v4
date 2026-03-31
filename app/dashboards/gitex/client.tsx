'use client';

import { PresentationMode } from '@/components/dashboards/PresentationMode';

const SECTIONS = [
  { id: 's-kpis', label: 'KPIs' },
  { id: 's-agenda', label: 'Agenda' },
  { id: 's-contacts', label: 'Contacts' },
  { id: 's-logistics', label: 'Logistique' },
];

export function GitexClient() {
  return <PresentationMode sections={SECTIONS}>{null}</PresentationMode>;
}

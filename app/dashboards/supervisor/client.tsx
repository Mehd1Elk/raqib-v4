'use client';

import { PresentationMode } from '@/components/dashboards/PresentationMode';

const SECTIONS = [
  { id: 's-kpis', label: 'KPIs' },
  { id: 's-progress', label: 'Progression' },
  { id: 's-agents', label: 'Agents' },
  { id: 's-alerts', label: 'Alertes' },
  { id: 's-terminology', label: 'Terminologie' },
  { id: 's-duplication', label: 'Duplication' },
];

export function SupervisorClient() {
  return <PresentationMode sections={SECTIONS}>{null}</PresentationMode>;
}

'use client';

import { ComparisonTable } from './ComparisonTable';
import { DataTable } from './DataTable';
import { DealFlowTable } from './DealFlowTable';
import { InvestorTable } from './InvestorTable';
import { ScoringTable } from './ScoringTable';
import type { EntryTableProps } from './types';
import { detectTableVariant } from './utils';

export function LayerEntriesTable(props: EntryTableProps) {
  const variant = detectTableVariant(props.layerId);

  switch (variant) {
    case 'comparison':
      return <ComparisonTable {...props} />;
    case 'deal-flow':
      return <DealFlowTable {...props} />;
    case 'investor':
      return <InvestorTable {...props} />;
    case 'scoring':
      return <ScoringTable {...props} />;
    default:
      return <DataTable {...props} />;
  }
}

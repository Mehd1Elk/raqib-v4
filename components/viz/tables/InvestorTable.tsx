'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ConfidencePill, CurrencyCell, SourceLink } from './cells';
import { ExportableTable } from './ExportableTable';
import type { EntryTableProps } from './types';
import { buildNotes, getCandidateNumber, getCandidateText, getEntryData } from './utils';

interface InvestorRow {
  aum: number | null;
  confidence: number | null;
  deals: string;
  fonds: string;
  geographies: string;
  id: string;
  notes: string;
  source: string | null;
  these: string;
}

function buildEmptyState(layerName: string, platformName: string) {
  return {
    description: layerName,
    meta: `Plateforme assignee : ${platformName}`,
    title: 'Tableau investisseurs indisponible',
  };
}

export function InvestorTable({
  entries,
  isLoading,
  layerId,
  layerName,
  onPageIndexChange,
  onPageSizeChange,
  pageIndex = 0,
  pageSize = 25,
  paginationMode = 'client',
  platformName,
  totalRows,
}: EntryTableProps) {
  const rows = useMemo<InvestorRow[]>(
    () =>
      entries.map((entry) => {
        const data = getEntryData(entry);

        return {
          aum: getCandidateNumber(data, ['AUM_USD', 'AUM']),
          confidence: entry.confidence,
          deals: getCandidateText(data, ['deals_mental_health', 'deals', 'grants', 'token_economics']),
          fonds: getCandidateText(data, ['nom_fonds', 'fonds']),
          geographies: getCandidateText(data, ['geographies']),
          id: entry.id,
          notes: buildNotes(data, [
            'AUM_USD',
            'AUM',
            'deals_mental_health',
            'deals',
            'grants',
            'token_economics',
            'nom_fonds',
            'fonds',
            'geographies',
            'these',
            'these_crypto',
          ]),
          source: entry.source,
          these: getCandidateText(data, ['these', 'these_crypto']),
        };
      }),
    [entries],
  );

  const columns = useMemo<ColumnDef<InvestorRow, unknown>[]>(
    () => [
      {
        accessorKey: 'fonds',
        header: 'Fonds',
      },
      {
        accessorKey: 'aum',
        cell: ({ getValue }) => <CurrencyCell value={getValue<number | null>()} />,
        header: 'AUM',
        meta: {
          align: 'right',
          monospace: true,
        },
      },
      {
        accessorKey: 'these',
        header: 'These',
      },
      {
        accessorKey: 'geographies',
        header: 'Geographies',
      },
      {
        accessorKey: 'deals',
        header: 'Deals',
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        meta: {
          className: 'max-w-[300px] whitespace-pre-wrap break-words',
        },
      },
      {
        accessorKey: 'source',
        cell: ({ getValue }) => <SourceLink href={getValue<string | null>()} />,
        header: 'Source',
        meta: {
          className: 'max-w-[240px]',
        },
      },
      {
        accessorKey: 'confidence',
        cell: ({ getValue }) => <ConfidencePill value={getValue<number | null>()} />,
        header: 'Confiance',
        meta: {
          align: 'center',
          monospace: true,
        },
      },
    ],
    [],
  );

  return (
    <ExportableTable
      columns={columns}
      data={rows}
      emptyState={buildEmptyState(layerName, platformName)}
      exportFilename={`RAQIB_${layerId}_investisseurs`}
      initialSorting={[{ desc: true, id: 'aum' }]}
      isLoading={isLoading}
      onPageIndexChange={onPageIndexChange}
      onPageSizeChange={onPageSizeChange}
      pageIndex={pageIndex}
      pageSize={pageSize}
      paginationMode={paginationMode}
      searchPlaceholder="Filtrer un fonds, une these ou une geographie..."
      title="Tableau investisseurs"
      totalRows={totalRows}
    />
  );
}

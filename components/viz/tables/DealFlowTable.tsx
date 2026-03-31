'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { CurrencyCell, NotationPill, SourceLink } from './cells';
import { ExportableTable } from './ExportableTable';
import type { EntryTableProps } from './types';
import { buildNotes, getCandidateNumber, getCandidateText, getEntryData, normalizeNotation } from './utils';

interface DealFlowRow {
  axeCg: string;
  id: string;
  levee: number | null;
  moat: string;
  notes: string;
  notation: number | null;
  pays: string;
  source: string | null;
  startup: string;
}

function buildEmptyState(layerName: string, platformName: string) {
  return {
    description: layerName,
    meta: `Plateforme assignee : ${platformName}`,
    title: 'Deal flow startups indisponible',
  };
}

export function DealFlowTable({
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
  const rows = useMemo<DealFlowRow[]>(
    () =>
      entries.map((entry) => {
        const data = getEntryData(entry);

        return {
          axeCg: getCandidateText(data, ['axe_CG', 'axe', 'secteur']),
          id: entry.id,
          levee: getCandidateNumber(data, ['levee_USD', 'derniere_levee_USD']),
          moat: getCandidateText(data, ['moat', 'moat_type']),
          notes: buildNotes(data, [
            'startup',
            'pays',
            'axe_CG',
            'axe',
            'secteur',
            'notation_anti_feature_risk',
            'notation',
            'levee_USD',
            'derniere_levee_USD',
            'moat',
            'moat_type',
          ]),
          notation: normalizeNotation(
            getCandidateNumber(data, ['notation_anti_feature_risk', 'notation', 'score']),
          ),
          pays: getCandidateText(data, ['pays']),
          source: entry.source,
          startup: getCandidateText(data, ['startup', 'entreprise', 'entite']),
        };
      }),
    [entries],
  );

  const columns = useMemo<ColumnDef<DealFlowRow, unknown>[]>(
    () => [
      {
        accessorKey: 'startup',
        header: 'Startup',
      },
      {
        accessorKey: 'pays',
        header: 'Pays',
      },
      {
        accessorKey: 'axeCg',
        header: 'Axe CG',
      },
      {
        accessorKey: 'notation',
        cell: ({ getValue }) => <NotationPill value={getValue<number | null>()} />,
        header: 'Notation',
        meta: {
          align: 'center',
          monospace: true,
        },
      },
      {
        accessorKey: 'moat',
        header: 'Moat',
      },
      {
        accessorKey: 'levee',
        cell: ({ getValue }) => <CurrencyCell value={getValue<number | null>()} />,
        header: 'Levee',
        meta: {
          align: 'right',
          monospace: true,
        },
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        meta: {
          className: 'max-w-[280px] whitespace-pre-wrap break-words',
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
    ],
    [],
  );

  return (
    <ExportableTable
      columns={columns}
      data={rows}
      emptyState={buildEmptyState(layerName, platformName)}
      exportFilename={`RAQIB_${layerId}_deal_flow`}
      initialSorting={[{ desc: true, id: 'notation' }]}
      isLoading={isLoading}
      onPageIndexChange={onPageIndexChange}
      onPageSizeChange={onPageSizeChange}
      pageIndex={pageIndex}
      pageSize={pageSize}
      paginationMode={paginationMode}
      searchPlaceholder="Filtrer une startup, un axe CG ou un moat..."
      title="Deal flow startups"
      totalRows={totalRows}
    />
  );
}

'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ConfidencePill, DateCell, SourceLink } from './cells';
import { ExportableTable } from './ExportableTable';
import type { EntryTableProps } from './types';
import { buildNotes, getCandidateText, getEntryData } from './utils';

interface ComparisonRow {
  cadreJuridique: string;
  classification: string;
  confidence: number | null;
  dateApplication: string;
  id: string;
  notes: string;
  pays: string;
  source: string | null;
}

function buildEmptyState(layerName: string, platformName: string) {
  return {
    description: layerName,
    meta: `Plateforme assignee : ${platformName}`,
    title: 'Comparatif reglementaire indisponible',
  };
}

export function ComparisonTable({
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
  const rows = useMemo<ComparisonRow[]>(
    () =>
      entries.map((entry) => {
        const data = getEntryData(entry);

        return {
          cadreJuridique: getCandidateText(data, [
            'reference_juridique',
            'loi',
            'reglementation',
            'document',
          ]),
          classification: getCandidateText(data, [
            'classification',
            'autorite_controle',
            'organisme',
            'statut_juridique',
          ]),
          confidence: entry.confidence,
          dateApplication: getCandidateText(data, [
            'date_application',
            'date_adoption',
            'date_entree_vigueur',
          ]),
          id: entry.id,
          notes: buildNotes(data, [
            'reference_juridique',
            'loi',
            'reglementation',
            'document',
            'classification',
            'autorite_controle',
            'organisme',
            'statut_juridique',
            'date_application',
            'date_adoption',
            'date_entree_vigueur',
            'pays',
            'juridiction',
          ]),
          pays: getCandidateText(data, ['pays', 'juridiction']),
          source: entry.source,
        };
      }),
    [entries],
  );

  const columns = useMemo<ColumnDef<ComparisonRow, unknown>[]>(
    () => [
      {
        accessorKey: 'pays',
        header: 'Pays',
      },
      {
        accessorKey: 'cadreJuridique',
        header: 'Cadre juridique',
      },
      {
        accessorKey: 'dateApplication',
        cell: ({ getValue }) => <DateCell value={getValue<string>()} />,
        header: 'Date application',
        meta: {
          monospace: true,
        },
      },
      {
        accessorKey: 'classification',
        header: 'Classification',
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        meta: {
          className: 'max-w-[360px] whitespace-pre-wrap break-words',
        },
      },
      {
        accessorKey: 'source',
        cell: ({ getValue }) => <SourceLink href={getValue<string | null>()} />,
        header: 'Source',
        meta: {
          className: 'max-w-[260px]',
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
      exportFilename={`RAQIB_${layerId}_comparatif_reglementaire`}
      initialSorting={[{ desc: false, id: 'pays' }]}
      isLoading={isLoading}
      onPageIndexChange={onPageIndexChange}
      onPageSizeChange={onPageSizeChange}
      pageIndex={pageIndex}
      pageSize={pageSize}
      paginationMode={paginationMode}
      searchPlaceholder="Comparer un pays, une loi ou une classification..."
      title="Tableau comparatif"
      totalRows={totalRows}
    />
  );
}

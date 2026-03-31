'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { ConfidencePill, NotationPill, ProgressBar, SourceLink } from './cells';
import { ExportableTable } from './ExportableTable';
import type { EntryTableProps } from './types';
import {
  buildNotes,
  getCandidateNumber,
  getCandidateText,
  getEntryData,
  getFirstNumericField,
  getFirstTextValue,
  normalizeNotation,
} from './utils';

interface ScoringRow {
  axe: string;
  confidence: number | null;
  id: string;
  notation: number | null;
  notes: string;
  paysObjet: string;
  progression: number | null;
  source: string | null;
}

function buildEmptyState(layerName: string, platformName: string) {
  return {
    description: layerName,
    meta: `Plateforme assignee : ${platformName}`,
    title: 'Tableau de notation indisponible',
  };
}

export function ScoringTable({
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
  const rows = useMemo<ScoringRow[]>(
    () =>
      entries.map((entry) => {
        const data = getEntryData(entry);
        const detectedNumeric = getFirstNumericField(data);
        const rawNotation =
          getCandidateNumber(data, [
            'notation',
            'notation_5_axes',
            'score',
            'score_pondere',
            'risque_souverain',
            'corridor_rang',
          ]) ?? detectedNumeric?.value ?? null;
        const progression = normalizeNotation(rawNotation);
        const consumedKeys = [
          'pays',
          'startup',
          'axe',
          'axe_CG',
          'objet',
          'document',
          'cible',
          'notation',
          'notation_5_axes',
          'score',
          'score_pondere',
          'risque_souverain',
          'corridor_rang',
        ];

        return {
          axe:
            getCandidateText(data, ['axe_CG', 'axe', 'objet', 'document', 'cible']) ||
            getFirstTextValue(data, ['pays', 'startup']),
          confidence: entry.confidence,
          id: entry.id,
          notation: rawNotation,
          notes: buildNotes(data, consumedKeys),
          paysObjet: getCandidateText(data, ['pays', 'startup', 'pays_exportateur', 'pays_importateur']),
          progression,
          source: entry.source,
        };
      }),
    [entries],
  );

  const columns = useMemo<ColumnDef<ScoringRow, unknown>[]>(
    () => [
      {
        accessorKey: 'paysObjet',
        header: 'Pays / objet',
      },
      {
        accessorKey: 'axe',
        header: 'Axe',
      },
      {
        accessorKey: 'notation',
        cell: ({ getValue }) => <NotationPill value={normalizeNotation(getValue<number | null>())} />,
        header: 'Notation',
        meta: {
          align: 'center',
          monospace: true,
        },
      },
      {
        accessorKey: 'progression',
        cell: ({ getValue }) => <ProgressBar value={getValue<number | null>()} />,
        header: 'Progression',
        meta: {
          className: 'min-w-[200px]',
        },
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        meta: {
          className: 'max-w-[320px] whitespace-pre-wrap break-words',
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
      exportFilename={`RAQIB_${layerId}_tableau_notation`}
      initialSorting={[{ desc: true, id: 'progression' }]}
      isLoading={isLoading}
      onPageIndexChange={onPageIndexChange}
      onPageSizeChange={onPageSizeChange}
      pageIndex={pageIndex}
      pageSize={pageSize}
      paginationMode={paginationMode}
      searchPlaceholder="Filtrer un pays, un axe ou une note..."
      title="Tableau de notation"
      totalRows={totalRows}
    />
  );
}

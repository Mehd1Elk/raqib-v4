'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { BooleanCell, ConfidencePill, CurrencyCell, DateCell, NumberCell, SourceLink } from './cells';
import { ExportableTable } from './ExportableTable';
import type { EntryTableProps, EntryRow } from './types';
import { collectDataKeys, formatHeaderLabel, getEntryData, isNumericKey, toDisplayString } from './utils';

function buildEmptyState(layerName: string, platformName: string) {
  return {
    description: layerName,
    meta: `Plateforme assignee : ${platformName}`,
    title: 'Couche en attente de peuplement',
  };
}

function renderAutoCell(key: string, value: unknown) {
  const normalizedKey = key.toLowerCase();

  if (normalizedKey.includes('date')) {
    return <DateCell value={value} />;
  }

  if (normalizedKey.includes('usd')) {
    return <CurrencyCell value={value} />;
  }

  if (isNumericKey(key, value)) {
    return <NumberCell value={value} />;
  }

  return (
    <span className="inline-block max-w-[340px] whitespace-pre-wrap break-words text-t1">
      {toDisplayString(value as import('@/lib/supabase/types').Json | undefined)}
    </span>
  );
}

export function DataTable({
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
  const columns = useMemo<ColumnDef<EntryRow, unknown>[]>(() => {
    const keys = collectDataKeys(entries);

    const autoColumns = keys.map((key) => {
      const sampleValue = entries
        .map((entry) => getEntryData(entry)[key])
        .find((value) => value !== null && value !== undefined);

      return {
        accessorFn: (entry: EntryRow) => getEntryData(entry)[key],
        cell: ({ getValue }) => renderAutoCell(key, getValue()),
        header: formatHeaderLabel(key),
        id: key,
        meta: {
          align: isNumericKey(key, sampleValue) ? 'right' : 'left',
          monospace: isNumericKey(key, sampleValue) || key.toLowerCase().includes('date'),
        },
      } satisfies ColumnDef<EntryRow, unknown>;
    });

    return [
      ...autoColumns,
      {
        accessorKey: 'source',
        cell: ({ getValue }) => <SourceLink href={getValue<string | null>()} />,
        header: 'Source',
        meta: {
          className: 'max-w-[280px]',
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
      {
        accessorKey: 'verified',
        cell: ({ getValue }) => <BooleanCell value={getValue<boolean | null>()} />,
        header: 'Verifiee',
        meta: {
          align: 'center',
        },
      },
      {
        accessorKey: 'created_at',
        cell: ({ getValue }) => <DateCell value={getValue<string | null>()} />,
        header: 'Date',
        meta: {
          align: 'right',
          monospace: true,
        },
      },
    ];
  }, [entries]);

  return (
    <ExportableTable
      columns={columns}
      data={entries}
      emptyState={buildEmptyState(layerName, platformName)}
      exportFilename={`RAQIB_${layerId}_tableau_donnees`}
      isLoading={isLoading}
      onPageIndexChange={onPageIndexChange}
      onPageSizeChange={onPageSizeChange}
      pageIndex={pageIndex}
      pageSize={pageSize}
      paginationMode={paginationMode}
      searchPlaceholder="Filtrer par cle, valeur ou source..."
      title="Tableau de donnees"
      totalRows={totalRows}
    />
  );
}

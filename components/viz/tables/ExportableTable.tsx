'use client';

import type { ColumnDef, RowData, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { TableShell, useRaqibTable } from './BaseTable';
import type { PaginationMode, TableEmptyState } from './types';
import { createBlobDownload, getColumnHeaderLabel, toDisplayString } from './utils';

interface ExportableTableProps<TData extends RowData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  emptyState: TableEmptyState;
  exportFilename: string;
  initialPageSize?: number;
  initialSorting?: SortingState;
  isLoading?: boolean;
  onPageIndexChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageIndex?: number;
  pageSize?: number;
  paginationMode?: PaginationMode;
  searchPlaceholder?: string;
  title: string;
  totalRows?: number;
}

function buildExportRows<TData extends RowData>(
  columns: ReturnType<ReturnType<typeof useRaqibTable<TData>>['table']['getVisibleLeafColumns']>,
  rows: ReturnType<ReturnType<typeof useRaqibTable<TData>>['table']['getRowModel']>['rows'],
) {
  return rows.map((row) =>
    Object.fromEntries(
      columns.map((column) => [getColumnHeaderLabel(column), toDisplayString(row.getValue(column.id))]),
    ),
  );
}

export function ExportableTable<TData extends RowData>({
  columns,
  data,
  emptyState,
  exportFilename,
  initialPageSize = 25,
  initialSorting,
  isLoading,
  onPageIndexChange,
  onPageSizeChange,
  pageIndex = 0,
  pageSize = initialPageSize,
  paginationMode = 'client',
  searchPlaceholder,
  title,
  totalRows = data.length,
}: ExportableTableProps<TData>) {
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const { globalFilter, setGlobalFilter, table } = useRaqibTable({
    columns,
    data,
    initialPageSize,
    initialSorting,
    onPageIndexChange,
    onPageSizeChange,
    pageIndex,
    pageSize,
    paginationMode,
    totalRows,
  });

  const handleCsvExport = () => {
    const exportColumns = table.getVisibleLeafColumns();
    const exportRows = buildExportRows(exportColumns, table.getRowModel().rows);
    const headers = exportColumns.map((column) => getColumnHeaderLabel(column));
    const csv =
      '\uFEFF' +
      headers.join(',') +
      '\n' +
      exportRows
        .map((record) =>
          headers
            .map((header) => `"${String(record[header] ?? '').replace(/"/g, '""')}"`)
            .join(','),
        )
        .join('\n');

    createBlobDownload(`${exportFilename}.csv`, new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  };

  const handleExcelExport = async () => {
    setIsExportingExcel(true);

    try {
      const exportColumns = table.getVisibleLeafColumns();
      const exportRows = buildExportRows(exportColumns, table.getRowModel().rows);
      const XLSX = await import('xlsx');
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportRows);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Raqib');
      const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      createBlobDownload(
        `${exportFilename}.xlsx`,
        new Blob([arrayBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
    } finally {
      setIsExportingExcel(false);
    }
  };

  const toolbarActions = (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className="cursor-pointer rounded-none bg-transparent px-2.5 py-1 text-[9px] font-semibold tracking-[1px] text-t2 transition-colors hover:border-gold hover:text-gold font-[family-name:var(--font-jetbrains)]"
        style={{ border: '0.5px solid rgba(0,0,0,0.15)' }}
        onClick={handleCsvExport}
        type="button"
      >
        EXPORT CSV
      </button>
      <button
        className="cursor-pointer rounded-none bg-transparent px-2.5 py-1 text-[9px] font-semibold tracking-[1px] text-t2 transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-40 font-[family-name:var(--font-jetbrains)]"
        style={{ border: '0.5px solid rgba(0,0,0,0.15)' }}
        disabled={isExportingExcel}
        onClick={() => void handleExcelExport()}
        type="button"
      >
        {isExportingExcel ? 'EXPORT XLSX...' : 'EXPORT EXCEL'}
      </button>
    </div>
  );

  return (
    <TableShell
      columns={columns}
      data={data}
      emptyState={emptyState}
      globalFilter={globalFilter}
      isLoading={isLoading}
      paginationMode={paginationMode}
      searchPlaceholder={searchPlaceholder}
      setGlobalFilter={setGlobalFilter}
      table={table}
      title={title}
      toolbarActions={toolbarActions}
      totalRows={totalRows}
    />
  );
}

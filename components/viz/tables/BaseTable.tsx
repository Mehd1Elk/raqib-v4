'use client';

import {
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type FilterFn,
  type PaginationState,
  type RowData,
  type SortingState,
  type Updater,
  useReactTable,
} from '@tanstack/react-table';
import { useDeferredValue, useMemo, useState } from 'react';
import type { PaginationMode, TableShellProps } from './types';
import { getColumnAlignment, toPlainText } from './utils';

interface UseRaqibTableOptions<TData extends RowData> {
  columns: import('@tanstack/react-table').ColumnDef<TData, unknown>[];
  data: TData[];
  initialPageSize?: number;
  initialSorting?: SortingState;
  onPageIndexChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageIndex?: number;
  pageSize?: number;
  paginationMode: PaginationMode;
  totalRows: number;
}

const globalFilterFn: FilterFn<RowData> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? '').trim().toLowerCase();
  if (!query) return true;

  return row
    .getVisibleCells()
    .some((cell) => toPlainText(cell.getValue()).includes(query));
};

export function useRaqibTable<TData extends RowData>({
  columns,
  data,
  initialPageSize = 25,
  initialSorting = [],
  onPageIndexChange,
  onPageSizeChange,
  pageIndex = 0,
  pageSize = initialPageSize,
  paginationMode,
  totalRows,
}: UseRaqibTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [globalFilter, setGlobalFilter] = useState('');
  const [clientPagination, setClientPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const deferredFilter = useDeferredValue(globalFilter);

  const pagination = useMemo<PaginationState>(
    () =>
      paginationMode === 'server'
        ? {
            pageIndex,
            pageSize,
          }
        : clientPagination,
    [clientPagination, pageIndex, pageSize, paginationMode],
  );

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    const nextPagination = functionalUpdate(updater, pagination);

    if (paginationMode === 'server') {
      if (nextPagination.pageSize !== pageSize) {
        onPageSizeChange?.(nextPagination.pageSize);
      }

      if (nextPagination.pageIndex !== pageIndex) {
        onPageIndexChange?.(nextPagination.pageIndex);
      }

      return;
    }

    setClientPagination(nextPagination);
  };

  const table = useReactTable<TData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginationMode === 'client' ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: globalFilterFn as FilterFn<TData>,
    manualPagination: paginationMode === 'server',
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: handlePaginationChange,
    onSortingChange: setSorting,
    pageCount:
      paginationMode === 'server' ? Math.max(1, Math.ceil(totalRows / Math.max(pageSize, 1))) : undefined,
    state: {
      globalFilter: deferredFilter,
      pagination,
      sorting,
    },
  });

  return {
    globalFilter,
    setGlobalFilter,
    table,
  };
}

export function TableShell<TData extends RowData>({
  columns,
  data,
  emptyState,
  globalFilter,
  isLoading = false,
  paginationMode,
  searchPlaceholder = 'Rechercher dans cette couche...',
  setGlobalFilter,
  table,
  title,
  toolbarActions,
  totalRows,
}: TableShellProps<TData>) {
  const visibleRows = table.getRowModel().rows;
  const pageState = table.getState().pagination;
  const pageCount = Math.max(1, table.getPageCount());
  const isFilteredEmpty = visibleRows.length === 0 && totalRows > 0;

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded border border-div bg-ivory">
        <div className="px-4 py-3 text-[10px] font-bold tracking-[1px] text-gold font-[family-name:var(--font-jetbrains)]">
          {title}
        </div>
        <div className="px-6 py-10 text-center text-[10px] text-tm font-[family-name:var(--font-jetbrains)] animate-pulse">
          Chargement des donnees...
        </div>
      </div>
    );
  }

  if (totalRows === 0) {
    return (
      <div className="overflow-hidden rounded border border-div bg-ivory">
        <div className="px-4 py-3 text-[10px] font-bold tracking-[1px] text-gold font-[family-name:var(--font-jetbrains)]">
          {title}
        </div>
        <div className="px-6 py-8 text-center">
          <div className="mb-2 text-[15px] italic font-bold text-t1 font-[family-name:var(--font-cormorant)]">
            {emptyState.title}
          </div>
          {emptyState.description ? (
            <div className="mb-1 text-[11px] text-t2 font-[family-name:var(--font-noto)]">
              {emptyState.description}
            </div>
          ) : null}
          {emptyState.meta ? (
            <div className="text-[9px] text-tm font-[family-name:var(--font-jetbrains)]">
              {emptyState.meta}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded border border-div bg-ivory">
      <div className="flex flex-col gap-3 border-b border-div bg-ivory px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold tracking-[1px] text-gold font-[family-name:var(--font-jetbrains)]">
            {title} ({totalRows.toLocaleString('fr-FR')})
          </span>
          {paginationMode === 'server' ? (
            <span className="rounded-full border border-div bg-cream px-2 py-0.5 text-[8px] tracking-[1px] text-t3 font-[family-name:var(--font-jetbrains)]">
              PAGINATION SUPABASE
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="flex min-w-[220px] items-center rounded border border-div bg-cream px-3 py-2">
            <span className="sr-only">Recherche</span>
            <input
              aria-label="Recherche"
              className="w-full bg-transparent text-[11px] text-t1 outline-none placeholder:text-tm font-[family-name:var(--font-noto)]"
              onChange={(event) => setGlobalFilter(event.target.value)}
              placeholder={searchPlaceholder}
              value={globalFilter}
            />
          </label>
          {toolbarActions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-[10px] font-[family-name:var(--font-noto)]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-noir text-ivory">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDirection = header.column.getIsSorted();
                  const alignment = getColumnAlignment(header.column);
                  const meta = header.column.columnDef.meta;

                  return (
                    <th
                      key={header.id}
                      className={`border-b border-ivory/10 px-4 py-3 text-[9px] tracking-[1.4px] uppercase font-semibold font-[family-name:var(--font-jetbrains)] ${alignment} ${meta?.headerClassName ?? ''}`}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          className="inline-flex cursor-pointer items-center gap-1 bg-transparent text-inherit"
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span className="text-[8px] text-gold">
                            {sortDirection === 'asc' ? '↑' : sortDirection === 'desc' ? '↓' : '↕'}
                          </span>
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isFilteredEmpty ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-[11px] text-t2 font-[family-name:var(--font-noto)]"
                  colSpan={columns.length}
                >
                  Aucune ligne ne correspond a la recherche.
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={rowIndex % 2 === 0 ? 'bg-cream' : 'bg-ivory'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const alignment = getColumnAlignment(cell.column);
                    const meta = cell.column.columnDef.meta;

                    return (
                      <td
                        key={cell.id}
                        className={`border-b border-div px-4 py-3 align-top text-t1 ${alignment} ${
                          meta?.monospace ? 'font-[family-name:var(--font-jetbrains)]' : 'font-[family-name:var(--font-noto)]'
                        } ${meta?.className ?? ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-div bg-ivory px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
          <span>Lignes par page</span>
          <select
            aria-label="Lignes par page"
            className="rounded border border-div bg-cream px-2 py-1 text-[9px] text-t1 outline-none"
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            value={pageState.pageSize}
          >
            {[25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between gap-3 text-[9px] text-t3 font-[family-name:var(--font-jetbrains)]">
          <button
            className="cursor-pointer rounded border border-div px-2.5 py-1 text-t2 transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-35"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            type="button"
          >
            Precedent
          </button>
          <span>
            Page {pageState.pageIndex + 1} / {pageCount}
          </span>
          <button
            className="cursor-pointer rounded border border-div px-2.5 py-1 text-t2 transition-colors hover:border-gold hover:text-gold disabled:cursor-default disabled:opacity-35"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            type="button"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

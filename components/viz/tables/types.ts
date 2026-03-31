import type { RowData } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import type { Database, Json } from '@/lib/supabase/types';

export type EntryRow = Database['public']['Tables']['entries']['Row'];
export type EntryDataRecord = Record<string, Json | undefined>;
export type TableVariant = 'comparison' | 'data' | 'deal-flow' | 'investor' | 'scoring';
export type PaginationMode = 'client' | 'server';

export interface TableEmptyState {
  title: string;
  description?: string;
  meta?: string;
}

export interface TableAction {
  id: string;
  label: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
}

export interface EntryTableProps {
  entries: EntryRow[];
  isLoading?: boolean;
  layerId: string;
  layerName: string;
  onPageIndexChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageIndex?: number;
  pageSize?: number;
  paginationMode?: PaginationMode;
  platformName: string;
  totalRows: number;
}

export interface TableShellProps<TData extends RowData> {
  columns: import('@tanstack/react-table').ColumnDef<TData, unknown>[];
  data: TData[];
  emptyState: TableEmptyState;
  globalFilter: string;
  isLoading?: boolean;
  paginationMode: PaginationMode;
  searchPlaceholder?: string;
  setGlobalFilter: (value: string) => void;
  table: import('@tanstack/react-table').Table<TData>;
  title: string;
  toolbarActions?: ReactNode;
  totalRows: number;
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'center' | 'left' | 'right';
    className?: string;
    headerClassName?: string;
    monospace?: boolean;
  }
}

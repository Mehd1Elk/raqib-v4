'use client';

import React, { useState } from 'react';
import { Agent } from '../../lib/agents-data';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, Download } from 'lucide-react';

interface AgentListTableProps {
  data: Agent[];
  onRowClick: (agent: Agent) => void;
}

const columnHelper = createColumnHelper<Agent>();

export const AgentListTable: React.FC<AgentListTableProps> = ({ data, onRowClick }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });

  const columns = [
    columnHelper.accessor('id', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>#</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="font-mono text-xs text-stone-500">{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Nom</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="font-semibold text-stone-800 font-['Cormorant_Garamond']">{info.getValue()}</span>,
    }),
    columnHelper.accessor('layer', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Couche</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-100 rounded text-[#D4AF37]">{info.getValue()}</span>,
    }),
    columnHelper.accessor('pole', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Pôle</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="text-xs text-stone-600 truncate max-w-[150px] inline-block" title={info.getValue()}>{info.getValue()}</span>,
    }),
    columnHelper.accessor('platform', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Plateforme</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="text-xs text-stone-700">{info.getValue()}</span>,
    }),
    columnHelper.accessor('model', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Modèle</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="text-xs text-stone-500 font-mono">{info.getValue()}</span>,
    }),
    columnHelper.accessor('status', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Statut</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => {
        const status = info.getValue();
        let color = 'bg-stone-100 text-stone-600';
        if (status === 'Actif') color = 'bg-emerald-100 text-emerald-700';
        if (status === 'En attente') color = 'bg-amber-100 text-amber-700';
        if (status === 'Erreur') color = 'bg-red-100 text-red-700';
        return <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${color}`}>{status}</span>;
      },
    }),
    columnHelper.accessor('lastRunAt', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Dernière activité</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="text-xs text-stone-500 whitespace-nowrap">{new Date(info.getValue()).toLocaleString()}</span>,
    }),
    columnHelper.accessor('entriesProduced', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Entries</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className="text-xs font-mono text-stone-800">{info.getValue()}</span>,
    }),
    columnHelper.accessor('errorCount', {
      header: ({ column }) => (
        <button className="flex items-center space-x-1 uppercase text-[10px]" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>Erreurs</span><ArrowUpDown size={12} />
        </button>
      ),
      cell: info => <span className={`text-xs font-mono font-bold ${info.getValue() > 0 ? 'text-red-500' : 'text-stone-400'}`}>{info.getValue()}</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Nom', 'Couche', 'Pôle', 'Plateforme', 'Modèle', 'Statut', 'Dernière activité', 'Entries', 'Erreurs'];
    const rows = data.map(agent => [
      agent.id, agent.name, agent.layer, agent.pole, agent.platform, agent.model,
      agent.status, agent.lastRunAt, agent.entriesProduced.toString(), agent.errorCount.toString()
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "eigen_agents.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="w-full bg-white shadow-sm border border-stone-200 rounded overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b border-stone-200 bg-stone-50">
        <h3 className="font-['Cormorant_Garamond'] font-bold text-stone-800">AFFICHAGE LISTE ({data.length})</h3>
        <button 
          onClick={handleExportCSV}
          className="flex items-center space-x-2 px-3 py-1.5 bg-[#D4AF37] text-white text-xs font-semibold rounded hover:bg-[#C5A028] transition-colors"
        >
          <Download size={14} />
          <span>Export CSV</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
          <thead className="bg-[#F7F3EA] text-[#D4AF37]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-3 font-semibold tracking-wider hover:bg-[#F2EDDE] transition-colors select-none">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-stone-100">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                onClick={() => onRowClick(row.original)}
                className="hover:bg-stone-50 transition-colors cursor-pointer group"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-3 border-t border-stone-200 bg-stone-50 text-xs text-stone-600">
        <div className="space-x-2">
          <button 
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 bg-white border border-stone-300 rounded disabled:opacity-50"
          >
            {'<<'}
          </button>
          <button 
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 bg-white border border-stone-300 rounded disabled:opacity-50"
          >
            {'<'}
          </button>
          <button 
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 bg-white border border-stone-300 rounded disabled:opacity-50"
          >
            {'>'}
          </button>
          <button 
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 bg-white border border-stone-300 rounded disabled:opacity-50"
          >
            {'>>'}
          </button>
        </div>
        <div>
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} sur{" "}
              {table.getPageCount() || 1}
            </strong>{' '}
            | Total: {data.length}
          </span>
        </div>
      </div>
    </div>
  );
};

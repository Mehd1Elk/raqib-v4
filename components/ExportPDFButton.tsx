'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { exportToPDF } from '@/lib/export-pdf';

interface ExportPDFButtonProps {
  elementId: string;
  title: string;
  classification?: string;
}

export function ExportPDFButton({ elementId, title, classification = 'CONFIDENTIEL' }: ExportPDFButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToPDF(elementId, title, { classification });
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-1.5 px-3 py-1.5 border border-div rounded text-tm hover:border-gold hover:text-gold transition-colors cursor-pointer disabled:opacity-50"
    >
      <Download size={12} strokeWidth={1.5} />
      <span className="font-[family-name:var(--font-jetbrains)] text-[9px]">
        {exporting ? 'EXPORT...' : 'EXPORT PDF'}
      </span>
    </button>
  );
}

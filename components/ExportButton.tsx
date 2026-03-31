'use client';

import { ENTITIES, PLATFORMS } from '@/lib/constants';
import { fetchCategoriesWithLayers } from '@/lib/supabase/client-queries';
import { ALL_ENTITY_LAYERS } from '@/lib/mock-data';

interface ExportButtonProps {
  entityIndex: number;
}

export function ExportButton({ entityIndex }: ExportButtonProps) {
  const handleExport = async () => {
    const entity = ENTITIES[entityIndex];

    let categories: { label: string; layers: { id: string; name: string; platform: string; rows: number }[] }[];

    try {
      categories = await fetchCategoriesWithLayers(entity.id);
    } catch {
      // Fallback to mock data
      const entityLayers = ALL_ENTITY_LAYERS.find((e) => e.entityId === entity.id);
      if (!entityLayers) return;
      categories = entityLayers.categories.map(c => ({
        label: c.label,
        layers: c.layers.map(l => ({ id: l.id, name: l.name, platform: l.platform, rows: l.rows })),
      }));
    }

    const headers = ['entity', 'entity_type', 'category', 'layer_id', 'layer_name', 'platform', 'target_rows'];
    const rows = categories.flatMap((cat) =>
      cat.layers.map((l) => [
        entity.name,
        entity.type,
        cat.label,
        l.id,
        l.name,
        PLATFORMS[l.platform as keyof typeof PLATFORMS]?.name || l.platform,
        String(l.rows),
      ])
    );

    const csv =
      '\uFEFF' +
      headers.join(',') +
      '\n' +
      rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `RAQIB_${entity.name.replace(/\s/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 0);
  };

  return (
    <button
      onClick={handleExport}
      data-testid="export-button"
      className="text-[8px] font-[family-name:var(--font-jetbrains)] text-tm hover:text-gold cursor-pointer bg-transparent border border-div rounded px-2 py-0.5 transition-colors"
    >
      EXPORT CSV
    </button>
  );
}

import { render, screen } from '@testing-library/react';
import { LayerDetail } from '@/components/LayerDetail';
import { ENTITIES } from '@/lib/constants';
import { computeEntityStats } from '@/lib/helpers';
import type { Category } from '@/lib/types';

describe('LayerDetail', () => {
  const layer = {
    id: 'n01',
    name: 'Psychiatres par ville/pays',
    platform: 'CC' as const,
    rows: 100,
  };

  const category: Category = {
    label: 'I · CLINIQUE & PSYCHIATRIE',
    layers: [layer],
  };

  const stats = computeEntityStats([category]);

  test('renders the metadata panel and a complete progress state', () => {
    render(
      <LayerDetail
        entity={ENTITIES[0]}
        category={category}
        layer={layer}
        stats={stats}
        actualRows={90}
        status="ready"
        lastPopulatedAt="2026-03-30T12:00:00Z"
      />,
    );

    expect(screen.getByTestId('layer-detail')).toBeInTheDocument();
    expect(screen.getAllByText('Psychiatres par ville/pays')).toHaveLength(3);
    expect(screen.getByText(/NOOS \/ I · CLINIQUE & PSYCHIATRIE/i)).toBeInTheDocument();
    expect(screen.getAllByText('Claude Code')).toHaveLength(3);
    expect(screen.getByText('COMPLETE')).toBeInTheDocument();
    expect(screen.getByText(/MAJ 30\/03\/2026/i)).toBeInTheDocument();
    expect(screen.getByText(/Routing :/i)).toBeInTheDocument();
  });

  test('renders an empty progress state when no rows are populated', () => {
    render(
      <LayerDetail
        entity={ENTITIES[0]}
        category={category}
        layer={layer}
        stats={stats}
        actualRows={0}
      />,
    );

    expect(screen.getByText('EMPTY')).toBeInTheDocument();
    expect(screen.getByText(/0\.0%/)).toBeInTheDocument();
  });
});

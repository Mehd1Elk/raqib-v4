import { render, screen } from '@testing-library/react';
import { PlatformGrid } from '@/components/PlatformGrid';
import { ENTITIES } from '@/lib/constants';
import type { EntityStats } from '@/lib/types';

describe('PlatformGrid', () => {
  test('renders the per-platform distribution for the active entity', () => {
    const stats: EntityStats = {
      totalLayers: 3,
      totalRows: 350,
      platformDistribution: {
        CC: { count: 2, rows: 300 },
        PP: { count: 1, rows: 50 },
      } as EntityStats['platformDistribution'],
    };

    render(<PlatformGrid entity={ENTITIES[0]} stats={stats} />);

    expect(screen.getByText(/DISTRIBUTION PLATEFORMES — NOOS/i)).toBeInTheDocument();
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
    expect(screen.getByText('2 couches · 300 entrées')).toBeInTheDocument();
    expect(screen.getByText('Perplexity')).toBeInTheDocument();
  });

  test('ignores unknown platform codes in the distribution payload', () => {
    const stats: EntityStats = {
      totalLayers: 1,
      totalRows: 20,
      platformDistribution: {
        ZZ: { count: 1, rows: 20 },
      } as unknown as EntityStats['platformDistribution'],
    };

    render(<PlatformGrid entity={ENTITIES[0]} stats={stats} />);

    expect(screen.queryByText('ZZ')).not.toBeInTheDocument();
  });
});

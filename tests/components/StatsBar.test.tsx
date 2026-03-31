import { render, screen } from '@testing-library/react';
import { StatsBar } from '@/components/StatsBar';
import { ENTITIES } from '@/lib/constants';
import { computeEntityStats } from '@/lib/helpers';
import { getEntityLayers } from '@/lib/mock-data';

describe('StatsBar', () => {
  test('renders the active entity summary and platform distribution', () => {
    const entity = ENTITIES[0];
    const stats = computeEntityStats(getEntityLayers('noos'));

    render(<StatsBar entity={entity} stats={stats} />);

    expect(screen.getByText(entity.name)).toBeInTheDocument();
    expect(screen.getByText(entity.description)).toBeInTheDocument();
    expect(screen.getByText(/100 couches/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${stats.totalRows.toLocaleString()} entrées prévues`))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Claude:'))).toBeInTheDocument();
  });
});

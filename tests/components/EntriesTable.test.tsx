import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EntriesTable } from '@/components/EntriesTable';
import { fetchEntries, subscribeToEntries } from '@/lib/supabase/client-queries';
import type { Database } from '@/lib/supabase/types';

vi.mock('@/lib/supabase/client-queries', () => ({
  fetchEntries: vi.fn(),
  subscribeToEntries: vi.fn(),
}));

const fetchEntriesMock = vi.mocked(fetchEntries);
const subscribeToEntriesMock = vi.mocked(subscribeToEntries);
type EntryRow = Database['public']['Tables']['entries']['Row'];

function buildEntry(index: number): EntryRow {
  return {
    confidence: 88,
    created_at: `2026-03-${String((index % 28) + 1).padStart(2, '0')}T00:00:00Z`,
    created_by: null,
    data: {
      city: `Ville ${index}`,
      name: `Personne ${index}`,
    },
    id: `entry-${index}`,
    layer_id: 'n01',
    source: `https://example.com/entry-${index}`,
    source_date: null,
    verified: index % 2 === 0,
    verified_at: null,
    verified_by: null,
  };
}

describe('EntriesTable', () => {
  const clickedAnchors: HTMLAnchorElement[] = [];
  let realtimeCallback: ((payload: { new: { layer_id: string } }) => void) | undefined;
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickedAnchors.length = 0;
    realtimeCallback = undefined;

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      writable: true,
      value: vi.fn(() => 'blob:entries-1'),
    });
    revokeObjectURLMock = vi.fn(() => undefined);
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      writable: true,
      value: revokeObjectURLMock,
    });

    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clickedAnchors.push(this);
    });

    subscribeToEntriesMock.mockImplementation((callback) => {
      realtimeCallback = callback as (payload: { new: { layer_id: string } }) => void;
      return vi.fn();
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test('renders entries, exports CSV/Excel, paginates locally, and refreshes on matching realtime events', async () => {
    const entries = Array.from({ length: 55 }, (_, index) => buildEntry(index + 1));
    entries[0] = {
      ...entries[0],
      data: { city: 'Casablanca', name: 'Alice' },
      id: 'entry-alice',
      source: 'https://example.com/alice',
      verified: true,
    };
    entries[30] = {
      ...entries[30],
      confidence: 42,
      data: { city: 'Rabat', name: 'Bob' },
      id: 'entry-bob',
      source: null,
      verified: false,
    };

    fetchEntriesMock.mockResolvedValue({
      entries,
      total: 55,
    });

    render(
      <EntriesTable
        layerId="n01"
        layerName="Psychiatres par ville/pays"
        platformName="Claude Code"
      />,
    );

    expect(screen.getByText(/Chargement des donnees/i)).toBeInTheDocument();
    await screen.findByText('Alice');

    expect(screen.getByRole('link', { name: 'https://example.com/alice' })).toBeInTheDocument();
    expect(screen.getByText('Tableau de donnees (55)')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /EXPORT CSV/i }));
    fireEvent.click(screen.getByRole('button', { name: /EXPORT EXCEL/i }));

    await waitFor(() => expect(clickedAnchors).toHaveLength(2));
    expect(clickedAnchors[0]?.download).toBe('RAQIB_n01_tableau_donnees.csv');
    expect(clickedAnchors[1]?.download).toBe('RAQIB_n01_tableau_donnees.xlsx');
    expect(revokeObjectURLMock).toHaveBeenCalled();

    act(() => {
      realtimeCallback?.({ new: { layer_id: 'other-layer' } });
    });

    expect(fetchEntriesMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      realtimeCallback?.({ new: { layer_id: 'n01' } });
      await Promise.resolve();
    });

    await waitFor(() => expect(fetchEntriesMock).toHaveBeenCalledTimes(2));

    fireEvent.click(screen.getByRole('button', { name: /Suivant/i }));

    await screen.findByText('Bob');
    expect(screen.getByText('Page 2 / 3')).toBeInTheDocument();
  });

  test('shows the empty state when no entries are available', async () => {
    fetchEntriesMock.mockResolvedValue({ entries: [], total: 0 });

    render(
      <EntriesTable
        layerId="n01"
        layerName="Psychiatres par ville/pays"
        platformName="Claude Code"
      />,
    );

    await screen.findByText(/Couche en attente de peuplement/i);

    expect(screen.getByText('Psychiatres par ville/pays')).toBeInTheDocument();
    expect(screen.getByText(/Plateforme assignee : Claude Code/i)).toBeInTheDocument();
  });
});

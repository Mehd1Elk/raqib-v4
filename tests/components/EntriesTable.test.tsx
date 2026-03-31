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

describe('EntriesTable', () => {
  const clickedAnchors: HTMLAnchorElement[] = [];
  const createdBlobUrls: string[] = [];
  let realtimeCallback: ((payload: { new: { layer_id: string } }) => void) | undefined;
  let createObjectURLMock: ReturnType<typeof vi.fn>;
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickedAnchors.length = 0;
    createdBlobUrls.length = 0;
    realtimeCallback = undefined;

    createObjectURLMock = vi.fn(() => {
      const url = `blob:entries-${createdBlobUrls.length + 1}`;
      createdBlobUrls.push(url);
      return url;
    });
    revokeObjectURLMock = vi.fn(() => undefined);

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      writable: true,
      value: createObjectURLMock,
    });
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

  test('renders entries, exports CSV, paginates, and refreshes on matching realtime events', async () => {
    const firstEntry: EntryRow = {
      id: 'entry-1',
      layer_id: 'n01',
      data: { name: 'Alice', city: 'Casablanca' },
      source: 'https://example.com/alice',
      confidence: 88,
      verified: true,
      created_at: '2026-03-31T00:00:00Z',
      created_by: null,
      source_date: null,
      verified_at: null,
      verified_by: null,
    };

    const secondEntry: EntryRow = {
      id: 'entry-2',
      layer_id: 'n01',
      data: { name: 'Bob', city: 'Rabat' },
      source: null,
      confidence: 42,
      verified: false,
      created_at: '2026-04-01T00:00:00Z',
      created_by: null,
      source_date: null,
      verified_at: null,
      verified_by: null,
    };

    fetchEntriesMock.mockImplementation(async (_layerId, page = 0) => {
      if (page === 0) {
        return {
          entries: [firstEntry],
          total: 55,
        };
      }

      return {
        entries: [secondEntry],
        total: 55,
      };
    });

    render(
      <EntriesTable
        layerId="n01"
        layerName="Psychiatres par ville/pays"
        platformName="Claude Code"
      />,
    );

    expect(screen.getByText(/Chargement des entries/i)).toBeInTheDocument();
    await screen.findByText(/Alice/);

    expect(screen.getByRole('link', { name: 'https://example.com/alice' })).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('ENTRIES (55)')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /EXPORT ENTRIES CSV/i }));

    expect(clickedAnchors).toHaveLength(1);
    expect(clickedAnchors[0]?.download).toBe('RAQIB_entries_n01.csv');
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:entries-1');

    act(() => {
      realtimeCallback?.({ new: { layer_id: 'other-layer' } });
    });

    expect(fetchEntriesMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      realtimeCallback?.({ new: { layer_id: 'n01' } });
      await Promise.resolve();
    });

    await waitFor(() => expect(fetchEntriesMock).toHaveBeenCalledTimes(2));

    fireEvent.click(screen.getByRole('button', { name: /SUIVANT/i }));

    await screen.findByText(/Bob/);
    expect(screen.getByText('Page 2 / 2')).toBeInTheDocument();
    expect(screen.getAllByText('—')).toHaveLength(2);
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
    expect(screen.getByText(/Plateforme assignée : Claude Code/i)).toBeInTheDocument();
  });
});

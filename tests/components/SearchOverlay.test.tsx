import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SearchOverlay } from '@/components/SearchOverlay';
import { searchLayersClient } from '@/lib/supabase/client-queries';

vi.mock('@/lib/supabase/client-queries', () => ({
  searchLayersClient: vi.fn(),
}));

const searchLayersClientMock = vi.mocked(searchLayersClient);

describe('SearchOverlay', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('opens with Ctrl+K, searches, and selects a layer result', async () => {
    const onSelect = vi.fn();
    searchLayersClientMock.mockResolvedValue([{ layer_id: 'n01' } as never]);

    render(<SearchOverlay onSelect={onSelect} />);

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

    expect(screen.getByTestId('search-overlay')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'psychiatre' },
    });

    await waitFor(() => expect(searchLayersClientMock).toHaveBeenCalledWith('psychiatre', 20));
    await waitFor(() => expect(screen.getByTestId('search-result-noos-n01')).toBeInTheDocument());

    fireEvent.click(screen.getByTestId('search-result-noos-n01'));

    expect(onSelect).toHaveBeenCalledWith(0, 0, 0);
    expect(screen.queryByTestId('search-overlay')).not.toBeInTheDocument();
  });

  test('shows the empty state and closes on Escape', async () => {
    searchLayersClientMock.mockResolvedValue([]);

    render(<SearchOverlay onSelect={() => undefined} />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'terme introuvable' },
    });

    await waitFor(() => expect(searchLayersClientMock).toHaveBeenCalledWith('terme introuvable', 20));
    await waitFor(() => expect(screen.getByText(/Aucun résultat/i)).toBeInTheDocument());

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByTestId('search-overlay')).not.toBeInTheDocument();
  });
});

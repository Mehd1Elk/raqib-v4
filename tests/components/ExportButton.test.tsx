import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ExportButton } from '@/components/ExportButton';
import { fetchCategoriesWithLayers } from '@/lib/supabase/client-queries';

vi.mock('@/lib/supabase/client-queries', () => ({
  fetchCategoriesWithLayers: vi.fn(),
}));

const fetchCategoriesWithLayersMock = vi.mocked(fetchCategoriesWithLayers);

describe('ExportButton', () => {
  const clickedAnchors: HTMLAnchorElement[] = [];
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    clickedAnchors.length = 0;

    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      writable: true,
      value: vi.fn(() => 'blob:raqib-export'),
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  test('exports CSV data returned from Supabase', async () => {
    fetchCategoriesWithLayersMock.mockResolvedValue([
      {
        label: 'I · TEST',
        layers: [{ id: 'n01', name: 'Layer "One"', platform: 'CC', rows: 10 }],
      },
    ]);

    render(<ExportButton entityIndex={0} />);

    fireEvent.click(screen.getByTestId('export-button'));

    await waitFor(() => expect(clickedAnchors).toHaveLength(1));

    expect(clickedAnchors[0]?.download).toBe('RAQIB_NOOS.csv');

    await waitFor(() => expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:raqib-export'));
  });

  test('falls back to mock data when Supabase is unavailable', async () => {
    fetchCategoriesWithLayersMock.mockRejectedValue(new Error('offline'));

    render(<ExportButton entityIndex={8} />);

    fireEvent.click(screen.getByTestId('export-button'));

    await waitFor(() => expect(clickedAnchors).toHaveLength(1));

    expect(clickedAnchors[0]?.download).toBe('RAQIB_CG_SA.csv');
  });
});

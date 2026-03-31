type RemoteRow = {
  id: string;
  name: string;
  entity_id: string;
  platform_code: string;
  target_rows: number;
  actual_rows: number;
  status: string | null;
  last_populated_at: string | null;
  categories: { name: string };
  entities: { name: string; type: 'BRIQUE' | 'VENTURE' | 'HOLDING' | 'ECOSYSTEM'; color: string };
  platforms: { name: string };
};

async function loadStaticParamsModule(rows: RemoteRow[]) {
  vi.resetModules();

  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');

  const query = {
    order: vi.fn(),
  };

  query.order
    .mockReturnValueOnce(query)
    .mockReturnValueOnce(query)
    .mockResolvedValueOnce({
      data: rows,
      error: null,
    });

  vi.doMock('@supabase/supabase-js', () => ({
    createClient: vi.fn(() => ({
      from: vi.fn(() => ({
        select: vi.fn(() => query),
      })),
    })),
  }));

  return import('@/lib/static-params');
}

describe('static params remote hydration', () => {
  afterEach(() => {
    vi.doUnmock('@supabase/supabase-js');
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  test('returns remote params, page data, and metadata when Supabase is available', async () => {
    const row: RemoteRow = {
      id: 'n01',
      name: 'Psychiatres par ville/pays (annuaire)',
      entity_id: 'noos',
      platform_code: 'CC',
      target_rows: 17200,
      actual_rows: 321,
      status: 'ready',
      last_populated_at: '2026-03-30T00:00:00Z',
      categories: { name: 'I · CLINIQUE & PSYCHIATRIE' },
      entities: { name: 'NOOS', type: 'BRIQUE', color: '#102030' },
      platforms: { name: 'Claude Code' },
    };

    const { getAllStaticParams, getLayerMetadata, getLayerPageRecord } = await loadStaticParamsModule([row]);

    await expect(getAllStaticParams()).resolves.toEqual([{ entity: 'noos', layer: 'n01' }]);

    await expect(getLayerPageRecord('noos', 'n01')).resolves.toMatchObject({
      entity: { id: 'noos', name: 'NOOS' },
      category: { label: 'I · CLINIQUE & PSYCHIATRIE' },
      layer: { id: 'n01', name: 'Psychiatres par ville/pays (annuaire)' },
      platformName: 'Claude Code',
      actualRows: 321,
      status: 'ready',
      lastPopulatedAt: '2026-03-30T00:00:00Z',
    });

    await expect(getLayerMetadata('noos', 'n01')).resolves.toMatchObject({
      entityName: 'NOOS',
      categoryName: 'I · CLINIQUE & PSYCHIATRIE',
      layerName: 'Psychiatres par ville/pays (annuaire)',
      platform: 'Claude Code',
      rows: 17200,
    });
  });

  test('falls back to remote entity values when the entity or platform is not in local constants', async () => {
    const row: RemoteRow = {
      id: 'mx01',
      name: 'Custom remote layer',
      entity_id: 'mystery',
      platform_code: 'ZZ',
      target_rows: 12,
      actual_rows: 4,
      status: null,
      last_populated_at: null,
      categories: { name: 'Remote category' },
      entities: { name: 'Mystery Entity', type: 'HOLDING', color: '#999999' },
      platforms: { name: 'Custom Platform' },
    };

    const { getLayerPageRecord } = await loadStaticParamsModule([row]);

    await expect(getLayerPageRecord('mystery', 'mx01')).resolves.toMatchObject({
      entity: {
        id: 'mystery',
        name: 'Mystery Entity',
        color: '#999999',
        type: 'HOLDING',
      },
      platformName: 'Custom Platform',
      actualRows: 4,
    });
  });

  test('falls back to local mock data when remote records exist but the requested layer is absent', async () => {
    const row: RemoteRow = {
      id: 'mx01',
      name: 'Custom remote layer',
      entity_id: 'mystery',
      platform_code: 'CC',
      target_rows: 12,
      actual_rows: 4,
      status: null,
      last_populated_at: null,
      categories: { name: 'Remote category' },
      entities: { name: 'Mystery Entity', type: 'HOLDING', color: '#999999' },
      platforms: { name: 'Claude Code' },
    };

    const { getLayerPageRecord } = await loadStaticParamsModule([row]);

    await expect(getLayerPageRecord('noos', 'n01')).resolves.toMatchObject({
      entity: { id: 'noos', name: 'NOOS' },
      layer: { id: 'n01' },
      platformName: 'Claude Code',
    });
  });
});

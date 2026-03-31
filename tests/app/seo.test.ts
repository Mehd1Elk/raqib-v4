const { getAllStaticParamsMock } = vi.hoisted(() => ({
  getAllStaticParamsMock: vi.fn(),
}));

vi.mock('@/lib/static-params', async () => {
  const actual = await vi.importActual<typeof import('@/lib/static-params')>('@/lib/static-params');

  return {
    ...actual,
    getAllStaticParams: getAllStaticParamsMock,
  };
});
const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

describe('SEO metadata routes', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-31T00:00:00Z'));
    process.env.NEXT_PUBLIC_SITE_URL = 'https://raqib.example.com/';
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();

    if (previousSiteUrl) {
      process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
      return;
    }

    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  test('builds a robots route that allows all crawlers', async () => {
    const { default: robots } = await import('@/app/robots');

    expect(robots()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://raqib.example.com/sitemap.xml',
    });
  });

  test('builds the homepage plus each deep-link in the sitemap', async () => {
    getAllStaticParamsMock.mockResolvedValue([
      { entity: 'noos', layer: 'n01' },
      { entity: 'cg', layer: 'cg01' },
    ]);

    const { default: sitemap } = await import('@/app/sitemap');
    const result = await sitemap();

    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      url: 'https://raqib.example.com',
      changeFrequency: 'weekly',
      priority: 1,
    });
    expect(result[1]).toMatchObject({
      url: 'https://raqib.example.com/noos/n01',
      changeFrequency: 'weekly',
      priority: 0.7,
    });
    expect(result[2]).toMatchObject({
      url: 'https://raqib.example.com/cg/cg01',
      changeFrequency: 'weekly',
      priority: 0.7,
    });
    expect(result.every((entry) => entry.lastModified instanceof Date)).toBe(true);
  });
});

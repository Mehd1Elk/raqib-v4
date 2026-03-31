import type { MetadataRoute } from 'next';
import { getAllStaticParams } from '@/lib/static-params';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raqib-v4.vercel.app').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const params = await getAllStaticParams();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...params.map((params) => ({
      url: `${baseUrl}/${params.entity}/${params.layer}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}

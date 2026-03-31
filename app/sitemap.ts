import type { MetadataRoute } from 'next';
import { getAllStaticParams } from '@/lib/static-params';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raqib-v4.vercel.app').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...getAllStaticParams().map((params) => ({
      url: `${baseUrl}/${params.entity}/${params.layer}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}

import { MetadataRoute } from 'next';
import { getAllWriters } from '@/lib/writers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zapisi-srpske.rs';
  const writers = getAllWriters();

  const writerUrls = writers.map((w) => ({
    url: `${baseUrl}/pisci/${w.slug}`,
    lastModified: new Date('2026-10-28'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pisci`,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-projektu`,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...writerUrls,
  ];
}

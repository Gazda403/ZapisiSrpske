import { MetadataRoute } from 'next';
import { getAllWriters } from '@/lib/writers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zapisi-srpske.rs';
  const writers = getAllWriters();
  const now = new Date();

  const writerUrls = writers.map((w) => ({
    url: `${baseUrl}/pisci/${w.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pisci`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/o-projektu`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...writerUrls,
  ];
}


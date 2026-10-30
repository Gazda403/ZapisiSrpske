import React from 'react';
import type { Metadata } from 'next';
import { getAllWriters } from '@/lib/writers';
import WritersCatalogue from '@/components/WritersCatalogue';

export const metadata: Metadata = {
  title: 'Писци — Хронолошки архив аутора — ЗАПИСИ СРПСКЕ',
  description:
    'Хронолошки и биобиблиографски каталог 15 канонских књижевника из Републике Српске и Босне и Херцеговине. Претрага по имену, родном мјесту и књижевном периоду од 1767. до 2022. године.',
  alternates: {
    canonical: '/pisci',
  },
  openGraph: {
    title: 'Писци — Хронолошки архив књижевника Републике Српске',
    description:
      'Каталог писаца: Филип Вишњић, Петар Кочић, Јован Дучић, Иво Андрић, Бранко Ћопић, Момо Капор и други канонски аутори.',
    url: 'https://zapisi-srpske.rs/pisci',
    type: 'website',
    images: [
      {
        url: '/images/visegrad.jpg',
        width: 1200,
        height: 630,
        alt: 'Каталог канонских аутора — ЗАПИСИ СРПСКЕ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Писци — Хронолошки архив аутора — ЗАПИСИ СРПСКЕ',
    description:
      'Биографије, књижевна дјела и архивски извори 15 канонских књижевника Републике Српске.',
    images: ['/images/visegrad.jpg'],
  },
};

export default function WritersPage() {
  const writers = getAllWriters();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Каталог канонских писаца Републике Српске',
    url: 'https://zapisi-srpske.rs/pisci',
    description:
      'Биобиблиографски фонд 15 канонских српских писаца из Републике Српске и БиХ.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: writers.length,
      itemListElement: writers.map((w, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://zapisi-srpske.rs/pisci/${w.slug}`,
        name: `${w.name} (${w.birthYear}–${w.deathYear})`,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Почетна',
        item: 'https://zapisi-srpske.rs',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Писци',
        item: 'https://zapisi-srpske.rs/pisci',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WritersCatalogue writers={writers} />
    </>
  );
}

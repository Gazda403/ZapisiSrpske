import React from 'react';
import type { Metadata } from 'next';
import { getArchiveStats } from '@/lib/writers';
import AboutProjectView from '@/components/AboutProjectView';

export const metadata: Metadata = {
  title: 'О пројекту — Дигитални књижевни архив — ЗАПИСИ СРПСКЕ',
  description:
    'Циљеви, институционални оквир и методологија архива књижевног насљеђа Републике Српске. Пројекат реализован уз подршку и финансирање Министарства културе Републике Србије.',
  alternates: {
    canonical: '/o-projektu',
  },
  openGraph: {
    title: 'О пројекту — Дигитална ризница књижевног насљеђа',
    description:
      'Дигитална ризница књижевног насљеђа Републике Српске. Информације о архивском фонду, ауторима и институционалном покровитељству.',
    url: 'https://zapisi-srpske.rs/o-projektu',
    type: 'website',
    images: [
      {
        url: '/images/visegrad.jpg',
        width: 1200,
        height: 630,
        alt: 'О пројекту — ЗАПИСИ СРПСКЕ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'О пројекту — ЗАПИСИ СРПСКЕ',
    description:
      'Институционални оквир, мисија и методологија дигиталног архива српске књижевности.',
    images: ['/images/visegrad.jpg'],
  },
};

export default function AboutProjectPage() {
  const stats = getArchiveStats();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'О пројекту ЗАПИСИ СРПСКЕ',
    url: 'https://zapisi-srpske.rs/o-projektu',
    description:
      'Методологија, научни извори и институционално покровитељство дигиталне ризнице књижевног насљеђа Републике Српске.',
    sponsor: {
      '@type': 'GovernmentOrganization',
      name: 'Министарство културе Републике Србије',
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
        name: 'О пројекту',
        item: 'https://zapisi-srpske.rs/o-projektu',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutProjectView
        totalWriters={stats.totalWriters}
        yearRange={stats.yearRange}
      />
    </>
  );
}

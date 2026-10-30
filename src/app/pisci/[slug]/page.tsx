import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllWriters, getWriterBySlug, getAdjacentWriters } from '@/lib/writers';
import WriterDetailView from '@/components/WriterDetailView';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const writers = getAllWriters();
  return writers.map((w) => ({
    slug: w.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const writer = getWriterBySlug(params.slug);
  if (!writer) {
    return {
      title: 'Писац није пронађен — ЗАПИСИ СРПСКЕ',
    };
  }

  const title = `${writer.name} (${writer.birthYear}–${writer.deathYear}) — ЗАПИСИ СРПСКЕ`;
  const description = `${writer.name}, српски књижевник рођен у ${writer.birthPlace}. Биографија, књижевна дјела (${writer.works.map((w) => w.title).slice(0, 3).join(', ')}) и архивски извори у дигиталној ризници ЗАПИСИ СРПСКЕ.`;
  const canonicalUrl = `/pisci/${writer.slug}`;
  const imageUrl = `https://zapisi-srpske.rs${writer.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${writer.name} (${writer.birthYear}–${writer.deathYear})`,
      description,
      url: `https://zapisi-srpske.rs${canonicalUrl}`,
      type: 'profile',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: `Портрет: ${writer.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function WriterDetailPage({ params }: PageProps) {
  const writer = getWriterBySlug(params.slug);

  if (!writer) {
    notFound();
  }

  const { prev, next } = getAdjacentWriters(writer.slug);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: writer.name,
    birthDate: `${writer.birthYear}`,
    deathDate: `${writer.deathYear}`,
    birthPlace: {
      '@type': 'Place',
      name: writer.birthPlace,
    },
    jobTitle: 'Српски књижевник',
    description: writer.bio,
    image: `https://zapisi-srpske.rs${writer.image}`,
    knowsAbout: ['Српска књижевност', writer.period],
    author: writer.works.map((w) => ({
      '@type': 'Book',
      name: w.title,
      ...(w.year ? { datePublished: `${w.year}` } : {}),
    })),
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
      {
        '@type': 'ListItem',
        position: 3,
        name: writer.name,
        item: `https://zapisi-srpske.rs/pisci/${writer.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WriterDetailView
        writer={writer}
        prevWriter={prev}
        nextWriter={next}
      />
    </>
  );
}

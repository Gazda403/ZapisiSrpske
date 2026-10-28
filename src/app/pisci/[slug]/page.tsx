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

  return {
    title: `${writer.name} (${writer.birthYear}–${writer.deathYear}) — ЗАПИСИ СРПСКЕ`,
    description: `${writer.name}, књижевник рођен у ${writer.birthPlace}. Биографија, књижевна дјела и архивски извори у дигиталној ризници ЗАПИСИ СРПСКЕ.`,
    openGraph: {
      title: `${writer.name} — ЗАПИСИ СРПСКЕ`,
      description: writer.bio,
      images: [
        {
          url: `https://zapisi-srpske.rs${writer.image}`,
          alt: writer.name,
        },
      ],
    },
  };
}

export default function WriterDetailPage({ params }: PageProps) {
  const writer = getWriterBySlug(params.slug);

  if (!writer) {
    notFound();
  }

  const { prev, next } = getAdjacentWriters(writer.slug);

  return (
    <WriterDetailView
      writer={writer}
      prevWriter={prev}
      nextWriter={next}
    />
  );
}


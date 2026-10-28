import React from 'react';
import type { Metadata } from 'next';
import { getAllWriters } from '@/lib/writers';
import WritersCatalogue from '@/components/WritersCatalogue';

export const metadata: Metadata = {
  title: 'Писци — ЗАПИСИ СРПСКЕ',
  description:
    'Хронолошки и биобиблиографски каталог 15 канонских књижевника из Републике Српске и Босне и Херцеговине. Претрага по имену, родном мјесту и књижевном периоду.',
  openGraph: {
    title: 'Писци — ЗАПИСИ СРПСКЕ',
    description:
      'Каталог писаца и књижевника Републике Српске: Филип Вишњић, Петар Кочић, Јован Дучић, Иво Андрић, Бранко Ћопић и други.',
  },
};

export default function WritersPage() {
  const writers = getAllWriters();

  return <WritersCatalogue writers={writers} />;
}


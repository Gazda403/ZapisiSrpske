import React from 'react';
import type { Metadata } from 'next';
import { getArchiveStats } from '@/lib/writers';
import AboutProjectView from '@/components/AboutProjectView';

export const metadata: Metadata = {
  title: 'О пројекту — ЗАПИСИ СРПСКЕ',
  description:
    'Циљеви, институционални оквир и методологија архива књижевног насљеђа Републике Српске. Пројекат реализован уз подршку и финансирање Министарства културе Републике Србије.',
  openGraph: {
    title: 'О пројекту — ЗАПИСИ СРПСКЕ',
    description:
      'Дигитална ризница књижевног насљеђа Републике Српске. Информације о архивском фонду, циљним групама и покровитељству.',
  },
};

export default function AboutProjectPage() {
  const stats = getArchiveStats();

  return (
    <AboutProjectView
      totalWriters={stats.totalWriters}
      yearRange={stats.yearRange}
    />
  );
}

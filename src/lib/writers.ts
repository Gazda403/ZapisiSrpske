import fs from 'fs';
import path from 'path';
import { Writer } from './types';

// Редослед писаца по периодима као што је наведено у захтјеву
export const CANONICAL_SLUGS = [
  // 19. вијек
  'filip-visnjic',
  'vaso-pelagic',
  'aleksa-santic',
  'svetozar-corovic',
  // Прва половина 20. вијека
  'petar-kocic',
  'jovan-ducic',
  'ivo-andric',
  'dimitrije-mitrinovic',
  'vladimir-gacinovic',
  // Друга половина 20. вијека
  'branko-copic',
  'momo-kapor',
  'svetozar-koljevic',
  'nasiha-kapidzic-hadzic',
  'radoslav-bratic',
  'rajko-petrov-nogo',
];

export function getAllWriters(): Writer[] {
  const writersDir = path.join(process.cwd(), 'content', 'writers');
  
  const writers: Writer[] = [];
  for (const slug of CANONICAL_SLUGS) {
    const filePath = path.join(writersDir, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      writers.push(JSON.parse(fileData) as Writer);
    }
  }
  return writers;
}

export function getWriterBySlug(slug: string): Writer | undefined {
  const writers = getAllWriters();
  return writers.find((w) => w.slug === slug);
}

export function getArchiveStats() {
  const writers = getAllWriters();
  const totalWriters = writers.length;
  
  const birthYears = writers.map((w) => w.birthYear);
  const deathYears = writers.map((w) => w.deathYear);
  
  const minBirthYear = Math.min(...birthYears);
  const maxDeathYear = Math.max(...deathYears);
  
  let totalWorks = 0;
  writers.forEach((w) => {
    totalWorks += w.works.length;
  });

  const periodCounts: Record<string, number> = {
    '19. вијек': 0,
    'прва половина 20. вијека': 0,
    'друга половина 20. вијека': 0,
  };

  writers.forEach((w) => {
    if (periodCounts[w.period] !== undefined) {
      periodCounts[w.period]++;
    }
  });

  return {
    totalWriters,
    minBirthYear,
    maxDeathYear,
    yearRange: `${minBirthYear}–${maxDeathYear}`,
    totalWorks,
    periodCounts,
  };
}

export function getFeaturedWriters(): Writer[] {
  const featuredSlugs = ['petar-kocic', 'jovan-ducic', 'ivo-andric', 'branko-copic'];
  const writers = getAllWriters();
  return featuredSlugs
    .map((slug) => writers.find((w) => w.slug === slug))
    .filter((w): w is Writer => Boolean(w));
}

export function getAdjacentWriters(slug: string) {
  const writers = getAllWriters();
  const index = writers.findIndex((w) => w.slug === slug);
  if (index === -1) return { prev: null, next: null };
  
  const prevIndex = (index - 1 + writers.length) % writers.length;
  const nextIndex = (index + 1) % writers.length;
  
  return {
    prev: writers[prevIndex],
    next: writers[nextIndex],
  };
}

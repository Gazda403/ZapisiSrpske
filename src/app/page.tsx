import React from 'react';
import { getAllWriters, getArchiveStats, getFeaturedWorks } from '@/lib/writers';
import HeroCinematic from '@/components/HeroCinematic';
import HeadlinersScrollStory from '@/components/HeadlinersScrollStory';
import FeaturedWorksCarousel from '@/components/FeaturedWorksCarousel';
import TypographicIndex from '@/components/TypographicIndex';
import VerifiedQuoteSection from '@/components/VerifiedQuoteSection';
import TimelineScrollLinked from '@/components/TimelineScrollLinked';
import HomeStatsSection from '@/components/HomeStatsSection';

export default function HomePage() {
  const writers = getAllWriters();
  const stats = getArchiveStats();
  const featuredWorks = getFeaturedWorks();

  const archiveItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Канонски српски писци Републике Српске',
    description: '15 канонских књижевника у дигиталној ризници ЗАПИСИ СРПСКЕ',
    numberOfItems: writers.length,
    itemListElement: writers.map((w, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://zapisi-srpske.rs/pisci/${w.slug}`,
      name: `${w.name} (${w.birthYear}–${w.deathYear})`,
    })),
  };

  return (
    <div className="bg-[#FBFAF7] text-[#14213D] selection:bg-[#B3202A] selection:text-[#FBFAF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveItemListSchema) }}
      />
      {/* 1. Cinematic Full-Bleed Hero (100vh, Ken Burns, 12vw title, 25% navy overlay) */}
      <HeroCinematic yearRange={stats.yearRange} totalWriters={stats.totalWriters} />

      {/* 2. Scroll Story: 4 Headliners, One Writer = One Full Pinned Screen (50vw photo + 20vw outlined year) */}
      <HeadlinersScrollStory />

      {/* 3. The Rest of the Writers: Huge Typographic Index (Архив аутора) */}
      <TypographicIndex writers={writers} />

      {/* 4. Section "ДЈЕЛА": 10 Featured Works Carousel (Below Arhiv autora, above Vremenska osa) */}
      <FeaturedWorksCarousel works={featuredWorks} />

      {/* 5. Quote Section: Only rendered if verified quotes exist; otherwise removed completely */}
      <VerifiedQuoteSection writers={writers} />

      {/* 6. Scroll-Linked Full-Width Horizontal Timeline (Временска оса: 1767 to 1948) */}
      <TimelineScrollLinked writers={writers} />

      {/* 7. Period Classification & Mission */}
      <HomeStatsSection stats={stats} />
    </div>
  );
}

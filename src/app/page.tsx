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

  return (
    <div className="bg-[#FBFAF7] text-[#14213D] selection:bg-[#B3202A] selection:text-[#FBFAF7]">
      {/* 1. Cinematic Full-Bleed Hero (100vh, Ken Burns, 12vw title, 25% navy overlay) */}
      <HeroCinematic yearRange={stats.yearRange} totalWriters={stats.totalWriters} />

      {/* 2. Scroll Story: 4 Headliners, One Writer = One Full Pinned Screen (50vw photo + 20vw outlined year) */}
      <HeadlinersScrollStory />

      {/* 3. Section "ДЈЕЛА": 10 Featured Works Carousel (Embla, autoplay 5s, inertia drag, typographic reveal) */}
      <FeaturedWorksCarousel works={featuredWorks} />

      {/* 4. The Rest of the Writers: Huge Typographic Index (All 15 names at 5-6rem, cursor-follow preview) */}
      <TypographicIndex writers={writers} />

      {/* 5. Quote Section: Only rendered if verified quotes exist; otherwise removed completely */}
      <VerifiedQuoteSection writers={writers} />

      {/* 6. Scroll-Linked Full-Width Horizontal Timeline (1767 to 1948, 24px+ typography) */}
      <TimelineScrollLinked writers={writers} />

      {/* 7. Period Classification & Mission (Generous 160px+ vertical padding, hairline rules, zero boxes) */}
      <HomeStatsSection stats={stats} />
    </div>
  );
}

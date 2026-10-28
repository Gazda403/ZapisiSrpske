import React from 'react';
import { getAllWriters, getArchiveStats } from '@/lib/writers';
import HeroCinematic from '@/components/HeroCinematic';
import HeadlinersScrollStory from '@/components/HeadlinersScrollStory';
import TypographicIndex from '@/components/TypographicIndex';
import VerifiedQuoteSection from '@/components/VerifiedQuoteSection';
import TimelineScrollLinked from '@/components/TimelineScrollLinked';
import HomeStatsSection from '@/components/HomeStatsSection';

export default function HomePage() {
  const writers = getAllWriters();
  const stats = getArchiveStats();

  return (
    <div className="bg-[#FBFAF7] text-[#14213D] selection:bg-[#B3202A] selection:text-[#FBFAF7]">
      {/* 1. Cinematic Full-Bleed Hero (100vh, Ken Burns, 12vw title, 25% navy overlay) */}
      <HeroCinematic yearRange={stats.yearRange} totalWriters={stats.totalWriters} />

      {/* 2. Scroll Story: 4 Headliners, One Writer = One Full Pinned Screen (50vw photo + 20vw outlined year) */}
      <HeadlinersScrollStory />

      {/* 3. The Rest of the Writers: Huge Typographic Index (All 15 names at 5-6rem, cursor-follow preview) */}
      <TypographicIndex writers={writers} />

      {/* 4. Quote Section: Only rendered if verified quotes exist; otherwise removed completely */}
      <VerifiedQuoteSection writers={writers} />

      {/* 5. Scroll-Linked Full-Width Horizontal Timeline (1767 to 1948, 24px+ typography) */}
      <TimelineScrollLinked writers={writers} />

      {/* 6. Period Classification & Mission (Generous 160px+ vertical padding, hairline rules, zero boxes) */}
      <HomeStatsSection stats={stats} />
    </div>
  );
}

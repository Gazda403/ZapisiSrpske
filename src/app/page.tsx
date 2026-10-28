import React from 'react';
import { getAllWriters, getArchiveStats } from '@/lib/writers';
import HeroSection from '@/components/HeroSection';
import WritersEditorialGrid from '@/components/WritersEditorialGrid';
import DarkQuoteSection from '@/components/DarkQuoteSection';
import TimelineStrip from '@/components/TimelineStrip';
import PlacesSection from '@/components/PlacesSection';
import HomeStatsSection from '@/components/HomeStatsSection';

export default function HomePage() {
  const writers = getAllWriters();
  const stats = getArchiveStats();

  return (
    <div className="bg-[#FBFAF7]">
      {/* 1. Full-bleed Hero (100vh) with rotating headliners & real place photo in navy duotone */}
      <HeroSection yearRange={stats.yearRange} totalWriters={stats.totalWriters} />

      {/* 2. Big Editorial Writer Grid (60% oversized feature beside smaller tiles) */}
      <WritersEditorialGrid writers={writers} />

      {/* 3. Dark Full-Bleed Section for Contrast (White serif quote, red author/year, [quote pending]) */}
      <DarkQuoteSection />

      {/* 4. Real Timeline (Horizontal scroll, round thumbnail nodes on hairline, large numerals) */}
      <TimelineStrip writers={writers} />

      {/* 5. Завичаји Section (5 large photos of real places with writers & Wikimedia credits) */}
      <PlacesSection />

      {/* 6. Period Classification & Archival Context (Hairline rules, no boxes, strictly computed data) */}
      <HomeStatsSection stats={stats} />
    </div>
  );
}

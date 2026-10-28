import React from 'react';
import Link from 'next/link';
import { getAllWriters, getArchiveStats } from '@/lib/writers';
import HeroSection from '@/components/HeroSection';
import FeaturedWritersSection from '@/components/FeaturedWritersSection';
import TimelineStrip from '@/components/TimelineStrip';
import HomeStatsSection from '@/components/HomeStatsSection';

export default function HomePage() {
  const writers = getAllWriters();
  const stats = getArchiveStats();

  return (
    <div>
      {/* Hero Section with First Screen Specifics */}
      <HeroSection yearRange={stats.yearRange} totalWriters={stats.totalWriters} />

      {/* Featured Headline Writers (Kočić, Dučić, Andrić, Ćopić) with Asymmetric Grid */}
      <FeaturedWritersSection writers={writers} />

      {/* Interactive Timeline by Birth Year */}
      <TimelineStrip writers={writers} />

      {/* Concrete Archival Structure & Periods (Numbers computed directly from data) */}
      <HomeStatsSection stats={stats} />
    </div>
  );
}

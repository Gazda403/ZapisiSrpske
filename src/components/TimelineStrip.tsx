'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface TimelineStripProps {
  writers: Writer[];
}

export default function TimelineStrip({ writers }: TimelineStripProps) {
  const { t } = useScript();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Сортирамо по години рођења
  const sortedWriters = [...writers].sort((a, b) => a.birthYear - b.birthYear);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 sm:py-32 border-b border-[#14213D]/15 bg-[#FBFAF7]" aria-labelledby="timeline-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#14213D]/15">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              § 04 • {t('Хронолошки слијед')}
            </span>
            <h2 id="timeline-title" className="font-serif text-4xl sm:text-6xl font-bold text-[#14213D] leading-tight">
              {t('Временска линија аутора')}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="font-sans text-sm text-[#5C677D] hidden sm:inline">
              {t('Помичите хоризонтално:')}
            </span>
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-[#14213D]/25 flex items-center justify-center font-mono text-base text-[#14213D] hover:border-[#B3202A] hover:text-[#B3202A] transition-colors"
              aria-label="Помичи лијево"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-[#14213D]/25 flex items-center justify-center font-mono text-base text-[#14213D] hover:border-[#B3202A] hover:text-[#B3202A] transition-colors"
              aria-label="Помичи десно"
            >
              →
            </button>
          </div>
        </div>

        {/* Real Timeline Scroll with Hairline and Round Portrait Nodes (Rule 5 Requirement) */}
        <div
          ref={scrollContainerRef}
          className="relative overflow-x-auto no-scrollbar pt-10 pb-12 cursor-grab active:cursor-grabbing"
        >
          {/* Central Horizontal Hairline Rule */}
          <div className="absolute top-[88px] left-0 right-0 h-[1px] bg-[#14213D]/20 z-0" />

          <div className="flex items-start space-x-12 min-w-max px-4 relative z-10">
            {sortedWriters.map((w) => {
              const isHovered = activeSlug === w.slug;
              const isDimmed = activeSlug !== null && !isHovered;

              return (
                <div
                  key={w.slug}
                  onMouseEnter={() => setActiveSlug(w.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  className={`flex flex-col items-center group transition-all duration-300 ${
                    isDimmed ? 'opacity-25 scale-95' : 'opacity-100'
                  }`}
                >
                  {/* Large Numerals Above Rule (Minimum 18px text) */}
                  <span
                    className={`font-sans text-xl sm:text-2xl font-bold tabular-nums mb-3 transition-colors duration-200 ${
                      isHovered ? 'text-[#B3202A]' : 'text-[#14213D]'
                    }`}
                  >
                    {w.birthYear}
                  </span>

                  {/* Round Portrait Thumbnail Node (Diameter 64px, hairline border) */}
                  <Link
                    href={`/pisci/${w.slug}`}
                    className={`relative w-16 h-16 rounded-full border-2 overflow-hidden bg-[#FBFAF7] flex-shrink-0 transition-transform duration-200 ${
                      isHovered
                        ? 'border-[#B3202A] scale-110 shadow-none'
                        : 'border-[#14213D]/40 group-hover:border-[#B3202A]'
                    }`}
                  >
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      className="object-cover p-1"
                    />
                  </Link>

                  {/* Writer Name Below Rule (Minimum 15px text) */}
                  <Link
                    href={`/pisci/${w.slug}`}
                    className="mt-4 text-center max-w-[120px] focus-visible:outline-none"
                  >
                    <span
                      className={`font-serif text-base sm:text-lg font-bold block leading-snug transition-colors ${
                        isHovered ? 'text-[#B3202A]' : 'text-[#14213D]'
                      }`}
                    >
                      {t(w.name)}
                    </span>
                    <span className="font-sans text-xs text-[#B3202A] block mt-1 tabular-nums font-semibold">
                      {w.birthYear}–{w.deathYear}
                    </span>
                    <span className="font-sans text-xs text-[#5C677D] block mt-0.5 leading-tight">
                      {t(w.birthPlace)}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlighted Author Line at Bottom of Timeline */}
        {activeSlug && (
          <div className="pt-6 border-t border-[#14213D]/10 text-center sm:text-left transition-all">
            {(() => {
              const active = sortedWriters.find((w) => w.slug === activeSlug);
              if (!active) return null;
              return (
                <p className="font-serif text-base sm:text-lg text-[#14213D]">
                  → <strong className="text-[#B3202A]">{t(active.name)}</strong> ({active.birthYear}–{active.deathYear}), {t(active.birthPlace)}. {t('Период:')} {t(active.period)}.
                </p>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}

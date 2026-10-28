'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface TimelineStripProps {
  writers: Writer[];
}

export default function TimelineStrip({ writers }: TimelineStripProps) {
  const { t } = useScript();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Сортирамо по години рођења
  const sortedWriters = [...writers].sort((a, b) => a.birthYear - b.birthYear);

  return (
    <section className="py-20 border-t border-b border-[#14213D]/15 bg-[#F4F1EA]" aria-labelledby="timeline-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] block mb-2">
              § 02 • {t('Хронологија писаца')}
            </span>
            <h2 id="timeline-heading" className="font-serif text-3xl sm:text-4xl text-[#14213D]">
              {t('Временска линија књижевника')}
            </h2>
          </div>
          <p className="font-body text-sm text-[#5C677D] mt-3 md:mt-0 max-w-md">
            {t('Распоред 15 аутора према години рођења (1767–1948). Пређите курсором преко године за детаље.')}
          </p>
        </div>

        {/* Timeline visualization bar */}
        <div className="relative pt-6 pb-4 overflow-x-auto no-scrollbar">
          {/* Base hairline rule */}
          <div className="absolute top-10 left-0 right-0 h-[1px] bg-[#14213D]/25" />

          <div className="flex items-start justify-between min-w-[760px] relative">
            {sortedWriters.map((w, idx) => {
              const isHovered = activeSlug === w.slug;
              const isDimmed = activeSlug !== null && !isHovered;

              return (
                <div
                  key={w.slug}
                  onMouseEnter={() => setActiveSlug(w.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  className={`relative flex flex-col items-center group cursor-pointer transition-opacity duration-200 px-2 ${
                    isDimmed ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  {/* Mark circle on hairline */}
                  <div
                    className={`w-3.5 h-3.5 border transition-all duration-200 z-10 ${
                      isHovered
                        ? 'border-[#B3202A] bg-[#B3202A] scale-125'
                        : 'border-[#14213D] bg-[#FBFAF7] group-hover:border-[#B3202A]'
                    }`}
                  />

                  {/* Year marker */}
                  <span
                    className={`font-sans text-xs mt-3 tabular-nums transition-colors duration-200 ${
                      isHovered ? 'text-[#B3202A] font-bold' : 'text-[#14213D] font-medium'
                    }`}
                  >
                    {w.birthYear}
                  </span>

                  {/* Writer short name */}
                  <Link
                    href={`/pisci/${w.slug}`}
                    className="mt-2 text-center focus-visible:outline-none"
                  >
                    <span
                      className={`font-serif text-xs block max-w-[85px] leading-tight transition-colors ${
                        isHovered ? 'text-[#B3202A] underline' : 'text-[#14213D]'
                      }`}
                    >
                      {t(w.name)}
                    </span>
                    <span className="font-sans text-[10px] text-[#5C677D] block mt-0.5 tabular-nums">
                      {w.birthYear}–{w.deathYear}
                    </span>
                  </Link>

                  {/* Expanded Hover Tooltip Card (asymmetric, informative, strictly factual) */}
                  {isHovered && (
                    <div className="absolute top-24 z-30 w-64 p-4 border border-[#14213D]/25 bg-[#FBFAF7] text-left pointer-events-none animate-fadeIn">
                      <div className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A] mb-1">
                        {t(w.period)}
                      </div>
                      <div className="font-serif text-base font-semibold text-[#14213D]">
                        {t(w.name)}
                      </div>
                      <div className="font-sans text-xs text-[#5C677D] mt-1 tabular-nums">
                        {t('Рођен:')} {w.birthYear}, {t(w.birthPlace)}
                      </div>
                      <div className="font-sans text-xs text-[#5C677D] tabular-nums">
                        {t('Преминуо:')} {w.deathYear}
                      </div>
                      <div className="font-body text-xs text-[#14213D] mt-2 pt-2 border-t border-[#14213D]/10">
                        {w.works[0] ? (
                          <>
                            {t('Дјело:')} „{t(w.works[0].title)}“ ({w.works[0].year})
                          </>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected writer summary highlight */}
        {activeSlug && (
          <div className="mt-8 text-center sm:text-left">
            {(() => {
              const active = sortedWriters.find((w) => w.slug === activeSlug);
              if (!active) return null;
              return (
                <p className="font-serif text-sm text-[#14213D] italic">
                  → {t(active.name)} ({active.birthYear}–{active.deathYear}), {t(active.birthPlace)}. {t('Канонски аутор периода')}: {t(active.period)}.
                </p>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}

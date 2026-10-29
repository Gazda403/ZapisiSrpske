'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface TypographicIndexProps {
  writers: Writer[];
}

export default function TypographicIndex({ writers }: TypographicIndexProps) {
  const { t } = useScript();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const activeWriter = writers.find((w) => w.slug === hoveredSlug);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 sm:py-48 bg-[#FBFAF7] border-b border-[#14213D]/15 overflow-hidden"
      aria-label="Индекс канонских аутора"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 sm:mb-24 border-b border-[#14213D]/15">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              § 02 • {t('ТИПОГРАФСКИ ИНДЕКС КАНСКИХ СТВАРАЛАЦА')}
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-[#14213D] leading-tight">
              {t('Архив аутора')}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-sans text-xs sm:text-sm text-[#5C677D] max-w-md">
            <p>
              {t('Комплетан списак свих 15 канонских писаца архивираних у фонду. Поставите курсор изнад имена за приказ портрета.')}
            </p>
          </div>
        </div>

        {/* Huge Typographic List (All 15 names at 5-6rem, no cards) */}
        <div className="divide-y divide-[#14213D]/15">
          {writers.map((writer, idx) => {
            const isHovered = hoveredSlug === writer.slug;
            const isDimmed = hoveredSlug !== null && !isHovered;

            return (
              <div
                key={writer.slug}
                onMouseEnter={() => setHoveredSlug(writer.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className={`group relative transition-opacity duration-300 ${
                  isDimmed ? 'opacity-25' : 'opacity-100'
                }`}
              >
                <Link
                  href={`/pisci/${writer.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 lg:py-10 transition-colors focus-visible:outline-none"
                >
                  {/* Left: Roman index + Author Name at 5-6rem */}
                  <div className="flex items-baseline space-x-4 sm:space-x-8">
                    <span className="font-mono text-xs sm:text-sm text-[#5C677D] tracking-widest tabular-nums">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#14213D] group-hover:text-[#B3202A] transition-colors leading-none tracking-tight">
                      {t(writer.name)}
                    </span>
                  </div>

                  {/* Right: Birthplace and Years in red tabular numerals */}
                  <div className="flex items-center space-x-4 sm:space-x-8 mt-2 md:mt-0 pl-8 md:pl-0">
                    <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-[#5C677D]">
                      {t(writer.birthPlace)}
                    </span>
                    <span className="font-serif text-lg sm:text-2xl text-[#B3202A] tabular-nums font-semibold">
                      {writer.birthYear}–{writer.deathYear}
                    </span>
                    <span className="text-[#14213D] group-hover:text-[#B3202A] group-hover:translate-x-1 transition-all text-xl">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Cursor-Follow Portrait/Place Preview (Desktop only, no touch) */}
      {!isTouch && activeWriter && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out hidden lg:block"
          style={{
            left: `${mousePos.x + 32}px`,
            top: `${mousePos.y - 140}px`,
            width: '260px',
          }}
        >
          <div className="bg-[#FBFAF7] border border-[#14213D]/25 p-2 shadow-none">
            <div className="relative aspect-[3/4] w-full bg-[#14213D]/5 overflow-hidden border border-[#14213D]/10">
              <Image
                src={activeWriter.image}
                alt={activeWriter.name}
                fill
                sizes="260px"
                className="object-cover object-top"
              />
            </div>
            <div className="pt-2 px-1 text-center">
              <p className="font-serif text-sm font-bold text-[#14213D] leading-tight">
                {t(activeWriter.name)}
              </p>
              <p className="font-serif text-xs text-[#B3202A] tabular-nums">
                {activeWriter.birthYear}–{activeWriter.deathYear}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


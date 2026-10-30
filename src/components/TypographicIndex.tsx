'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';
import { getWriterPlacePhoto } from '@/lib/places';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.index-writer-row',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeWriter = writers.find((w) => w.slug === hoveredSlug);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 sm:py-48 bg-[#FBFAF7] border-b border-[#14213D]/15 overflow-hidden"
      aria-label="Индекс канонских аутора"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
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
                className={`index-writer-row group relative transition-opacity duration-300 will-change-transform ${
                  isDimmed ? 'opacity-25' : 'opacity-100'
                }`}
              >
                <Link
                  href={`/pisci/${writer.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-8 lg:py-10 transition-colors focus-visible:outline-none"
                >
                  {/* Left: Roman index + Author Name at 5-6rem */}
                  <div className="flex items-baseline space-x-3 sm:space-x-8">
                    <span className="font-mono text-xs sm:text-sm text-[#5C677D] tracking-widest tabular-nums flex-shrink-0">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="font-serif font-bold text-2xl sm:text-5xl lg:text-6xl text-[#14213D] group-hover:text-[#B3202A] transition-colors leading-tight tracking-tight break-words">
                      {t(writer.name)}
                    </span>
                  </div>

                  {/* Right: Birthplace and Years in red tabular numerals */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 md:mt-0 pl-6 sm:pl-8 md:pl-0">
                    <span className="font-sans text-xs sm:text-sm uppercase tracking-wider text-[#5C677D]">
                      {t(writer.birthPlace)}
                    </span>
                    <span className="font-serif text-base sm:text-2xl text-[#B3202A] tabular-nums font-semibold whitespace-nowrap">
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

      {/* Floating Cursor-Follow Portrait & Place Preview (Desktop only, no touch) */}
      {!isTouch && activeWriter && (() => {
        const placePhoto = getWriterPlacePhoto(activeWriter.slug);
        return (
          <div
            className="fixed pointer-events-none z-50 transition-all duration-150 ease-out hidden lg:block drop-shadow-md"
            style={{
              left: `${mousePos.x + 28}px`,
              top: `${mousePos.y - 160}px`,
              width: '280px',
            }}
          >
            <div className="bg-[#FBFAF7] border border-[#14213D]/25 p-3 shadow-none">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="relative aspect-[3/4] w-full bg-[#14213D]/5 overflow-hidden border border-[#14213D]/10">
                  <Image
                    src={activeWriter.image}
                    alt={activeWriter.name}
                    fill
                    sizes="140px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="relative aspect-[3/4] w-full bg-[#14213D]/5 overflow-hidden border border-[#14213D]/10">
                  <Image
                    src={placePhoto.image}
                    alt={placePhoto.placeName}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="pt-2 px-1 text-center border-t border-[#14213D]/10">
                <p className="font-serif text-sm font-bold text-[#14213D] leading-tight">
                  {t(activeWriter.name)}
                </p>
                <p className="font-serif text-xs text-[#B3202A] tabular-nums mt-0.5">
                  {activeWriter.birthYear}–{activeWriter.deathYear}
                </p>
                <p className="font-sans text-[10px] text-[#5C677D] mt-1 truncate">
                  {t(placePhoto.placeName)}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}


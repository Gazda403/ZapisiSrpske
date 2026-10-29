'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TimelineScrollLinkedProps {
  writers: Writer[];
}

export default function TimelineScrollLinked({ writers }: TimelineScrollLinkedProps) {
  const { t } = useScript();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeWriter, setActiveWriter] = useState<string | null>(null);

  // Sort writers by birth year ascending
  const sortedWriters = [...writers].sort((a, b) => a.birthYear - b.birthYear);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll-linked progress line drawing across full width
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { width: '0%' },
          {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="vremenska-osa"
      className="relative w-full py-32 sm:py-44 bg-[#FBFAF7] border-b border-[#14213D]/15 overflow-hidden"
      aria-label="Временска линија аутора"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-12 sm:mb-24">
        {/* Section Heading (Type Scale 6-9rem) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#14213D]/15">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              § 03 • {t('ХРОНОЛОШКИ ТОК КЊИЖЕВНОСТИ')}
            </span>
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-[#14213D] leading-tight">
              {t('Временска оса')}
            </h2>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-6">
            <span className="font-sans text-sm text-[#5C677D] hidden sm:inline">
              {t('Помјерајте хоризонтално:')}
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Помјери улијево"
                className="w-12 h-12 flex items-center justify-center border border-[#14213D]/30 text-[#14213D] hover:bg-[#14213D] hover:text-[#FBFAF7] transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Помјери удесно"
                className="w-12 h-12 flex items-center justify-center border border-[#14213D]/30 text-[#14213D] hover:bg-[#14213D] hover:text-[#FBFAF7] transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width scroll-linked timeline container */}
      <div className="relative w-full">
        {/* Continuous baseline hairline across full width */}
        <div className="absolute top-[138px] left-0 w-full h-[1px] bg-[#14213D]/15 z-0" />

        {/* Scroll-linked drawing red hairline on top of baseline */}
        <div
          ref={progressLineRef}
          className="absolute top-[138px] left-0 h-[2px] bg-[#B3202A] z-10 transition-all duration-75"
          style={{ width: '0%' }}
        />

        {/* Horizontal scrollable track with nodes */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto no-scrollbar relative z-20 px-4 sm:px-12 pb-8 cursor-grab active:cursor-grabbing"
        >
          <div className="flex space-x-14 sm:space-x-20 min-w-max pt-6">
            {sortedWriters.map((writer) => {
              const isHovered = activeWriter === writer.slug;
              const isDimmed = activeWriter !== null && !isHovered;

              return (
                <div
                  key={writer.slug}
                  onMouseEnter={() => setActiveWriter(writer.slug)}
                  onMouseLeave={() => setActiveWriter(null)}
                  className={`w-64 sm:w-72 flex flex-col items-center text-center transition-opacity duration-300 ${
                    isDimmed ? 'opacity-25' : 'opacity-100'
                  }`}
                >
                  {/* Year in large numerals above the line (24px+) */}
                  <div className="h-14 flex items-end justify-center mb-6">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] tabular-nums">
                      {writer.birthYear}
                    </span>
                  </div>

                  {/* Circular portrait thumbnail node on the line */}
                  <div className="relative z-30 mb-8">
                    <Link
                      href={`/pisci/${writer.slug}`}
                      className="group relative block w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#14213D] bg-[#FBFAF7] transition-transform duration-300 group-hover:scale-110 focus-visible:outline-none"
                    >
                      <Image
                        src={writer.image}
                        alt={writer.name}
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </Link>
                  </div>

                  {/* Author Name below the line in 24px+ type */}
                  <Link
                    href={`/pisci/${writer.slug}`}
                    className="block group focus-visible:outline-none"
                  >
                    <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-[#14213D] group-hover:text-[#B3202A] leading-tight mb-2 transition-colors">
                      {t(writer.name)}
                    </h3>
                  </Link>

                  {/* Years & Birthplace (Nothing under 14px, requirement strictly met!) */}
                  <p className="font-serif text-base text-[#B3202A] tabular-nums font-semibold mb-1">
                    {writer.birthYear}–{writer.deathYear}
                  </p>
                  <p className="font-sans text-sm text-[#5C677D] line-clamp-2">
                    {t(writer.birthPlace)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


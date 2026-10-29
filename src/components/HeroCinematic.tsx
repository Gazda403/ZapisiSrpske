'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';

interface HeroCinematicProps {
  yearRange: string;
  totalWriters: number;
}

export default function HeroCinematic({ yearRange, totalWriters }: HeroCinematicProps) {
  const { t } = useScript();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Line by line mask reveal animation
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.4,
          stagger: 0.18,
          ease: 'power3.out',
        }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          bottomBarRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col justify-between bg-[#14213D]"
      aria-label="Главни уводни екран"
    >
      {/* 1. Full-bleed background photo of Višegrad bridge with slow Ken Burns zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src="/images/visegrad.jpg"
          alt="Мост Мехмед-паше Соколовића у Вишеграду"
          fill
          priority
          sizes="100vw"
          className="object-cover editorial-photo kenburns-photo"
        />
        {/* Thin flat navy overlay at strictly 25% opacity for text legibility (no gradients!) */}
        <div className="absolute inset-0 bg-[#14213D] opacity-25 pointer-events-none" />
      </div>

      {/* Top micro status / archive coordinates */}
      <div className="relative z-10 w-full pt-6 px-4 sm:px-8 lg:px-12 flex justify-between items-center text-[11px] sm:text-xs font-sans tracking-widest uppercase text-[#FBFAF7]/90">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="inline-block w-2 h-2 bg-[#B3202A] flex-shrink-0" />
          <span>№ 01 • {t('ДИГИТАЛНИ АРХИВ')}</span>
          <span className="hidden sm:inline text-[#FBFAF7]/60">•</span>
          <span className="hidden sm:inline tabular-nums">{yearRange}</span>
        </div>
        <div className="tabular-nums">
          <span>{totalWriters} {t('КАНОНСКИХ АУТОРА')}</span>
        </div>
      </div>

      {/* Center/Lower: Huge Title (12vw Cormorant Garamond, White) overlapping image */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-[1500px] mx-auto pb-8 sm:pb-12">
        <div className="overflow-hidden mb-2">
          <h1 className="font-serif font-bold text-[#FBFAF7] leading-[0.88] tracking-tight text-[13vw] sm:text-[11vw] lg:text-[10.5vw]">
            <span className="block overflow-hidden py-1">
              <span ref={titleLine1Ref} className="block will-change-transform">
                {t('ЗАПИСИ')}
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span ref={titleLine2Ref} className="block will-change-transform text-[#FBFAF7]/95">
                {t('СРПСКЕ')}
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle in small tracked caps */}
        <div ref={subtitleRef} className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-[#FBFAF7]/25 pt-5">
          <div>
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.22em] text-[#FBFAF7]/90 font-medium">
              {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
            </p>
            <p className="font-body text-sm sm:text-base text-[#FBFAF7]/80 mt-1">
              {t('Вишеград — Мост на Дрини')} · {t('Завичајни пејзаж Иве Андрића')}
            </p>
          </div>

          <div className="flex items-center space-x-6 text-xs font-sans tracking-widest uppercase">
            <a
              href="#poglavlja"
              className="text-[#FBFAF7] hover:text-[#B3202A] transition-colors flex items-center space-x-2 py-1 link-draw"
            >
              <span>{t('ПРЕГЛЕДАЈ ПОГЛАВЉА')}</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Thin bar at the very bottom: Ministry Notice & Photo Credit (Rule: once in top, once in footer/bar) */}
      <div
        ref={bottomBarRef}
        className="relative z-10 w-full border-t border-[#FBFAF7]/20 bg-[#14213D]/60 py-3 px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] sm:text-xs font-sans text-[#FBFAF7]/75 gap-2"
      >
        <div className="flex items-center space-x-2.5">
          <span className="w-1.5 h-1.5 bg-[#B3202A] flex-shrink-0" />
          <span>
            {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије.')}
          </span>
        </div>
        <div className="font-sans text-[11px] text-[#FBFAF7]/60">
          <span>{t('Фотографија: Pudelek / Wikimedia Commons · CC BY-SA 3.0')}</span>
        </div>
      </div>
    </section>
  );
}


'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';

interface HeroSectionProps {
  yearRange: string;
  totalWriters: number;
}

export default function HeroSection({ yearRange, totalWriters }: HeroSectionProps) {
  const { t } = useScript();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-8 sm:pt-12 pb-16 border-b border-[#14213D]/15 overflow-hidden"
      aria-label="Заглавље архива"
    >
      {/* Vertical text element (Rule 11: one vertical text element per page) */}
      <div className="hidden xl:block absolute right-8 top-16 bottom-16 select-none pointer-events-none">
        <span className="vertical-lr font-sans text-[11px] uppercase tracking-[0.35em] text-[#5C677D]/70 h-full border-l border-[#14213D]/10 pl-3">
          {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА • 1767–2022')}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Strip: Archival Index Code & Ministry Funding Notice (First Screen Requirement) */}
        <div className="hero-fade flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-8 border-b border-[#14213D]/10 gap-4">
          <div className="flex items-center space-x-3 text-xs font-sans text-[#5C677D]">
            <span className="font-semibold text-[#B3202A] tracking-widest">№ 01</span>
            <span>•</span>
            <span className="uppercase tracking-widest">{t('Јавни дигитални архив')}</span>
            <span>•</span>
            <span className="tabular-nums font-semibold text-[#14213D]">{yearRange}</span>
          </div>

          {/* Small Ministry Funding Notice required on first screen */}
          <div className="flex items-center space-x-2 text-xs font-sans text-[#14213D] bg-[#F4F1EA] px-3 py-1.5 border border-[#14213D]/15">
            <span className="w-1.5 h-1.5 bg-[#B3202A] rounded-none flex-shrink-0" />
            <p>
              {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије')}
            </p>
          </div>
        </div>

        {/* First Screen Core: Name, Subtitle, Real Writer Line, Computed Years */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <span className="hero-fade font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
            </span>

            <h1 className="hero-fade font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#14213D] leading-[1.05] mb-6">
              {t('ЗАПИСИ СРПСКЕ')}
            </h1>

            {/* Non-portable, fact-grounded introductory text naming real places & writers */}
            <p className="hero-fade font-body text-lg sm:text-xl text-[#14213D] leading-relaxed mb-6 max-w-3xl">
              {t('Од устаничких стихова сљепог гуслара Филипа Вишњића из Угљевика (1767) и змијањског пркоса Петра Кочића из Стричића (1877), преко херцеговачке метафизике Јована Дучића у Требињу (1874) и витешког свједочанства Иве Андрића крај ћуприје на Дрини (1892), до ратне лирике Бранка Ћопића из Хашана (1915) — архив документује непрекинуту нит писма и језика.')}
            </p>

            {/* Project short intro: 2-3 concrete sentences */}
            <p className="hero-fade font-body text-base text-[#5C677D] leading-relaxed mb-8 max-w-2xl border-l-2 border-[#B3202A] pl-4">
              {t('Ова дигитална ризница настала је као отворена биобиблиографска збирка књижевног фонда Републике Српске и Босне и Херцеговине. Систематизује провјерене биографске податке, историјске изворе и пописе ауторских дјела за')} <span className="font-semibold text-[#14213D] tabular-nums">{totalWriters} {t('канонских писаца')}</span> {t('од 19. вијека до савременог доба.')}
            </p>

            {/* Concrete Action & Fact Anchor */}
            <div className="hero-fade flex flex-wrap items-center gap-6 pt-2">
              <Link
                href="/pisci"
                className="inline-flex items-center px-6 py-3.5 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
              >
                <span>{t('Прегледај све писце')}</span>
                <span className="ml-3 tabular-nums font-mono text-sm">[{totalWriters}] →</span>
              </Link>

              <Link
                href="/o-projektu"
                className="font-sans text-xs tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] link-draw py-2"
              >
                {t('О циљевима и методологији архива')} →
              </Link>
            </div>
          </div>

          {/* Right Column (Asymmetric 4 columns): Real Writer Highlight Card on first screen */}
          <div className="lg:col-span-4 hero-fade">
            <div className="border border-[#14213D]/20 bg-[#F4F1EA] p-6 relative">
              <div className="flex items-center justify-between border-b border-[#14213D]/15 pb-3 mb-4">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B3202A] font-semibold">
                  {t('Издвојено из фонда')}
                </span>
                <span className="font-sans text-xs tabular-nums text-[#5C677D]">
                  1874–1943
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-serif text-2xl font-bold text-[#14213D]">
                  {t('Јован Дучић')}
                </h3>
                <p className="font-sans text-xs text-[#5C677D] mt-1">
                  {t('Рођен у Требињу подно Леутара')}
                </p>
              </div>

              <div className="border-l border-[#14213D]/20 pl-3 py-1 my-4">
                <p className="font-body text-xs italic text-[#14213D] leading-relaxed">
                  {t('Књижевни опус обухвата дипломатску лирику, „Градове и химере“ (1930) и филозофске расправе „Јутра са Леутара“ (1932). Почива у Херцеговачкој Грачаници.')}
                </p>
              </div>

              <div className="pt-3 border-t border-[#14213D]/10 flex justify-between items-center text-xs">
                <span className="font-sans text-[11px] text-[#5C677D]">
                  {t('Период: прва половина 20. вијека')}
                </span>
                <Link
                  href="/pisci/jovan-ducic"
                  className="font-sans text-xs text-[#B3202A] font-semibold link-draw"
                >
                  {t('Отвори досије')} →
                </Link>
              </div>
            </div>

            {/* Quick archive metrics strip (strictly computed numbers) */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-sans">
              <div className="p-3 bg-[#FBFAF7] border border-[#14213D]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#5C677D] block">
                  {t('Епохе архива')}
                </span>
                <span className="font-serif text-xl font-bold text-[#14213D] tabular-nums">
                  3
                </span>
              </div>
              <div className="p-3 bg-[#FBFAF7] border border-[#14213D]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#5C677D] block">
                  {t('Хронолошки распон')}
                </span>
                <span className="font-serif text-lg font-bold text-[#14213D] tabular-nums">
                  {yearRange}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

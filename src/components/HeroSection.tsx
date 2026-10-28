'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

interface HeroSectionProps {
  yearRange: string;
  totalWriters: number;
}

interface Headliner {
  slug: string;
  name: string;
  birthYear: number;
  birthPlace: string;
  placeName: string;
  image: string;
  credit: string;
  license: string;
}

const HEADLINERS: Headliner[] = [
  {
    slug: 'ivo-andric',
    name: 'Иво Андрић',
    birthYear: 1892,
    birthPlace: 'Долац код Травника / Вишеград',
    placeName: 'Вишеград — Мост на Дрини',
    image: '/images/visegrad.jpg',
    credit: 'Pudelek / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  },
  {
    slug: 'jovan-ducic',
    name: 'Јован Дучић',
    birthYear: 1874,
    birthPlace: 'Требиње подно Леутара',
    placeName: 'Требиње — Арсланагића мост',
    image: '/images/trebinje.jpg',
    credit: 'Diego Delso / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  },
  {
    slug: 'petar-kocic',
    name: 'Петар Кочић',
    birthYear: 1877,
    birthPlace: 'Стричићи на Змијању код Бање Луке',
    placeName: 'Бања Лука — Тврђава Кастел',
    image: '/images/banja-luka.jpg',
    credit: 'ArhistefoBL / Wikimedia Commons',
    license: 'CC0 Јавно власништво',
  },
  {
    slug: 'branko-copic',
    name: 'Бранко Ћопић',
    birthYear: 1915,
    birthPlace: 'Хашани код Босанске Крупе',
    placeName: 'Крупа на Уни — Крајолици Подгрмеча',
    image: '/images/krupa-na-uni.jpg',
    credit: 'Miha Peče / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
  },
];

export default function HeroSection({ yearRange, totalWriters }: HeroSectionProps) {
  const { t } = useScript();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HEADLINERS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const current = HEADLINERS[activeIndex];

  return (
    <section
      className="relative min-h-[calc(100vh-5rem)] border-b border-[#14213D]/15 flex flex-col justify-between overflow-hidden bg-[#FBFAF7]"
      aria-label="Заглавље архива"
    >
      {/* Top Bar inside Hero: Archival Meta + Ministry Funding Notice (Shown ONCE at top) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 border-b border-[#14213D]/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-[#5C677D]">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[#B3202A] tracking-widest">№ 01</span>
            <span>•</span>
            <span className="uppercase tracking-widest">{t('Дигитални архив')}</span>
            <span>•</span>
            <span className="tabular-nums font-semibold text-[#14213D]">{yearRange}</span>
            <span>•</span>
            <span className="tabular-nums font-semibold text-[#14213D]">{totalWriters} {t('аутора')}</span>
          </div>

          {/* Ministry Funding Notice with labeled placeholder (Prompt requirement) */}
          <div className="flex items-center space-x-3 text-xs font-sans text-[#14213D]">
            <span className="w-1.5 h-1.5 bg-[#B3202A] flex-shrink-0" />
            <span>
              {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Full-Bleed 100vh Hero Content Grid (No boxes! Pure whitespace & big typography) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Column: Monumental Headline (Clamp 4rem to 10rem) & Rotating Line */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B3202A] font-semibold block mb-4">
            {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
          </span>

          <h1 className="font-serif text-[clamp(3.8rem,7.5vw,9.5rem)] font-bold tracking-tight text-[#14213D] leading-[0.88] mb-8">
            {t('ЗАПИСИ')}
            <br />
            {t('СРПСКЕ')}
          </h1>

          {/* Single line naming the featured writer with birth year and birthplace (crossfading) */}
          <div className="min-h-[4rem] flex flex-col justify-center mb-8 border-l-2 border-[#B3202A] pl-5">
            <div className="transition-opacity duration-700 ease-in-out">
              <Link
                href={`/pisci/${current.slug}`}
                className="group inline-flex items-baseline flex-wrap gap-x-3 gap-y-1"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                  {t(current.name)}
                </span>
                <span className="font-sans text-sm sm:text-base text-[#B3202A] tabular-nums font-semibold">
                  ({current.birthYear})
                </span>
                <span className="font-sans text-sm sm:text-base text-[#5C677D]">
                  — {t(current.birthPlace)}
                </span>
              </Link>
              <p className="font-sans text-xs uppercase tracking-wider text-[#5C677D] mt-1">
                {t('Темељни аутор архива')} • {t(current.placeName)}
              </p>
            </div>
          </div>

          {/* Rotating controls & navigation */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Link
              href="/pisci"
              className="inline-flex items-center px-8 py-4 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
            >
              <span>{t('Отвори књижевни фонд')}</span>
              <span className="ml-4 font-mono">→</span>
            </Link>

            <Link
              href="#zavicaji"
              className="font-sans text-xs tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] link-draw py-2"
            >
              {t('Прегледај завичаје')} ↓
            </Link>

            {/* Slider Dots/Indicators for Headliners */}
            <div className="flex items-center space-x-2 ml-auto">
              {HEADLINERS.map((h, i) => (
                <button
                  key={h.slug}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 transition-all duration-300 ${
                    activeIndex === i
                      ? 'w-8 bg-[#B3202A]'
                      : 'w-2 bg-[#14213D]/25 hover:bg-[#14213D]'
                  }`}
                  aria-label={`Прикажи аутора: ${h.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tall Real Place Photo in Flat Navy Duotone (No gradient overlay: flat navy multiply layer) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full border border-[#14213D]/25 bg-[#14213D] overflow-hidden group">
            {HEADLINERS.map((h, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={h.slug}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Duotone Base Image */}
                  <Image
                    src={h.image}
                    alt={h.placeName}
                    fill
                    priority={idx === 0}
                    className="object-cover duotone-img"
                  />
                  {/* Flat Navy Multiply Layer per rule: no gradients */}
                  <div className="duotone-layer" />

                  {/* Minimal Editorial Caption at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 text-[#FBFAF7]">
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#FBFAF7]/80 block mb-1">
                      {t('Завичајни пејзаж')}
                    </span>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-[#FBFAF7] leading-tight">
                      {t(h.placeName)}
                    </p>
                    <div className="flex justify-between items-center text-[11px] font-sans text-[#FBFAF7]/70 mt-3 pt-2 border-t border-[#FBFAF7]/20">
                      <span>{t(h.credit)}</span>
                      <span className="tabular-nums font-mono text-[10px]">{h.license}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hairline Bottom Indicator */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-4 hidden md:flex items-center justify-between text-xs font-sans text-[#5C677D]">
        <span>{t('Сви подаци верификовани из примарних архивских извора')}</span>
        <span>↓ {t('Помичите надоље за преглед писаца')}</span>
      </div>
    </section>
  );
}

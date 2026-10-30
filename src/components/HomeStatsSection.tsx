'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HomeStatsProps {
  stats: {
    totalWriters: number;
    yearRange: string;
    periodCounts: Record<string, number>;
  };
}

export default function HomeStatsSection({ stats }: HomeStatsProps) {
  const { t } = useScript();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-48 bg-[#FBFAF7] border-b border-[#14213D]/15" aria-labelledby="archive-mission-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column (5 columns): Period Classification */}
          <div className="stats-col lg:col-span-5 border-t border-b border-[#14213D]/20 py-10 will-change-transform">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-4 font-semibold">
              § 05 • {t('ПЕРИОДИЗАЦИЈА ГРАЂЕ')}
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#14213D] mb-10 leading-tight">
              {t('Књижевне епохе')}
            </h3>

            <div className="divide-y divide-[#14213D]/15">
              <div className="py-6">
                <h4 className="font-serif text-2xl font-bold text-[#14213D]">
                  {t('19. вијек')}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#5C677D] mt-1">
                  {t('Вишњић, Скендерова, Н. Дучић, Пелагић, Шантић, Ћоровић')}
                </p>
              </div>

              <div className="py-6">
                <h4 className="font-serif text-2xl font-bold text-[#14213D]">
                  {t('Прва половина 20. вијека')}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#5C677D] mt-1">
                  {t('Кочић, Дучић, Андрић, Митриновић, Гаћиновић')}
                </p>
              </div>

              <div className="py-6">
                <h4 className="font-serif text-2xl font-bold text-[#14213D]">
                  {t('Друга половина 20. вијека')}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#5C677D] mt-1">
                  {t('Ћопић, Капор, Кољевић, Капиџић-Хаџић, Братић, Ного, Раич')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 columns): Archival Context & Purpose */}
          <div className="stats-col lg:col-span-7 flex flex-col justify-between pt-2 will-change-transform">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-4 font-semibold">
                § 06 • {t('МИСИЈА АРХИВА')}
              </span>
              <h2 id="archive-mission-heading" className="font-serif text-4xl sm:text-6xl font-bold text-[#14213D] leading-tight mb-8">
                {t('Очување српског језика и завичајног идентитета')}
              </h2>

              <p className="font-body text-xl text-[#14213D] leading-relaxed mb-6">
                {t('Кроз савремену дигиталну архивацију биографских и библиографских података, платформа пружа увид у књижевни континуитет од устаничких стихова Филипа Вишњића из 1815. године све до савремених пјесничких објава Рајка Петрова Нога из 2006. године.')}
              </p>

              <p className="font-body text-lg text-[#5C677D] leading-relaxed mb-12">
                {t('Грађа је намијењена широкој научној и образовној јавности, ђацима и студентима, као и дијаспори којој дигитална доступност пружа живу и непосредну везу са завичајном културом.')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[#14213D]/15">
              <Link
                href="/pisci"
                className="inline-flex items-center px-8 py-4 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
              >
                <span>{t('Прегледај све писце')} ({stats.totalWriters})</span>
                <span className="ml-4 font-mono">→</span>
              </Link>
              <Link
                href="/o-projektu"
                className="font-sans text-xs tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] link-draw py-2 font-semibold"
              >
                {t('О методологији архива')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

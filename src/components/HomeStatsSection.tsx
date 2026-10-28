'use client';

import React from 'react';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

interface HomeStatsProps {
  stats: {
    totalWriters: number;
    yearRange: string;
    periodCounts: Record<string, number>;
  };
}

export default function HomeStatsSection({ stats }: HomeStatsProps) {
  const { t } = useScript();

  return (
    <section className="py-24 sm:py-32 bg-[#FBFAF7]" aria-labelledby="archive-structure-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 columns): Period Classification (Clean hairline rules, NO beige box!) */}
          <div className="lg:col-span-5 border-t border-b border-[#14213D]/20 py-8">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              § 06 • {t('Периодизација грађе')}
            </span>
            <h3 id="archive-structure-heading" className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-8">
              {t('Књижевне епохе')}
            </h3>

            <div className="divide-y divide-[#14213D]/15">
              <div className="py-5 flex items-baseline justify-between">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#14213D]">
                    {t('19. вијек')}
                  </h4>
                  <p className="font-sans text-xs text-[#5C677D] mt-0.5">
                    {t('Вишњић, Пелагић, Шантић, Ћоровић')}
                  </p>
                </div>
                <span className="font-sans text-xl font-bold text-[#B3202A] tabular-nums">
                  {stats.periodCounts['19. вијек']} {t('аутора')}
                </span>
              </div>

              <div className="py-5 flex items-baseline justify-between">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#14213D]">
                    {t('Прва половина 20. вијека')}
                  </h4>
                  <p className="font-sans text-xs text-[#5C677D] mt-0.5">
                    {t('Кочић, Дучић, Андрић, Митриновић, Гаћиновић')}
                  </p>
                </div>
                <span className="font-sans text-xl font-bold text-[#B3202A] tabular-nums">
                  {stats.periodCounts['прва половина 20. вијека']} {t('аутора')}
                </span>
              </div>

              <div className="py-5 flex items-baseline justify-between">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#14213D]">
                    {t('Друга половина 20. вијека')}
                  </h4>
                  <p className="font-sans text-xs text-[#5C677D] mt-0.5">
                    {t('Ћопић, Капор, Кољевић, Капиџић-Хаџић, Братић, Ного')}
                  </p>
                </div>
                <span className="font-sans text-xl font-bold text-[#B3202A] tabular-nums">
                  {stats.periodCounts['друга половина 20. вијека']} {t('аутора')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (7 columns): Archival Context and Purpose (No box, whitespace and typography) */}
          <div className="lg:col-span-7 flex flex-col justify-between pt-2">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
                § 07 • {t('Мисија архива')}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#14213D] leading-tight mb-6">
                {t('Очување српског језика и завичајног идентитета')}
              </h2>

              <p className="font-body text-lg text-[#14213D] leading-relaxed mb-6">
                {t('Кроз савремену дигиталну архивацију биографских и библиографских података, платформа пружа увид у књижевни континуитет од устаничких стихова Филипа Вишњића из 1815. године све до савремених пјесничких објава Рајка Петрова Нога из 2006. године.')}
              </p>

              <p className="font-body text-lg text-[#5C677D] leading-relaxed mb-10">
                {t('Грађа је намијењена широкој научној и образовној јавности, ђацима и студентима, као и дијаспори којој дигитална доступност пружа живу и непосредну везу са завичајном културом.')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#14213D]/15">
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

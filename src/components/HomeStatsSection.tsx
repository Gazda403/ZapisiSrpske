'use client';

import React from 'react';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

interface HomeStatsProps {
  stats: {
    totalWriters: number;
    yearRange: string;
    totalWorks: number;
    periodCounts: Record<string, number>;
  };
}

export default function HomeStatsSection({ stats }: HomeStatsProps) {
  const { t } = useScript();

  return (
    <section className="py-20 bg-[#FBFAF7]" aria-labelledby="archive-stats-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (4 columns): Period Classification */}
          <div className="lg:col-span-4 border border-[#14213D]/25 bg-[#F4F1EA] p-6 sm:p-8">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#B3202A] block mb-2 font-semibold">
              § 03 • {t('Периодизација грађе')}
            </span>
            <h3 id="archive-stats-heading" className="font-serif text-2xl font-bold text-[#14213D] mb-6">
              {t('Структура књижевног фонда')}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/15">
                <div>
                  <span className="font-serif text-base font-semibold text-[#14213D] block">
                    {t('19. вијек')}
                  </span>
                  <span className="font-sans text-xs text-[#5C677D]">
                    {t('Епика, просвјетитељство, лирика')}
                  </span>
                </div>
                <span className="font-sans text-lg font-bold text-[#B3202A] tabular-nums">
                  {stats.periodCounts['19. вијек']} {t('аутора')}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/15">
                <div>
                  <span className="font-serif text-base font-semibold text-[#14213D] block">
                    {t('Прва половина 20. вијека')}
                  </span>
                  <span className="font-sans text-xs text-[#5C677D]">
                    {t('Модерна, Млада Босна, есејистика')}
                  </span>
                </div>
                <span className="font-sans text-lg font-bold text-[#B3202A] tabular-nums">
                  {stats.periodCounts['прва половина 20. вијека']} {t('аутора')}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#14213D]/15">
                <div>
                  <span className="font-serif text-base font-semibold text-[#14213D] block">
                    {t('Друга половина 20. вијека')}
                  </span>
                  <span className="font-sans text-xs text-[#5C677D]">
                    {t('Послијератна проза, естетика, критика')}
                  </span>
                </div>
                <span className="font-sans text-lg font-bold text-[#B3202A] tabular-nums">
                  {stats.periodCounts['друга половина 20. вијека']} {t('аутора')}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#14213D]/15 text-xs font-sans text-[#5C677D]">
              <span className="font-semibold text-[#14213D]">{t('Укупан фонд:')}</span>{' '}
              <span className="tabular-nums font-semibold text-[#14213D]">{stats.totalWorks}</span> {t('евидентираних библиографских јединица.')}
            </div>
          </div>

          {/* Right Column (8 columns): Archival Context and Purpose */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] block mb-2">
                § 04 • {t('Контекст архива')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#14213D] mb-6">
                {t('Очување српског језика, писма и завичајног насљеђа')}
              </h2>

              <p className="font-body text-base sm:text-lg text-[#14213D] leading-relaxed mb-6">
                {t('Кроз савремену дигиталну архивацију биографских и библиографских података, платформа омогућава увид у оригиналне изворе и књижевни континуитет од гусларских спјевова Филипа Вишњића из устаничке 1815. године све до савремених пјесничких оглашења Рајка Петрова Нога из 2006. године.')}
              </p>

              <p className="font-body text-base text-[#5C677D] leading-relaxed mb-8">
                {t('Грађа је намијењена широкој научној и образовној јавности, ученицима и студентима, као и српској дијаспори којој дигитална доступност омогућава непосредну везу са завичајном књижевном традицијом.')}
              </p>
            </div>

            {/* Ministry Funding Reminder Box (Rule 5 & prompt requirement) */}
            <div className="border border-[#14213D]/20 bg-[#F4F1EA] p-5 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#B3202A] block mb-1">
                    {t('Институционални оквир')}
                  </span>
                  <p className="font-serif text-sm text-[#14213D]">
                    {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије.')}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="font-sans text-[10px] tracking-widest text-[#5C677D] uppercase border border-dashed border-[#14213D]/30 px-3 py-1.5 inline-block">
                    {t('Званични грант 2026.')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/pisci"
                className="inline-flex items-center px-6 py-3.5 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
              >
                <span>{t('Отвори каталог свих 15 писаца')}</span>
                <span className="ml-3 font-mono">→</span>
              </Link>
              <Link
                href="/o-projektu"
                className="font-sans text-xs tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] link-draw py-2"
              >
                {t('Прочитајте више о пројекту')} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

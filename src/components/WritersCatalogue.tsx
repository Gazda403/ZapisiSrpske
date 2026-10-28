'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer, PeriodType } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface WritersCatalogueProps {
  writers: Writer[];
}

export default function WritersCatalogue({ writers }: WritersCatalogueProps) {
  const { t } = useScript();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [hoveredWriter, setHoveredWriter] = useState<Writer | null>(null);

  const periods = [
    { id: 'all', label: 'Сви периоди' },
    { id: '19. вијек', label: '19. вијек' },
    { id: 'прва половина 20. вијека', label: 'Прва половина 20. вијека' },
    { id: 'друга половина 20. вијека', label: 'Друга половина 20. вијека' },
  ];

  const filteredWriters = useMemo(() => {
    return writers.filter((w) => {
      // Period filter
      if (selectedPeriod !== 'all' && w.period !== selectedPeriod) {
        return false;
      }

      // Search filter (name, birthplace, works)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const nameCyr = w.name.toLowerCase();
        const nameLat = t(w.name).toLowerCase();
        const placeCyr = w.birthPlace.toLowerCase();
        const placeLat = t(w.birthPlace).toLowerCase();
        return (
          nameCyr.includes(q) ||
          nameLat.includes(q) ||
          placeCyr.includes(q) ||
          placeLat.includes(q)
        );
      }

      return true;
    });
  }, [writers, selectedPeriod, searchQuery, t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-[#14213D]/15 pb-8 mb-10">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] block mb-2 font-semibold">
          {t('Каталог аутора')} • № 02
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14213D]">
          {t('Писци и књижевници')}
        </h1>
        <p className="font-body text-base text-[#5C677D] mt-3 max-w-2xl">
          {t('Биобиблиографски фонд обухвата 15 канонских књижевника из Републике Српске и Босне и Херцеговине.')}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-8 border-b border-[#14213D]/15 mb-8">
        {/* Period Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {periods.map((p) => {
            const count =
              p.id === 'all'
                ? writers.length
                : writers.filter((w) => w.period === p.id).length;
            const isSelected = selectedPeriod === p.id;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPeriod(p.id)}
                className={`px-3.5 py-2 font-sans text-xs uppercase tracking-wider transition-all border ${
                  isSelected
                    ? 'bg-[#14213D] text-[#FBFAF7] border-[#14213D] font-semibold'
                    : 'bg-[#FBFAF7] text-[#14213D] border-[#14213D]/20 hover:border-[#B3202A] hover:text-[#B3202A]'
                }`}
                aria-pressed={isSelected}
              >
                <span>{t(p.label)}</span>
                <span className="ml-2 tabular-nums text-[11px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-80">
          <label htmlFor="writer-search" className="sr-only">
            {t('Претражи писце по имену или мјесту')}
          </label>
          <input
            id="writer-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Претрага по имену или мјесту...')}
            className="w-full bg-[#FBFAF7] border border-[#14213D]/25 px-4 py-2 text-sm font-body text-[#14213D] placeholder-[#5C677D]/70 focus:outline-none focus:border-[#B3202A]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#5C677D] hover:text-[#B3202A]"
              aria-label="Очисти претрагу"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main List Layout with Cursor/Beside Portrait Preview Micro-interaction (Rule 10 & 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Writers List (8 columns) */}
        <div className="lg:col-span-8">
          {filteredWriters.length === 0 ? (
            <div className="p-8 border border-dashed border-[#14213D]/25 text-center">
              <p className="font-serif text-lg text-[#14213D]">
                {t('Нема пронађених књижевника за задати критеријум.')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedPeriod('all');
                  setSearchQuery('');
                }}
                className="mt-4 font-sans text-xs uppercase tracking-wider text-[#B3202A] underline"
              >
                {t('Ресетуј филтере')}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#14213D]/15 border-t border-b border-[#14213D]/15">
              {filteredWriters.map((writer, index) => {
                const isHovered = hoveredWriter?.slug === writer.slug;

                return (
                  <Link
                    key={writer.slug}
                    href={`/pisci/${writer.slug}`}
                    onMouseEnter={() => setHoveredWriter(writer)}
                    onMouseLeave={() => setHoveredWriter(null)}
                    className={`block py-5 px-3 transition-all duration-200 group focus-visible:outline-none ${
                      isHovered ? 'bg-[#F4F1EA] translate-x-2' : 'hover:bg-[#F4F1EA]/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="flex items-baseline space-x-4">
                        {/* Number mark */}
                        <span className="font-mono text-xs text-[#5C677D] w-6 flex-shrink-0">
                          {String(index + 1).padStart(2, '0')}.
                        </span>

                        <div>
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                            {t(writer.name)}
                          </h2>
                          <p className="font-sans text-xs text-[#5C677D] mt-0.5">
                            {t(writer.birthPlace)}
                          </p>
                        </div>
                      </div>

                      {/* Birth–death years turning red on hover (Rule 10 requirement) */}
                      <div className="flex items-center space-x-4 sm:text-right pl-10 sm:pl-0">
                        <span className="font-sans text-[11px] uppercase tracking-wider text-[#5C677D] hidden md:inline">
                          {t(writer.period)}
                        </span>
                        <span
                          className={`font-sans text-sm tabular-nums font-semibold transition-colors duration-200 ${
                            isHovered ? 'text-[#B3202A]' : 'text-[#14213D]'
                          }`}
                        >
                          {writer.birthYear}–{writer.deathYear}
                        </span>
                        <span className="text-[#14213D] group-hover:text-[#B3202A] transition-colors font-mono">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sticky Portrait Preview Frame (Micro-interaction beside list) (4 columns) */}
        <div className="hidden lg:block lg:col-span-4 sticky top-28">
          <div className="border border-[#14213D]/25 bg-[#F4F1EA] p-6">
            <div className="border-b border-[#14213D]/15 pb-2 mb-4 flex justify-between items-center">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#B3202A] font-semibold">
                {t('Преглед портрета')}
              </span>
              <span className="font-mono text-xs text-[#5C677D]">
                {hoveredWriter ? hoveredWriter.birthYear : '1767–2022'}
              </span>
            </div>

            {hoveredWriter ? (
              <div className="animate-fadeIn">
                <div className="relative aspect-[3/4] border border-[#14213D]/20 bg-[#FBFAF7] overflow-hidden mb-4">
                  <Image
                    src={hoveredWriter.image}
                    alt={hoveredWriter.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#14213D]">
                  {t(hoveredWriter.name)}
                </h3>
                <p className="font-sans text-xs text-[#B3202A] font-semibold tabular-nums mt-0.5">
                  {hoveredWriter.birthYear}–{hoveredWriter.deathYear}
                </p>
                <p className="font-sans text-xs text-[#5C677D] mt-1">
                  {t('Родно мјесто:')} {t(hoveredWriter.birthPlace)}
                </p>
                <p className="font-body text-xs text-[#14213D] mt-3 line-clamp-3 leading-relaxed">
                  {t(hoveredWriter.bio)}
                </p>
                {hoveredWriter.works[0] && (
                  <p className="font-sans text-xs text-[#5C677D] mt-2 pt-2 border-t border-[#14213D]/10">
                    {t('Дјело:')} „{t(hoveredWriter.works[0].title)}“ ({hoveredWriter.works[0].year})
                  </p>
                )}
              </div>
            ) : (
              <div className="aspect-[3/4] border border-dashed border-[#14213D]/20 bg-[#FBFAF7] flex flex-col items-center justify-center p-6 text-center">
                <span className="font-serif text-3xl text-[#14213D]/40 mb-2">§</span>
                <p className="font-serif text-sm text-[#5C677D]">
                  {t('Пређите курсором преко писца у листи са лијеве стране за приказ портрета и детаља.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

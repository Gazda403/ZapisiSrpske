'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer } from '@/lib/types';
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
      if (selectedPeriod !== 'all' && w.period !== selectedPeriod) {
        return false;
      }
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
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-20 sm:py-32 bg-[#FBFAF7]">
      {/* Page Header (No boxes!) */}
      <div className="border-b border-[#14213D]/15 pb-12 mb-16">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
          {t('Каталог аутора')} • № 02
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-[#14213D] leading-tight">
          {t('Писци и књижевници')}
        </h1>
        <p className="font-body text-xl text-[#5C677D] mt-4 max-w-2xl leading-relaxed">
          {t('Комплетан биобиблиографски фонд обухвата 15 канонских стваралаца из три историјске епохе.')}
        </p>
      </div>

      {/* Filter and Search Bar (Clean hairline controls, no beige box) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-8 border-b border-[#14213D]/15 mb-16">
        {/* Period Filter Tabs */}
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
                className={`px-4 py-2 text-xs font-sans uppercase tracking-widest transition-colors ${
                  isSelected
                    ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                    : 'border border-[#14213D]/20 text-[#14213D] hover:border-[#14213D]'
                }`}
              >
                {t(p.label)} <span className="tabular-nums font-mono opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search input with hairline border */}
        <div className="w-full lg:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Претрага по имену или мјесту...')}
            className="w-full px-4 py-2.5 text-sm bg-transparent border border-[#14213D]/25 text-[#14213D] placeholder-[#5C677D] focus:border-[#B3202A] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Huge Typographic Index Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: 15 Writers List */}
        <div className="lg:col-span-8 divide-y divide-[#14213D]/15 border-b border-[#14213D]/15">
          {filteredWriters.map((writer, idx) => (
            <Link
              key={writer.slug}
              href={`/pisci/${writer.slug}`}
              onMouseEnter={() => setHoveredWriter(writer)}
              className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 transition-colors focus-visible:outline-none block"
            >
              <div className="flex items-baseline space-x-4">
                <span className="font-mono text-xs sm:text-sm text-[#5C677D] tabular-nums">
                  {idx < 9 ? `0${idx + 1}.` : `${idx + 1}.`}
                </span>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors leading-tight">
                    {t(writer.name)}
                  </h2>
                  <p className="font-sans text-xs text-[#5C677D] mt-1">
                    {t(writer.birthPlace)}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline space-x-6 pl-8 sm:pl-0">
                <span className="font-mono text-xs text-[#5C677D] uppercase">
                  {t(writer.period)}
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#B3202A] tabular-nums font-semibold">
                  {writer.birthYear}–{writer.deathYear}
                </span>
                <span className="text-[#14213D] group-hover:text-[#B3202A] group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Column: Floating Sticky Portrait Preview Card */}
        <div className="hidden lg:block lg:col-span-4 sticky top-28">
          <div className="border border-[#14213D]/25 p-4 bg-[#FBFAF7]">
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#B3202A] block mb-3 font-semibold">
              {t('ПОРТРЕТНИ ФОНД')}
            </span>

            {hoveredWriter ? (
              <div>
                <div className="relative aspect-[3/4] w-full bg-[#14213D]/5 border border-[#14213D]/10 overflow-hidden mb-4">
                  <Image
                    src={hoveredWriter.image}
                    alt={hoveredWriter.name}
                    fill
                    sizes="340px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#14213D] leading-tight">
                  {t(hoveredWriter.name)}
                </h3>
                <p className="font-serif text-sm text-[#B3202A] tabular-nums mt-1 font-semibold">
                  {hoveredWriter.birthYear}–{hoveredWriter.deathYear}
                </p>
                <p className="font-sans text-xs text-[#5C677D] mt-2">
                  {t(hoveredWriter.birthPlace)}
                </p>
              </div>
            ) : (
              <div className="aspect-[3/4] flex flex-col items-center justify-center border border-dashed border-[#14213D]/20 p-6 text-center text-[#5C677D]">
                <span className="font-serif text-4xl mb-3 text-[#14213D]/30">§</span>
                <p className="font-sans text-xs">
                  {t('Пређите курсором преко писца у листи за приказ портрета.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';
import { getWriterPlacePhoto } from '@/lib/places';

interface WritersCatalogueProps {
  writers: Writer[];
}

export default function WritersCatalogue({ writers }: WritersCatalogueProps) {
  const { t } = useScript();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [hoveredWriter, setHoveredWriter] = useState<Writer | null>(null);
  const [activePreviewTab, setActivePreviewTab] = useState<'portrait' | 'place'>('place');

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

  // Featured top hero supporting image (defaulting to Trebinje/Visegrad or active hovered writer's supporting image)
  const currentHeroPhoto = hoveredWriter
    ? getWriterPlacePhoto(hoveredWriter.slug)
    : {
        image: '/images/trebinje.jpg',
        placeName: 'Књижевни завичаји Републике Српске: од Крајине до Херцеговине',
        credit: 'Архив завичајних предјела / Јавно добро',
        license: 'CC BY-SA 3.0',
      };

  const hoveredPlacePhoto = hoveredWriter
    ? getWriterPlacePhoto(hoveredWriter.slug)
    : null;

  return (
    <div className="w-full bg-[#FBFAF7] pb-32">
      {/* 1. Grand Editorial Hero with Supporting Landscape Image at Top */}
      <section className="relative w-full h-[65vh] min-h-[500px] overflow-hidden bg-[#14213D] flex flex-col justify-between mb-16 sm:mb-24">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={currentHeroPhoto.image}
            alt={currentHeroPhoto.placeName}
            fill
            priority
            sizes="100vw"
            className="object-cover editorial-photo transition-all duration-700"
          />
          {/* Thin flat navy overlay at 25% opacity for text legibility (Anti-AI slop rule: no gradients!) */}
          <div className="absolute inset-0 bg-[#14213D] opacity-25 pointer-events-none" />
        </div>

        {/* Top breadcrumbs & archive coordinates */}
        <div className="relative z-10 w-full pt-6 sm:pt-8 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto flex items-center justify-between text-xs font-sans tracking-widest uppercase text-[#FBFAF7]/90">
          <nav aria-label="Путања до странице" className="flex items-center space-x-2">
            <Link href="/" className="hover:text-[#B3202A] transition-colors link-draw">
              {t('Почетна')}
            </Link>
            <span>/</span>
            <span className="text-[#FBFAF7] font-semibold">{t('Писци')}</span>
          </nav>
          <div className="flex items-center space-x-3 tabular-nums font-mono">
            <span>{writers.length} {t('КАНОНСКИХ АУТОРА')}</span>
            <span className="text-[#FBFAF7]/50">•</span>
            <span>1767–2022</span>
          </div>
        </div>

        {/* Center/Bottom Hero: Large Title overlapping image */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto pb-8 sm:pb-12">
          <div className="flex items-center space-x-3 mb-2 sm:mb-3">
            <span className="w-2 h-2 bg-[#B3202A]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#FBFAF7] font-semibold">
              {t('КАТАЛОГ АУТОРА И ЗАВИЧАЈНО ПОДНЕБЉЕ')} • № 02
            </span>
          </div>

          <h1 className="font-serif font-bold text-[#FBFAF7] leading-[0.9] tracking-tight text-4xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4">
            {t('Писци и књижевници')}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-[#FBFAF7]/20 text-xs font-sans text-[#FBFAF7]/85">
            <p>
              <span className="text-[#FBFAF7]/60">{t('Завичајно окружење:')}</span>{' '}
              <span className="text-[#FBFAF7] font-medium">{t(currentHeroPhoto.placeName)}</span>
            </p>
            <p className="font-sans text-[11px] text-[#FBFAF7]/70">
              {t(currentHeroPhoto.credit)}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
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

        {/* Writers List + Sticky Dual-Preview Column */}
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

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pl-6 sm:pl-0">
                  <span className="font-mono text-xs text-[#5C677D] uppercase">
                    {t(writer.period)}
                  </span>
                  <span className="font-serif text-lg sm:text-2xl text-[#B3202A] tabular-nums font-semibold whitespace-nowrap">
                    {writer.birthYear}–{writer.deathYear}
                  </span>
                  <span className="text-[#14213D] group-hover:text-[#B3202A] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column: Floating Sticky Dual-Preview Card (Portrait + Supporting Place Image) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="border border-[#14213D]/25 p-5 bg-[#FBFAF7]">
              {/* Tab Selector: Завичај (Supporting image) vs Портрет (Portrait) */}
              <div className="flex items-center justify-between border-b border-[#14213D]/15 pb-3 mb-4">
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#B3202A] font-semibold">
                  {t('ВИЗУЕЛНИ ДОКУМЕНТИ')}
                </span>
                <div className="flex space-x-1 text-[11px] font-sans">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('place')}
                    className={`px-2 py-0.5 transition-colors uppercase ${
                      activePreviewTab === 'place'
                        ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                        : 'text-[#14213D] hover:text-[#B3202A]'
                    }`}
                  >
                    {t('ЗАВИЧАЈ')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('portrait')}
                    className={`px-2 py-0.5 transition-colors uppercase ${
                      activePreviewTab === 'portrait'
                        ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                        : 'text-[#14213D] hover:text-[#B3202A]'
                    }`}
                  >
                    {t('ПОРТРЕТ')}
                  </button>
                </div>
              </div>

              {hoveredWriter ? (
                <div>
                  {activePreviewTab === 'place' && hoveredPlacePhoto ? (
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-[#14213D]/5 border border-[#14213D]/10 overflow-hidden mb-3">
                        <Image
                          src={hoveredPlacePhoto.image}
                          alt={hoveredPlacePhoto.placeName}
                          fill
                          sizes="360px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A] block font-semibold">
                        {t('ЗАВИЧАЈНО ОКРУЖЕЊЕ И СПОМЕН-ПОДНЕБЉЕ')}
                      </span>
                      <p className="font-serif text-sm font-bold text-[#14213D] leading-snug mt-1">
                        {t(hoveredPlacePhoto.placeName)}
                      </p>
                      <p className="font-sans text-[11px] text-[#5C677D] mt-1">
                        {t(hoveredPlacePhoto.credit)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="relative aspect-[3/4] w-full bg-[#14213D]/5 border border-[#14213D]/10 overflow-hidden mb-3">
                        <Image
                          src={hoveredWriter.image}
                          alt={hoveredWriter.name}
                          fill
                          sizes="360px"
                          className="object-cover object-top"
                        />
                      </div>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A] block font-semibold">
                        {t('АУТЕНТИЧНИ ПОРТРЕТ')}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#14213D]/15 mt-3">
                    <h3 className="font-serif text-2xl font-bold text-[#14213D] leading-tight">
                      {t(hoveredWriter.name)}
                    </h3>
                    <p className="font-serif text-sm text-[#B3202A] tabular-nums mt-0.5 font-semibold">
                      {hoveredWriter.birthYear}–{hoveredWriter.deathYear}
                    </p>
                    <p className="font-sans text-xs text-[#5C677D] mt-1.5">
                      {t(hoveredWriter.birthPlace)}
                    </p>
                    <Link
                      href={`/pisci/${hoveredWriter.slug}`}
                      className="inline-block mt-3 text-xs font-sans tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] link-draw font-semibold"
                    >
                      {t('Отвори досије')} →
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="relative aspect-[16/10] w-full bg-[#14213D]/5 border border-[#14213D]/10 overflow-hidden mb-3">
                    <Image
                      src="/images/trebinje.jpg"
                      alt="Требиње"
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A] block font-semibold">
                    {t('ЗАВИЧАЈНА ТОПОГРАФИЈА')}
                  </span>
                  <p className="font-serif text-sm font-bold text-[#14213D] leading-snug mt-1">
                    {t('Херцеговачка Грачаница и поглед на Црквину')}
                  </p>
                  <p className="font-sans text-[11px] text-[#5C677D] mt-2 border-t border-[#14213D]/10 pt-2">
                    {t('Пређите курсором преко било ког писца у листи за приказ завичајне фотографије и портрета.')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

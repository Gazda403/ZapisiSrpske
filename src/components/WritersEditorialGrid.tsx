'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface WritersEditorialGridProps {
  writers: Writer[];
}

export default function WritersEditorialGrid({ writers }: WritersEditorialGridProps) {
  const { t } = useScript();

  const andric = writers.find((w) => w.slug === 'ivo-andric');
  const ducic = writers.find((w) => w.slug === 'jovan-ducic');
  const kocic = writers.find((w) => w.slug === 'petar-kocic');
  const copic = writers.find((w) => w.slug === 'branko-copic');
  const santic = writers.find((w) => w.slug === 'aleksa-santic');
  const visnjic = writers.find((w) => w.slug === 'filip-visnjic');
  const kapor = writers.find((w) => w.slug === 'momo-kapor');
  const pelagic = writers.find((w) => w.slug === 'vaso-pelagic');

  // Одабрани остали писци за асиметрични приказ
  const secondaryWriters = [
    ducic,
    kocic,
    copic,
    santic,
    visnjic,
    kapor,
    pelagic,
  ].filter((w): w is Writer => Boolean(w));

  return (
    <section className="py-24 sm:py-32 bg-[#FBFAF7] border-b border-[#14213D]/15" aria-labelledby="grid-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Big Type & Hairline Separation (No box!) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#14213D]/15">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              § 02 • {t('Књижевна галерија')}
            </span>
            <h2 id="grid-heading" className="font-serif text-4xl sm:text-6xl font-bold text-[#14213D] leading-tight">
              {t('Писани траг вијекова')}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="font-body text-base text-[#5C677D] max-w-md">
              {t('Асиметрични преглед канонских аутора. Пређите курсором за откривање родних мјеста и пуни тонски контраст.')}
            </p>
            <Link
              href="/pisci"
              className="inline-block mt-3 font-sans text-xs uppercase tracking-widest text-[#B3202A] font-semibold link-draw"
            >
              {t('Погледај свих 15 аутора')} ({writers.length}) →
            </Link>
          </div>
        </div>

        {/* Row 1: 60% Oversized Featured Writer (Ivo Andrić) beside 40% Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16 pb-16 border-b border-[#14213D]/15">
          {/* 60% (7 Columns): Oversized Writer (Иво Андрић) */}
          {andric && (
            <div className="lg:col-span-7 group">
              <Link href={`/pisci/${andric.slug}`} className="block focus-visible:outline-none">
                {/* Tall Portrait with Flat Navy Duotone that turns to Full Tonal Contrast on Hover */}
                <div className="relative aspect-[4/5] w-full border border-[#14213D]/25 duotone-box mb-6">
                  <Image
                    src={andric.image}
                    alt={andric.name}
                    fill
                    className="object-contain p-4 duotone-img"
                    priority
                  />
                  <div className="duotone-layer" />

                  {/* Corner Accent Marks */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#B3202A]" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#B3202A]" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#B3202A]" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#B3202A]" />
                </div>

                {/* Writer Info: Big Type & Red Tabular Numerals */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#14213D]/10 pb-3">
                  <div>
                    <span className="font-sans text-xs uppercase tracking-widest text-[#B3202A] font-semibold block mb-1">
                      {t('Нобелов лауреат 1961.')}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                      {t(andric.name)}
                    </h3>
                  </div>
                  <span className="font-sans text-2xl font-bold text-[#B3202A] tabular-nums">
                    {andric.birthYear}–{andric.deathYear}
                  </span>
                </div>

                {/* Birthplace Appears on Hover */}
                <div className="pt-3 flex justify-between items-center text-sm font-sans">
                  <span className="text-[#5C677D] group-hover:text-[#14213D] transition-colors">
                    {t('Родно мјесто:')} <strong className="text-[#14213D]">{t(andric.birthPlace)}</strong>
                  </span>
                  <span className="text-[#B3202A] font-semibold link-draw">
                    {t('Отвори биографију')} →
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* 40% (5 Columns): Stacked Asymmetrical Editorial Tiles (Dučić & Kočić) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            {ducic && (
              <div className="group border-b border-[#14213D]/15 pb-8">
                <Link href={`/pisci/${ducic.slug}`} className="block focus-visible:outline-none">
                  <div className="relative aspect-[16/10] w-full border border-[#14213D]/25 duotone-box mb-4">
                    <Image
                      src={ducic.image}
                      alt={ducic.name}
                      fill
                      className="object-contain p-3 duotone-img"
                    />
                    <div className="duotone-layer" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                      {t(ducic.name)}
                    </h3>
                    <span className="font-sans text-lg font-bold text-[#B3202A] tabular-nums">
                      {ducic.birthYear}–{ducic.deathYear}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#5C677D] mt-1 group-hover:text-[#14213D] transition-colors">
                    {t('Завичај:')} {t(ducic.birthPlace)}
                  </p>
                </Link>
              </div>
            )}

            {kocic && (
              <div className="group">
                <Link href={`/pisci/${kocic.slug}`} className="block focus-visible:outline-none">
                  <div className="relative aspect-[16/10] w-full border border-[#14213D]/25 duotone-box mb-4">
                    <Image
                      src={kocic.image}
                      alt={kocic.name}
                      fill
                      className="object-contain p-3 duotone-img"
                    />
                    <div className="duotone-layer" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                      {t(kocic.name)}
                    </h3>
                    <span className="font-sans text-lg font-bold text-[#B3202A] tabular-nums">
                      {kocic.birthYear}–{kocic.deathYear}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#5C677D] mt-1 group-hover:text-[#14213D] transition-colors">
                    {t('Завичај:')} {t(kocic.birthPlace)}
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Varied Multi-Column Tiles (Ćopić, Šantić, Višnjić) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Tile 1: Ćopić (5 columns) */}
          {copic && (
            <div className="md:col-span-5 group">
              <Link href={`/pisci/${copic.slug}`} className="block focus-visible:outline-none">
                <div className="relative aspect-[4/3] w-full border border-[#14213D]/25 duotone-box mb-4">
                  <Image
                    src={copic.image}
                    alt={copic.name}
                    fill
                    className="object-contain p-3 duotone-img"
                  />
                  <div className="duotone-layer" />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                    {t(copic.name)}
                  </h3>
                  <span className="font-sans text-base font-bold text-[#B3202A] tabular-nums">
                    {copic.birthYear}–{copic.deathYear}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#5C677D] mt-1 group-hover:text-[#14213D] transition-colors">
                  {t('Родно мјесто:')} {t(copic.birthPlace)}
                </p>
              </Link>
            </div>
          )}

          {/* Tile 2: Šantić (4 columns) */}
          {santic && (
            <div className="md:col-span-4 group">
              <Link href={`/pisci/${santic.slug}`} className="block focus-visible:outline-none">
                <div className="relative aspect-[4/3] w-full border border-[#14213D]/25 duotone-box mb-4">
                  <Image
                    src={santic.image}
                    alt={santic.name}
                    fill
                    className="object-contain p-3 duotone-img"
                  />
                  <div className="duotone-layer" />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-2xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                    {t(santic.name)}
                  </h3>
                  <span className="font-sans text-base font-bold text-[#B3202A] tabular-nums">
                    {santic.birthYear}–{santic.deathYear}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#5C677D] mt-1 group-hover:text-[#14213D] transition-colors">
                  {t('Завичај:')} {t(santic.birthPlace)}
                </p>
              </Link>
            </div>
          )}

          {/* Tile 3: Višnjić (3 columns) */}
          {visnjic && (
            <div className="md:col-span-3 group">
              <Link href={`/pisci/${visnjic.slug}`} className="block focus-visible:outline-none">
                <div className="relative aspect-[4/3] w-full border border-[#14213D]/25 duotone-box mb-4">
                  <Image
                    src={visnjic.image}
                    alt={visnjic.name}
                    fill
                    className="object-contain p-3 duotone-img"
                  />
                  <div className="duotone-layer" />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors">
                    {t(visnjic.name)}
                  </h3>
                  <span className="font-sans text-base font-bold text-[#B3202A] tabular-nums">
                    {visnjic.birthYear}–{visnjic.deathYear}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#5C677D] mt-1 group-hover:text-[#14213D] transition-colors">
                  {t('Завичај:')} {t(visnjic.birthPlace)}
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


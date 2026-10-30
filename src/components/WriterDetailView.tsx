'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';
import { getWriterPlacePhoto } from '@/lib/places';

interface WriterDetailViewProps {
  writer: Writer;
  prevWriter: Writer | null;
  nextWriter: Writer | null;
}

export default function WriterDetailView({
  writer,
  prevWriter,
  nextWriter,
}: WriterDetailViewProps) {
  const { t } = useScript();
  const placePhoto = getWriterPlacePhoto(writer.slug);
  const verifiedQuote =
    writer.quotes && Array.isArray(writer.quotes) && writer.quotes.length > 0 && writer.quotes[0].text.trim() !== ''
      ? writer.quotes[0]
      : null;

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: writer.name,
    birthDate: String(writer.birthYear),
    deathDate: String(writer.deathYear),
    birthPlace: {
      '@type': 'Place',
      name: writer.birthPlace,
    },
    description: writer.bio,
    image: `https://zapisi-srpske.rs${writer.image}`,
  };

  return (
    <article className="w-full bg-[#FBFAF7] pb-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* 1. Full-bleed place photo hero with author name at 10vw overlapping it */}
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#14213D] flex flex-col justify-between">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={placePhoto.image}
            alt={placePhoto.placeName}
            fill
            priority
            sizes="100vw"
            className="object-cover editorial-photo"
          />
          {/* Thin flat navy overlay at 25% opacity for text legibility */}
          <div className="absolute inset-0 bg-[#14213D] opacity-25 pointer-events-none" />
        </div>

        {/* Top breadcrumbs & period badge */}
        <div className="relative z-10 w-full pt-6 sm:pt-8 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto flex items-center justify-between text-xs font-sans tracking-widest uppercase text-[#FBFAF7]/90">
          <nav aria-label="Путања до странице" className="flex items-center space-x-2">
            <Link href="/" className="hover:text-[#B3202A] transition-colors link-draw">
              {t('Почетна')}
            </Link>
            <span>/</span>
            <Link href="/pisci" className="hover:text-[#B3202A] transition-colors link-draw">
              {t('Писци')}
            </Link>
            <span>/</span>
            <span className="text-[#FBFAF7] font-semibold">{t(writer.name)}</span>
          </nav>
          <span className="hidden sm:inline font-mono">{t(writer.period)}</span>
        </div>

        {/* Bottom Hero: Huge name at 10vw overlapping image */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto pb-8 sm:pb-14">
          <div className="flex items-center space-x-3 mb-2 sm:mb-3">
            <span className="w-2 h-2 bg-[#B3202A]" />
            <span className="font-serif text-lg sm:text-2xl text-[#B3202A] tabular-nums font-semibold">
              {writer.birthYear}–{writer.deathYear}
            </span>
          </div>

          <h1 className="font-serif font-bold text-[#FBFAF7] leading-[0.9] tracking-tight text-4xl sm:text-[9vw] lg:text-[8.5vw] mb-3 sm:mb-4 break-words">
            {t(writer.name)}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-[#FBFAF7]/20 text-xs font-sans text-[#FBFAF7]/85">
            <p>
              <span className="text-[#FBFAF7]/60">{t('Завичајно окружење:')}</span>{' '}
              <span className="text-[#FBFAF7] font-medium">{t(placePhoto.placeName)}</span>
            </p>
            <p className="font-sans text-[11px] text-[#FBFAF7]/70">
              {t(placePhoto.credit)}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Layout: Offset Refined Portrait Frame + 680px Biography Column */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Portrait in a refined hairline frame offset to the side */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="border border-[#14213D]/25 bg-[#FBFAF7] p-3">
              <div className="relative aspect-[3/4] w-full bg-[#14213D]/5 border border-[#14213D]/10 overflow-hidden">
                <Image
                  src={writer.image}
                  alt={`Портрет: ${writer.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover object-top"
                />
              </div>

              {/* Portrait metadata */}
              <div className="pt-4 px-1 pb-1 text-xs font-sans text-[#5C677D] border-t border-[#14213D]/10 mt-3">
                <div className="flex justify-between">
                  <span>{t('Извор:')}</span>
                  <span className="text-[#14213D]">{t(writer.imageCredit)}</span>
                </div>
              </div>
            </div>

            {/* Quick Archival Meta */}
            <div className="mt-8 border-t border-[#14213D]/15 pt-6 text-xs font-sans space-y-3">
              <div className="flex justify-between">
                <span className="text-[#5C677D] uppercase tracking-wider">{t('Епоха:')}</span>
                <span className="text-[#14213D] font-medium">{t(writer.period)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C677D] uppercase tracking-wider">{t('Евидентирано дјела:')}</span>
                <span className="text-[#14213D] font-semibold tabular-nums font-mono">{writer.works.length}</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Biography in a single 680px column at 20px */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="max-w-[680px]">
              {/* Section Header */}
              <div className="border-b border-[#14213D]/15 pb-4 mb-8">
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-2 font-semibold">
                  § {t('БИОГРАФСКИ ПРЕГЛЕД')}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D]">
                  {t('Живот и књижевна судбина')}
                </h2>
              </div>

              {/* 20px reading typography */}
              <div className="font-body text-[19px] sm:text-[20px] text-[#14213D] leading-[1.75] space-y-6">
                <p>{t(writer.bio)}</p>
              </div>

              {/* Verified Quote Section ONLY IF verified */}
              {verifiedQuote && (
                <div className="my-16 border-l-2 border-[#B3202A] pl-8 py-3">
                  <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#14213D] leading-snug mb-3">
                    „{t(verifiedQuote.text)}“
                  </blockquote>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#B3202A] font-semibold">
                    {t(writer.name)} · {t(verifiedQuote.work)} ({verifiedQuote.year})
                  </p>
                </div>
              )}

              {/* Works Section as a clean list with years */}
              <div className="mt-20 pt-10 border-t border-[#14213D]/15">
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] font-semibold">
                    § {t('ИЗАБРАНА БИБЛИОГРАФИЈА')}
                  </span>
                  <span className="font-mono text-xs text-[#5C677D] tabular-nums">
                    {writer.works.length} {t('јединица')}
                  </span>
                </div>

                <div className="divide-y divide-[#14213D]/15 border-b border-[#14213D]/15">
                  {writer.works.map((work, idx) => (
                    <div
                      key={work.title}
                      className="py-4 flex items-baseline justify-between gap-4 group"
                    >
                      <div className="flex items-baseline space-x-4">
                        <span className="font-mono text-xs text-[#5C677D] tabular-nums">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}.
                        </span>
                        <span className="font-serif text-lg sm:text-xl font-medium text-[#14213D]">
                          „{t(work.title)}“
                        </span>
                      </div>
                      <div>
                        {work.year ? (
                          <span className="font-serif text-sm sm:text-base text-[#B3202A] tabular-nums font-semibold">
                            {work.year}.
                          </span>
                        ) : (
                          <span className="font-sans text-xs text-[#5C677D] italic">
                            {t('недатирано')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Sources & Literature */}
              <div className="mt-16 pt-8 border-t border-[#14213D]/15 text-xs font-sans text-[#5C677D]">
                <p className="font-semibold text-[#14213D] uppercase tracking-wider mb-3">
                  {t('ИЗВОРИ И СТРУЧНА ЛИТЕРАТУРА:')}
                </p>
                <ul className="space-y-1.5 list-disc list-inside">
                  {writer.sources.map((src, i) => (
                    <li key={i}>{t(src)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Previous / Next Writer Navigation (Huge Type Links at 3xl-5xl) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mt-24 sm:mt-32 pt-12 sm:pt-16 border-t border-[#14213D]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {prevWriter ? (
            <Link
              href={`/pisci/${prevWriter.slug}`}
              className="group flex flex-col p-6 sm:p-10 border border-[#14213D]/15 hover:border-[#B3202A] transition-colors focus-visible:outline-none"
            >
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#5C677D] group-hover:text-[#B3202A] mb-3 transition-colors">
                ← {t('ПРЕТХОДНИ АУТОР')}
              </span>
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors leading-tight">
                {t(prevWriter.name)}
              </span>
              <span className="font-serif text-sm text-[#B3202A] tabular-nums mt-2">
                {prevWriter.birthYear}–{prevWriter.deathYear} · {t(prevWriter.birthPlace)}
              </span>
            </Link>
          ) : <div />}

          {nextWriter ? (
            <Link
              href={`/pisci/${nextWriter.slug}`}
              className="group flex flex-col p-6 sm:p-10 border border-[#14213D]/15 hover:border-[#B3202A] transition-colors text-left md:text-right focus-visible:outline-none"
            >
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#5C677D] group-hover:text-[#B3202A] mb-3 transition-colors">
                {t('СЉЕДЕЋИ АУТОР')} →
              </span>
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors leading-tight">
                {t(nextWriter.name)}
              </span>
              <span className="font-serif text-sm text-[#B3202A] tabular-nums mt-2">
                {nextWriter.birthYear}–{nextWriter.deathYear} · {t(nextWriter.birthPlace)}
              </span>
            </Link>
          ) : <div />}
        </div>
      </section>
    </article>
  );
}

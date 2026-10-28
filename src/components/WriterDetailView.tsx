'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const pageRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Slow translate/mask reveal on portrait and content
      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power2.out',
        });
      }

      gsap.from('.reveal-item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, pageRef);

    return () => ctx.revert();
  }, [writer.slug]);

  // Schema.org Person JSON-LD
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
    <div ref={pageRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Top Breadcrumb & Metadata strip */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#14213D]/15 pb-4 mb-10 text-xs font-sans text-[#5C677D] gap-3">
        <div className="flex items-center space-x-2">
          <Link href="/pisci" className="hover:text-[#B3202A] link-draw">
            {t('Писци')}
          </Link>
          <span>/</span>
          <span className="text-[#14213D] font-medium">{t(writer.period)}</span>
          <span>/</span>
          <span className="text-[#B3202A] font-semibold">{t(writer.name)}</span>
        </div>

        <div className="flex items-center space-x-3 tabular-nums">
          <span>{t('Биографски досије')} № {writer.birthYear}</span>
          <span>•</span>
          <span className="text-[#B3202A] font-semibold">
            {writer.verified ? t('Провјерена грађа') : t('У ревизији')}
          </span>
        </div>
      </div>

      {/* Asymmetric Editorial Grid (5/7 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (5 columns): Portrait, Metadata Card, Credit Line */}
        <div className="lg:col-span-5">
          {/* Portrait in refined hairline frame */}
          <div
            ref={portraitRef}
            className="border border-[#14213D]/25 bg-[#F4F1EA] p-4 sm:p-6 relative group"
          >
            <div className="relative aspect-[3/4] border border-[#14213D]/20 bg-[#FBFAF7] overflow-hidden mb-4">
              <Image
                src={writer.image}
                alt={`Портрет: ${writer.name}`}
                fill
                priority
                className="object-contain p-2"
              />
            </div>

            {/* Credit Line & License (Rule 7 Requirement) */}
            <div className="border-t border-[#14213D]/15 pt-3 space-y-1 text-xs font-sans text-[#5C677D]">
              <div className="flex justify-between">
                <span>{t('Извор портрета:')}</span>
                <span className="text-[#14213D] text-right max-w-[240px]">
                  {t(writer.imageCredit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t('Лиценца:')}</span>
                <span className="text-[#B3202A] font-semibold">
                  {t(writer.imageLicense)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Fact Sheet Box */}
          <div className="border border-[#14213D]/15 bg-[#FBFAF7] p-6 mt-6 space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] font-semibold">
              {t('Основни подаци о аутору')}
            </h3>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-between pb-2 border-b border-[#14213D]/10">
                <span className="text-[#5C677D]">{t('Рођење:')}</span>
                <span className="text-[#14213D] font-semibold tabular-nums text-right">
                  {writer.birthYear}. {t('године')}, {t(writer.birthPlace)}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-[#14213D]/10">
                <span className="text-[#5C677D]">{t('Смрт:')}</span>
                <span className="text-[#14213D] font-semibold tabular-nums text-right">
                  {writer.deathYear}. {t('године')}
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-[#14213D]/10">
                <span className="text-[#5C677D]">{t('Књижевна епоха:')}</span>
                <span className="text-[#14213D] font-semibold text-right">
                  {t(writer.period)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#5C677D]">{t('Евидентирано дјела:')}</span>
                <span className="text-[#B3202A] font-bold tabular-nums">
                  {writer.works.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 columns): Name, Bio, Works, Quotes, Sources */}
        <div className="lg:col-span-7 space-y-10">
          {/* Header Block */}
          <div className="reveal-item border-b border-[#14213D]/15 pb-8">
            <div className="flex items-center space-x-3 mb-2">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] font-semibold">
                {t(writer.period)}
              </span>
              <span>•</span>
              <span className="font-sans text-xs text-[#5C677D] tabular-nums">
                {writer.birthYear}–{writer.deathYear}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#14213D] leading-tight mb-4">
              {t(writer.name)}
            </h1>

            <p className="font-sans text-sm text-[#5C677D] tracking-wide">
              {t('Завичајно поријекло:')} <span className="text-[#14213D] font-medium">{t(writer.birthPlace)}</span>
            </p>
          </div>

          {/* Biography (3-5 verified sentences) */}
          <div className="reveal-item">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] mb-4 font-semibold">
              § {t('Биографски преглед')}
            </h2>
            <p className="font-body text-lg text-[#14213D] leading-relaxed">
              {t(writer.bio)}
            </p>
          </div>

          {/* Pull-quote block (Layout looks good with or without quote) */}
          {writer.quotes && writer.quotes.length > 0 ? (
            <div className="reveal-item border-l-2 border-[#B3202A] pl-6 py-3 my-8 bg-[#F4F1EA]/60">
              {writer.quotes.map((q, idx) => (
                <div key={idx} className="space-y-2">
                  <blockquote className="font-serif text-xl sm:text-2xl text-[#14213D] italic leading-snug">
                    „{t(q.text)}“
                  </blockquote>
                  <cite className="font-sans text-xs text-[#5C677D] block not-italic tabular-nums">
                    — {t(q.work)} ({q.year})
                  </cite>
                </div>
              ))}
            </div>
          ) : (
            <div className="reveal-item border border-dashed border-[#14213D]/20 p-4 bg-[#FBFAF7] text-xs font-sans text-[#5C677D]">
              <span className="text-[#B3202A] font-semibold mr-2">[ Цитатни фонд ]</span>
              {t('Унос аутентичних цитата из дјела за овог аутора је у припреми и биће накнадно верификован.')}
            </div>
          )}

          {/* List of Works with Publication Years */}
          <div className="reveal-item">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] mb-4 font-semibold">
              § {t('Изабрана књижевна библиографија')}
            </h2>

            <div className="border border-[#14213D]/20 bg-[#FBFAF7] divide-y divide-[#14213D]/10">
              {writer.works.map((work, idx) => (
                <div
                  key={work.title}
                  className="p-4 flex items-baseline justify-between hover:bg-[#F4F1EA] transition-colors"
                >
                  <div className="flex items-baseline space-x-3">
                    <span className="font-mono text-xs text-[#5C677D]">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="font-serif text-base sm:text-lg font-semibold text-[#14213D]">
                      „{t(work.title)}“
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[#5C677D] tabular-nums font-medium">
                    {work.year ? `${work.year}.` : t('Недатирано')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sources Section (Rule Requirement) */}
          <div className="reveal-item pt-4 border-t border-[#14213D]/15">
            <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-[#5C677D] mb-3">
              {t('Извори и стручна литература')}
            </h3>
            <ul className="space-y-1.5 font-body text-xs text-[#5C677D] list-disc list-inside">
              {writer.sources.map((src, i) => (
                <li key={i}>{t(src)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Previous / Next Writer Navigation with Large Hover Preview (Rule 10 Requirement) */}
      <div className="mt-20 pt-10 border-t border-[#14213D]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Previous Writer Link */}
          {prevWriter ? (
            <Link
              href={`/pisci/${prevWriter.slug}`}
              onMouseEnter={() => setHoveredNav(prevWriter.slug)}
              onMouseLeave={() => setHoveredNav(null)}
              className="group border border-[#14213D]/20 p-6 bg-[#FBFAF7] hover:bg-[#F4F1EA] hover:border-[#B3202A] transition-all duration-200 focus-visible:outline-none"
            >
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#5C677D] block mb-2">
                ← {t('Претходни аутор')}
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors block">
                {t(prevWriter.name)}
              </span>
              <span className="font-sans text-xs text-[#5C677D] block mt-1 tabular-nums">
                {prevWriter.birthYear}–{prevWriter.deathYear} • {t(prevWriter.birthPlace)}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next Writer Link */}
          {nextWriter ? (
            <Link
              href={`/pisci/${nextWriter.slug}`}
              onMouseEnter={() => setHoveredNav(nextWriter.slug)}
              onMouseLeave={() => setHoveredNav(null)}
              className="group border border-[#14213D]/20 p-6 bg-[#FBFAF7] hover:bg-[#F4F1EA] hover:border-[#B3202A] transition-all duration-200 text-left md:text-right focus-visible:outline-none"
            >
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#5C677D] block mb-2">
                {t('Сљедећи аутор')} →
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#14213D] group-hover:text-[#B3202A] transition-colors block">
                {t(nextWriter.name)}
              </span>
              <span className="font-sans text-xs text-[#5C677D] block mt-1 tabular-nums">
                {nextWriter.birthYear}–{nextWriter.deathYear} • {t(nextWriter.birthPlace)}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

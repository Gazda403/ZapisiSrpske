'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface FeaturedWritersSectionProps {
  writers: Writer[];
}

export default function FeaturedWritersSection({ writers }: FeaturedWritersSectionProps) {
  const { t } = useScript();

  const andric = writers.find((w) => w.slug === 'ivo-andric');
  const ducic = writers.find((w) => w.slug === 'jovan-ducic');
  const kocic = writers.find((w) => w.slug === 'petar-kocic');
  const copic = writers.find((w) => w.slug === 'branko-copic');

  return (
    <section className="py-20 bg-[#FBFAF7]" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[#14213D]/15 pb-6">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] block mb-2">
              § 01 • {t('Темељни аутори')}
            </span>
            <h2 id="featured-heading" className="font-serif text-3xl sm:text-4xl text-[#14213D]">
              {t('Четири стожера књижевног насљеђа')}
            </h2>
          </div>
          <p className="font-body text-sm text-[#5C677D] mt-3 md:mt-0 max-w-md">
            {t('Издвојени канонски писци чија су дјела обиљежила европску и српску књижевност 20. вијека.')}
          </p>
        </div>

        {/* Asymmetric 7 / 5 Editorial Grid (Rule 11: No uniform sizing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 7 Columns: Oversized Featured Writer (Иво Андрић) */}
          {andric && (
            <div className="lg:col-span-7 border border-[#14213D]/25 bg-[#F4F1EA] p-8 sm:p-10 flex flex-col justify-between group">
              <div>
                <div className="flex flex-wrap items-center justify-between border-b border-[#14213D]/15 pb-4 mb-6 gap-2">
                  <span className="font-sans text-xs uppercase tracking-widest text-[#B3202A] font-semibold">
                    {t('Нобелова награда за књижевност 1961.')}
                  </span>
                  <span className="font-sans text-sm tabular-nums text-[#5C677D] group-hover:text-[#B3202A] transition-colors">
                    {andric.birthYear}–{andric.deathYear}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start mb-6">
                  {/* Portrait Placeholder in hairline frame */}
                  <div className="sm:col-span-5 relative aspect-[3/4] border border-[#14213D]/20 overflow-hidden bg-[#FBFAF7]">
                    <Image
                      src={andric.image}
                      alt={`Портретни фонд: ${andric.name}`}
                      fill
                      className="object-contain p-2"
                      priority
                    />
                  </div>

                  <div className="sm:col-span-7 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] leading-tight mb-2">
                        {t(andric.name)}
                      </h3>
                      <p className="font-sans text-xs tracking-wider uppercase text-[#5C677D] mb-4">
                        {t(andric.birthPlace)}
                      </p>
                      <p className="font-body text-sm text-[#14213D] leading-relaxed mb-4">
                        {t(andric.bio)}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#14213D]/10">
                      <span className="font-sans text-[11px] uppercase tracking-wider text-[#5C677D] block mb-2">
                        {t('Кључна дјела у архиву:')}
                      </span>
                      <ul className="space-y-1 font-body text-xs text-[#14213D]">
                        {andric.works.slice(0, 4).map((work) => (
                          <li key={work.title} className="flex justify-between">
                            <span>„{t(work.title)}“</span>
                            <span className="tabular-nums text-[#5C677D]">{work.year}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#14213D]/15 flex items-center justify-between">
                <span className="font-sans text-xs text-[#5C677D]">
                  {t('Извор: Задужбина Иве Андрића, Београд')}
                </span>
                <Link
                  href={`/pisci/${andric.slug}`}
                  className="font-sans text-xs uppercase tracking-widest text-[#B3202A] font-semibold link-draw py-1"
                >
                  {t('Детаљан биографски досије')} →
                </Link>
              </div>
            </div>
          )}

          {/* 5 Columns: Stacked Asymmetric Writers (Јован Дучић, Петар Кочић, Бранко Ћопић) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Dučić (Large secondary) */}
            {ducic && (
              <div className="border border-[#14213D]/25 bg-[#FBFAF7] p-6 group hover:border-[#14213D] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A]">
                    {t(ducic.period)}
                  </span>
                  <span className="font-sans text-xs tabular-nums text-[#5C677D] group-hover:text-[#B3202A] transition-colors">
                    {ducic.birthYear}–{ducic.deathYear}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#14213D] mb-1">
                  {t(ducic.name)}
                </h4>
                <p className="font-sans text-xs text-[#5C677D] mb-3">
                  {t(ducic.birthPlace)}
                </p>
                <p className="font-body text-xs text-[#14213D] line-clamp-3 mb-3 leading-relaxed">
                  {t(ducic.bio)}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-[#14213D]/10">
                  <span className="font-body text-xs italic text-[#5C677D]">
                    „{t('Благо цара Радована')}“ (1932)
                  </span>
                  <Link
                    href={`/pisci/${ducic.slug}`}
                    className="font-sans text-xs text-[#14213D] group-hover:text-[#B3202A] link-draw"
                  >
                    {t('Преглед')} →
                  </Link>
                </div>
              </div>
            )}

            {/* Kočić (Medium) */}
            {kocic && (
              <div className="border border-[#14213D]/25 bg-[#FBFAF7] p-6 group hover:border-[#14213D] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A]">
                    {t(kocic.period)}
                  </span>
                  <span className="font-sans text-xs tabular-nums text-[#5C677D] group-hover:text-[#B3202A] transition-colors">
                    {kocic.birthYear}–{kocic.deathYear}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#14213D] mb-1">
                  {t(kocic.name)}
                </h4>
                <p className="font-sans text-xs text-[#5C677D] mb-2">
                  {t(kocic.birthPlace)}
                </p>
                <p className="font-body text-xs text-[#14213D] line-clamp-2 mb-3 leading-relaxed">
                  {t(kocic.bio)}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-[#14213D]/10">
                  <span className="font-body text-xs italic text-[#5C677D]">
                    „{t('Јазавац пред судом')}“ (1904)
                  </span>
                  <Link
                    href={`/pisci/${kocic.slug}`}
                    className="font-sans text-xs text-[#14213D] group-hover:text-[#B3202A] link-draw"
                  >
                    {t('Преглед')} →
                  </Link>
                </div>
              </div>
            )}

            {/* Ćopić (Medium) */}
            {copic && (
              <div className="border border-[#14213D]/25 bg-[#FBFAF7] p-6 group hover:border-[#14213D] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#B3202A]">
                    {t(copic.period)}
                  </span>
                  <span className="font-sans text-xs tabular-nums text-[#5C677D] group-hover:text-[#B3202A] transition-colors">
                    {copic.birthYear}–{copic.deathYear}
                  </span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#14213D] mb-1">
                  {t(copic.name)}
                </h4>
                <p className="font-sans text-xs text-[#5C677D] mb-2">
                  {t(copic.birthPlace)}
                </p>
                <p className="font-body text-xs text-[#14213D] line-clamp-2 mb-3 leading-relaxed">
                  {t(copic.bio)}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-[#14213D]/10">
                  <span className="font-body text-xs italic text-[#5C677D]">
                    „{t('Башта сљезове боје')}“ (1970)
                  </span>
                  <Link
                    href={`/pisci/${copic.slug}`}
                    className="font-sans text-xs text-[#14213D] group-hover:text-[#B3202A] link-draw"
                  >
                    {t('Преглед')} →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

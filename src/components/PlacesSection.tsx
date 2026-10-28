'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PLACES_DATA } from '@/lib/places';
import { useScript } from '@/context/ScriptContext';

export default function PlacesSection() {
  const { t } = useScript();

  return (
    <section id="zavicaji" className="py-24 sm:py-36 bg-[#FBFAF7] border-b border-[#14213D]/15" aria-labelledby="places-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-20 border-b border-[#14213D]/15">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
              § 05 • {t('Завичајна топографија')}
            </span>
            <h2 id="places-heading" className="font-serif text-5xl sm:text-7xl font-bold text-[#14213D] leading-tight">
              {t('Завичаји')}
            </h2>
          </div>
          <p className="font-body text-lg text-[#5C677D] mt-4 md:mt-0 max-w-lg leading-relaxed">
            {t('Пет кључних географских тачака које су суштински одредиле језик, мотиве и свјетоназор канонских писаца овог архива.')}
          </p>
        </div>

        {/* 5 Real Place Photographic Editorial Features (Alternating Layouts, No Boxes) */}
        <div className="space-y-24 sm:space-y-36">
          {PLACES_DATA.map((place, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={place.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center group"
              >
                {/* Photo Column (7 columns) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full border border-[#14213D]/25 duotone-box overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover duotone-img"
                    />
                    <div className="duotone-layer" />
                  </div>

                  {/* Explicit Credit & License Line Under Image (Image Rule Requirement) */}
                  <div className="flex justify-between items-center text-xs font-sans text-[#5C677D] pt-3 border-t border-[#14213D]/10 mt-2">
                    <span>{t(place.credit)}</span>
                    <span className="font-mono text-[11px] text-[#14213D] font-medium">{place.license}</span>
                  </div>
                </div>

                {/* Caption Typography Column (5 columns) */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3 text-xs font-sans">
                    <span className="font-mono text-[#5C677D]">0{idx + 1}.</span>
                    <span className="uppercase tracking-widest text-[#B3202A] font-semibold">
                      {t(place.region)}
                    </span>
                  </div>

                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#14213D] leading-tight mb-2">
                    {t(place.name)}
                  </h3>

                  <div className="mb-6">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#5C677D] block mb-1">
                      {t('Писац завичаја:')}
                    </span>
                    <Link
                      href={`/pisci/${place.writerSlug}`}
                      className="font-serif text-2xl font-bold text-[#B3202A] hover:underline"
                    >
                      {t(place.writer)}
                    </Link>
                  </div>

                  <p className="font-body text-lg text-[#14213D] leading-relaxed mb-6">
                    {t(place.caption)}
                  </p>

                  <div>
                    <Link
                      href={`/pisci/${place.writerSlug}`}
                      className="font-sans text-xs uppercase tracking-widest text-[#14213D] hover:text-[#B3202A] link-draw py-1 font-semibold"
                    >
                      {t('Отвори биографију аутора')} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


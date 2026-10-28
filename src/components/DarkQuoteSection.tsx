'use client';

import React from 'react';
import { useScript } from '@/context/ScriptContext';

export default function DarkQuoteSection() {
  const { t } = useScript();

  return (
    <section
      className="w-full bg-[#14213D] text-[#FBFAF7] py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-b border-[#14213D]"
      aria-label="Цитатни фонд"
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Label */}
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#FBFAF7]/60 block mb-6 font-semibold">
          § 03 • {t('ЦИТАТНИ ФОНД')}
        </span>

        {/* Large Decorative Quote Mark in Cormorant */}
        <div className="font-serif text-7xl sm:text-9xl text-[#FBFAF7]/20 select-none leading-none -mb-8">
          „
        </div>

        {/* Clearly Marked [Quote Pending] Block (Rule 4 Requirement) */}
        <div className="border border-dashed border-[#FBFAF7]/25 p-8 sm:p-14 max-w-4xl mx-auto relative bg-[#14213D]">
          <span className="font-mono text-xs uppercase tracking-widest text-[#B3202A] block mb-6 font-semibold">
            [ {t('АРХИВСКИ ЦИТАТ У ПРИПРЕМИ')} • QUOTE PENDING ]
          </span>

          <blockquote className="font-serif text-2xl sm:text-4xl text-[#FBFAF7] italic leading-relaxed mb-8">
            {t('[Аутентични цитати из књижевних дјела биће унесени након финалне стручне верификације примарних издања и рукописа]')}
          </blockquote>

          {/* Red used ONLY for author name and year per rule */}
          <div className="pt-6 border-t border-[#FBFAF7]/15 inline-flex items-baseline space-x-3">
            <cite className="font-serif text-xl sm:text-2xl font-bold text-[#B3202A] not-italic">
              {t('Иво Андрић')}
            </cite>
            <span className="font-sans text-base text-[#B3202A] tabular-nums font-semibold">
              1961.
            </span>
          </div>
        </div>

        <p className="font-sans text-xs text-[#FBFAF7]/60 mt-8 uppercase tracking-widest">
          {t('Сваки цитат у архиву мора бити праћен називом дјела и тачном годином првог издања')}
        </p>
      </div>
    </section>
  );
}


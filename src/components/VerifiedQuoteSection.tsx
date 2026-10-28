'use client';

import React from 'react';
import { Writer } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';

interface VerifiedQuoteSectionProps {
  writers: Writer[];
}

export default function VerifiedQuoteSection({ writers }: VerifiedQuoteSectionProps) {
  const { t } = useScript();

  // Find writers with verified quotes
  const writerWithQuote = writers.find(
    (w) => w.quotes && Array.isArray(w.quotes) && w.quotes.length > 0 && w.quotes[0].text.trim() !== ''
  );

  // Requirement: "If no verified quotes exist, remove the section entirely. No placeholders on the live page."
  if (!writerWithQuote || !writerWithQuote.quotes[0]) {
    return null;
  }

  const quote = writerWithQuote.quotes[0];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#14213D] py-32 px-6 sm:px-12 text-[#FBFAF7]">
      <div className="max-w-[1200px] mx-auto text-center">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-8 font-semibold">
          § 03 • {t('АУТЕНТИЧНИ КЊИЖЕВНИ ЗАПИС')}
        </span>
        <blockquote className="font-serif italic text-3xl sm:text-5xl lg:text-[5vw] leading-[1.2] text-[#FBFAF7] mb-10">
          „{t(quote.text)}“
        </blockquote>
        <div className="font-sans text-sm tracking-widest uppercase">
          <span className="text-[#B3202A] font-semibold text-base sm:text-lg block">
            {t(writerWithQuote.name)} ({quote.year})
          </span>
          <span className="text-[#FBFAF7]/70 text-xs mt-1 block">
            {t(quote.work)}
          </span>
        </div>
      </div>
    </section>
  );
}


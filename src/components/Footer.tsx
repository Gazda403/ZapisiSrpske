'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

interface FooterProps {
  totalWriters?: number;
  yearRange?: string;
}

export default function Footer({ totalWriters = 15, yearRange = '1767–2022' }: FooterProps) {
  const { t } = useScript();

  return (
    <footer className="border-t border-[#14213D]/20 bg-[#FBFAF7] pt-14 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ministry Funding Notice Strip */}
        <div className="p-6 sm:p-8 border border-[#14213D]/20 bg-[#F4F1EA] mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#B3202A] block mb-1">
              {t('Институционална подршка')}
            </span>
            <p className="font-serif text-base sm:text-lg text-[#14213D] leading-snug">
              {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије.')}
            </p>
          </div>
          <div className="flex-shrink-0">
            {/* Labeled empty placeholder box per rule */}
            <div className="border border-dashed border-[#14213D]/40 bg-[#FBFAF7] px-6 py-4 text-center">
              <span className="font-sans text-[10px] tracking-widest text-[#5C677D] uppercase block">
                {t('[ МЈЕСТО ЗА ЗВАНИЧНИ ЛОГОТИП ]')}
              </span>
              <span className="font-serif text-xs font-semibold text-[#14213D] tracking-wide block mt-1">
                {t('Министарство културе Републике Србије')}
              </span>
            </div>
          </div>
        </div>

        {/* Editorial catalogue footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#14213D]/15">
          {/* Col 1 */}
          <div className="md:col-span-2">
            <span className="font-serif text-2xl font-bold tracking-wider text-[#14213D] block mb-2">
              {t('ЗАПИСИ СРПСКЕ')}
            </span>
            <p className="font-sans text-xs tracking-widest uppercase text-[#5C677D] mb-4">
              {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
            </p>
            <p className="font-body text-sm text-[#5C677D] leading-relaxed max-w-md">
              {t('Систематизовани архив канонских књижевника из Републике Српске и Босне и Херцеговине.')}{' '}
              {t('Архив покрива књижевни континуитет у распону')} <span className="tabular-nums font-semibold text-[#14213D]">{yearRange}</span>.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-[#B3202A] mb-3">
              {t('Навигација')}
            </h3>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link href="/" className="text-[#14213D] hover:text-[#B3202A] link-draw">
                  {t('Почетна страна')}
                </Link>
              </li>
              <li>
                <Link href="/pisci" className="text-[#14213D] hover:text-[#B3202A] link-draw">
                  {t('Сви писци')} ({totalWriters})
                </Link>
              </li>
              <li>
                <Link href="/o-projektu" className="text-[#14213D] hover:text-[#B3202A] link-draw">
                  {t('О пројекту')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-[#B3202A] mb-3">
              {t('Подаци о архиву')}
            </h3>
            <div className="font-sans text-xs space-y-1.5 text-[#5C677D]">
              <p>
                {t('Евидентираних аутора:')} <span className="tabular-nums font-semibold text-[#14213D]">{totalWriters}</span>
              </p>
              <p>
                {t('Временски распон:')} <span className="tabular-nums font-semibold text-[#14213D]">{yearRange}</span>
              </p>
              <p>
                {t('Посљедње ажурирање:')} <span className="tabular-nums font-semibold text-[#14213D]">{t('октобар 2026.')}</span>
              </p>
              <p>
                {t('Формат грађе:')} <span className="font-semibold text-[#14213D]">{t('Биобиблиографски фонд')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C677D] font-sans">
          <p>
            © 2026 {t('ЗАПИСИ СРПСКЕ')}. {t('Сва права задржана.')}
          </p>
          <p className="mt-2 sm:mt-0">
            {t('Намијењено широкој јавности, младима и дијаспори.')}
          </p>
        </div>
      </div>
    </footer>
  );
}

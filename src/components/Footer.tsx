'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScript } from '@/context/ScriptContext';

interface FooterProps {
  totalWriters?: number;
  yearRange?: string;
}

export default function Footer({ totalWriters = 15, yearRange = '1767–2022' }: FooterProps) {
  const { t } = useScript();

  return (
    <footer className="border-t border-[#14213D]/20 bg-[#FBFAF7] pt-16 sm:pt-20 pb-14 sm:pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Ministry Funding Notice Strip (Shown ONCE at bottom per rule) */}
        <div className="border-t border-b border-[#14213D]/15 py-8 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] block mb-1 font-semibold">
              {t('Институционални покровитељ')}
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#14213D] leading-snug font-bold">
              {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије.')}
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://www.kultura.gov.rs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Министарство културе Републике Србије"
              className="flex items-center space-x-3"
            >
              <Image
                src="/ministry-logo.png"
                alt="Грб Министарства културе Републике Србије"
                width={48}
                height={58}
                className="object-contain flex-shrink-0"
                              />
              <span className="font-serif text-sm font-bold text-[#14213D] tracking-wide">
                {t('Министарство културе Републике Србије')}
              </span>
            </a>
          </div>
        </div>

        {/* Editorial catalogue footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-[#14213D]/15">
          {/* Col 1 */}
          <div className="md:col-span-2">
            <span className="font-serif text-3xl font-bold tracking-wider text-[#14213D] block mb-2">
              {t('ЗАПИСИ СРПСКЕ')}
            </span>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#5C677D] mb-4">
              {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
            </p>
            <p className="font-body text-base text-[#5C677D] leading-relaxed max-w-md">
              {t('Систематизовани архив канонских књижевника из Републике Српске и Босне и Херцеговине.')}{' '}
              {t('Архив покрива књижевни континуитет у распону')} <span className="tabular-nums font-semibold text-[#14213D]">{yearRange}</span>.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-[#B3202A] mb-4 font-semibold">
              {t('Навигација')}
            </h3>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <Link href="/" className="text-[#14213D] hover:text-[#B3202A] link-draw py-0.5">
                  {t('Почетна страна')}
                </Link>
              </li>
              <li>
                <Link href="/pisci" className="text-[#14213D] hover:text-[#B3202A] link-draw py-0.5">
                  {t('Сви писци')} ({totalWriters})
                </Link>
              </li>
              <li>
                <Link href="/o-projektu" className="text-[#14213D] hover:text-[#B3202A] link-draw py-0.5">
                  {t('О пројекту')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-sans text-xs tracking-widest uppercase text-[#B3202A] mb-4 font-semibold">
              {t('Подаци о архиву')}
            </h3>
            <div className="font-sans text-xs space-y-2 text-[#5C677D]">
              <p>
                {t('Евидентираних аутора:')} <span className="tabular-nums font-bold text-[#14213D] text-sm">{totalWriters}</span>
              </p>
              <p>
                {t('Временски распон:')} <span className="tabular-nums font-bold text-[#14213D] text-sm">{yearRange}</span>
              </p>
              <p>
                {t('Посљедње ажурирање:')} <span className="tabular-nums font-semibold text-[#14213D]">{t('октобар 2026.')}</span>
              </p>
              <p>
                {t('Статус:')} <span className="text-[#14213D] font-medium">{t('Слободан јавни приступ')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5C677D] font-sans gap-2">
          <p>© 2026 ЗАПИСИ СРПСКЕ. Сва права задржана.</p>
          <p className="text-right">
            {t('Намијењено широкој јавности, младима и дијаспори.')}
          </p>
        </div>
      </div>
    </footer>
  );
}

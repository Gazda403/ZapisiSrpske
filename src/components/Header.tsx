'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScript } from '@/context/ScriptContext';

export default function Header() {
  const pathname = usePathname();
  const { script, toggleScript, t } = useScript();

  const navLinks = [
    { href: '/', label: 'Почетна' },
    { href: '/pisci', label: 'Писци' },
    { href: '/o-projektu', label: 'О пројекту' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBFAF7] border-b border-[#14213D]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand mark */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none"
            aria-label="ЗАПИСИ СРПСКЕ Почетна страна"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#14213D] group-hover:text-[#B3202A] transition-colors">
              {t('ЗАПИСИ СРПСКЕ')}
            </span>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#5C677D]">
              {t('КЊИЖЕВНИ АРХИВ')}
            </span>
          </Link>

          {/* Navigation and Script Toggle */}
          <div className="flex items-center space-x-6 sm:space-x-10">
            <nav className="flex items-center space-x-6 sm:space-x-8" aria-label="Главна навигација">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-sans text-xs sm:text-sm tracking-widest uppercase transition-colors link-draw py-1 ${
                      isActive ? 'text-[#B3202A] font-semibold' : 'text-[#14213D] hover:text-[#B3202A]'
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                );
              })}
            </nav>

            {/* Hairline vertical divider */}
            <div className="h-5 w-[1px] bg-[#14213D]/20 hidden sm:block" />

            {/* Ћирилица / Latinica Toggle Button */}
            <div className="flex items-center border border-[#14213D]/25 rounded-none p-0.5 bg-[#F4F1EA]">
              <button
                type="button"
                onClick={() => toggleScript('cyr')}
                className={`px-2.5 py-1 text-xs font-sans tracking-wider uppercase transition-colors ${
                  script === 'cyr'
                    ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                    : 'text-[#14213D] hover:text-[#B3202A]'
                }`}
                aria-pressed={script === 'cyr'}
              >
                ЋИР
              </button>
              <button
                type="button"
                onClick={() => toggleScript('lat')}
                className={`px-2.5 py-1 text-xs font-sans tracking-wider uppercase transition-colors ${
                  script === 'lat'
                    ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                    : 'text-[#14213D] hover:text-[#B3202A]'
                }`}
                aria-pressed={script === 'lat'}
              >
                LAT
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

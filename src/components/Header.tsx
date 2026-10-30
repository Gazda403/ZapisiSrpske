'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useScript } from '@/context/ScriptContext';

export default function Header() {
  const pathname = usePathname();
  const { script, toggleScript, t } = useScript();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll progress for the top hairline bar & subtle header blur
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Почетна', num: '01' },
    { href: '/pisci', label: 'Писци', num: '02' },
    { href: '/o-projektu', label: 'О пројекту', num: '03' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFAF7]/95 backdrop-blur-md border-b border-[#14213D]/20 shadow-[0_2px_12px_rgba(20,33,61,0.04)]'
          : 'bg-[#FBFAF7] border-b border-[#14213D]/15'
      }`}
    >
      {/* Editorial reading progress line across top of viewport */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden pointer-events-none z-50">
        <div
          className="h-full bg-[#B3202A] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand mark */}
          <Link
            href="/"
            className="group flex flex-col focus-visible:outline-none flex-shrink-0"
            aria-label="ЗАПИСИ СРПСКЕ Почетна страна"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="font-serif text-lg sm:text-2xl lg:text-3xl font-semibold tracking-wider text-[#14213D] group-hover:text-[#B3202A] transition-colors leading-tight">
              {t('ЗАПИСИ СРПСКЕ')}
            </span>
            <span className="font-sans text-[9px] sm:text-[11px] tracking-[0.2em] uppercase text-[#5C677D]">
              {t('КЊИЖЕВНИ АРХИВ')}
            </span>
          </Link>

          {/* Desktop Navigation and Script Toggle (Hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6 sm:space-x-10">
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

            {/* Ministry logo — desktop */}
            <a
              href="https://www.kultura.gov.rs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Министарство културе Републике Србије"
              className="flex-shrink-0 flex items-center"
            >
              <Image
                src="/ministry-logo.png"
                alt="Грб Министарства културе Републике Србије"
                width={28}
                height={34}
                className="object-contain"
                              />
            </a>

            {/* Hairline vertical divider */}
            <div className="h-5 w-[1px] bg-[#14213D]/20" />

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

          {/* Mobile Right Controls: Script Toggle + Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Compact ЋИР / LAT Toggle for Mobile */}
            <div className="flex items-center border border-[#14213D]/25 rounded-none p-0.5 bg-[#F4F1EA]">
              <button
                type="button"
                onClick={() => toggleScript('cyr')}
                className={`px-2 py-0.5 text-[11px] font-sans tracking-wider uppercase transition-colors ${
                  script === 'cyr'
                    ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                    : 'text-[#14213D]'
                }`}
                aria-pressed={script === 'cyr'}
              >
                ЋИР
              </button>
              <button
                type="button"
                onClick={() => toggleScript('lat')}
                className={`px-2 py-0.5 text-[11px] font-sans tracking-wider uppercase transition-colors ${
                  script === 'lat'
                    ? 'bg-[#14213D] text-[#FBFAF7] font-semibold'
                    : 'text-[#14213D]'
                }`}
                aria-pressed={script === 'lat'}
              >
                LAT
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2.5 py-1.5 border border-[#14213D]/30 text-[#14213D] hover:text-[#B3202A] hover:border-[#B3202A] text-xs font-sans uppercase tracking-widest flex items-center space-x-1.5 transition-colors focus-visible:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Затвори мени' : 'Отвори мени'}
            >
              <span className="font-mono text-sm leading-none">{mobileMenuOpen ? '✕' : '☰'}</span>
              <span className="text-[10px] font-semibold">{mobileMenuOpen ? t('ЗАТВОРИ') : t('МЕНИ')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Slide-down with solid opaque background, no overflow) */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-[#FBFAF7] border-b border-[#14213D]/25 px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col space-y-4" aria-label="Мобилна навигација">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-baseline justify-between py-2 border-b border-[#14213D]/10 font-sans tracking-widest uppercase transition-colors ${
                    isActive ? 'text-[#B3202A] font-bold' : 'text-[#14213D] hover:text-[#B3202A]'
                  }`}
                >
                  <span className="text-sm font-semibold">{t(link.label)}</span>
                  <span className="font-mono text-xs text-[#5C677D]">{link.num} →</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-2 flex items-center justify-between text-[11px] font-sans text-[#5C677D]">
            <p>{t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}</p>
            <a
              href="https://www.kultura.gov.rs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Министарство културе Републике Србије"
              className="flex-shrink-0 ml-3"
            >
              <Image
                src="/ministry-logo.png"
                alt="Грб Министарства културе Републике Србије"
                width={22}
                height={26}
                className="object-contain"
                              />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ResolvedFeaturedWork } from '@/lib/types';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';

interface FeaturedWorksCarouselProps {
  works: ResolvedFeaturedWork[];
}

export default function FeaturedWorksCarousel({ works }: FeaturedWorksCarouselProps) {
  const { t } = useScript();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnimRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);

  const slideTitleRef = useRef<HTMLHeadingElement>(null);
  const slideMetaRef = useRef<HTMLDivElement>(null);

  // Initialize Embla with loop enabled
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track page visibility (pause autoplay when tab is inactive)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Update selected index when Embla settles on a slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    elapsedRef.current = 0;
    setProgress(0);

    // Title mask reveal animation with GSAP (unless prefers-reduced-motion)
    if (!prefersReducedMotion && slideTitleRef.current && slideMetaRef.current) {
      gsap.killTweensOf([slideTitleRef.current, slideMetaRef.current]);

      // Clip mask reveal for title (0.8s, ease power3.inOut)
      gsap.fromTo(
        slideTitleRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.inOut' }
      );

      // Meta and author fade in 0.2s later
      gsap.fromTo(
        slideMetaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }
  }, [emblaApi, prefersReducedMotion]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);

    const onPointerDown = () => setIsDragging(true);
    const onPointerUp = () => setIsDragging(false);

    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('pointerUp', onPointerUp);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('pointerUp', onPointerUp);
    };
  }, [emblaApi, onSelect]);

  // Is autoplay actively ticking?
  const shouldTick =
    isPlaying &&
    !isHovered &&
    !isFocused &&
    !isDragging &&
    !isTabHidden &&
    !prefersReducedMotion;

  // 5-second Autoplay loop with smooth progress bar
  useEffect(() => {
    if (!shouldTick) {
      lastTimeRef.current = null;
      return;
    }

    const duration = 5000; // 5 seconds per slide

    const step = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      elapsedRef.current += delta;
      const pct = Math.min(100, (elapsedRef.current / duration) * 100);
      setProgress(pct);

      if (elapsedRef.current >= duration) {
        elapsedRef.current = 0;
        setProgress(0);
        if (emblaApi) {
          emblaApi.scrollNext();
        }
      } else {
        progressAnimRef.current = requestAnimationFrame(step);
      }
    };

    progressAnimRef.current = requestAnimationFrame(step);

    return () => {
      if (progressAnimRef.current) {
        cancelAnimationFrame(progressAnimRef.current);
      }
    };
  }, [shouldTick, emblaApi]);

  // Handle resume after 2s of inactivity
  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      lastTimeRef.current = null;
    }, 2000);
  };

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setIsHovered(true);
  };

  const handleBlur = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsFocused(false);
      lastTimeRef.current = null;
    }, 2000);
  };

  const handleFocus = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setIsFocused(true);
  };

  // Keyboard navigation when section is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!emblaApi) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      emblaApi.scrollPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      emblaApi.scrollNext();
    }
  };

  const currentWork = works[selectedIndex] || works[0];
  const nextWorkIndex = (selectedIndex + 1) % works.length;
  const nextWork = works[nextWorkIndex];

  if (!works || works.length === 0) return null;

  return (
    <section
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="relative w-full py-28 sm:py-40 bg-[#FBFAF7] border-b border-[#14213D]/15 overflow-hidden focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B3202A]"
      aria-roledescription="carousel"
      aria-label={t('Карусел одабраних књижевних дјела')}
      role="region"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 sm:mb-20 border-b border-[#14213D]/15 gap-4">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-2 font-semibold">
              § 03 • {t('ОДАБРАНА КЊИЖЕВНА ДЈЕЛА')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14213D] leading-tight">
              {t('Десет канонских књига')}
            </h2>
          </div>

          {/* Autoplay status & Pause/Play accessible toggle */}
          <div className="flex items-center space-x-6">
            <button
              type="button"
              onClick={() => {
                setIsPlaying(!isPlaying);
                elapsedRef.current = 0;
                setProgress(0);
              }}
              className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-[#14213D] hover:text-[#B3202A] transition-colors py-1 focus-visible:ring-1 focus-visible:ring-[#B3202A]"
              aria-label={isPlaying ? t('Паузирај аутоматско помјерање') : t('Покрени аутоматско помјерање')}
            >
              <span className="font-mono text-sm leading-none">{isPlaying ? '❚❚' : '▶'}</span>
              <span className="font-semibold">{isPlaying ? t('ПАУЗА') : t('ПУСТИ')}</span>
            </button>

            {/* Oversized Slide Counter e.g. "03 / 10" */}
            <div className="font-serif text-2xl sm:text-3xl text-[#14213D] font-bold tabular-nums">
              <span>{selectedIndex + 1 < 10 ? `0${selectedIndex + 1}` : selectedIndex + 1}</span>
              <span className="text-[#14213D]/40 font-light mx-2">/</span>
              <span className="text-[#5C677D] text-lg sm:text-xl">{works.length < 10 ? `0${works.length}` : works.length}</span>
            </div>
          </div>
        </div>

        {/* Embla Carousel Viewport with drag/swipe support */}
        <div
          ref={emblaRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex touch-pan-y">
            {works.map((work, idx) => {
              const isActive = idx === selectedIndex;
              const isNextPeek = idx === nextWorkIndex;

              return (
                <div
                  key={`${work.authorSlug}-${work.title}`}
                  className="flex-[0_0_88%] sm:flex-[0_0_82%] lg:flex-[0_0_80%] min-w-0 pr-6 sm:pr-12 transition-opacity duration-500"
                  aria-hidden={!isActive}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} од ${works.length}: ${work.title}`}
                >
                  <div
                    className={`relative w-full transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : isNextPeek ? 'opacity-20' : 'opacity-10'
                    }`}
                  >
                    {/* Oversized Hairline Slide Counter behind the title */}
                    <div className="select-none pointer-events-none absolute -top-12 sm:-top-16 left-0 font-serif text-[18vw] sm:text-[14vw] font-bold leading-none text-[#14213D]/[0.05] tabular-nums z-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>

                    <div className="relative z-10 pt-4 sm:pt-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
                        {/* Left / Main text side */}
                        <div className="flex-1 min-w-0">
                          {/* Work Title with Mask Reveal */}
                          <div className="overflow-hidden pb-2 mb-3 sm:mb-4">
                            <h3
                              ref={isActive ? slideTitleRef : undefined}
                              className="font-serif font-bold text-[#14213D] leading-[0.92] tracking-tight break-words"
                              style={{
                                fontSize: 'clamp(2.4rem, 6.2vw, 5.8rem)',
                              }}
                            >
                              {t(work.title)}
                            </h3>
                          </div>

                          {/* Thin Red Hairline Autoplay Progress Bar */}
                          <div className="w-full max-w-2xl h-[2px] bg-[#14213D]/15 overflow-hidden mb-6 sm:mb-8">
                            <div
                              className="h-full bg-[#B3202A] transition-all duration-75"
                              style={{
                                width: isActive ? `${progress}%` : '0%',
                              }}
                            />
                          </div>

                          {/* Author Name, Year and Factual Note */}
                          <div
                            ref={isActive ? slideMetaRef : undefined}
                            className="max-w-2xl"
                          >
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                              <span className="font-serif text-2xl sm:text-3xl text-[#B3202A] font-semibold">
                                {t(work.authorName)}
                              </span>
                              <span className="font-serif text-xl sm:text-2xl text-[#14213D] tabular-nums font-medium">
                                {work.year ? `(${work.year})` : ''}
                              </span>
                            </div>

                            {/* Note: Strictly ONE factual line */}
                            {work.note && work.note.trim() !== '' && (
                              <p className="font-body text-base sm:text-xl text-[#5C677D] leading-relaxed mb-8">
                                {t(work.note)}
                              </p>
                            )}

                            {/* Button/Link to Author's Biography */}
                            <div className="pt-2">
                              <Link
                                href={`/pisci/${work.authorSlug}`}
                                className="inline-flex items-center text-xs sm:text-sm font-sans tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] transition-colors link-draw py-1 font-semibold"
                              >
                                <span>{t('Отвори биографију аутора')}</span>
                                <span className="ml-2 font-mono">→</span>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Right side: Tall Licensed Cover if present */}
                        {work.cover && (
                          <div className="flex-shrink-0 w-44 sm:w-56 lg:w-60 xl:w-72">
                            <div className="relative aspect-[2/3] w-full bg-[#14213D]/5 border border-[#14213D]/15 overflow-hidden shadow-sm">
                              <Image
                                src={work.cover}
                                alt={`Корице: ${work.title}`}
                                fill
                                sizes="(max-width: 768px) 176px, (max-width: 1024px) 224px, 288px"
                                className="object-cover"
                              />
                            </div>
                            {work.coverCredit && (
                              <p className="font-sans text-[11px] text-[#5C677D] mt-2 leading-tight">
                                {t(work.coverCredit)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Bottom Controls: Arrow buttons & Row of 10 jump ticks */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-10 sm:pt-14 mt-8 border-t border-[#14213D]/15 gap-6">
          {/* Row of 10 Interactive Ticks / Buttons */}
          <div
            className="flex items-center space-x-2 sm:space-x-3"
            role="tablist"
            aria-label={t('Избор књижевног дјела')}
          >
            {works.map((work, idx) => {
              const isCurrent = idx === selectedIndex;
              return (
                <button
                  key={`tick-${work.title}`}
                  type="button"
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`h-9 px-2 sm:px-2.5 flex items-center justify-center font-mono text-xs transition-colors focus-visible:ring-1 focus-visible:ring-[#B3202A] ${
                    isCurrent
                      ? 'border-b-2 border-[#B3202A] text-[#B3202A] font-bold'
                      : 'border-b border-[#14213D]/20 text-[#5C677D] hover:text-[#14213D] hover:border-[#14213D]'
                  }`}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Пређи на дјело ${idx + 1}: ${work.title}`}
                >
                  <span className="tabular-nums">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Plain Typographic Left & Right Arrow Buttons (Min 48px hit area) */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center border border-[#14213D]/25 hover:border-[#B3202A] hover:text-[#B3202A] text-[#14213D] text-2xl font-serif transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B3202A]"
              aria-label={t('Претходно дјело')}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center border border-[#14213D]/25 hover:border-[#B3202A] hover:text-[#B3202A] text-[#14213D] text-2xl font-serif transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B3202A]"
              aria-label={t('Сљедеће дјело')}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


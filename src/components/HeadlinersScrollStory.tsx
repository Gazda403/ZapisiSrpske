'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeadlinerData {
  slug: string;
  name: string;
  birthYear: number;
  deathYear: number;
  birthPlace: string;
  highlightYear: number;
  oneSentenceBio: string;
  quote: string;
  image: string;
  placeName: string;
  placeCredit: string;
  placeLicense: string;
  orderNumber: string;
}

const HEADLINERS: HeadlinerData[] = [
  {
    slug: 'ivo-andric',
    name: 'Иво Андрић',
    birthYear: 1892,
    deathYear: 1975,
    birthPlace: 'Долац код Травника (одрастао у Вишеграду)',
    highlightYear: 1892,
    oneSentenceBio: 'Велики српски књижевник, дипломата и једини југословенски добитник Нобелове награде за књижевност (1961).',
    quote: '„Чудно је како је мало потребно да будемо сретни и још чудније како нам често баш то мало недостаје.“',
    image: '/images/visegrad.jpg',
    placeName: 'Вишеград — Мост Мехмед-паше Соколовића на Дрини',
    placeCredit: 'Фотографија: Pudelek (Marcin Szala) / Wikimedia Commons',
    placeLicense: 'CC BY-SA 3.0',
    orderNumber: '01',
  },
  {
    slug: 'jovan-ducic',
    name: 'Јован Дучић',
    birthYear: 1874,
    deathYear: 1943,
    birthPlace: 'Требиње',
    highlightYear: 1874,
    oneSentenceBio: 'Један од најзначајнијих српских лиричара, есејиста и дипломата чије је дјело поставило врхунце српског модернизма.',
    quote: '„Човјек који није храбар не може бити ни поштен, јер за поштење су потребне жртве какве кукавица не умије да поднесе...“',
    image: '/images/places/jovan-ducic.jpg',
    placeName: 'Требиње — Херцеговачка Грачаница на брду Црквина',
    placeCredit: 'Задужбина Јована Дучића у Требињу',
    placeLicense: 'Јавно власништво',
    orderNumber: '02',
  },
  {
    slug: 'petar-kocic',
    name: 'Петар Кочић',
    birthYear: 1877,
    deathYear: 1916,
    birthPlace: 'Стричићи на Змијању код Бање Луке',
    highlightYear: 1877,
    oneSentenceBio: 'Великан српске крајишке прозе, бунтовник и народни трибун који је снагом змијањског језика овјековјечио судбину човјека.',
    quote: '„Ко искрено и страсно љуби Истину, Слободу и Отаџбину, слободан је и неустрашив као Бог, а презрен и гладан као пас.”',
    image: '/images/places/petar-kocic.jpg',
    placeName: 'Змијање — Стричићи, спомен-подручје и огњиште',
    placeCredit: 'Спомен-збирка Петар Кочић, Бања Лука',
    placeLicense: 'Јавно власништво',
    orderNumber: '03',
  },
  {
    slug: 'branko-copic',
    name: 'Бранко Ћопић',
    birthYear: 1915,
    deathYear: 1984,
    birthPlace: 'Хашани код Босанске Крупе (Подгрмеч)',
    highlightYear: 1915,
    oneSentenceBio: 'Најчитанији и најомиљенији српски приповједач, пјесник и романсијер који је опјевао подгрмечки свијет баште сљезове боје.',
    quote: '„Лутаћеш дуго свијетом бијелим, са витешким жаром, но једнога дана кораком невеселим, вратићеш се дому старом.“',
    image: '/images/places/branko-copic.jpg',
    placeName: 'Крупа на Уни — Хашани и воденица дједа Тривуна',
    placeCredit: 'Завичајно друштво Бранко Ћопић Хашани',
    placeLicense: 'CC BY-SA 4.0',
    orderNumber: '04',
  },
];

export default function HeadlinersScrollStory() {
  const { t } = useScript();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>('.headliner-chapter');

      chapters.forEach((chapter) => {
        const yearElem = chapter.querySelector('.chapter-year-watermark');
        const contentElem = chapter.querySelector('.chapter-content-box');
        const photoElem = chapter.querySelector('.chapter-photo');

        if (yearElem) {
          gsap.fromTo(
            yearElem,
            { yPercent: 20 },
            {
              yPercent: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        if (photoElem) {
          gsap.fromTo(
            photoElem,
            { scale: 1 },
            {
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }

        if (contentElem) {
          gsap.fromTo(
            contentElem,
            { opacity: 0.35, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="poglavlja" className="relative w-full" aria-label="Канонска поглавља архива">
      {HEADLINERS.map((headliner, idx) => {
        const isPhotoLeft = idx % 2 === 0;

        return (
          <div
            key={headliner.slug}
            className="headliner-chapter relative lg:sticky lg:top-20 w-full min-h-screen lg:h-[calc(100vh-5rem)] lg:min-h-[640px] overflow-hidden flex flex-col lg:flex-row bg-[#FBFAF7] border-b border-[#14213D]/20"
            style={{ zIndex: 10 + idx }}
          >
            {/* Visual Photo Column (50vw width, full height on desktop, bright editorial photo) */}
            <div
              className={`relative w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-[#14213D] ${
                isPhotoLeft ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className="chapter-photo relative w-full h-full will-change-transform">
                <Image
                  src={headliner.image}
                  alt={headliner.placeName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover editorial-photo"
                />
              </div>

              {/* Edge credit line (Rule requirement: small type at edge, no cards) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-start items-end text-[11px] font-sans text-[#FBFAF7]/90 pointer-events-none">
                <span className="bg-[#14213D]/75 px-2.5 py-1">
                  {t(headliner.placeName)}
                </span>
              </div>
            </div>

            {/* Editorial Text Column (50vw width, warm white background, no cards, giant outlined year) */}
            <div
              className={`relative w-full lg:w-1/2 flex-1 lg:h-full bg-[#FBFAF7] flex flex-col justify-between p-4 sm:p-8 lg:p-16 xl:p-20 overflow-hidden ${
                isPhotoLeft ? 'lg:order-2' : 'lg:order-1'
              }`}
            >
              {/* Giant outlined year behind text at 20vw */}
              <div
                aria-hidden="true"
                className="chapter-year-watermark absolute right-0 sm:right-6 bottom-2 sm:bottom-6 select-none pointer-events-none font-serif font-bold text-outline-navy text-[28vw] lg:text-[17vw] leading-none z-0 tabular-nums opacity-40 will-change-transform"
              >
                {headliner.highlightYear}
              </div>

              {/* Chapter top coordinate */}
              <div className="relative z-10 flex items-center justify-between text-xs font-sans tracking-[0.25em] uppercase text-[#5C677D]">
                <span className="flex items-center space-x-2 text-[#B3202A] font-semibold">
                  <span className="w-1.5 h-1.5 bg-[#B3202A]" />
                  <span>{t('ПОГЛАВЉЕ')} {headliner.orderNumber}</span>
                </span>
                <span className="tabular-nums font-mono">
                  {headliner.birthYear}–{headliner.deathYear}
                </span>
              </div>

              {/* Central Name & Bio Content */}
              <div className="chapter-content-box relative z-10 my-auto py-6 sm:py-8 will-change-transform">
                <div className="flex items-center space-x-5 mb-4">
                  {/* Real Author Portrait */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#14213D] flex-shrink-0 bg-[#FBFAF7]">
                    <Image
                      src={`/portraits/${headliner.slug}.jpg`}
                      alt={headliner.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-lg sm:text-2xl text-[#B3202A] tabular-nums font-semibold block">
                      {headliner.birthYear}–{headliner.deathYear}
                    </span>
                    <p className="font-sans text-xs sm:text-sm uppercase tracking-widest text-[#5C677D]">
                      {t('Завичај:')} <span className="text-[#14213D] font-medium">{t(headliner.birthPlace)}</span>
                    </p>
                  </div>
                </div>

                <h2 className="font-serif font-bold text-[#14213D] text-4xl sm:text-6xl xl:text-7xl leading-[0.95] tracking-tight mb-4">
                  {t(headliner.name)}
                </h2>

                <p className="font-body text-base sm:text-xl text-[#14213D] leading-relaxed max-w-xl mb-6">
                  {t(headliner.oneSentenceBio)}
                </p>

                {headliner.quote && (
                  <blockquote className="my-5 pl-4 border-l-2 border-[#B3202A]/40 text-[#5C677D] font-body italic text-xs sm:text-sm leading-relaxed max-w-lg">
                    {t(headliner.quote)}
                  </blockquote>
                )}

                <div>
                  <Link
                    href={`/pisci/${headliner.slug}`}
                    className="inline-flex items-center space-x-3 text-xs sm:text-sm font-sans tracking-widest uppercase text-[#14213D] hover:text-[#B3202A] font-semibold py-2 link-draw transition-colors"
                  >
                    <span>{t('ОТВОРИ БИОБИБЛИОГРАФСКИ ДОСИЈЕ')}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Bottom chapter footer */}
              <div className="relative z-10 pt-4 border-t border-[#14213D]/15 flex items-center justify-between text-xs font-sans text-[#5C677D]">
                <span>{t(headliner.placeCredit)}</span>
                <span className="font-mono text-[11px] text-[#14213D]">{headliner.orderNumber} / 04</span>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

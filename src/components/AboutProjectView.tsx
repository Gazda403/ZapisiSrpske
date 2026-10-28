'use client';

import React from 'react';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

interface AboutProjectViewProps {
  totalWriters: number;
  yearRange: string;
}

export default function AboutProjectView({
  totalWriters,
  yearRange,
}: AboutProjectViewProps) {
  const { t } = useScript();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-[#FBFAF7]">
      {/* Header (No beige box!) */}
      <div className="border-b border-[#14213D]/15 pb-10 mb-16">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
          {t('О пројекту')} • № 03
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl font-bold text-[#14213D] leading-tight mb-4">
          {t('Архив „ЗАПИСИ СРПСКЕ“')}
        </h1>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#5C677D]">
          {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
        </p>
      </div>

      {/* Concrete Information Sections (Divided with hairline rules and bold type) */}
      <div className="space-y-16">
        {/* 1. Шта архив садржи */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            1. {t('Шта архив садржи')}
          </h2>
          <div className="font-body text-lg text-[#14213D] leading-relaxed space-y-4">
            <p>
              {t('Архив садржи систематизоване биографске и библиографске податке за')} <strong className="text-[#B3202A] tabular-nums">{totalWriters} {t('канонских књижевника')}</strong> {t('поријеклом из Републике Српске и Босне и Херцеговине.')}
            </p>
            <p>
              {t('Обухваћен је временски распон од')} <strong className="tabular-nums text-[#14213D]">{yearRange}</strong> {t('године — од рођења сљепог епског пјевача Филипа Вишњића у Угљевику до упокојења академика Рајка Петрова Нога. Сви подаци систематизовани су у три књижевне епохе: 19. вијек, прва половина 20. вијека и друга половина 20. вијека.')}
            </p>
          </div>
        </section>

        {/* 2. Коме је намијењено */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            2. {t('Коме је архив намијењен')}
          </h2>
          <div className="font-body text-lg text-[#14213D] leading-relaxed space-y-4">
            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong className="text-[#14213D]">{t('Широкој јавности:')}</strong>{' '}
                {t('свим грађанима и читаоцима ради слободног приступа националном књижевном стваралаштву без претплата или регистрације.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Младима и образовању:')}</strong>{' '}
                {t('ученицима, студентима и наставницима као верификовани извор за часове књижевности и научно-истраживачки рад.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Дијаспори:')}</strong>{' '}
                {t('српској заједници широм свијета за очување матерњег језика, ћириличког писма и трајне везе са завичајном културом.')}
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Како су писци бирани */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            3. {t('Како су писци бирани')}
          </h2>
          <div className="font-body text-lg text-[#14213D] leading-relaxed space-y-4">
            <p>
              {t('Селекција аутора ослања се на три темељна принципа:')}
            </p>
            <ol className="space-y-3 list-decimal list-inside pl-2">
              <li>
                <strong className="text-[#14213D]">{t('Завичајно поријекло:')}</strong>{' '}
                {t('аутори који су рођени или су пресудан дио стваралаштва везали за географски простор данашње Републике Српске и БиХ.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Књижевни канон:')}</strong>{' '}
                {t('ствараоци чија су дјела историјски вреднована у капиталним студијама Јована Скерлића, Јована Деретића и издањима САНУ, АНУРС и Матице српске.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Архивска вјеродостојност:')}</strong>{' '}
                {t('укључени су искључиво аутори са прецизно утврђеним биографским изворима.')}
              </li>
            </ol>
          </div>
        </section>

        {/* 4. Ко финансира пројекат (Институционални оквир) */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            4. {t('Финансирање и институционални оквир')}
          </h2>
          <div className="font-body text-lg text-[#14213D] leading-relaxed space-y-4">
            <p>
              {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије у оквиру јавног програма подршке културним дјелатностима и очувању српског културног насљеђа.')}
            </p>
          </div>
        </section>

        {/* 5. Ко је израдио платформу */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            5. {t('Носилац пројекта и техничка израда')}
          </h2>
          <div className="font-body text-lg text-[#14213D] leading-relaxed space-y-3">
            <p>
              {t('Пројекат реализује истраживачки тим „ЗАПИСИ СРПСКЕ“ у сарадњи са стручњацима за књижевну историју и дигиталну архивистику.')}
            </p>
            <p className="text-base text-[#5C677D]">
              {t('Технологија: отворени статички веб систем са локалном архивом података, оптимизован за дугорочно дигитално чување без комерцијалних зависности.')}
            </p>
          </div>
        </section>

        {/* 6. Датум посљедњег ажурирања */}
        <section className="border-t border-[#14213D]/15 pt-10 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-[#5C677D] gap-2">
            <div>
              <span className="font-semibold text-[#14213D]">{t('Датум посљедњег ажурирања:')}</span>{' '}
              <span className="tabular-nums font-semibold text-[#B3202A]">28. {t('октобар 2026. године')}</span>
            </div>
            <div>
              <span className="font-semibold text-[#14213D]">{t('Верзија грађе:')}</span>{' '}
              <span className="font-mono">1.0.0-archive</span>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Catalogue */}
      <div className="mt-14 pt-8 border-t border-[#14213D]/15 text-center sm:text-left">
        <Link
          href="/pisci"
          className="inline-flex items-center px-8 py-4 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
        >
          <span>{t('Пређи на преглед писаца')}</span>
          <span className="ml-4 font-mono">→</span>
        </Link>
      </div>
    </div>
  );
}

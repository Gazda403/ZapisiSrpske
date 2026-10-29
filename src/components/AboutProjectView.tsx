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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-36 bg-[#FBFAF7]">
      {/* Header */}
      <div className="border-b border-[#14213D]/15 pb-12 mb-16">
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#B3202A] block mb-3 font-semibold">
          {t('О пројекту')} • № 03
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold text-[#14213D] leading-tight mb-4">
          {t('Архив „ЗАПИСИ СРПСКЕ“')}
        </h1>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#5C677D]">
          {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
        </p>
      </div>

      {/* Reading Column strictly constrained to 680px with 20px typography */}
      <div className="max-w-[680px] space-y-16">
        {/* 1. Шта архив садржи */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            1. {t('Шта архив садржи')}
          </h2>
          <div className="font-body text-[19px] sm:text-[20px] text-[#14213D] leading-[1.75] space-y-4">
            <p>
              {t('Архив садржи систематизоване биографске и библиографске податке за')}{' '}
              <strong className="text-[#B3202A] tabular-nums font-semibold">
                {totalWriters} {t('канонских књижевника')}
              </strong>{' '}
              {t('поријеклом из Републике Српске и Босне и Херцеговине.')}
            </p>
            <p>
              {t('Обухваћен је временски распон од')}{' '}
              <strong className="tabular-nums text-[#14213D] font-semibold">{yearRange}</strong>{' '}
              {t(
                'године — од рођења сљепог епског пјевача Филипа Вишњића у Угљевику до упокојења академика Рајка Петрова Нога. Сви подаци систематизовани су у три књижевне епохе: 19. вијек, прва половина 20. вијека и друга половина 20. вијека.'
              )}
            </p>
          </div>
        </section>

        {/* 2. Коме је намијењено */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            2. {t('Коме је архив намијењен')}
          </h2>
          <div className="font-body text-[19px] sm:text-[20px] text-[#14213D] leading-[1.75] space-y-4">
            <ul className="space-y-4 list-disc list-inside">
              <li>
                <strong className="text-[#14213D]">{t('Широкој јавности:')}</strong>{' '}
                {t(
                  'свим грађанима и читаоцима ради слободног приступа националном књижевном стваралаштву без претплата или регистрације.'
                )}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Младима и образовању:')}</strong>{' '}
                {t(
                  'ученицима, студентима и наставницима као верификовани извор за часове књижевности и научно-истраживачки рад.'
                )}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Дијаспори:')}</strong>{' '}
                {t(
                  'српској заједници широм свијета за очување матерњег језика, ћириличког писма и трајне везе са завичајном културом.'
                )}
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Како су писци бирани */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            3. {t('Како су писци бирани')}
          </h2>
          <div className="font-body text-[19px] sm:text-[20px] text-[#14213D] leading-[1.75] space-y-4">
            <p>{t('Селекција аутора ослања се на три темељна принципа:')}</p>
            <ol className="space-y-3 list-decimal list-inside pl-2">
              <li>
                <strong className="text-[#14213D]">{t('Завичајно поријекло:')}</strong>{' '}
                {t(
                  'аутори који су рођени или су пресудан дио стваралаштва везали за географски простор данашње Републике Српске и БиХ.'
                )}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Књижевни канон:')}</strong>{' '}
                {t(
                  'ствараоци чија су дјела историјски вреднована у капиталним студијама Јована Скерлића, Јована Деретића и издањима САНУ, АНУРС и Матице српске.'
                )}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Архивска вјеродостојност:')}</strong>{' '}
                {t('укључени су искључиво аутори са прецизно утврђеним биографским изворима.')}
              </li>
            </ol>
          </div>
        </section>

        {/* 4. Финансирање и институционални оквир */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            4. {t('Финансирање и институционални оквир')}
          </h2>
          <div className="font-body text-[19px] sm:text-[20px] text-[#14213D] leading-[1.75] space-y-4">
            <p>
              {t(
                'Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије у оквиру јавног програма подршке културним дјелатностима и очувању српског културног насљеђа.'
              )}
            </p>
          </div>
        </section>

        {/* 5. Носилац пројекта и техничка израда */}
        <section className="border-t border-[#14213D]/15 pt-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14213D] mb-5">
            5. {t('Носилац пројекта и техничка израда')}
          </h2>
          <div className="font-body text-[19px] sm:text-[20px] text-[#14213D] leading-[1.75] space-y-4">
            <p>
              {t(
                'Пројекат реализује истраживачки тим „ЗАПИСИ СРПСКЕ“ у сарадњи са стручњацима за књижевну историју и дигиталну архивистику.'
              )}
            </p>
            <p className="text-sm text-[#5C677D]">
              {t(
                'Технологија: отворени статички веб систем са локалном базом података, оптимизован за дугорочно дигитално чување без комерцијалних зависности.'
              )}
            </p>
          </div>
        </section>

        {/* Concrete Dates and Version */}
        <div className="border-t border-[#14213D]/15 pt-8 flex flex-col sm:flex-row justify-between text-xs font-sans text-[#5C677D] gap-2">
          <span>
            {t('Датум посљедњег ажурирања:')}{' '}
            <strong className="text-[#14213D] tabular-nums font-semibold">
              {t('28. октобар 2026. године')}
            </strong>
          </span>
          <span className="font-mono">
            {t('Верзија грађе:')}{' '}
            <strong className="text-[#14213D]">1.0.0-archive</strong>
          </span>
        </div>

        {/* Call to action */}
        <div className="pt-8">
          <Link
            href="/pisci"
            className="inline-flex items-center px-8 py-4 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
          >
            <span>{t('ПРЕЂИ НА ПРЕГЛЕД ПИСАЦА')}</span>
            <span className="ml-3">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

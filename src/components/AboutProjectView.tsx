'use client';

import React from 'react';
import Link from 'next/link';
import { useScript } from '@/context/ScriptContext';

interface AboutProjectViewProps {
  totalWriters: number;
  yearRange: string;
  totalWorks: number;
}

export default function AboutProjectView({
  totalWriters,
  yearRange,
  totalWorks,
}: AboutProjectViewProps) {
  const { t } = useScript();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="border-b border-[#14213D]/15 pb-8 mb-12">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#B3202A] block mb-2 font-semibold">
          {t('О пројекту')} • № 03
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14213D] mb-4">
          {t('Архив „ЗАПИСИ СРПСКЕ“')}
        </h1>
        <p className="font-sans text-xs sm:text-sm uppercase tracking-widest text-[#5C677D]">
          {t('ДИГИТАЛНА РИЗНИЦА КЊИЖЕВНОГ НАСЉЕЂА РЕПУБЛИКЕ СРПСКЕ')}
        </p>
      </div>

      {/* Concrete Information Blocks (Rule 5 Requirement) */}
      <div className="space-y-12">
        {/* 1. Шта архив садржи */}
        <section className="border-t border-[#14213D]/15 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#14213D] mb-4">
            1. {t('Шта архив садржи')}
          </h2>
          <div className="font-body text-base text-[#14213D] leading-relaxed space-y-3">
            <p>
              {t('Архив садржи систематизоване биографске и библиографске податке за')} <span className="font-semibold tabular-nums">{totalWriters} {t('канонских књижевника')}</span> {t('поријеклом из Републике Српске и Босне и Херцеговине.')}
            </p>
            <p>
              {t('Обухваћен је хронолошки распон од')} <span className="font-semibold tabular-nums">{yearRange}</span> {t('године — од рођења епског пјевача Филипа Вишњића до смрти пјесника и академика Рајка Петрова Нога. У бази је тренутно забиљежено')} <span className="font-semibold tabular-nums">{totalWorks} {t('ауторских књижевних дјела')}</span>, {t('разврстаних у три историјска периода: 19. вијек, прву половину 20. вијека и другу половину 20. вијека.')}
            </p>
          </div>
        </section>

        {/* 2. Коме је намијењено */}
        <section className="border-t border-[#14213D]/15 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#14213D] mb-4">
            2. {t('Коме је архив намијењен')}
          </h2>
          <div className="font-body text-base text-[#14213D] leading-relaxed space-y-3">
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong className="text-[#14213D]">{t('Широкој јавности:')}</strong>{' '}
                {t('свим заинтересованим грађанима и истраживачима за слободан увид у национално књижевно стваралаштво без претплате или регистрације.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Младима и образовању:')}</strong>{' '}
                {t('ученицима основних и средњих школа, студентима филолошких факултета и наставницима као верификовани извор за наставу српског језика и књижевности.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Дијаспори:')}</strong>{' '}
                {t('српској заједници ван матичних простора, ради чувања језика, ћириличког писма и трајне везе са завичајном културом.')}
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Како су писци бирани */}
        <section className="border-t border-[#14213D]/15 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#14213D] mb-4">
            3. {t('Како су писци бирани')}
          </h2>
          <div className="font-body text-base text-[#14213D] leading-relaxed space-y-3">
            <p>
              {t('Селекција аутора заснива се на три строга критеријума:')}
            </p>
            <ol className="space-y-2 list-decimal list-inside pl-2">
              <li>
                <strong className="text-[#14213D]">{t('Завичајно поријекло:')}</strong>{' '}
                {t('аутори који су рођени или су значајан дио живота и стваралаштва везали за просторе данашње Републике Српске и Босне и Херцеговине.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Књижевно-историјски канон:')}</strong>{' '}
                {t('аутори чија су дјела оцијењена као прекретничка у историјама књижевности Јована Скерлића, Јована Деретића, те издањима САНУ, АНУРС и Матице српске.')}
              </li>
              <li>
                <strong className="text-[#14213D]">{t('Аутентичност грађе:')}</strong>{' '}
                {t('укључени су искључиво аутори са провјереним библиографским изворима.')}
              </li>
            </ol>
          </div>
        </section>

        {/* 4. Ко финансира пројекат (Институционални оквир) */}
        <section className="border-t border-[#14213D]/15 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#14213D] mb-4">
            4. {t('Финансирање и институционални оквир')}
          </h2>
          <div className="font-body text-base text-[#14213D] leading-relaxed mb-6">
            <p>
              {t('Пројекат је реализован уз подршку и финансирање Министарства културе Републике Србије у оквиру конкурса за суфинансирање пројеката у области културних делатности српског народа у земљама региона.')}
            </p>
          </div>

          {/* Labeled Empty Box for Official Ministry Logo (Prompt Rule) */}
          <div className="border border-[#14213D]/25 bg-[#F4F1EA] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#B3202A] block mb-1">
                {t('Званични покровитељ')}
              </span>
              <p className="font-serif text-lg font-bold text-[#14213D]">
                {t('Министарство културе Републике Србије')}
              </p>
              <p className="font-sans text-xs text-[#5C677D] mt-1">
                {t('Програм сарадње и очувања националног културног идентитета')}
              </p>
            </div>

            <div className="border border-dashed border-[#14213D]/40 bg-[#FBFAF7] px-6 py-4 text-center">
              <span className="font-sans text-[10px] tracking-widest text-[#5C677D] uppercase block">
                {t('[ РЕЗЕРВИСАНО ЗА ЗВАНИЧНИ ЛОГО ]')}
              </span>
              <span className="font-serif text-xs font-semibold text-[#14213D] tracking-wide block mt-1">
                {t('Влада Републике Србије')}
              </span>
            </div>
          </div>
        </section>

        {/* 5. Ко је израдио платформу */}
        <section className="border-t border-[#14213D]/15 pt-8">
          <h2 className="font-serif text-2xl font-bold text-[#14213D] mb-4">
            5. {t('Носилац пројекта и техничка израда')}
          </h2>
          <div className="font-body text-base text-[#14213D] leading-relaxed space-y-2">
            <p>
              {t('Пројекат реализује стручни истраживачки тим пројекта „ЗАПИСИ СРПСКЕ“ у сарадњи са књижевним историчарима, филолозима и дигиталним архивистима.')}
            </p>
            <p className="text-sm text-[#5C677D]">
              {t('Техничко рјешење: отворени статички веб систем са локалном JSON структуром података, оптимизован за дугорочно дигитално чување без комерцијалних зависности.')}
            </p>
          </div>
        </section>

        {/* 6. Датум посљедњег ажурирања */}
        <section className="border-t border-[#14213D]/15 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-[#5C677D] gap-2">
            <div>
              <span className="font-semibold text-[#14213D]">{t('Датум посљедњег ажурирања:')}</span>{' '}
              <span className="tabular-nums font-semibold text-[#B3202A]">28. {t('октобар 2026. године')}</span>
            </div>
            <div>
              <span className="font-semibold text-[#14213D]">{t('Верзија каталога:')}</span>{' '}
              <span className="font-mono">1.0.0-archive</span>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Catalogue */}
      <div className="mt-12 pt-8 border-t border-[#14213D]/15 text-center sm:text-left">
        <Link
          href="/pisci"
          className="inline-flex items-center px-6 py-3 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs tracking-widest uppercase transition-colors"
        >
          <span>{t('Пређи на преглед писаца')}</span>
          <span className="ml-3 font-mono">→</span>
        </Link>
      </div>
    </div>
  );
}

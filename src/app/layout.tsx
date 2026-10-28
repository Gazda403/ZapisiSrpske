import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScriptProvider } from '@/context/ScriptContext';
import SmoothScroll from '@/components/SmoothScroll';
import { getArchiveStats } from '@/lib/writers';

export const metadata: Metadata = {
  title: 'ЗАПИСИ СРПСКЕ — Дигитална ризница књижевног насљеђа Републике Српске',
  description:
    'Онлајн архив књижевника из Републике Српске и Босне и Херцеговине. Систематизовани биографски и библиографски подаци за 15 канонских писаца од 1767. до 2022. године.',
  keywords: [
    'Записи Српске',
    'књижевност Републике Српске',
    'српски писци',
    'Петар Кочић',
    'Јован Дучић',
    'Иво Андрић',
    'Бранко Ћопић',
    'дигитални архив',
  ],
  authors: [{ name: 'ЗАПИСИ СРПСКЕ' }],
  metadataBase: new URL('https://zapisi-srpske.rs'),
  openGraph: {
    title: 'ЗАПИСИ СРПСКЕ — Дигитална ризница књижевног насљеђа Републике Српске',
    description:
      'Дигитална ризница књижевног насљеђа Републике Српске и Босне и Херцеговине. Пројекат реализован уз подршку и финансирање Министарства културе Републике Србије.',
    url: 'https://zapisi-srpske.rs',
    siteName: 'ЗАПИСИ СРПСКЕ',
    locale: 'sr_RS',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stats = getArchiveStats();

  return (
    <html lang="sr-Cyrl">
      <body className="bg-[#FBFAF7] text-[#14213D] font-body selection:bg-[#B3202A] selection:text-white">
        <ScriptProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer totalWriters={stats.totalWriters} yearRange={stats.yearRange} />
            </div>
          </SmoothScroll>
        </ScriptProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScriptProvider } from '@/context/ScriptContext';
import SmoothScroll from '@/components/SmoothScroll';
import { getArchiveStats } from '@/lib/writers';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#14213D',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ЗАПИСИ СРПСКЕ — Дигитална ризница књижевног насљеђа Републике Српске',
  description:
    'Онлајн архив књижевника из Републике Српске и Босне и Херцеговине. Систематизовани биографски и библиографски подаци за канонске писце од 1767. до 2022. године.',
  keywords: [
    'Записи Српске',
    'књижевност Републике Српске',
    'српски писци',
    'Петар Кочић',
    'Јован Дучић',
    'Иво Андрић',
    'Бранко Ћопић',
    'Стака Скендерова',
    'Нићифор Дучић',
    'Видосава Раич',
    'дигитални архив',
    'Министарство културе Републике Србије',
  ],
  authors: [{ name: 'ЗАПИСИ СРПСКЕ' }],
  metadataBase: new URL('https://zapisi-srpske.rs'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'ЗАПИСИ СРПСКЕ — Дигитална ризница књижевног насљеђа Републике Српске',
    description:
      'Дигитална ризница књижевног насљеђа Републике Српске и Босне и Херцеговине. Пројекат реализован уз подршку и финансирање Министарства културе Републике Србије.',
    url: 'https://zapisi-srpske.rs',
    siteName: 'ЗАПИСИ СРПСКЕ',
    locale: 'sr_RS',
    type: 'website',
    images: [
      {
        url: '/images/hero-visegrad.jpg',
        width: 1200,
        height: 630,
        alt: 'ЗАПИСИ СРПСКЕ — Дигитални књижевни архив',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ЗАПИСИ СРПСКЕ — Дигитална ризница књижевног насљеђа Републике Српске',
    description:
      'Систематизовани биографски и библиографски подаци за канонске писце од 1767. до 2022. године.',
    images: ['/images/hero-visegrad.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stats = getArchiveStats();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ЗАПИСИ СРПСКЕ',
    url: 'https://zapisi-srpske.rs',
    inLanguage: 'sr-Cyrl',
    description:
      'Дигитална ризница књижевног насљеђа Републике Српске и Босне и Херцеговине. Канонски писци и архивска грађа.',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'ЗАПИСИ СРПСКЕ',
    url: 'https://zapisi-srpske.rs',
    logo: 'https://zapisi-srpske.rs/ministry-logo.png',
    funder: {
      '@type': 'GovernmentOrganization',
      name: 'Министарство културе Републике Србије',
    },
  };

  return (
    <html
      lang="sr-Cyrl"
      className={`${cormorant.variable} ${manrope.variable} ${sourceSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
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

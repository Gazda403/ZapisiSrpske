import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-[#B3202A] block mb-2">
        № 404 • Непостојећи запис
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#14213D] mb-4">
        Страница није пронађена
      </h1>
      <p className="font-body text-base text-[#5C677D] mb-8 max-w-lg mx-auto">
        Тражени документ или писац није евидентиран у овом дигиталном књижевном архиву.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-[#14213D] text-[#FBFAF7] hover:bg-[#B3202A] font-sans text-xs uppercase tracking-widest transition-colors"
        >
          Почетна страна
        </Link>
        <Link
          href="/pisci"
          className="px-6 py-3 border border-[#14213D]/25 text-[#14213D] hover:border-[#B3202A] hover:text-[#B3202A] font-sans text-xs uppercase tracking-widest transition-colors"
        >
          Каталог писаца
        </Link>
      </div>
    </div>
  );
}


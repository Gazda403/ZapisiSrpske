'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { transliterateToLatin } from '@/lib/transliterate';

export type ScriptMode = 'cyr' | 'lat';

interface ScriptContextType {
  script: ScriptMode;
  toggleScript: (mode?: ScriptMode) => void;
  t: (text: string) => string;
}

const ScriptContext = createContext<ScriptContextType>({
  script: 'cyr',
  toggleScript: () => {},
  t: (text: string) => text,
});

export function ScriptProvider({ children }: { children: React.ReactNode }) {
  const [script, setScript] = useState<ScriptMode>('cyr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('zapisi_srpske_script') as ScriptMode | null;
    if (saved === 'lat' || saved === 'cyr') {
      setScript(saved);
      document.documentElement.lang = saved === 'lat' ? 'sr-Latn' : 'sr-Cyrl';
    } else {
      document.documentElement.lang = 'sr-Cyrl';
    }
  }, []);

  const toggleScript = (mode?: ScriptMode) => {
    const next = mode ? mode : script === 'cyr' ? 'lat' : 'cyr';
    setScript(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zapisi_srpske_script', next);
      document.documentElement.lang = next === 'lat' ? 'sr-Latn' : 'sr-Cyrl';
    }
  };

  const t = (text: string): string => {
    if (!text) return '';
    if (!mounted || script === 'cyr') return text;
    return transliterateToLatin(text);
  };

  return (
    <ScriptContext.Provider value={{ script, toggleScript, t }}>
      <div className="transition-opacity duration-300 ease-in-out">
        {children}
      </div>
    </ScriptContext.Provider>
  );
}

export function useScript() {
  return useContext(ScriptContext);
}

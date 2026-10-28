/**
 * Детерминистичка транслитерација српске ћирилице у латиницу.
 * Подржава правилно пресликавање диграфа (Љ, Њ, Џ) у зависности од тога
 * да ли је цијела ријеч написана великим словима или само почетно слово.
 */

const CYR_TO_LAT_MAP: Record<string, string> = {
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Ђ': 'Đ', 'Е': 'E',
  'Ж': 'Ž', 'З': 'Z', 'И': 'I', 'Ј': 'J', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'Ћ': 'Ć',
  'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Č', 'Ш': 'Š',
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ђ': 'đ', 'е': 'e',
  'ж': 'ž', 'з': 'z', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ћ': 'ć',
  'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'č', 'ш': 'š',
};

export function transliterateToLatin(text: string): string {
  if (!text) return '';

  let result = '';
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const ch = text[i];
    const nextCh = i + 1 < len ? text[i + 1] : '';
    const prevCh = i > 0 ? text[i - 1] : '';

    // Диграфи
    if (ch === 'Љ') {
      const isNextUpper = nextCh && nextCh === nextCh.toUpperCase() && nextCh !== nextCh.toLowerCase();
      const isPrevUpper = prevCh && prevCh === prevCh.toUpperCase() && prevCh !== prevCh.toLowerCase();
      result += (isNextUpper || isPrevUpper) ? 'LJ' : 'Lj';
    } else if (ch === 'Њ') {
      const isNextUpper = nextCh && nextCh === nextCh.toUpperCase() && nextCh !== nextCh.toLowerCase();
      const isPrevUpper = prevCh && prevCh === prevCh.toUpperCase() && prevCh !== prevCh.toLowerCase();
      result += (isNextUpper || isPrevUpper) ? 'NJ' : 'Nj';
    } else if (ch === 'Џ') {
      const isNextUpper = nextCh && nextCh === nextCh.toUpperCase() && nextCh !== nextCh.toLowerCase();
      const isPrevUpper = prevCh && prevCh === prevCh.toUpperCase() && prevCh !== prevCh.toLowerCase();
      result += (isNextUpper || isPrevUpper) ? 'DŽ' : 'Dž';
    } else if (ch === 'љ') {
      result += 'lj';
    } else if (ch === 'њ') {
      result += 'nj';
    } else if (ch === 'џ') {
      result += 'dž';
    } else if (CYR_TO_LAT_MAP[ch]) {
      result += CYR_TO_LAT_MAP[ch];
    } else {
      result += ch;
    }
  }

  return result;
}

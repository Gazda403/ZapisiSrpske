const fs = require('fs');
const path = require('path');

const writers = [
  { slug: 'filip-visnjic', initials: 'ФВ', name: 'Филип Вишњић', years: '1767–1834' },
  { slug: 'vaso-pelagic', initials: 'ВП', name: 'Васо Пелагић', years: '1833–1899' },
  { slug: 'aleksa-santic', initials: 'АШ', name: 'Алекса Шантић', years: '1868–1924' },
  { slug: 'svetozar-corovic', initials: 'СЋ', name: 'Светозар Ћоровић', years: '1875–1919' },
  { slug: 'petar-kocic', initials: 'ПК', name: 'Петар Кочић', years: '1877–1916' },
  { slug: 'jovan-ducic', initials: 'ЈД', name: 'Јован Дучић', years: '1874–1943' },
  { slug: 'ivo-andric', initials: 'ИА', name: 'Иво Андрић', years: '1892–1975' },
  { slug: 'dimitrije-mitrinovic', initials: 'ДМ', name: 'Димитрије Митриновић', years: '1887–1953' },
  { slug: 'vladimir-gacinovic', initials: 'ВГ', name: 'Владимир Гаћиновић', years: '1890–1917' },
  { slug: 'branko-copic', initials: 'БЋ', name: 'Бранко Ћопић', years: '1915–1984' },
  { slug: 'momo-kapor', initials: 'МК', name: 'Момо Капор', years: '1937–2010' },
  { slug: 'svetozar-koljevic', initials: 'СК', name: 'Светозар Кољевић', years: '1930–2016' },
  { slug: 'nasiha-kapidzic-hadzic', initials: 'НК', name: 'Насиха Капиџић-Хаџић', years: '1932–1995' },
  { slug: 'radoslav-bratic', initials: 'РБ', name: 'Радослав Братић', years: '1948–2016' },
  { slug: 'rajko-petrov-nogo', initials: 'РН', name: 'Рајко Петров Ного', years: '1945–2022' },
];

const outDir = path.join(__dirname, '..', 'public', 'portraits');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

writers.forEach(w => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 520" width="400" height="520" fill="none">
  <!-- Neutral tonal background -->
  <rect width="400" height="520" fill="#F4F1EA"/>
  
  <!-- Outer hairline frame -->
  <rect x="12" y="12" width="376" height="496" stroke="#14213D" stroke-opacity="0.25" stroke-width="1" fill="none"/>
  
  <!-- Inner delicate hairline frame -->
  <rect x="20" y="20" width="360" height="480" stroke="#14213D" stroke-opacity="0.12" stroke-width="1" fill="none"/>
  
  <!-- Corner marks -->
  <line x1="28" y1="28" x2="44" y2="28" stroke="#B3202A" stroke-width="1"/>
  <line x1="28" y1="28" x2="28" y2="44" stroke="#B3202A" stroke-width="1"/>
  <line x1="372" y1="28" x2="356" y2="28" stroke="#B3202A" stroke-width="1"/>
  <line x1="372" y1="28" x2="372" y2="44" stroke="#B3202A" stroke-width="1"/>
  <line x1="28" y1="492" x2="44" y2="492" stroke="#B3202A" stroke-width="1"/>
  <line x1="28" y1="492" x2="28" y2="476" stroke="#B3202A" stroke-width="1"/>
  <line x1="372" y1="492" x2="356" y2="492" stroke="#B3202A" stroke-width="1"/>
  <line x1="372" y1="492" x2="372" y2="476" stroke="#B3202A" stroke-width="1"/>

  <!-- Top label -->
  <text x="200" y="68" font-family="'Cormorant Garamond', 'Times New Roman', Georgia, serif" font-size="11" font-weight="500" letter-spacing="4" fill="#5C677D" text-anchor="middle">
    ЗАПИСИ СРПСКЕ • КЊИЖЕВНИ АРХИВ
  </text>
  <line x1="160" y1="78" x2="240" y2="78" stroke="#B3202A" stroke-opacity="0.5" stroke-width="0.75"/>

  <!-- Initials in large Cormorant Garamond inside hairline frame -->
  <g transform="translate(0, 20)">
    <circle cx="200" cy="220" r="90" stroke="#14213D" stroke-opacity="0.15" stroke-width="1" fill="#FBFAF7"/>
    <circle cx="200" cy="220" r="84" stroke="#14213D" stroke-opacity="0.08" stroke-width="0.75" fill="none"/>
    <text x="200" y="244" font-family="'Cormorant Garamond', 'Times New Roman', Georgia, serif" font-size="76" font-weight="400" fill="#14213D" text-anchor="middle" letter-spacing="3">
      ${w.initials}
    </text>
  </g>

  <!-- Writer metadata at bottom -->
  <text x="200" y="420" font-family="'Cormorant Garamond', 'Times New Roman', Georgia, serif" font-size="18" font-weight="600" fill="#14213D" text-anchor="middle" letter-spacing="1">
    ${w.name}
  </text>
  <text x="200" y="444" font-family="'Manrope', sans-serif" font-size="12" font-weight="500" fill="#B3202A" text-anchor="middle" letter-spacing="2">
    ${w.years}
  </text>
  <text x="200" y="468" font-family="'Courier New', monospace" font-size="9" fill="#5C677D" text-anchor="middle" letter-spacing="1">
    [ ПОРТРЕТНИ ФОНД • АРХИВА ]
  </text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${w.slug}.svg`), svg, 'utf-8');
});

console.log('All 15 portrait SVGs generated successfully.');


const { chromium } = require('playwright');

async function screenshot() {
  const browser = await chromium.launch({ headless: true });

  const pages = [
    { url: 'http://localhost:3000/', label: 'home' },
    { url: 'http://localhost:3000/pisci', label: 'pisci' },
    { url: 'http://localhost:3000/pisci/ivo-andric', label: 'andric' },
    { url: 'http://localhost:3000/o-projektu', label: 'o-projektu' },
  ];

  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  for (const p of pages) {
    const page = await desktopCtx.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    const outPath = `C:/Users/Korisnik/Documents/zapisi-${p.label}-desktop.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`✓ Desktop: ${p.label} → ${outPath}`);
    await page.close();
  }
  await desktopCtx.close();

  // Mobile – home only (full page)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const mpage = await mobileCtx.newPage();
  await mpage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await mpage.waitForTimeout(2000);
  const mPath = 'C:/Users/Korisnik/Documents/zapisi-home-mobile.png';
  await mpage.screenshot({ path: mPath, fullPage: true });
  console.log(`✓ Mobile: home → ${mPath}`);
  await mobileCtx.close();

  await browser.close();
  console.log('\nAll screenshots done.');
}

screenshot().catch(e => { console.error(e); process.exit(1); });

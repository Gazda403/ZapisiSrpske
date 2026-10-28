const { chromium } = require('playwright');

async function runScreenshots() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop context (1440x900)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await desktopCtx.newPage();

  // Home full page
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-home-desktop.png', fullPage: true });
  console.log('✓ Desktop: Home full page');

  // Hero screen viewport crop
  await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-hero-desktop.png', fullPage: false });
  console.log('✓ Desktop: Hero viewport');

  // Chapter 1 viewport crop
  const chapter1 = await page.$('#poglavlja');
  if (chapter1) {
    await chapter1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-chapter1-desktop.png', fullPage: false });
    console.log('✓ Desktop: Chapter 1 viewport');
  }

  // Writer index crop
  const indexSec = await page.$('section[aria-label="Индекс канонских аутора"]');
  if (indexSec) {
    await indexSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-index-desktop.png', fullPage: false });
    console.log('✓ Desktop: Index viewport');
  }

  // Timeline crop
  const timelineSec = await page.$('#vremenska-osa');
  if (timelineSec) {
    await timelineSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-timeline-desktop.png', fullPage: false });
    console.log('✓ Desktop: Timeline viewport');
  }

  // Writer detail page: Ivo Andrić
  await page.goto('http://localhost:3000/pisci/ivo-andric', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-andric-desktop.png', fullPage: true });
  console.log('✓ Desktop: Andrić page');

  // Catalogue page: /pisci
  await page.goto('http://localhost:3000/pisci', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-pisci-desktop.png', fullPage: true });
  console.log('✓ Desktop: Pisci catalogue');

  await page.close();
  await desktopCtx.close();

  // 2. Mobile context (390x844)
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  const mpage = await mobileCtx.newPage();
  await mpage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await mpage.waitForTimeout(2000);
  await mpage.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-v3-home-mobile.png', fullPage: true });
  console.log('✓ Mobile: Home full page');

  await mpage.close();
  await mobileCtx.close();

  await browser.close();
  console.log('All v3 screenshots completed successfully.');
}

runScreenshots().catch(e => { console.error(e); process.exit(1); });

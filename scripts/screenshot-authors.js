const { chromium } = require('playwright');

async function testScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await ctx.newPage();

  // 1. Andrić page
  await page.goto('http://localhost:3000/pisci/ivo-andric', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-authors-andric.png', fullPage: true });
  console.log('✓ Andrić screenshot');

  // 2. Timeline view on home
  await page.goto('http://localhost:3000/#vremenska-osa', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const timeline = await page.$('#vremenska-osa');
  if (timeline) {
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-authors-timeline.png', fullPage: false });
    console.log('✓ Timeline screenshot');
  }

  // 3. Scroll Story Chapter 1
  await page.goto('http://localhost:3000/#poglavlja', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const poglavlja = await page.$('#poglavlja');
  if (poglavlja) {
    await poglavlja.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-authors-chapter.png', fullPage: false });
    console.log('✓ Chapter screenshot');
  }

  // 4. Catalogue page with hover
  await page.goto('http://localhost:3000/pisci', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  // Hover first writer link to trigger portrait preview
  const firstWriter = await page.$('a[href="/pisci/filip-visnjic"]');
  if (firstWriter) {
    await firstWriter.hover();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: 'C:/Users/Korisnik/Documents/zapisi-authors-catalogue.png', fullPage: false });
  console.log('✓ Catalogue screenshot');

  await browser.close();
  console.log('Done.');
}

testScreenshots().catch(e => { console.error(e); process.exit(1); });


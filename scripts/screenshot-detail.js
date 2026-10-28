const { chromium } = require('playwright');

async function screenshot() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll to Завичаји section
  const section = await page.$('#zavicaji');
  if (section) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const box = await section.boundingBox();
    if (box) {
      await page.screenshot({
        path: 'C:/Users/Korisnik/Documents/zapisi-zavicaji-crop.png',
        clip: { x: 0, y: box.y - 20, width: 1440, height: Math.min(box.height + 40, 2400) }
      });
      console.log('Завичаји section screenshot done');
    }
  }

  // Screenshot timeline section
  const timeline = await page.$('#timeline');
  if (timeline) {
    await timeline.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box2 = await timeline.boundingBox();
    if (box2) {
      await page.screenshot({
        path: 'C:/Users/Korisnik/Documents/zapisi-timeline-crop.png',
        clip: { x: 0, y: box2.y - 20, width: 1440, height: Math.min(box2.height + 40, 1200) }
      });
      console.log('Timeline section screenshot done');
    }
  }

  // Hero close-up
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: 'C:/Users/Korisnik/Documents/zapisi-hero-crop.png',
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });
  console.log('Hero crop done');

  await browser.close();
}

screenshot().catch(e => { console.error(e); process.exit(1); });

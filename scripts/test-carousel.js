const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // Desktop
  let page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const carousel = await page.$('section[aria-roledescription="carousel"]');
  if (carousel) {
    await carousel.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot-works-desktop-1.png' });

    // Click next arrow
    const nextBtn = await page.$('button[aria-label="Сљедеће дјело"]');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'screenshot-works-desktop-2.png' });
    }
  }

  // Mobile
  page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const mobCarousel = await page.$('section[aria-roledescription="carousel"]');
  if (mobCarousel) {
    await mobCarousel.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshot-works-mobile.png' });
  }

  await browser.close();
  console.log('Test complete');
})();

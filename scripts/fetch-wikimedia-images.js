const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'ZapisiSrpskeArchive/1.0 (https://zapisi-srpske.rs; desk@zapisi-srpske.rs)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    const file = fs.createWriteStream(dest);
    const getReq = (targetUrl) => {
      https.get(targetUrl, { headers: { 'User-Agent': 'ZapisiSrpskeArchive/1.0 (https://zapisi-srpske.rs; desk@zapisi-srpske.rs)' } }, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          getReq(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${targetUrl}' (${response.statusCode})`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    };
    getReq(cleanUrl);
  });
}

async function searchAndDownload(query, filename) {
  const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  const searchRes = await fetchJson(searchUrl);
  if (!searchRes.query || !searchRes.query.search || searchRes.query.search.length === 0) {
    throw new Error(`No results for ${query}`);
  }
  const title = searchRes.query.search[0].title;
  console.log(`Found file: ${title} for query: ${query}`);

  await delay(1200);

  const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata&format=json`;
  const infoRes = await fetchJson(infoUrl);
  const pages = infoRes.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageInfo = pages[pageId].imageinfo[0];

  const fileUrl = imageInfo.url;
  const meta = imageInfo.extmetadata || {};
  const artist = meta.Artist ? meta.Artist.value.replace(/<[^>]+>/g, '').trim() : 'Wikimedia Commons';
  const license = meta.LicenseShortName ? meta.LicenseShortName.value.trim() : 'CC BY-SA 4.0 / Public Domain';
  const desc = meta.ImageDescription ? meta.ImageDescription.value.replace(/<[^>]+>/g, '').trim() : '';

  const filePath = path.join(outDir, filename);
  console.log(`Downloading ${fileUrl} to ${filePath}...`);
  await downloadFile(fileUrl, filePath);
  console.log(`Successfully saved ${filename}`);

  await delay(1500);

  return {
    filename,
    title,
    artist,
    license,
    desc,
    sourceUrl: fileUrl,
  };
}

async function run() {
  const places = [
    { query: 'Mehmed Pasa Sokolovic Bridge', file: 'visegrad.jpg', place: 'Вишеград', writer: 'Иво Андрић' },
    { query: 'Arslanagica most Trebinje', file: 'trebinje.jpg', place: 'Требиње', writer: 'Јован Дучић' },
    { query: 'Tvrdjava Kastel Banja Luka', file: 'banja-luka.jpg', place: 'Бања Лука', writer: 'Петар Кочић' },
    { query: 'Una river Bosnia', file: 'krupa-na-uni.jpg', place: 'Крупа на Уни (Подгрмеч)', writer: 'Бранко Ћопић' },
    { query: 'Stari Most Mostar Neretva', file: 'mostar.jpg', place: 'Мостар', writer: 'Алекса Шантић и Светозар Ћоровић' },
  ];

  const results = [];
  for (const p of places) {
    try {
      console.log(`Processing ${p.place}...`);
      const res = await searchAndDownload(p.query, p.file);
      results.push({ ...p, ...res });
    } catch (e) {
      console.error(`Error fetching ${p.place}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(outDir, 'places-metadata.json'), JSON.stringify(results, null, 2), 'utf-8');
  console.log('Places metadata successfully saved.');
}

run();

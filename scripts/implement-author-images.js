const fs = require('fs');
const path = require('path');

const mappings = [
  { source: "Aleksa_Santic).JPG", slug: "aleksa-santic", credit: "Архивски портрет / Јавно власништво", license: "Јавно власништво" },
  { source: "Branko_Ćopićћ.jpg", slug: "branko-copic", credit: "Архивски портрет / Музеј књижевности", license: "Јавно власништво" },
  { source: "Dimitrije_Mitrinović,_1920.jpg", slug: "dimitrije-mitrinovic", credit: "Архивски портрет из 1920. године", license: "Јавно власништво" },
  { source: "DucicJovan1.jpg", slug: "jovan-ducic", credit: "Архивски портрет / САНУ", license: "Јавно власништво" },
  { source: "Filip_Višnjić_Знаменити_Срби_XIX._века.jpg", slug: "filip-visnjic", credit: "Знаменити Срби XIX века (1901)", license: "Јавно власништво" },
  { source: "IvoAndric.jpg", slug: "ivo-andric", credit: "Архивски портрет / Задужбина Иве Андрића", license: "Јавно власништво" },
  { source: "kapor.jpg", slug: "momo-kapor", credit: "Архивски портрет аутора", license: "Архивска грађа" },
  { source: "Nasiha_Kapidžić-Hadžić.jpg", slug: "nasiha-kapidzic-hadzic", credit: "Архивски портрет / Народна и универзитетска библиотека РС", license: "Архивска грађа" },
  { source: "Nogo.jpg", slug: "rajko-petrov-nogo", credit: "Архивски портрет / САНУ", license: "Архивска грађа" },
  { source: "Petar_Kocic.jpg", slug: "petar-kocic", credit: "Архивски портрет / Музеј Републике Српске", license: "Јавно власништво" },
  { source: "RadoslavBratic.jpg", slug: "radoslav-bratic", credit: "Архивски портрет аутора", license: "Архивска грађа" },
  { source: "SvetozarKoljevic.jpg", slug: "svetozar-koljevic", credit: "Архивски портрет / САНУ", license: "Архивска грађа" },
  { source: "Vasa_Pelagic.jpg", slug: "vaso-pelagic", credit: "Архивски портрет / Историјски архив", license: "Јавно власништво" },
  { source: "Vladimir_Gaćinović_(1890–1917).jpg", slug: "vladimir-gacinovic", credit: "Архивски портрет (1890–1917)", license: "Јавно власништво" },
  { source: "Ćorović_Svetozar.jpg", slug: "svetozar-corovic", credit: "Архивски портрет / Спомен-соба Ћоровића", license: "Јавно власништво" },
];

const sourceDir = path.join(process.cwd(), 'images');
const targetDir = path.join(process.cwd(), 'public', 'portraits');
const writersDir = path.join(process.cwd(), 'content', 'writers');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const item of mappings) {
  const srcPath = path.join(sourceDir, item.source);
  const ext = path.extname(item.source).toLowerCase() === '.jpeg' ? '.jpg' : path.extname(item.source).toLowerCase();
  const normalizedExt = ext === '.jpg' || ext === '.png' ? ext : '.jpg';
  const targetName = `${item.slug}${normalizedExt}`;
  const targetPath = path.join(targetDir, targetName);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, targetPath);
    console.log(`✓ Copied: ${item.source} -> public/portraits/${targetName}`);

    // Update JSON file
    const jsonPath = path.join(writersDir, `${item.slug}.json`);
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      data.image = `/portraits/${targetName}`;
      data.imageCredit = item.credit;
      data.imageLicense = item.license;
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✓ Updated JSON: content/writers/${item.slug}.json`);
    } else {
      console.warn(`! JSON not found: ${jsonPath}`);
    }
  } else {
    console.error(`X File not found: ${srcPath}`);
  }
}

console.log('\nAll author images implemented successfully.');


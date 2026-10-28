export interface Place {
  id: string;
  name: string;
  region: string;
  caption: string;
  writer: string;
  writerSlug: string;
  image: string;
  credit: string;
  license: string;
}

export const PLACES_DATA: Place[] = [
  {
    id: 'visegrad',
    name: 'Вишеград',
    region: 'Подриње',
    caption: 'Мост Мехмед-паше Соколовића на Дрини, овјековјечен у роману Иве Андрића који је 1961. награђен Нобеловом наградом.',
    writer: 'Иво Андрић',
    writerSlug: 'ivo-andric',
    image: '/images/visegrad.jpg',
    credit: 'Фотографија: Pudelek (Marcin Szala) / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  },
  {
    id: 'trebinje',
    name: 'Требиње',
    region: 'Источна Херцеговина',
    caption: 'Арсланагића мост и мирне воде Требишњице подно брда Леутар, завичајни стожер пјесништва и огледа Јована Дучића.',
    writer: 'Јован Дучић',
    writerSlug: 'jovan-ducic',
    image: '/images/trebinje.jpg',
    credit: 'Фотографија: Diego Delso / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  },
  {
    id: 'banja-luka',
    name: 'Бања Лука',
    region: 'Босанска Крајина',
    caption: 'Врбас и древне зидине тврђаве Кастел, средиште крајишке културе одакле су потекли Петар Кочић, Светозар Кољевић и Насиха Капиџић-Хаџић.',
    writer: 'Петар Кочић',
    writerSlug: 'petar-kocic',
    image: '/images/banja-luka.jpg',
    credit: 'Фотографија: ArhistefoBL / Wikimedia Commons',
    license: 'CC0 Јавно власништво',
  },
  {
    id: 'krupa-na-uni',
    name: 'Крупа на Уни',
    region: 'Подгрмеч',
    caption: 'Крајолици ријеке Уне и Хашана под Грмечом, родно мјесто и трајно књижевно уточиште приповиједака Бранка Ћопића.',
    writer: 'Бранко Ћопић',
    writerSlug: 'branko-copic',
    image: '/images/krupa-na-uni.jpg',
    credit: 'Фотографија: Miha Peče / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'mostar',
    name: 'Мостар',
    region: 'Долина Неретве',
    caption: 'Херцеговачки крш крај Неретве и Старог моста, гдје су Алекса Шантић и Светозар Ћоровић 1896. покренули књижевни часопис „Зора“.',
    writer: 'Алекса Шантић и Светозар Ћоровић',
    writerSlug: 'aleksa-santic',
    image: '/images/mostar.jpg',
    credit: 'Фотографија: Ramirez / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
  },
];

export function getWriterPlacePhoto(slug: string) {
  // Direct matches
  if (slug === 'ivo-andric') {
    return {
      image: '/images/visegrad.jpg',
      placeName: 'Вишеград — Мост на Дрини',
      credit: 'Фотографија: Pudelek / Wikimedia Commons',
      license: 'CC BY-SA 3.0',
    };
  }
  if (slug === 'jovan-ducic') {
    return {
      image: '/images/trebinje.jpg',
      placeName: 'Требиње — Леутар и Требишњица',
      credit: 'Фотографија: Diego Delso / Wikimedia Commons',
      license: 'CC BY-SA 3.0',
    };
  }
  if (slug === 'petar-kocic' || slug === 'svetozar-koljevic' || slug === 'nasiha-kapidzic-hadzic') {
    return {
      image: '/images/banja-luka.jpg',
      placeName: 'Бања Лука — Кастел и Врбас',
      credit: 'Фотографија: ArhistefoBL / Wikimedia Commons',
      license: 'CC0 Јавно власништво',
    };
  }
  if (slug === 'branko-copic') {
    return {
      image: '/images/krupa-na-uni.jpg',
      placeName: 'Крупа на Уни — Подгрмеч',
      credit: 'Фотографија: Miha Peče / Wikimedia Commons',
      license: 'CC BY-SA 4.0',
    };
  }
  if (slug === 'aleksa-santic' || slug === 'svetozar-corovic') {
    return {
      image: '/images/mostar.jpg',
      placeName: 'Мостар — Долина Неретве',
      credit: 'Фотографија: Ramirez / Wikimedia Commons',
      license: 'CC BY-SA 4.0',
    };
  }
  if (
    slug === 'momo-kapor' ||
    slug === 'dimitrije-mitrinovic' ||
    slug === 'vladimir-gacinovic' ||
    slug === 'radoslav-bratic'
  ) {
    return {
      image: '/images/trebinje.jpg',
      placeName: 'Источна Херцеговина',
      credit: 'Фотографија: Diego Delso / Wikimedia Commons',
      license: 'CC BY-SA 3.0',
    };
  }

  // Filip Višnjić, Vaso Pelagić, Rajko Petrov Nogo
  return {
    image: '/images/visegrad.jpg',
    placeName: 'Подриње и Романијски плато',
    credit: 'Фотографија: Pudelek / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  };
}

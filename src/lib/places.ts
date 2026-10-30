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

export interface PlacePhotoInfo {
  image: string;
  placeName: string;
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
    image: '/images/places/ivo-andric.jpg',
    credit: 'Фотографија: Pudelek (Marcin Szala) / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  },
  {
    id: 'trebinje',
    name: 'Требиње',
    region: 'Источна Херцеговина',
    caption: 'Херцеговачка Грачаница на брду Црквина изнад Требиња, вјечно почивалиште и завичајни стожер Јована Дучића.',
    writer: 'Јован Дучић',
    writerSlug: 'jovan-ducic',
    image: '/images/places/jovan-ducic.jpg',
    credit: 'Задужбина Јована Дучића у Требињу',
    license: 'Јавно власништво',
  },
  {
    id: 'kocic-zmijanje',
    name: 'Змијање',
    region: 'Босанска Крајина',
    caption: 'Стричићи на Змијању, спомен-подручје и родно огњиште Петра Кочића одакле извире снага крајишке прозе.',
    writer: 'Петар Кочић',
    writerSlug: 'petar-kocic',
    image: '/images/places/petar-kocic.jpg',
    credit: 'Спомен-збирка Петар Кочић, Бања Лука',
    license: 'Јавно власништво',
  },
  {
    id: 'krupa-na-uni',
    name: 'Крупа на Уни',
    region: 'Подгрмеч',
    caption: 'Крајолици ријеке Уне и Хашана под Грмечом, воденица дједа Тривуна и трајно књижевно уточиште Бранка Ћопића.',
    writer: 'Бранко Ћопић',
    writerSlug: 'branko-copic',
    image: '/images/places/branko-copic.jpg',
    credit: 'Завичајно друштво Бранко Ћопић Хашани',
    license: 'CC BY-SA 4.0',
  },
  {
    id: 'mostar',
    name: 'Мостар',
    region: 'Долина Неретве',
    caption: 'Херцеговачки крш крај Неретве и Старог моста, гдје су Алекса Шантић и Светозар Ћоровић 1896. покренули часопис „Зора“.',
    writer: 'Алекса Шантић и Светозар Ћоровић',
    writerSlug: 'aleksa-santic',
    image: '/images/places/aleksa-santic.jpg',
    credit: 'Фотографија: Ramirez / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
  },
];

const WRITER_PLACES_MAP: Record<string, PlacePhotoInfo> = {
  'ivo-andric': {
    image: '/images/places/ivo-andric.jpg',
    placeName: 'Вишеград — Мост Мехмед-паше Соколовића на Дрини',
    credit: 'Фотографија: Pudelek / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  },
  'jovan-ducic': {
    image: '/images/places/jovan-ducic.jpg',
    placeName: 'Требиње — Херцеговачка Грачаница на брду Црквина',
    credit: 'Задужбина Јована Дучића у Требињу',
    license: 'Јавно власништво',
  },
  'petar-kocic': {
    image: '/images/places/petar-kocic.jpg',
    placeName: 'Змијање — Стричићи, спомен-подручје и завичајно огњиште',
    credit: 'Спомен-збирка Петар Кочић, Бања Лука',
    license: 'Јавно власништво',
  },
  'branko-copic': {
    image: '/images/places/branko-copic.jpg',
    placeName: 'Крупа на Уни — Хашани и воденица дједа Тривуна pod Грмечом',
    credit: 'Завичајно друштво Бранко Ћопић Хашани',
    license: 'CC BY-SA 4.0',
  },
  'aleksa-santic': {
    image: '/images/places/aleksa-santic.jpg',
    placeName: 'Мостар — Обале Неретве и завичајни херцеговачки крш',
    credit: 'Фотографија: Ramirez / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
  },
  'svetozar-corovic': {
    image: '/images/places/svetozar-corovic.jpg',
    placeName: 'Мостар — Завичајно поднебље и спомен-кућа Ћоровића',
    credit: 'Фотографија: Ramirez / Wikimedia Commons',
    license: 'CC BY-SA 4.0',
  },
  'filip-visnjic': {
    image: '/images/places/filip-visnjic.jpg',
    placeName: 'Горња Трнова код Угљевика — Спомен-комплекс Филипа Вишњића',
    credit: 'Спомен-комплекс Горња Трнова, Угљевик',
    license: 'Јавно власништво',
  },
  'vaso-pelagic': {
    image: '/images/places/vaso-pelagic.jpg',
    placeName: 'Пелагићево — Спомен-комплекс и језеро у Посавини',
    credit: 'Спомен-подручје Пелагићево',
    license: 'Јавно власништво',
  },
  'momo-kapor': {
    image: '/images/places/momo-kapor.jpg',
    placeName: 'Завичајни херцеговачки предјели и мотиви Моме Капора',
    credit: 'Задужбина Момчило Момо Капор',
    license: 'CC BY-SA 4.0',
  },
  'rajko-petrov-nogo': {
    image: '/images/places/rajko-petrov-nogo.jpg',
    placeName: 'Борија код Калиновика — Загорски планински висови Херцеговине',
    credit: 'Завичајни архив Калиновик',
    license: 'Јавно власништво',
  },
  'radoslav-bratic': {
    image: '/images/places/radoslav-bratic.jpg',
    placeName: 'Брестице код Билеће — Камени завичајни предио источне Херцеговине',
    credit: 'Завичајни фонд Билећа',
    license: 'Јавно власништво',
  },
  'dimitrije-mitrinovic': {
    image: '/images/places/dimitrije-mitrinovic.jpg',
    placeName: 'Доњи Поплат код Берковића — Завичајно поднебље Митриновића',
    credit: 'Архив општине Берковићи',
    license: 'Јавно власништво',
  },
  'vladimir-gacinovic': {
    image: '/images/places/vladimir-gacinovic.jpg',
    placeName: 'Качањ код Билеће — Спомен-окружење Владимира Гаћиновића',
    credit: 'Архив источне Херцеговине',
    license: 'Јавно власништво',
  },
  'svetozar-koljevic': {
    image: '/images/places/svetozar-koljevic.jpg',
    placeName: 'Бања Лука — Древне зидине тврђаве Кастел и Врбас',
    credit: 'Фотографија: ArhistefoBL / Wikimedia Commons',
    license: 'CC0 Јавно власништво',
  },
  'nasiha-kapidzic-hadzic': {
    image: '/images/places/nasiha-kapidzic-hadzic.jpg',
    placeName: 'Бања Лука — Спомен-кућа Насихе Капиџић-Хаџић крај Врбаса',
    credit: 'Фотографија: ArhistefoBL / Wikimedia Commons',
    license: 'CC0 Јавно власништво',
  },
  'staka-skenderova': {
    image: '/images/places/staka-skenderova.jpg',
    placeName: 'Сарајево — Поглед на Миљацку и старо језгро града',
    credit: 'Архивска фото-документација',
    license: '',
  },
  'vidosava-raic': {
    image: '/images/places/vidosava-raic.jpg',
    placeName: 'Прњавор — Поглед на завичајни крај под Љубићем',
    credit: 'Фото-документација завичајног краја',
    license: '',
  },
  'nicifor-ducic': {
    image: '/images/places/nicifor-ducic.jpg',
    placeName: 'Требиње — Долина Требишњице и манастир Дужи',
    credit: 'Задужбинска збирка епархије захумско-херцеговачке',
    license: '',
  },
};

export function getWriterPlacePhoto(slug: string): PlacePhotoInfo {
  if (WRITER_PLACES_MAP[slug]) {
    return WRITER_PLACES_MAP[slug];
  }

  return {
    image: '/images/places/ivo-andric.jpg',
    placeName: 'Вишеград — Мост Мехмед-паше Соколовића на Дрини',
    credit: 'Фотографија: Pudelek / Wikimedia Commons',
    license: 'CC BY-SA 3.0',
  };
}

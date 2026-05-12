import type { UfcWeightClass } from "../../../constants/weights";

export type TournamentType = {
  dateDay: string;
  dateMonth: string;
  place: string;
  name: string;
  weight: UfcWeightClass;
  type: 'NUMBERED' | 'FIGHT NIGHT' | 'ПРОШЕДШИЙ' | 'FREEDOM';
  mainResult: string;
};

const pastTournaments: TournamentType[] = [
  {
    dateDay: '24',
    dateMonth: 'Jan',
    place: 'США',
    name: 'UFC 324: Джастин Гейджи vs Пэдди Пимблетт',
    weight: 'Lightweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Гейджи def. Пимблетт via UD',
  },
  {
    dateDay: '31',
    dateMonth: 'Jan',
    place: 'Австралия',
    name: 'UFC 325: Александр Волкановски vs Диегу Лопес 2',
    weight: 'Featherweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Волкановски def. Лопес via UD',
  },
  {
    dateDay: '7',
    dateMonth: 'Feb',
    place: 'США',
    name: 'UFC Fight Night 266: Марио Баутиста vs Винисиус Оливейра',
    weight: 'Bantamweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Баутиста def. Оливейра via SUB (R2)',
  },
  {
    dateDay: '21',
    dateMonth: 'Feb',
    place: 'США',
    name: 'UFC Fight Night 267: Шон Стрикленд vs Энтони Эрнандес',
    weight: 'Middleweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Стрикленд def. Эрнандес via TKO (R3)',
  },
  {
    dateDay: '28',
    dateMonth: 'Feb',
    place: 'Мексика',
    name: 'UFC Fight Night 268: Брэндон Морено vs Лонэ Кавана',
    weight: 'Flyweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Морено def. Кавана via UD',
  },
  {
    dateDay: '7',
    dateMonth: 'Mar',
    place: 'США',
    name: 'UFC 326: Макс Холлоуэй vs Чарльз Оливейра 2',
    weight: 'Lightweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Холлоуэй def. Оливейра via UD',
  },
  {
    dateDay: '14',
    dateMonth: 'Mar',
    place: 'США',
    name: 'UFC Fight Night 269: Джош Эмметт vs Кевин Вальехос',
    weight: 'Featherweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Эмметт def. Вальехос via TKO (R1)',
  },
  {
    dateDay: '21',
    dateMonth: 'Mar',
    place: 'Великобритания',
    name: 'UFC Fight Night 270: Мовсар Евлоев vs Лерон Мёрфи',
    weight: 'Featherweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Евлоев def. Мёрфи via MD',
  },
  {
    dateDay: '28',
    dateMonth: 'Mar',
    place: 'США, Сиэтл',
    name: 'UFC Fight Night 271: Исраэль Адесанья vs Джо Пайфер',
    weight: 'Middleweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Алекса Грассо vs Мэйси Барбер (ко-мейн ивент)',
  },
  {
    dateDay: '4',
    dateMonth: 'Apr',
    place: 'США, Лас-Вегас',
    name: 'UFC Fight Night 272: Ренату Мойкану vs Крис Данкан',
    weight: 'Lightweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Вирна Жандироба vs Табата Риччи (ко-мейн ивент)',
  },
  {
    dateDay: '11',
    dateMonth: 'Apr',
    place: 'США, Майами',
    name: 'UFC 327: Иржи Прохазка vs Карлос Ульберг',
    weight: 'LightHeavyweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Джошуа Ван vs Тацуро Таира (флайвейт)',
  },
  {
    dateDay: '18',
    dateMonth: 'Apr',
    place: 'Канада, Виннипег',
    name: 'UFC Fight Night 273: Гилберт Бёрнс vs Майк Малотт',
    weight: 'Welterweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Кайлер Филлипс vs Шарль Журден (бой карда)',
  },
  {
    dateDay: '25',
    dateMonth: 'Apr',
    place: 'США, Лас-Вегас',
    name: 'UFC Fight Night 274: Алджамейн Стерлинг vs Юссеф Залал',
    weight: 'Featherweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Остальные бои пока неизвестны',
  },
  {
    dateDay: '2',
    dateMonth: 'May',
    place: 'Австралия, Перт',
    name: 'UFC Fight Night 275: Джек Делла Маддалена vs Карлос Пратес',
    weight: 'Welterweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Бенеил Дариюш vs Куиллан Солкилд (лайтвейt)',
  },
  {
    dateDay: '9',
    dateMonth: 'May',
    place: 'США, Ньюарк',
    name: 'UFC 328: Хамзат Чимаев vs Шон Стрикленд',
    weight: 'Middleweight',
    type: 'ПРОШЕДШИЙ',
    mainResult: 'Александр Волков vs Вальдо Кортес-Акоста (хэвиweight)',
  },
];

const futureTournaments: TournamentType[] = [
  {
    dateDay: '16',
    dateMonth: 'May',
    place: 'США, Лас-Вегас',
    name: 'UFC Fight Night 276: Арнольд Аллен vs Мелкизаэл Коста',
    weight: 'Featherweight',
    type: 'FIGHT NIGHT',
    mainResult: 'Остальные бои пока неизвестны',
  },
  {
    dateDay: '30',
    dateMonth: 'May',
    place: 'Китай, Макао',
    name: 'UFC Fight Night 277: Сун Ядун vs Дейвисон Фигейреду',
    weight: 'Bantamweight',
    type: 'FIGHT NIGHT',
    mainResult: 'Чжан Минъян vs Алонсо Менифилд (полутяжёлый вес)',
  },
  {
    dateDay: '6',
    dateMonth: 'Jun',
    place: 'США, Лас-Вегас',
    name: 'UFC Fight Night 278: Белал Мухаммад vs Габриэл Бонфин',
    weight: 'Welterweight',
    type: 'FIGHT NIGHT',
    mainResult: 'Остальные бои пока неизвестны',
  },
  {
    dateDay: '14',
    dateMonth: 'Jun',
    place: 'США, Вашингтон',
    name: 'UFC Freedom 250: Илия Топурия vs Джастин Гейджи',
    weight: 'Lightweight',
    type: 'FREEDOM',
    mainResult: 'Алекс Перейра vs Сирил Ган (heavyweight)',
  },



  {
    dateDay: '21',
    dateMonth: 'Jun',
    place: 'США, Лас-Вегас',
    name: 'UFC Fight Night 278: Кейпе vs Хоригучи',
    weight: 'Flyweight',
    type: 'FIGHT NIGHT',
    mainResult: 'Остальные бои пока неизвестны',
  },
  {
    dateDay: '27',
    dateMonth: 'Jun',
    place: 'Баку, Азербайджан',
    name: 'UFC Freedom 250: Физиев vs Торрес',
    weight: 'Lightweight',
    type: 'FIGHT NIGHT',
    mainResult: 'Алекс Перейра vs Сирил Ган (heavyweight)',
  },
];

export { futureTournaments, pastTournaments }
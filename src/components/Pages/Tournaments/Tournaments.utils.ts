import type { UfcWeightClass } from "../../../constants/weights";

export type FightEntry = {
  fighter1: string;
  fighter2: string;
  weightClass: string;
  result?: string;        // если бой прошёл
  method?: string;        // TKO R1, SUB R2, UD и т.д.
  isMain?: boolean;
  isTitle?: boolean;
};

export type TournamentType = {
  dateDay: string;
  dateMonth: string;
  place: string;
  name: string;
  weight: UfcWeightClass;
  type: 'NUMBERED' | 'FIGHT NIGHT' | 'ПРОШЕДШИЙ' | 'FREEDOM';
  mainResult: string;
  fights: FightEntry[];
};

const pastTournaments: TournamentType[] = [
  {
    dateDay: '24', dateMonth: 'Jan', place: 'США', type: 'ПРОШЕДШИЙ',
    name: 'UFC 324: Гейджи vs Пимблетт', weight: 'Lightweight',
    mainResult: 'Гейджи def. Пимблетт — UD',
    fights: [
      { fighter1: 'Джастин Гейджи', fighter2: 'Пэдди Пимблетт', weightClass: 'Лёгкий вес', result: 'Гейджи', method: 'UD (R5)', isMain: true },
    ],
  },
  {
    dateDay: '31', dateMonth: 'Jan', place: 'Австралия', type: 'ПРОШЕДШИЙ',
    name: 'UFC 325: Волкановски vs Лопес 2', weight: 'Featherweight',
    mainResult: 'Волкановски def. Лопес — UD',
    fights: [
      { fighter1: 'Александр Волкановски', fighter2: 'Диегу Лопес', weightClass: 'Полулёгкий вес', result: 'Волкановски', method: 'UD (R5)', isMain: true },
    ],
  },
  {
    dateDay: '7', dateMonth: 'Feb', place: 'США', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 266: Баутиста vs Оливейра', weight: 'Bantamweight',
    mainResult: 'Баутиста def. Оливейра — SUB R2',
    fights: [
      { fighter1: 'Марио Баутиста', fighter2: 'Винисиус Оливейра', weightClass: 'Лёгкий наилегчайший вес', result: 'Баутиста', method: 'SUB R2', isMain: true },
    ],
  },
  {
    dateDay: '21', dateMonth: 'Feb', place: 'США', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 267: Стрикленд vs Эрнандес', weight: 'Middleweight',
    mainResult: 'Стрикленд def. Эрнандес — TKO R3',
    fights: [
      { fighter1: 'Шон Стрикленд', fighter2: 'Энтони Эрнандес', weightClass: 'Средний вес', result: 'Стрикленд', method: 'TKO R3', isMain: true },
    ],
  },
  {
    dateDay: '28', dateMonth: 'Feb', place: 'Мексика', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 268: Морено vs Кавана', weight: 'Flyweight',
    mainResult: 'Морено def. Кавана — UD',
    fights: [
      { fighter1: 'Брэндон Морено', fighter2: 'Лонэ Кавана', weightClass: 'Наилегчайший вес', result: 'Морено', method: 'UD (R3)', isMain: true },
    ],
  },
  {
    dateDay: '7', dateMonth: 'Mar', place: 'США', type: 'ПРОШЕДШИЙ',
    name: 'UFC 326: Холлоуэй vs Оливейра 2', weight: 'Lightweight',
    mainResult: 'Холлоуэй def. Оливейра — UD',
    fights: [
      { fighter1: 'Макс Холлоуэй', fighter2: 'Чарльз Оливейра', weightClass: 'Лёгкий вес', result: 'Холлоуэй', method: 'UD (R5)', isMain: true },
    ],
  },
  {
    dateDay: '14', dateMonth: 'Mar', place: 'США', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 269: Эмметт vs Вальехос', weight: 'Featherweight',
    mainResult: 'Эмметт def. Вальехос — TKO R1',
    fights: [
      { fighter1: 'Джош Эмметт', fighter2: 'Кевин Вальехос', weightClass: 'Полулёгкий вес', result: 'Эмметт', method: 'TKO R1', isMain: true },
    ],
  },
  {
    dateDay: '21', dateMonth: 'Mar', place: 'Великобритания', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 270: Евлоев vs Мёрфи', weight: 'Featherweight',
    mainResult: 'Евлоев def. Мёрфи — MD',
    fights: [
      { fighter1: 'Мовсар Евлоев', fighter2: 'Лерон Мёрфи', weightClass: 'Полулёгкий вес', result: 'Евлоев', method: 'MD (R3)', isMain: true },
    ],
  },
  {
    dateDay: '28', dateMonth: 'Mar', place: 'США, Сиэтл', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 271: Адесанья vs Пайфер', weight: 'Middleweight',
    mainResult: 'Адесанья def. Пайфер',
    fights: [
      { fighter1: 'Исраэль Адесанья', fighter2: 'Джо Пайфер', weightClass: 'Средний вес', result: 'Адесанья', method: 'UD', isMain: true },
      { fighter1: 'Алекса Грассо', fighter2: 'Мэйси Барбер', weightClass: 'Женский наилегчайший вес', result: 'Грассо', method: 'UD' },
    ],
  },
  {
    dateDay: '4', dateMonth: 'Apr', place: 'США, Лас-Вегас', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 272: Мойкану vs Данкан', weight: 'Lightweight',
    mainResult: 'Мойкану def. Данкан',
    fights: [
      { fighter1: 'Ренату Мойкану', fighter2: 'Крис Данкан', weightClass: 'Лёгкий вес', result: 'Мойкану', method: 'UD', isMain: true },
      { fighter1: 'Вирна Жандироба', fighter2: 'Табата Риччи', weightClass: 'Женский наилегчайший вес', result: 'Жандироба', method: 'UD' },
    ],
  },
  {
    dateDay: '11', dateMonth: 'Apr', place: 'США, Майами', type: 'ПРОШЕДШИЙ',
    name: 'UFC 327: Прохазка vs Ульберг', weight: 'LightHeavyweight',
    mainResult: 'Прохазка def. Ульберг',
    fights: [
      { fighter1: 'Иржи Прохазка', fighter2: 'Карлос Ульберг', weightClass: 'Полутяжёлый вес', result: 'Прохазка', method: 'TKO R3', isMain: true },
      { fighter1: 'Джошуа Ван', fighter2: 'Тацуро Таира', weightClass: 'Наилегчайший вес', result: 'Снято (травма Ван)', method: '—' },
    ],
  },
  {
    dateDay: '18', dateMonth: 'Apr', place: 'Канада, Виннипег', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 273: Бёрнс vs Малотт', weight: 'Welterweight',
    mainResult: 'Бёрнс def. Малотт',
    fights: [
      { fighter1: 'Гилберт Бёрнс', fighter2: 'Майк Малотт', weightClass: 'Полусредний вес', result: 'Бёрнс', method: 'SUB R2', isMain: true },
      { fighter1: 'Кайлер Филлипс', fighter2: 'Шарль Журден', weightClass: 'Полулёгкий вес', result: 'Журден', method: 'TKO R2' },
    ],
  },
  {
    dateDay: '25', dateMonth: 'Apr', place: 'США, Лас-Вегас', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 274: Стерлинг vs Залал', weight: 'Featherweight',
    mainResult: 'Стерлинг def. Залал',
    fights: [
      { fighter1: 'Алджамейн Стерлинг', fighter2: 'Юссеф Залал', weightClass: 'Полулёгкий вес', result: 'Стерлинг', method: 'UD', isMain: true },
    ],
  },
  {
    dateDay: '2', dateMonth: 'May', place: 'Австралия, Перт', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 275: Делла Маддалена vs Пратес', weight: 'Welterweight',
    mainResult: 'Делла Маддалена def. Пратес',
    fights: [
      { fighter1: 'Джек Делла Маддалена', fighter2: 'Карлос Пратес', weightClass: 'Полусредний вес', result: 'Делла Маддалена', method: 'KO R1', isMain: true },
      { fighter1: 'Бенеил Дариюш', fighter2: 'Куиллан Солкилд', weightClass: 'Лёгкий вес', result: 'Дариюш', method: 'SUB R1' },
    ],
  },
  {
    dateDay: '9', dateMonth: 'May', place: 'США, Ньюарк', type: 'ПРОШЕДШИЙ',
    name: 'UFC 328: Чимаев vs Стрикленд', weight: 'Middleweight',
    mainResult: 'Стрикленд def. Чимаев — SD (новый чемпион!)',
    fights: [
      { fighter1: 'Шон Стрикленд', fighter2: 'Хамзат Чимаев (ч)', weightClass: 'Средний вес — Титул', result: 'Стрикленд', method: 'SD (47–48, 48–47, 48–47)', isMain: true, isTitle: true },
      { fighter1: 'Джошуа Ван (ч)', fighter2: 'Тацуро Таира', weightClass: 'Наилегчайший вес — Титул', result: 'Ван', method: 'TKO R5 (1:32)', isTitle: true },
      { fighter1: 'Александр Волков', fighter2: 'Вальдо Кортес-Акоста', weightClass: 'Тяжёлый вес', result: 'Волков', method: 'UD (30–27, 29–28, 29–28)' },
      { fighter1: 'Шон Брэди', fighter2: 'Хоакин Бакли', weightClass: 'Полусредний вес', result: 'Брэди', method: 'UD (30–25, 30–25, 30–27)' },
      { fighter1: 'Кинг Грин', fighter2: 'Джереми Стивенс', weightClass: 'Лёгкий вес (catchweight)', result: 'Грин', method: 'SUB R1 (4:20)' },
      { fighter1: 'Ярослав Амосов', fighter2: 'Хоэль Альварес', weightClass: 'Полусредний вес', result: 'Амосов', method: 'SUB R2 (1:13)' },
      { fighter1: 'Грант Доусон', fighter2: 'Матеуш Ребецки', weightClass: 'Лёгкий вес', result: 'Доусон', method: 'SUB R3 (4:42)' },
      { fighter1: 'Джим Миллер', fighter2: 'Джаред Гордон', weightClass: 'Лёгкий вес', result: 'Миллер', method: 'SUB R1 (3:29)' },
    ],
  },
  // UFC Fight Night 276 перенесён в прошедшие (прошёл 16 мая 2026)
  {
    dateDay: '16', dateMonth: 'May', place: 'США, Лас-Вегас', type: 'ПРОШЕДШИЙ',
    name: 'UFC Fight Night 276: Аллен vs Коста', weight: 'Featherweight',
    mainResult: 'Аллен def. Коста — UD (50–45, 50–45, 49–46)',
    fights: [
      { fighter1: 'Арнольд Аллен', fighter2: 'Мелкизаэл Коста', weightClass: 'Полулёгкий вес', result: 'Аллен', method: 'UD (50–45, 50–45, 49–46)', isMain: true },
      { fighter1: 'Ду Хо Чой', fighter2: 'Даниэль Сантос', weightClass: 'Полулёгкий вес', result: 'Чой', method: 'TKO R2 (4:29)' },
      { fighter1: 'Хуан Диас', fighter2: 'Малкольм Уэллмейкер', weightClass: 'Лёгкий вес', result: 'Диас', method: 'SUB R2 (4:08)' },
      { fighter1: 'Модестас Букаускас', fighter2: 'Кристиан Эдвардс', weightClass: 'Полутяжёлый вес', result: 'Букаускас', method: 'SD' },
      { fighter1: 'Бернардо Сопай', fighter2: 'Тимоти Куамбу', weightClass: 'Наилегчайший вес', result: 'Сопай', method: 'SUB R2' },
      { fighter1: 'Хаос Уильямс', fighter2: 'Николай Веретенников', weightClass: 'Полутяжёлый вес', result: 'Уильямс', method: 'TKO R1' },
      { fighter1: 'Томас Гант', fighter2: 'Артур Минев', weightClass: 'Тяжёлый вес', result: 'Гант', method: 'TKO R2' },
      { fighter1: 'Кетлен Виейра', fighter2: 'Жаклин Кавальканти', weightClass: 'Женский наилегчайший вес', result: 'Виейра', method: 'UD' },
    ],
  },
];

const futureTournaments: TournamentType[] = [
  {
    dateDay: '30', dateMonth: 'May', place: 'Китай, Макао', type: 'FIGHT NIGHT',
    name: 'UFC Fight Night 277: Сун Ядун vs Фигейреду', weight: 'Bantamweight',
    mainResult: 'Бои анонсированы',
    fights: [
      { fighter1: 'Сун Ядун', fighter2: 'Дейвисон Фигейреду', weightClass: 'Лёгкий наилегчайший вес', isMain: true },
      { fighter1: 'Чжан Минъян', fighter2: 'Алонзо Менифилд', weightClass: 'Полутяжёлый вес' },
      { fighter1: 'Сергей Павлович', fighter2: 'Таллисон Тейшейра', weightClass: 'Тяжёлый вес' },
      { fighter1: 'Кай Асакура', fighter2: 'Камерон Смотерман', weightClass: 'Лёгкий наилегчайший вес' },
      { fighter1: 'Муслим Салихов', fighter2: 'Джейк Мэтьюз', weightClass: 'Полусредний вес' },
      { fighter1: 'Алекс Перес', fighter2: 'Су Мударэджи', weightClass: 'Наилегчайший вес' },
      { fighter1: 'Анджела Хилл', fighter2: 'Сюн Цзиннань', weightClass: 'Женский наилегчайший вес' },
    ],
  },
  {
    dateDay: '6', dateMonth: 'Jun', place: 'США, Лас-Вегас', type: 'FIGHT NIGHT',
    name: 'UFC Fight Night 278: Мухаммад vs Бонфин', weight: 'Welterweight',
    mainResult: 'Бои анонсированы',
    fights: [
      { fighter1: 'Белал Мухаммад', fighter2: 'Габриэл Бонфин', weightClass: 'Полусредний вес', isMain: true },
      { fighter1: 'Джордан Лэвитт', fighter2: 'Жоандерсон Брито', weightClass: 'Полулёгкий вес' },
    ],
  },
  {
    dateDay: '14', dateMonth: 'Jun', place: 'США, Вашингтон', type: 'FREEDOM',
    name: 'UFC Freedom 250: Топурия vs Гейджи', weight: 'Lightweight',
    mainResult: 'Главный кард объявлен',
    fights: [
      { fighter1: 'Илия Топурия (17-0)', fighter2: 'Джастин Гейджи (27-5)', weightClass: 'Лёгкий вес — Титул', isMain: true, isTitle: true },
      { fighter1: 'Алекс Перейра (13-3)', fighter2: 'Сирил Ган (13-2)', weightClass: 'Тяжёлый вес — Промежуточный титул', isTitle: true },
      { fighter1: 'Шон О\'Мэлли (19-3)', fighter2: 'Айеманн Захаби (14-2)', weightClass: 'Лёгкий наилегчайший вес' },
      { fighter1: 'Маурисио Руффи (13-2)', fighter2: 'Майкл Чандлер (23-10)', weightClass: 'Лёгкий вес' },
      { fighter1: 'Бо Никал (8-1)', fighter2: 'Кайл Доукос (17-4)', weightClass: 'Средний вес' },
      { fighter1: 'Диегу Лопес (27-8)', fighter2: 'Стив Гарсия (19-5)', weightClass: 'Полулёгкий вес' },
    ],
  },
  {
    dateDay: '21', dateMonth: 'Jun', place: 'США, Лас-Вегас', type: 'FIGHT NIGHT',
    name: 'UFC Fight Night: Кейпе vs Хоригучи', weight: 'Flyweight',
    mainResult: 'Детали уточняются',
    fights: [
      { fighter1: 'Брендон Мороно', fighter2: 'Данте Леон', weightClass: 'Полусредний вес', isMain: true },
    ],
  },
  {
    dateDay: '27', dateMonth: 'Jun', place: 'Баку, Азербайджан', type: 'FIGHT NIGHT',
    name: 'UFC Fight Night: Физиев vs Торрес', weight: 'Lightweight',
    mainResult: 'Детали уточняются',
    fights: [
      { fighter1: 'Рафаэль Физиев', fighter2: 'Рене Торрес', weightClass: 'Лёгкий вес', isMain: true },
    ],
  },
];

export { futureTournaments, pastTournaments };
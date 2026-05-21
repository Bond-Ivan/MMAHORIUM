// ─── UFC Achievements Data (source: Wikipedia – UFC Hall of Fame) ──────────────

export interface StatRecord {
  rank: number;
  fighter: string;
  value: string | number;
  division?: string;
  extra?: string;
  active?: boolean;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface KeyStat {
  value: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface PPVRecord {
  event: string;
  fighters: string;
  buys: number;
  revenue: string;
}

export interface HallOfFamer {
  name: string;
  year: number;
  nationality: string;
  achievement: string;
}

export interface FightWinger {
  fight: string;
  event: string;
  year: number;
  result: string;
  award?: string;
}

export interface Contributor {
  name: string;
  year: number;
  role: string;
}

export interface FastKO {
  fighter: string;
  opponent: string;
  event: string;
  time: string;
  seconds: number;
}

// ── Ключевые показатели ───────────────────────────────────────────────────────
export const keyStats: KeyStat[] = [
  { value: "2 457", label: "дней",         sublabel: "Рекорд чемпионства — Андерсон Силва", icon: "🏆" },
  { value: "28",    label: "побед",        sublabel: "Рекорд UFC — Джим Миллер",            icon: "🥊" },
  { value: "2.4M",  label: "PPV продаж",   sublabel: "UFC 229: МакГрегор vs Нурмагомедов",  icon: "📺" },
  { value: "16",    label: "нокаутов",     sublabel: "Рекорд — Деррик Льюис",               icon: "💥" },
  { value: "21",    label: "добиваний",    sublabel: "Рекорд — Чарльз Оливейра",            icon: "🎯" },
  { value: "0:05",  label: "сек — нокаут", sublabel: "Масвидал vs Аскрен, UFC 239",         icon: "⚡" },
];

// ── Самые долгие чемпионства ──────────────────────────────────────────────────
export const longestTitleReigns: ChartDataPoint[] = [
  { label: "Андерсон Силва",    value: 2457, color: "#c9a227" },
  { label: "Деметриус Джонсон", value: 2142, color: "#e84118" },
  { label: "Жорж Сен-Пьер",    value: 2064, color: "#0097e6" },
  { label: "Аманда Нуньес",     value: 1981, color: "#8c7ae6" },
  { label: "Хосе Альдо",        value: 1848, color: "#44bd32" },
  { label: "Джон Джонс",        value: 1501, color: "#f39c12" },
];

// ── Победы в титульных боях ───────────────────────────────────────────────────
export const titleBoutWins: ChartDataPoint[] = [
  { label: "Джон Джонс",         value: 16, color: "#c9a227" },
  { label: "Жорж Сен-Пьер",      value: 13, color: "#0097e6" },
  { label: "Деметриус Джонсон",  value: 12, color: "#e84118" },
  { label: "Валентина Шевченко", value: 11, color: "#8c7ae6" },
  { label: "Андерсон Силва",     value: 11, color: "#44bd32" },
  { label: "Аманда Нуньес",      value: 11, color: "#fbc531" },
];

// ── Больше всего побед ────────────────────────────────────────────────────────
export const mostWins: StatRecord[] = [
  { rank: 1, fighter: "Джим Миллер",      value: 28, division: "Лёгкий / Полусредний",  active: true  },
  { rank: 2, fighter: "Чарльз Оливейра",  value: 25, division: "Лёгкий / Полулёгкий",   active: true  },
  { rank: 3, fighter: "Нил Маньи",        value: 24, division: "Полусредний",            active: true  },
  { rank: 4, fighter: "Макс Холлоуэй",    value: 23, division: "Полулёгкий / Лёгкий",   active: true  },
  { rank: 4, fighter: "Дональд Серроне",  value: 23, division: "Лёгкий / Полусредний",  active: false },
  { rank: 4, fighter: "Андрей Арловский", value: 23, division: "Тяжёлый",               active: false },
  { rank: 7, fighter: "Джон Джонс",       value: 22, division: "Тяжёлый / Полутяжёлый", active: false },
  { rank: 7, fighter: "Дастин Порье",     value: 22, division: "Лёгкий",                active: false },
];

// ── Серии побед ───────────────────────────────────────────────────────────────
export const longestWinStreaks: StatRecord[] = [
  { rank: 1, fighter: "Ислам Махачев",       value: 16, division: "Лёгкий",      active: true,  extra: "Активна"   },
  { rank: 1, fighter: "Андерсон Силва",      value: 16, division: "Средний",     active: false, extra: "2006–2013" },
  { rank: 3, fighter: "Камару Усман",        value: 15, division: "Полусредний", active: true,  extra: "2015–2022" },
  { rank: 4, fighter: "Мераб Двалишвили",    value: 14, division: "Легчайший",   active: true,  extra: "2018–2025" },
  { rank: 5, fighter: "Макс Холлоуэй",       value: 13, division: "Полулёгкий",  active: true,  extra: "2014–2019" },
  { rank: 5, fighter: "Жорж Сен-Пьер",       value: 13, division: "Полусредний", active: false, extra: "2007–Рет." },
  { rank: 5, fighter: "Джон Джонс",          value: 13, division: "Полутяжёлый", active: false, extra: "2010–2017" },
  { rank: 5, fighter: "Хабиб Нурмагомедов",  value: 13, division: "Лёгкий",      active: false, extra: "2012–Рет." },
];

// ── Больше всего нокаутов ─────────────────────────────────────────────────────
export const mostKnockouts: StatRecord[] = [
  { rank: 1, fighter: "Деррик Льюис",   value: 16, division: "Тяжёлый",                         active: true  },
  { rank: 2, fighter: "Мэтт Браун",     value: 13, division: "Полусредний",                      active: false },
  { rank: 3, fighter: "Витор Белфорт",  value: 12, division: "Тяжёлый / Полутяжёлый / Средний", active: false },
  { rank: 4, fighter: "Макс Холлоуэй",  value: 11, division: "Полулёгкий",                       active: true  },
  { rank: 4, fighter: "Андерсон Силва", value: 11, division: "Средний",                          active: false },
  { rank: 4, fighter: "Дастин Порье",   value: 11, division: "Лёгкий",                           active: false },
];

// ── Больше всего добиваний ────────────────────────────────────────────────────
export const mostFinishes: StatRecord[] = [
  { rank: 1, fighter: "Чарльз Оливейра", value: 21, division: "Лёгкий",               active: true  },
  { rank: 2, fighter: "Джим Миллер",     value: 20, division: "Лёгкий / Полусредний",  active: true  },
  { rank: 3, fighter: "Деррик Льюис",    value: 16, division: "Тяжёлый",               active: true  },
  { rank: 3, fighter: "Дональд Серроне", value: 16, division: "Лёгкий / Полусредний",  active: false },
  { rank: 5, fighter: "Висенте Луке",    value: 15, division: "Полусредний",           active: true  },
  { rank: 5, fighter: "Дастин Порье",    value: 15, division: "Лёгкий",                active: false },
];

// ── Молниеносные нокауты ──────────────────────────────────────────────────────
export const fastestKnockouts: FastKO[] = [
  { fighter: "Хорхе Масвидал",  opponent: "Бен Аскрен",         event: "UFC 239",           time: "0:05", seconds: 5  },
  { fighter: "Дуэйн Людвиг",    opponent: "Джонатан Гуле",      event: "UFC Fight Night 3", time: "0:06", seconds: 6  },
  { fighter: "Тодд Даффи",      opponent: "Тим Хейг",           event: "UFC 102",           time: "0:07", seconds: 7  },
  { fighter: "Райан Джиммо",    opponent: "Энтони Перош",       event: "UFC 149",           time: "0:07", seconds: 7  },
  { fighter: "Т. МакКинни",     opponent: "Мэтт Фревола",       event: "UFC 263",           time: "0:07", seconds: 7  },
  { fighter: "Конор МакГрегор", opponent: "Хосе Альдо (титул)", event: "UFC 194",           time: "0:13", seconds: 13 },
];

// ── PPV рекорды ───────────────────────────────────────────────────────────────
export const ppvRecords: PPVRecord[] = [
  { event: "UFC 229", fighters: "МакГрегор vs Нурмагомедов", buys: 2400000, revenue: "$180M" },
  { event: "UFC 202", fighters: "МакГрегор vs Диас 2",       buys: 1650000, revenue: "$90M"  },
  { event: "UFC 100", fighters: "Леснар vs Мир 2",           buys: 1600000, revenue: "$82M"  },
  { event: "UFC 196", fighters: "МакГрегор vs Диас",         buys: 1500000, revenue: "$80M"  },
  { event: "UFC 194", fighters: "МакГрегор vs Альдо",        buys: 1400000, revenue: "$80M"  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  ЗАЛ СЛАВЫ UFC — все крылья
// ══════════════════════════════════════════════════════════════════════════════

// ── Pioneer Wing ──────────────────────────────────────────────────────────────
export const pioneerWing: HallOfFamer[] = [
  { name: "Ройс Грейси",           year: 2003, nationality: "🇧🇷", achievement: "Победитель турниров UFC 1, 2, 4 — больше всех побед на турнирах (3)" },
  { name: "Кен Шемрок",            year: 2003, nationality: "🇺🇸", achievement: "Первый чемпион в суперфайтах UFC, 2 защиты" },
  { name: "Дэн Северн",            year: 2005, nationality: "🇺🇸", achievement: "Чемпион UFC в суперфайтах, победитель UFC 5 и Ultimate Ultimate 1995" },
  { name: "Рэнди Кутюр",           year: 2006, nationality: "🇺🇸", achievement: "6 чемпионских царствований — рекорд UFC; самый возрастной чемпион (45 лет)" },
  { name: "Марк Коулман",          year: 2008, nationality: "🇺🇸", achievement: "Первый чемпион UFC в тяжёлом весе, победитель UFC 10 и 11" },
  { name: "Чак Лидделл",           year: 2009, nationality: "🇺🇸", achievement: "Чемпион UFC в полутяжёлом весе, рекорд 7 нокаутов подряд" },
  { name: "Мэтт Хьюз",             year: 2010, nationality: "🇺🇸", achievement: "Двукратный чемпион UFC в полусреднем весе, 7 защит" },
  { name: "Тито Ортис",            year: 2012, nationality: "🇺🇸", achievement: "Чемпион UFC в полутяжёлом весе, 5 защит" },
  { name: "Пэт Милетич",           year: 2014, nationality: "🇺🇸", achievement: "Первый чемпион UFC в полусреднем весе, 4 защиты" },
  { name: "Бас Рюттен",            year: 2015, nationality: "🇳🇱", achievement: "Чемпион UFC в тяжёлом весе" },
  { name: "Антониу Родригу Ногейра", year: 2016, nationality: "🇧🇷", achievement: "Чемпион Pride в тяжёлом весе, временный чемпион UFC" },
  { name: "Дон Фрай",              year: 2016, nationality: "🇺🇸", achievement: "Победитель UFC 8 и Ultimate Ultimate 1996" },
  { name: "Морис Смит",            year: 2017, nationality: "🇺🇸", achievement: "Чемпион UFC в тяжёлом весе, 1 защита" },
  { name: "Кадзуси Сакурабо",      year: 2017, nationality: "🇯🇵", achievement: "Победитель турнира UFC Japan в тяжёлом весе" },
  { name: "Мэтт Серра",            year: 2018, nationality: "🇺🇸", achievement: "Чемпион UFC в полусреднем весе, победитель TUF 4" },
  { name: "Рич Франклин",          year: 2019, nationality: "🇺🇸", achievement: "Чемпион UFC в среднем весе, 2 защиты" },
  { name: "Кевин Рэндлман",        year: 2021, nationality: "🇺🇸", achievement: "Чемпион UFC в тяжёлом весе (посмертно)" },
  { name: "Андерсон Силва",        year: 2023, nationality: "🇧🇷", achievement: "Чемпион среднего веса, 2 457 дней — рекорд; 16 побед подряд" },
  { name: "Йенс Пулвер",           year: 2023, nationality: "🇺🇸", achievement: "Первый чемпион UFC в лёгком весе, 2 защиты" },
  { name: "Вандерлей Силва",       year: 2024, nationality: "🇧🇷", achievement: "Чемпион Pride в среднем весе, 22 победы — рекорд Pride" },
  { name: "Витор Белфорт",         year: 2025, nationality: "🇧🇷", achievement: "Чемпион UFC в полутяжёлом весе, 13 добиваний в 1-м раунде — рекорд" },
  { name: "Марк Керр",             year: 2025, nationality: "🇺🇸", achievement: "Победитель UFC 14 и UFC 15, чемпион NCAA Division I" },
];

// ── Modern Wing ───────────────────────────────────────────────────────────────
export const modernWing: HallOfFamer[] = [
  { name: "Форрест Гриффин",      year: 2013, nationality: "🇺🇸", achievement: "Победитель TUF 1, чемпион UFC в полутяжёлом весе" },
  { name: "БиДжей Пенн",          year: 2015, nationality: "🇺🇸", achievement: "Чемпион в двух весах: полусредний + лёгкий" },
  { name: "Ураайя Фэйбер",        year: 2017, nationality: "🇺🇸", achievement: "Чемпион WEC в полулёгком весе, ×5 защит" },
  { name: "Ронда Роузи",          year: 2018, nationality: "🇺🇸", achievement: "Первая женщина-чемпион UFC, ×6 защит" },
  { name: "Рашад Эванс",          year: 2019, nationality: "🇺🇸", achievement: "Чемпион UFC в полутяжёлом весе, победитель TUF 2" },
  { name: "Майкл Бисппинг",       year: 2019, nationality: "🇬🇧", achievement: "Чемпион UFC в среднем весе, 16 побед — рекорд дивизиона" },
  { name: "Жорж Сен-Пьер",        year: 2021, nationality: "🇨🇦", achievement: "Чемпион в двух весах, 13 побед в титульных боях" },
  { name: "Дэниел Кормье",        year: 2022, nationality: "🇺🇸", achievement: "Чемпион в двух весах: полутяжёлый + тяжёлый" },
  { name: "Хабиб Нурмагомедов",   year: 2022, nationality: "🇷🇺", achievement: "29-0, непобеждён, чемпион UFC в лёгком весе" },
  { name: "Дональд Серроне",      year: 2023, nationality: "🇺🇸", achievement: "23 победы, 48 боёв в Zuffa — абсолютный рекорд" },
  { name: "Хосе Альдо",           year: 2023, nationality: "🇧🇷", achievement: "Чемпион UFC в полулёгком весе — 1 848 дней, ×7 защит" },
  { name: "Маурисиу Руа",         year: 2024, nationality: "🇧🇷", achievement: "Чемпион UFC в полутяжёлом весе, победитель Pride GP 2005" },
  { name: "Йоанна Енджейчик",     year: 2024, nationality: "🇵🇱", achievement: "Чемпион UFC в женском полусреднем весе, ×5 защит" },
  { name: "Фрэнки Эдгар",         year: 2024, nationality: "🇺🇸", achievement: "Чемпион UFC в лёгком весе, ×3 защиты" },
  { name: "Робби Лоулер",         year: 2025, nationality: "🇺🇸", achievement: "Чемпион UFC в полусреднем весе, 2 боя года (2014, 2015)" },
  { name: "Аманда Нуньес",        year: 2025, nationality: "🇧🇷", achievement: "Чемпион в 2 весах одновременно, 3 940 дней — рекорд всех времён" },
  { name: "Доминик Круз",         year: 2026, nationality: "🇺🇸", achievement: "Двукратный чемпион UFC в легчайшем весе, ×3 защиты" },
  { name: "Деметриус Джонсон",    year: 2026, nationality: "🇺🇸", achievement: "11 защит подряд — рекорд UFC, чемпион UFC наилегчайшего веса" },
  { name: "Крис Вейдман",         year: 2026, nationality: "🇺🇸", achievement: "Чемпион UFC в среднем весе, прервал серию Андерсона Силвы" },
];

// ── Contributors Wing ─────────────────────────────────────────────────────────
export const contributorsWing: Contributor[] = [
  { name: "Чарльз Льюис (Mask)",  year: 2009, role: "Основатель Tapout — первого крупного бренда ММА" },
  { name: "Джефф Блатник",        year: 2015, role: "Комментатор и комиссар UFC, помог легализовать ММА" },
  { name: "Боб Мейровиц",         year: 2016, role: "Со-основатель и владелец UFC (с UFC 6 по 2001 год)" },
  { name: "Джо Силва",            year: 2017, role: "Матчмейкер UFC с 1997 по 2016 год" },
  { name: "Брюс Коннал",          year: 2018, role: "ТВ-продюсер UFC с 1997 по 2018 год" },
  { name: "Арт Дэви",             year: 2018, role: "Со-основатель UFC, первый матчмейкер (UFC 1–5)" },
  { name: "Марк Рэтнер",          year: 2021, role: "Вице-президент UFC, легализовал ММА во всех 50 штатах" },
  { name: "Крейг Пилигян",        year: 2025, role: "Создатель шоу The Ultimate Fighter (2005)" },
  { name: "Томас Гербаси",        year: 2026, role: "Главный редактор UFC.com, ключевой историк ММА" },
];

// ── Fight Wing ────────────────────────────────────────────────────────────────
export const fightWing: FightWinger[] = [
  { fight: "Гриффин vs Боннар I",         event: "TUF 1 Finale",   year: 2013, result: "Победа Гриффина (раздельное решение)",          award: "Бой года 2005" },
  { fight: "Хьюз vs Тригг II",            event: "UFC 52",         year: 2015, result: "Победа Хьюза (сабмишн, 1-й раунд)",             award: "Сабмишн года 2005" },
  { fight: "Коулман vs Уильямс",          event: "UFC 17",         year: 2016, result: "Победа Уильямса (нокаут ударом ноги в голову)", award: "Крупнейшая сенсация" },
  { fight: "Руа vs Хендерсон I",          event: "UFC 139",        year: 2018, result: "Победа Хендерсона (единогласное решение)",      award: "Бой года 2011" },
  { fight: "Санчес vs Гуида",             event: "TUF: USA vs UK", year: 2019, result: "Победа Санчеса (раздельное решение)",           award: "Бой года 2009" },
  { fight: "Джонс vs Густафссон I",       event: "UFC 165",        year: 2021, result: "Победа Джонса (единогласное решение)",          award: "Бой года 2013" },
  { fight: "Суонсон vs Ду-Хо Чой",       event: "UFC 206",        year: 2022, result: "Победа Суонсона (единогласное решение)",        award: "Бой года 2016" },
  { fight: "Лоулер vs Макдональд II",     event: "UFC 189",        year: 2023, result: "Победа Лоулера (ТКО, 5-й раунд)",              award: "Бой года 2015" },
  { fight: "Силва vs Соннен I",           event: "UFC 117",        year: 2024, result: "Победа Силвы (сабмишн-треугольник, 5-й раунд)", award: "Бой года 2010" },
  { fight: "Адесанья vs Гастелум",        event: "UFC 236",        year: 2025, result: "Победа Адесаньи (единогласное решение)",        award: "Бой года 2019" },
  { fight: "Чжан Вэйли vs Енджейчик I",  event: "UFC 248",        year: 2026, result: "Победа Чжан (раздельное решение)",              award: "Бой года 2020" },
];
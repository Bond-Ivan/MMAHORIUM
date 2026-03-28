export const UfcWeightClass = {
  Strawweight: "Минимальный вес до 52 кг",
  Flyweight: "Наилегчайший вес до 57 кг",
  Bantamweight: "Легчайший вес до 61 кг",
  Featherweight: "Полулёгкий вес до 66 кг",
  Lightweight: "Лёгкий вес до 70 кг",
  Welterweight: "Полусредний до вес 77 кг",
  Middleweight: "Средний вес до 84 кг",
  LightHeavyweight: "Полутяжёлый вес до 93 кг",
  Heavyweight: "Тяжёлый вес до 120 кг",
} as const;

export type UfcWeightClass = keyof typeof UfcWeightClass;
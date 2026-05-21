export const UfcWeightClass = {
  Flyweight: "flyweight",
  Bantamweight: "bantamweight",
  Featherweight: "featherweight",
  Lightweight: "lightweight",
  Welterweight: "welterweight",
  Middleweight: "middleweight",
  LightHeavyweight: "lightHeavyweight",
  Heavyweight: "heavyweight",
} as const;

export type UfcWeightClass = keyof typeof UfcWeightClass;
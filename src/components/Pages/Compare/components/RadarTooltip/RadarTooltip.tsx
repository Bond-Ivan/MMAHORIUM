import type { ReactElement } from "react";
import styles from "./RadarTooltip.module.css";
import type { FighterType } from "../../../../../types/fighter";

type RadarTooltipProps = {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
  leftFighter: FighterType;
  rightFighter: FighterType;
  getWinRate: (fighter: FighterType) => number;
};

function RadarTooltip({
  active,
  payload,
  label,
  leftFighter,
  rightFighter,
  getWinRate,
}: RadarTooltipProps): ReactElement | null {
  if (!active || !payload?.length) return null;

  const getRealValue = (name: string, stat: string): string => {
    const fighter = name === leftFighter.name ? leftFighter : rightFighter;
    switch (stat) {
      case "Возраст": return `${fighter.age} лет`;
      case "Рост":    return `${fighter.height} см`;
      case "Вес":     return `${fighter.weight} кг`;
      case "Reach":   return `${fighter.armSpan} см`;
      case "KO":      return `${fighter.KO}`;
      case "Win %":   return `${getWinRate(fighter)}%`;
      default:        return "—";
    }
  };

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className={styles.row}
          style={{ color: entry.name === leftFighter.name ? "#ff6b2c" : "#3b82f6" }}
        >
          {entry.name} : {getRealValue(entry.name, label ?? "")}
        </p>
      ))}
    </div>
  );
}

export default RadarTooltip;
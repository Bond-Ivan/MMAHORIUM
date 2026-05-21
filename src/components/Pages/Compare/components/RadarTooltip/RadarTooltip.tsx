import type { ReactElement } from "react";
import styles from "./RadarTooltip.module.css";
import type { FighterType } from "../../../../../types/fighter";
import { useLang } from "../../../../../hooks/useLang";

type RadarTooltipPayloadItem = {
  name: string;
  value: number;
  payload?: {
    stat?: string;
    statKey?: string;
  };
};

type RadarTooltipProps = {
  active?: boolean;
  payload?: RadarTooltipPayloadItem[];
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
  const { t } = useLang();

  if (!active || !payload?.length) return null;

  const getRealValue = (name: string, statKey: string): string => {
    const fighter = name === leftFighter.name ? leftFighter : rightFighter;

    switch (statKey) {
      case "age":
        return `${fighter.age}${t("compare.units.years")}`;
      case "height":
        return `${fighter.height}${t("compare.units.cm")}`;
      case "weight":
        return `${fighter.weight}${t("compare.units.kg")}`;
      case "reach":
        return `${fighter.armSpan}${t("compare.units.cm")}`;
      case "ko":
        return `${fighter.KO}`;
      case "winRate":
        return `${getWinRate(fighter)}%`;
      default:
        return "—";
    }
  };

  const tooltipTitle = payload[0]?.payload?.stat ?? label ?? "";

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{tooltipTitle}</p>
      {payload.map((entry, i) => {
        const statKey = entry.payload?.statKey ?? "";

        return (
          <p
            key={i}
            className={styles.row}
            style={{ color: entry.name === leftFighter.name ? "#ff6b2c" : "#3b82f6" }}
          >
            {entry.name} : {getRealValue(entry.name, statKey)}
          </p>
        );
      })}
    </div>
  );
}

export default RadarTooltip;
import type { ReactElement } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styles from "./CompareRadar.module.css";
import RadarTooltip from "../RadarTooltip/RadarTooltip";
import type { FighterType } from "../../../../../types/fighter";

type RadarPoint = {
  statKey: string;
  stat: string;
  A: number;
  B: number;
  fullMark: number;
};

type CompareRadarProps = {
  radarData: RadarPoint[];
  leftFighter: FighterType;
  rightFighter: FighterType;
  getWinRate: (fighter: FighterType) => number;
};

function CompareRadar({
  radarData,
  leftFighter,
  rightFighter,
  getWinRate,
}: CompareRadarProps): ReactElement {
  return (
    <div className={styles.chartWrap}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="stat" tick={{ fill: "#c9d2e3", fontSize: 13 }} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Tooltip
            content={
              <RadarTooltip
                leftFighter={leftFighter}
                rightFighter={rightFighter}
                getWinRate={getWinRate}
              />
            }
          />
          <Radar
            name={leftFighter.name}
            dataKey="A"
            stroke="#ff6b2c"
            fill="#ff6b2c"
            fillOpacity={0.35}
          />
          <Radar
            name={rightFighter.name}
            dataKey="B"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.28}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CompareRadar;
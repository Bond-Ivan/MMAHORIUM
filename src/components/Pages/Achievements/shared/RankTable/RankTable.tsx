import type { ReactElement } from "react";
import styles from "./RankTable.module.css";
import type { StatRecord } from "../../utils/achievementsData";

interface Props {
  rows: StatRecord[];
  valueLabel: string;
  valueKey: keyof StatRecord;
  extraKey?: keyof StatRecord;
}

export default function RankTable({ rows, valueLabel, valueKey, extraKey }: Props): ReactElement {
  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>#</span>
        <span>Боец</span>
        <span>{valueLabel}</span>
      </div>
      {rows.map((row, i) => (
        <div key={i} className={`${styles.row} ${row.active ? styles.active : ""}`}>
          <span className={styles.rank}>{row.rank}</span>
          <div className={styles.fighter}>
            <span className={styles.name}>{row.fighter}</span>
            <span className={styles.division}>{row.division}</span>
            {extraKey && row[extraKey] && (
              <span className={styles.extra}>{String(row[extraKey])}</span>
            )}
          </div>
          <span className={styles.value}>{String(row[valueKey])}</span>
        </div>
      ))}
    </div>
  );
}
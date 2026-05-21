import type { ReactElement } from "react";

import styles from "./SpeedTable.module.css";
import type { FastKO } from "../../utils/achievementsData";

interface Props { data: FastKO[]; }

export default function SpeedTable({ data }: Props): ReactElement {
  const max = Math.max(...data.map(d => d.seconds));

  return (
    <div className={styles.wrap}>
      {data.map((d, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.time}>
            <span className={styles.timeVal}>{d.time}</span>
            <span className={styles.timeLabel}>сек</span>
          </div>
          <div className={styles.info}>
            <div className={styles.fighters}>
              <span className={styles.winner}>{d.fighter}</span>
              <span className={styles.vs}>vs</span>
              <span className={styles.loser}>{d.opponent}</span>
            </div>
            <span className={styles.event}>{d.event}</span>
            <div className={styles.bar}>
              <div
                className={styles.barFill}
                style={{ width: `${(d.seconds / max) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
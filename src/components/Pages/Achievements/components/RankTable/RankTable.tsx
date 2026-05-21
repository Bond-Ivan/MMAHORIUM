import type { ReactElement } from "react";
import styles from "./RankTable.module.css";
import type { StatRecord } from "../../utils/achievementsData";
import { useLang } from "../../../../../hooks/useLang";

interface Props {
  rows: StatRecord[];
  valueLabel: string;
  valueKey: keyof StatRecord;
  extraKey?: keyof StatRecord;
}

export default function RankTable({
  rows,
  valueLabel,
  valueKey,
  extraKey,
}: Props): ReactElement {
  const { t } = useLang();

  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <span>#</span>
        <span>{t("achievements.labels.fighter")}</span>
        <span>{valueLabel}</span>
      </div>

      {rows.map((row, i) => (
        <div key={i} className={`${styles.row} ${row.active ? styles.active : ""}`}>
          <span className={styles.rank}>{row.rank}</span>

          <div className={styles.fighter}>
            <span className={styles.name}>{row.fighter}</span>
            <span className={styles.division}>
              {row.divisionKey ? t(row.divisionKey) : ""}
            </span>
            {extraKey && row[extraKey] && (
              <span className={styles.extra}>{t(String(row[extraKey]))}</span>
            )}
          </div>

          <span className={styles.value}>{String(row[valueKey])}</span>
        </div>
      ))}
    </div>
  );
}
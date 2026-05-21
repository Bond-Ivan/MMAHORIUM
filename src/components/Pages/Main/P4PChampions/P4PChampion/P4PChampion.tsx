import type { ReactElement } from "react";
import styles from "./P4PChampion.module.css";
import { useLang } from "../../../../../hooks/useLang";
import type { P4PWeightClass } from "../P4PChampions";

type P4PChampionProps = {
  rank: number;
  name: string;
  nickname: string | null;
  weightClass: P4PWeightClass;
  record: string | null;
};

function P4PChampion({
  rank,
  name,
  nickname,
  weightClass,
  record,
}: P4PChampionProps): ReactElement {
  const { t } = useLang();

  const translatedWeightClass = t(`fighters.categories.${weightClass}`);

  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        <div className={styles.raiting}>{rank}</div>

        <div className={styles.info}>
          <h3 className={styles.name}>
            {name}{" "}
            {nickname && <span className={styles.nickname}>{nickname}</span>}
          </h3>

          <p className={styles.weight}>{translatedWeightClass}</p>
        </div>
      </div>

      {record && <p className={styles.record}>{record}</p>}
    </li>
  );
}

export default P4PChampion;
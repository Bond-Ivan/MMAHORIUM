import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./P4PChampions.module.css";
import P4PChampion from "./P4PChampion/P4PChampion";
import P4PChampionsArray from "./P4PChampions.utils";
import { useLang } from "../../../../hooks/useLang";

export type P4PWeightClass =
  | "flyweight"
  | "bantamweight"
  | "featherweight"
  | "lightweight"
  | "welterweight"
  | "middleweight"
  | "lightHeavyweight"
  | "heavyweight";

export type P4PFighter = {
  p4pRank: number;
  name: string;
  nickname: string | null;
  weightClass: P4PWeightClass;
  record: string | null;
};

function P4PChampions(): ReactElement {
  const { t } = useLang();

  return (
    <section className={styles.container}>
      <div className={styles.top}>
        <h2 className={styles.title}>
          {t("home.p4p.title")} <span className={styles.pretitle}>P4P</span>
        </h2>

        <Link to="/fighters" className={styles.link}>
          {t("home.p4p.allFighters")}
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {P4PChampionsArray.map((fighter) => (
            <P4PChampion
              key={fighter.p4pRank}
              rank={fighter.p4pRank}
              name={fighter.name}
              nickname={fighter.nickname}
              weightClass={fighter.weightClass}
              record={fighter.record}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default P4PChampions;
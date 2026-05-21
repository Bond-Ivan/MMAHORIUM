import { useMemo, useState, type ReactElement } from "react";
import styles from "./Tournaments.module.css";
import {
  futureTournaments,
  pastTournaments,
  type TournamentType,
} from "./Tournaments.utils";
import Tournament from "./Tournament/Tournament";
import Footer from "../../Footer/Footer";
import { useLang } from "../../../hooks/useLang";

function Tournaments(): ReactElement {
  const { t } = useLang();

  const [isFutureTournaments, setIsFutureTournaments] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const list = useMemo<TournamentType[]>(() => {
    if (isFutureTournaments) return futureTournaments;

    return [...pastTournaments].reverse();
  }, [isFutureTournaments]);

  const handleShowFuture = () => {
    setIsFutureTournaments(true);
    setAnimationKey((prev) => prev + 1);
  };

  const handleShowPast = () => {
    setIsFutureTournaments(false);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>
          {t("tournaments.title")}{" "}
          <span className={styles.pretitle}>{t("tournaments.year")}</span>
        </h2>

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${isFutureTournaments ? styles.buttonActive : ""
              }`}
            onClick={handleShowFuture}
          >
            {t("tournaments.future")}
          </button>

          <button
            className={`${styles.button} ${!isFutureTournaments ? styles.buttonActive : ""
              }`}
            onClick={handleShowPast}
          >
            {t("tournaments.past")}
          </button>
        </div>

        <ul className={styles.list} key={animationKey}>
          {list.map((tournament: TournamentType, index) => (
            <Tournament index={index} key={index} item={tournament} />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default Tournaments;
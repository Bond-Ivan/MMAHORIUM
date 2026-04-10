import { useMemo, useState, type ReactElement } from "react";
import styles from "./Tournaments.module.css";
import {
  futureTournaments,
  pastTournaments,
  type TournamentType,
} from "./Tournaments.utils";
import Tournament from "./Tournament/Tournament";
import Footer from "../../Footer/Footer";

function Tournaments(): ReactElement {
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
          Турниры <span className={styles.pretitle}> 2026</span>
        </h2>

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${isFutureTournaments ? styles.buttonActive : ""
              }`}
            onClick={handleShowFuture}
          >
            Предстоящие
          </button>

          <button
            className={`${styles.button} ${!isFutureTournaments ? styles.buttonActive : ""
              }`}
            onClick={handleShowPast}
          >
            Прошедшие
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
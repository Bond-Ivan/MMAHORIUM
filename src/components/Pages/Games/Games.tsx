import { useEffect, useState, type ReactElement } from "react";
import styles from "./Games.module.css";
import Footer from "../../Footer/Footer";
import { useLang } from "../../../hooks/useLang";

interface Game {
  id: string;
  icon: string;
  file: string;
}

const BASE = import.meta.env.BASE_URL;

const GAMES: Game[] = [
  {
    id: "maze",
    icon: "🥊",
    file: `${BASE}games/mma-maze.html`,
  },
  {
    id: "career",
    icon: "🏆",
    file: `${BASE}games/mma-career.html`,
  },
  {
    id: "trivia",
    icon: "🧠",
    file: `${BASE}games/mma-trivia.html`,
  },
  {
    id: "dash",
    icon: "🏃",
    file: `${BASE}games/mma-dash.html`,
  },
];

function Games(): ReactElement {
  const { t } = useLang();
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const openGame = (game: Game) => {
    setActiveGame(game);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "hidden";
  };

  const closeGame = () => {
    setActiveGame(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.title}>{t("games.title")}</h2>

        <p className={styles.subtitle}>{t("games.subtitle")}</p>

        <ul className={styles.grid}>
          {GAMES.map((game) => (
            <li key={game.id} className={styles.card}>
              <div className={styles.cardIcon}>{game.icon}</div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {t(`games.items.${game.id}.title`)}
                </h3>

                <p className={styles.cardDesc}>
                  {t(`games.items.${game.id}.description`)}
                </p>

                <div className={styles.tags}>
                  <span className={styles.tag}>
                    {t(`games.items.${game.id}.tag1`)}
                  </span>
                  <span className={styles.tag}>
                    {t(`games.items.${game.id}.tag2`)}
                  </span>
                  <span className={styles.tag}>
                    {t(`games.items.${game.id}.tag3`)}
                  </span>
                </div>
              </div>

              <button className={styles.playBtn} onClick={() => openGame(game)}>
                {t("games.play")}
              </button>
            </li>
          ))}
        </ul>
      </main>

      {activeGame && (
        <div className={styles.fullscreen}>
          <div className={styles.gameBar}>
            <span className={styles.gameBarTitle}>
              {activeGame.icon} {t(`games.items.${activeGame.id}.title`)}
            </span>

            <button className={styles.exitBtn} onClick={closeGame}>
              {t("games.exit")}
            </button>
          </div>

          <iframe
            className={styles.gameFrame}
            src={activeGame.file}
            title={t(`games.items.${activeGame.id}.title`)}
            allowFullScreen
          />
        </div>
      )}

      <Footer />
    </>
  );
}

export default Games;
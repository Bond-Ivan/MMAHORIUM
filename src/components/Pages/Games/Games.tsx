import { useState, type ReactElement } from "react";
import styles from "./Games.module.css";
import Footer from "../../Footer/Footer";

interface Game {
    id: string;
    title: string;
    description: string;
    icon: string;
    tags: string[];
    file: string;
}
const BASE = import.meta.env.BASE_URL; 
const GAMES: Game[] = [
    {
        id: "maze",
        title: "MMA Maze Runner",
        description: "Проведи бойца через лабиринт к чемпионскому поясу. Быстрее — больше очков!",
        icon: "🥊",
        tags: ["Лабиринт", "Логика", "Рекорды"],
        file: `${BASE}games/mma-maze.html`,
    },
    {
        id: "career",
        title: "MMA Career Manager",
        description: "Создай бойца, тренируйся, побеждай соперников и стань чемпионом MMA!",
        icon: "🏆",
        tags: ["Менеджер", "RPG", "Карьера"],
        file: `${BASE}games/mma-career.html`,
    },
    {
        id: "trivia",
        title: "MMA Trivia Challenge",
        description: "15 вопросов по MMA с нарастающей сложностью. Три подсказки, таймер, призовая лестница!",
        icon: "🧠",
        tags: ["Викторина", "Знания", "MMA"],
        file: `${BASE}games/mma-trivia.html`,
    },
    {
        id: "dash",
        title: "MMA Dash",
        description: "Endless runner — перепрыгивай соперников, собирай перчатки, бей рекорды!",
        icon: "🏃",
        tags: ["Ранер", "Аркада", "Рефлексы"],
        file: `${BASE}games/mma-dash.html`,
    },
];

function Games(): ReactElement {
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

    return (
        <>
            <main className={styles.main}>
                <h2 className={styles.title}>🎮 Игры</h2>
                <p className={styles.subtitle}>
                    Мини-игры по вселенной MMA — тренируй реакцию, знания и стратегию
                </p>

                <ul className={styles.grid}>
                    {GAMES.map((game) => (
                        <li key={game.id} className={styles.card}>
                            <div className={styles.cardIcon}>{game.icon}</div>
                            <div className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{game.title}</h3>
                                <p className={styles.cardDesc}>{game.description}</p>
                                <div className={styles.tags}>
                                    {game.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button className={styles.playBtn} onClick={() => openGame(game)}>
                                ▶ Играть
                            </button>
                        </li>
                    ))}
                </ul>
            </main>

            {activeGame && (
                <div className={styles.fullscreen}>
                    <div className={styles.gameBar}>
                        <span className={styles.gameBarTitle}>
                            {activeGame.icon} {activeGame.title}
                        </span>
                        <button className={styles.exitBtn} onClick={closeGame}>
                            ✕ Выйти
                        </button>
                    </div>
                    <iframe
                        className={styles.gameFrame}
                        src={activeGame.file}
                        title={activeGame.title}
                        allowFullScreen
                    />
                </div>
            )}

            <Footer />
        </>
    );
}

export default Games;
import { useState } from "react";
import type { ReactElement } from "react";
import styles from "./NewItem.module.css";

function New(): ReactElement {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleBackClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(false);
    };

    return (
        <li className={styles.item} onClick={handleFlip}>
            <div className={`${styles.flipper} ${isFlipped ? styles.flipped : ""}`}>
            
                <div className={styles.front}>
                    <div className={styles.wrapper}>
                        <span className={styles.badge}>Рейтинги</span>
                        <img className={styles.image} src="https://ss.sport-express.ru/userfiles/materials/214/2145799/1180x665.jpg" alt="Картинка новости" />
                    </div>

                    <div className={styles.body}>
                        <h3 className={styles.cardTitle}>Чарльз Оливейра вошёл в топ-10 P4P после победы над Холлоуэем</h3>
                        <p className={styles.cardText}>После зрелищной победы методом TKO в третьем раунде, бразилец снова претендует на звание лучшего лёгкого веса.После зрелищной победы методом TKO в третьем раунде, бразилец снова претендует на звание лучшего лёгкого веса.После зрелищной победы методом TKO в третьем раунде, бразилец снова претендует на звание лучшего лёгкого веса.</p>
                        <div className={styles.footer}>
                            <span className={styles.inner}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="calendar" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                10 МАР 2026
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.back}>
                    <p className={styles.backText}>После зрелищной победы методом TKO в третьем раунде, бразилец снова претендует на звание лучшего лёгкого веса.После зрелищной победы методом TKO в третьем раунде, бразилец снова претендует на звание лучшего лёгкого веса.После зрелищной победы методом TKO в третьем раунде, бразилец снова претендует на звание лучшего лёгкого веса.</p>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Назад
                    </button>
                </div>

            </div>
        </li>
    );
}

export default New;
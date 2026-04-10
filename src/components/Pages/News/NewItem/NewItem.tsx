import { useState } from "react";
import type { ReactElement } from "react";
import styles from "./NewItem.module.css";
import type { NewsType } from "../News.utils";

interface NewItemProps {
    newItem: NewsType;
}

function New({ newItem }: NewItemProps): ReactElement {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

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
                        <span className={styles.badge}>{newItem.type}</span>

                        {isImageLoading && (
                            <div className={styles.spinnerWrapper}>
                                <div className={styles.spinner}></div>
                            </div>
                        )}

                        <img
                            className={`${styles.image} ${isImageLoading ? styles.imageHidden : ""}`}
                            src={newItem.image}
                            alt="Картинка новости"
                            onLoad={() => setIsImageLoading(false)}
                        />
                    </div>

                    <div className={styles.body}>
                        <h3 className={styles.cardTitle}>{newItem.title}</h3>
                        <p className={styles.cardText}>{newItem.text}</p>
                        <div className={styles.footer}>
                            <span className={styles.inner}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="calendar" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                                {newItem.date}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.back}>
                    <p className={styles.backText}>{newItem.text}</p>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Назад
                    </button>
                </div>

            </div>
        </li>
    );
}

export default New;
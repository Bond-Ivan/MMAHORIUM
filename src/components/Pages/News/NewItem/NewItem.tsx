import { useState } from "react";
import type { ReactElement } from "react";
import styles from "./NewItem.module.css";
import type { NewsType } from "../News.utils";

interface NewItemProps {
    newItem: NewsType;
}

function NewItem({ newItem }: NewItemProps): ReactElement {
    const [isOpen, setIsOpen] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const handleOpen = () => setIsOpen(true);
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(false);
    };

    return (
        <li
            className={`${styles.item} ${isOpen ? styles.opened : ""}`}
            onClick={!isOpen ? handleOpen : undefined}
        >
            {/* FRONT — всегда в DOM, скрывается через CSS */}
            <div className={styles.front}>
                <div className={styles.imageWrapper}>
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

                    {/* Оверлей, который наезжает снизу вверх при раскрытии */}
                    <div className={styles.imageOverlay} />
                </div>

                <div className={styles.body}>
                    <h3 className={styles.cardTitle}>{newItem.title}</h3>
                    <p className={styles.cardText}>{newItem.text}</p>
                    <div className={styles.footer}>
                        <span className={styles.inner}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M8 2v4" /><path d="M16 2v4" />
                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                <path d="M3 10h18" />
                            </svg>
                            {newItem.date}
                        </span>
                    </div>
                </div>
            </div>

            {/* BACK — контент обратной стороны */}
            <div className={styles.back}>
                <span className={styles.backBadge}>{newItem.type}</span>
                <h3 className={styles.backTitle}>{newItem.title}</h3>
                <p className={styles.backText}>{newItem.text}</p>
                <div className={styles.backMeta}>
                    <span className={styles.inner}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M8 2v4" /><path d="M16 2v4" />
                            <rect width="18" height="18" x="3" y="4" rx="2" />
                            <path d="M3 10h18" />
                        </svg>
                        {newItem.date}
                    </span>
                </div>
                <button className={styles.backButton} onClick={handleClose}>
                    ← Назад
                </button>
            </div>
        </li>
    );
}

export default NewItem;
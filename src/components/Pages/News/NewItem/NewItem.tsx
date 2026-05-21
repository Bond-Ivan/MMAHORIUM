import { useState } from "react";
import type { ReactElement } from "react";
import styles from "./NewItem.module.css";
import type { NewsType } from "../News.utils";
import { useLang } from "../../../../hooks/useLang";

interface NewItemProps {
  newItem: NewsType;
}

function NewItem({ newItem }: NewItemProps): ReactElement {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleOpen = () => setIsOpen(true);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const title = t(newItem.titleKey);
  const text = t(newItem.textKey);
  const date = t(newItem.dateKey);
  const type = t(newItem.typeKey);

  return (
    <li
      className={`${styles.item} ${isOpen ? styles.opened : ""}`}
      onClick={!isOpen ? handleOpen : undefined}
    >
      <div className={styles.front}>
        <div className={styles.imageWrapper}>
          <span className={styles.badge}>{type}</span>

          {isImageLoading && (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>
            </div>
          )}

          <img
            className={`${styles.image} ${isImageLoading ? styles.imageHidden : ""}`}
            src={newItem.image}
            alt={t("news.imageAlt")}
            onLoad={() => setIsImageLoading(false)}
          />

          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.body}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardText}>{text}</p>
          <div className={styles.footer}>
            <span className={styles.inner}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              {date}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.back}>
        <span className={styles.backBadge}>{type}</span>
        <h3 className={styles.backTitle}>{title}</h3>
        <p className={styles.backText}>{text}</p>
        <div className={styles.backMeta}>
          <span className={styles.inner}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            {date}
          </span>
        </div>
        <button className={styles.backButton} onClick={handleClose}>
          {t("news.backButton")}
        </button>
      </div>
    </li>
  );
}

export default NewItem;
import type { ReactElement } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  title: string;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
};

function Header({ title, onMenuToggle, isSidebarOpen }: HeaderProps): ReactElement {
  return (
    <header className={styles.header}>
      <button
        className={styles.menuToggle}
        onClick={onMenuToggle}
        aria-label={isSidebarOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          {isSidebarOpen ? (
            <>
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.actions}>
        <button className={styles.badgeLive}>
          <div className={styles.badgeLiveDot} />
          Live
        </button>
        <button className={styles.themeToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2v2"></path><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"></path><path d="M16 12a4 4 0 0 0-4-4"></path><path d="m19 5-1.256 1.256"></path><path d="M20 12h2"></path></svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
import { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./Header.module.css";
import { useLang, LANGS } from "../../hooks/useLang";

type HeaderProps = {
  title: string;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
};

function Header({ title, onMenuToggle, isSidebarOpen }: HeaderProps): ReactElement {
  const { lang, setLang, t } = useLang();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGS.find(l => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <button
        className={styles.menuToggle}
        onClick={onMenuToggle}
        aria-label={
          isSidebarOpen
            ? t("header.closeMenu")
            : t("header.openMenu")
        }
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
          {t("header.live")}
        </button>

        <div className={styles.langWrapper} ref={dropdownRef}>
          <button
            className={styles.langToggle}
            onClick={() => setDropdownOpen(prev => !prev)}
            aria-label={t("header.selectLanguage")}
          >
            <span className={styles.langFlag}>{currentLang.flag}</span>
            <span className={styles.langLabel}>{currentLang.label}</span>
            <svg
              className={`${styles.langChevron} ${dropdownOpen ? styles.langChevronOpen : ""}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className={styles.langDropdown}>
              {LANGS.map(l => (
                <button
                  key={l.code}
                  className={`${styles.langOption} ${l.code === lang ? styles.langOptionActive : ""}`}
                  onClick={() => {
                    setLang(l.code);
                    setDropdownOpen(false);
                  }}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
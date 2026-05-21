import { useState, useRef, useEffect, useCallback, type ReactElement } from "react";
import styles from "./FighterSelect.module.css";

type SelectOption = {
  label: string;
  value: number;
};

type FighterSelectProps = {
  options: SelectOption[];
  value: number;
  onChange: (val: number) => void;
  accentColor: "orange" | "blue";
};

function FighterSelect({ options, value, onChange, accentColor }: FighterSelectProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const selected = options.find((o) => o.value === value)?.label ?? "—";

  const handleClose = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
      setSearch("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => document.removeEventListener("mousedown", handleClose);
  }, [handleClose]);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 80);
  }, [open]);

  return (
    <div className={`${styles.wrap} ${styles[`accent_${accentColor}`]}`} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerMeta}>Боец</span>
        <span className={styles.triggerValue}>{selected}</span>
        <svg
          className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.searchRow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" className={styles.searchIcon}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchRef}
              className={styles.searchInput}
              placeholder="Поиск бойца..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.list}>
            {filtered.length === 0 ? (
              <p className={styles.empty}>Не найдено</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.item} ${opt.value === value ? styles.itemActive : ""}`}
                  onClick={() => { onChange(opt.value); setOpen(false); setSearch(""); }}
                >
                  {opt.value === value && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FighterSelect;
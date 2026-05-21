import { useState, useRef, useEffect, useCallback, type ReactElement } from "react";
import styles from "./CategorySelect.module.css";

type SelectOption = {
  label: string;
  value: number;
};

type CategorySelectProps = {
  options: SelectOption[];
  value: number;
  onChange: (val: number) => void;
  accentColor: "orange" | "blue";
};

function CategorySelect({ options, value, onChange, accentColor }: CategorySelectProps): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value)?.label ?? "—";

  const handleClose = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => document.removeEventListener("mousedown", handleClose);
  }, [handleClose]);

  return (
    <div className={`${styles.wrap} ${styles[`accent_${accentColor}`]}`} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerMeta}>Весовая</span>
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
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.item} ${opt.value === value ? styles.itemActive : ""}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.value === value && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="3">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySelect;
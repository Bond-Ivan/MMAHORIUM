import { useEffect, useRef, useState, type ReactElement } from "react";

import styles from "./HallOfFameGrid.module.css";
import type { HallOfFamer } from "../../utils/achievementsData";

interface Props { fighters: HallOfFamer[]; }

export default function HallOfFameGrid({ fighters }: Props): ReactElement {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.grid}>
      {fighters.map((f, i) => (
        <div
          key={i}
          className={`${styles.card} ${visible ? styles.visible : ""}`}
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <div className={styles.top}>
            <span className={styles.flag}>{f.nationality}</span>
            <span className={styles.year}>{f.year}</span>
          </div>
          <span className={styles.name}>{f.name}</span>
          <span className={styles.achievement}>{f.achievement}</span>
          <div className={styles.badge}>HOF</div>
        </div>
      ))}
    </div>
  );
}
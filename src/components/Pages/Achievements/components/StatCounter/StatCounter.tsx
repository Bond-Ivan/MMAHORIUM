import { useEffect, useRef, useState, type ReactElement } from "react";
import styles from "./StatCounter.module.css";
import type { KeyStat } from "../../utils/achievementsData";
import { useLang } from "../../../../../hooks/useLang";

interface Props {
  stat: KeyStat;
  delay: number;
}

export default function StatCounter({ stat, delay }: Props): ReactElement {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.icon}>{stat.icon}</span>
      <span className={styles.value}>{stat.value}</span>
      <span className={styles.label}>{t(stat.labelKey)}</span>
      <span className={styles.sub}>{t(stat.sublabelKey)}</span>
    </div>
  );
}
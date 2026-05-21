import { useEffect, useRef, useState, type ReactElement } from "react";
import type { ChartDataPoint } from "../../utils/achievementsData";
import styles from "./HorizontalBarChart.module.css";

interface Props { data: ChartDataPoint[]; }

export default function HorizontalBarChart({ data }: Props): ReactElement {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const max = Math.max(...data.map(d => d.value));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.wrap}>
      {data.map((d, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.meta}>
            <span className={styles.name}>{d.label}</span>
            <span className={styles.val}>{d.value}</span>
          </div>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{
                width: visible ? `${(d.value / max) * 100}%` : "0%",
                background: d.color ?? "#c9a227",
                transitionDelay: `${i * 100}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
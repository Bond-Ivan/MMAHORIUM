import { useEffect, useRef, useState, type ReactElement } from "react";

import styles from "./BarChart.module.css";
import type { ChartDataPoint } from "../../utils/achievementsData";

interface Props { data: ChartDataPoint[]; unit?: string; }

export default function BarChart({ data, unit = "" }: Props): ReactElement {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const max = Math.max(...data.map(d => d.value));

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className={styles.wrap}>
            {data.map((d, i) => (
                <div key={i} className={styles.row}>
                    <span className={styles.label}>{d.label}</span>
                    <div className={styles.barTrack}>
                        <div
                            className={styles.bar}
                            style={{
                                width: visible ? `${(d.value / max) * 100}%` : "0%",
                                background: d.color ?? "#c9a227",
                                transitionDelay: `${i * 120}ms`,
                            }}
                        />
                    </div>
                    <span className={styles.value}>{d.value.toLocaleString()} {unit}</span>
                </div>
            ))}
        </div>
    );
}
import { useEffect, type ReactElement } from "react";
import styles from "./Achievements.module.css";

import Footer from "../../Footer/Footer";
import BarChart from "./shared/BarChart/BarChart";
import HorizontalBarChart from "./shared/HorizontalBarChart/HorizontalBarChart";
import RankTable from "./shared/RankTable/RankTable";
import SpeedTable from "./shared/SpeedTable/SpeedTable";
import StatCounter from "./shared/StatCounter/StatCounter";
import { keyStats, longestTitleReigns, mostWins, longestWinStreaks, titleBoutWins, mostKnockouts, mostFinishes, fastestKnockouts, ppvRecords, contributorsWing, fightWing, modernWing, pioneerWing } from "./utils/achievementsData";
import HallOfFameTabs from "./shared/HallOfFameTabs/HallOfFameTabs";

function Achievements(): ReactElement {
    useEffect(() => {
        const sections = document.querySelectorAll("[data-reveal]");

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute("data-visible", "true");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        sections.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <main className={styles.main}>

                {/* ── Hero ── */}
                <section className={styles.hero}>
                    <div className={styles.heroGlow} />
                    <div className={styles.heroDecor}><div className={styles.octagonBg} /></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Рекорды &amp;&nbsp;<span className={styles.heroAccent}>Достижения</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Исторические рекорды UFC — статистика, данные и легенды, вошедшие в историю ММА
                        </p>
                    </div>
                </section>

                {/* ── Key Stats ── */}
                <section data-reveal className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                            <span className={styles.sectionAccent}>Ключевые</span> показатели
                        </h2>
                        <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                            Главные рекорды UFC всех времён
                        </p>
                        <div className={styles.statsGrid}>
                            {keyStats.map((stat, i) => (
                                <StatCounter key={i} stat={stat} delay={i * 100} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Longest Title Reigns ── */}
                <section data-reveal className={`${styles.section} ${styles.sectionDark}`}>
                    <div className={styles.container}>
                        <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                            <span className={styles.sectionAccent}>Длительность</span> чемпионства
                        </h2>
                        <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                            Самые долгие чемпионские царствования в истории UFC (дней)
                        </p>
                        <div className={styles.ri} style={{ "--d": "120ms" } as React.CSSProperties}>
                            <BarChart data={longestTitleReigns} unit="дней" />
                        </div>
                    </div>
                </section>

                {/* ── Most Wins + Win Streaks ── */}
                <section data-reveal className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.twoCol}>
                            <div>
                                <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                                    <span className={styles.sectionAccent}>Больше всего</span> побед
                                </h2>
                                <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                                    Рекорд UFC — любые поединки
                                </p>
                                <div className={styles.ri} style={{ "--d": "120ms" } as React.CSSProperties}>
                                    <RankTable rows={mostWins} valueLabel="Победы" valueKey="value" />
                                </div>
                            </div>
                            <div>
                                <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "80ms" } as React.CSSProperties}>
                                    <span className={styles.sectionAccent}>Серии</span> побед
                                </h2>
                                <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "140ms" } as React.CSSProperties}>
                                    Наибольшее количество побед подряд
                                </p>
                                <div className={styles.ri} style={{ "--d": "200ms" } as React.CSSProperties}>
                                    <RankTable rows={longestWinStreaks} valueLabel="Серия" valueKey="value" extraKey="extra" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Title Bout Wins Chart ── */}
                <section data-reveal className={`${styles.section} ${styles.sectionDark}`}>
                    <div className={styles.container}>
                        <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                            Победы в <span className={styles.sectionAccent}>титульных боях</span>
                        </h2>
                        <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                            Лидеры по победам в чемпионских поединках UFC
                        </p>
                        <div className={styles.ri} style={{ "--d": "120ms" } as React.CSSProperties}>
                            <HorizontalBarChart data={titleBoutWins} />
                        </div>
                    </div>
                </section>

                {/* ── KOs + Finishes ── */}
                <section data-reveal className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.twoCol}>
                            <div>
                                <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                                    Больше всего <span className={styles.sectionAccent}>нокаутов</span>
                                </h2>
                                <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                                    КО + ТКО за карьеру в UFC
                                </p>
                                <div className={styles.ri} style={{ "--d": "120ms" } as React.CSSProperties}>
                                    <RankTable rows={mostKnockouts} valueLabel="KO" valueKey="value" />
                                </div>
                            </div>
                            <div>
                                <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "80ms" } as React.CSSProperties}>
                                    Больше всего <span className={styles.sectionAccent}>добиваний</span>
                                </h2>
                                <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "140ms" } as React.CSSProperties}>
                                    КО + Сабмишн за карьеру
                                </p>
                                <div className={styles.ri} style={{ "--d": "200ms" } as React.CSSProperties}>
                                    <RankTable rows={mostFinishes} valueLabel="Fin" valueKey="value" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Fastest KOs ── */}
                <section data-reveal className={`${styles.section} ${styles.sectionDark}`}>
                    <div className={styles.container}>
                        <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                            <span className={styles.sectionAccent}>Самые быстрые</span> нокауты
                        </h2>
                        <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                            Самые быстрые нокауты за всю историю промоушена
                        </p>
                        <div className={styles.ri} style={{ "--d": "120ms" } as React.CSSProperties}>
                            <SpeedTable data={fastestKnockouts} />
                        </div>
                    </div>
                </section>

                {/* ── PPV Records ── */}
                <section data-reveal className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={`${styles.sectionTitle} ${styles.ri}`} style={{ "--d": "0ms" } as React.CSSProperties}>
                            <span className={styles.sectionAccent}>Рекорды</span> Pay-Per-View
                        </h2>
                        <p className={`${styles.sectionDesc} ${styles.ri}`} style={{ "--d": "60ms" } as React.CSSProperties}>
                            Топ-5 самых продаваемых событий UFC всех времён
                        </p>
                        <div className={styles.ppvGrid}>
                            {ppvRecords.map((ppv, i) => (
                                <div
                                    key={i}
                                    className={`${styles.ppvCard} ${styles.ri}`}
                                    style={{ "--d": `${120 + i * 80}ms` } as React.CSSProperties}
                                >
                                    <div className={styles.ppvRank}>#{i + 1}</div>
                                    <div className={styles.ppvInfo}>
                                        <span className={styles.ppvEvent}>{ppv.event}</span>
                                        <span className={styles.ppvFighters}>{ppv.fighters}</span>
                                    </div>
                                    <div className={styles.ppvStats}>
                                        <span className={styles.ppvBuys}>{(ppv.buys / 1_000_000).toFixed(1)}M</span>
                                        <span className={styles.ppvBuysLabel}>PPV</span>
                                        <span className={styles.ppvRevenue}>{ppv.revenue}</span>
                                    </div>
                                    <div className={styles.ppvBar}>
                                        <div
                                            className={styles.ppvBarFill}
                                            style={{ width: `${(ppv.buys / 2_400_000) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Hall of Fame ── */}
                <section className={`${styles.section} ${styles.sectionDark}`}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionAccent}>Зал Славы</span> UFC
                        </h2>
                        <p className={styles.sectionDesc}>Все крылья — 60+ легенд ММА</p>
                        <HallOfFameTabs
                            pioneer={pioneerWing}
                            modern={modernWing}
                            contributors={contributorsWing}
                            fights={fightWing}
                        />
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}

export default Achievements;
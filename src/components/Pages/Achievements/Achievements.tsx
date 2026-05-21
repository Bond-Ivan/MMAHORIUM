import { useEffect, type ReactElement } from "react";
import styles from "./Achievements.module.css";

import Footer from "../../Footer/Footer";
import BarChart from "./components/BarChart/BarChart";
import HorizontalBarChart from "./components/HorizontalBarChart/HorizontalBarChart";
import RankTable from "./components/RankTable/RankTable";
import SpeedTable from "./components/SpeedTable/SpeedTable";
import StatCounter from "./components/StatCounter/StatCounter";
import {
  keyStats,
  longestTitleReigns,
  mostWins,
  longestWinStreaks,
  titleBoutWins,
  mostKnockouts,
  mostFinishes,
  fastestKnockouts,
  ppvRecords,
  contributorsWing,
  fightWing,
  modernWing,
  pioneerWing,
} from "./utils/achievementsData";
import HallOfFameTabs from "./components/HallOfFameTabs/HallOfFameTabs";
import { useLang } from "../../../hooks/useLang";

function Achievements(): ReactElement {
  const { t } = useLang();

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
        <section className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={styles.heroDecor}>
            <div className={styles.octagonBg} />
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              {t("achievements.hero.title")} &amp;&nbsp;
              <span className={styles.heroAccent}>
                {t("achievements.hero.titleAccent")}
              </span>
            </h1>
            <p className={styles.heroSubtitle}>{t("achievements.hero.subtitle")}</p>
          </div>
        </section>

        <section data-reveal className={styles.section}>
          <div className={styles.container}>
            <h2
              className={`${styles.sectionTitle} ${styles.ri}`}
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <span className={styles.sectionAccent}>
                {t("achievements.keyStats.titleAccent")}
              </span>{" "}
              {t("achievements.keyStats.title")}
            </h2>
            <p
              className={`${styles.sectionDesc} ${styles.ri}`}
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {t("achievements.keyStats.description")}
            </p>
            <div className={styles.statsGrid}>
              {keyStats.map((stat, i) => (
                <StatCounter key={i} stat={stat} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>

        <section data-reveal className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.container}>
            <h2
              className={`${styles.sectionTitle} ${styles.ri}`}
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <span className={styles.sectionAccent}>
                {t("achievements.longestTitleReigns.titleAccent")}
              </span>{" "}
              {t("achievements.longestTitleReigns.title")}
            </h2>
            <p
              className={`${styles.sectionDesc} ${styles.ri}`}
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {t("achievements.longestTitleReigns.description")}
            </p>
            <div
              className={styles.ri}
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <BarChart data={longestTitleReigns} unit={t("achievements.units.days")} />
            </div>
          </div>
        </section>

        <section data-reveal className={styles.section}>
          <div className={styles.container}>
            <div className={styles.twoCol}>
              <div>
                <h2
                  className={`${styles.sectionTitle} ${styles.ri}`}
                  style={{ "--d": "0ms" } as React.CSSProperties}
                >
                  <span className={styles.sectionAccent}>
                    {t("achievements.mostWins.titleAccent")}
                  </span>{" "}
                  {t("achievements.mostWins.title")}
                </h2>
                <p
                  className={`${styles.sectionDesc} ${styles.ri}`}
                  style={{ "--d": "60ms" } as React.CSSProperties}
                >
                  {t("achievements.mostWins.description")}
                </p>
                <div
                  className={styles.ri}
                  style={{ "--d": "120ms" } as React.CSSProperties}
                >
                  <RankTable
                    rows={mostWins}
                    valueLabel={t("achievements.labels.wins")}
                    valueKey="value"
                  />
                </div>
              </div>

              <div>
                <h2
                  className={`${styles.sectionTitle} ${styles.ri}`}
                  style={{ "--d": "80ms" } as React.CSSProperties}
                >
                  <span className={styles.sectionAccent}>
                    {t("achievements.longestWinStreaks.titleAccent")}
                  </span>{" "}
                  {t("achievements.longestWinStreaks.title")}
                </h2>
                <p
                  className={`${styles.sectionDesc} ${styles.ri}`}
                  style={{ "--d": "140ms" } as React.CSSProperties}
                >
                  {t("achievements.longestWinStreaks.description")}
                </p>
                <div
                  className={styles.ri}
                  style={{ "--d": "200ms" } as React.CSSProperties}
                >
                  <RankTable
                    rows={longestWinStreaks}
                    valueLabel={t("achievements.labels.streak")}
                    valueKey="value"
                    extraKey="extraKey"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.container}>
            <h2
              className={`${styles.sectionTitle} ${styles.ri}`}
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              {t("achievements.titleBoutWins.title")}{" "}
              <span className={styles.sectionAccent}>
                {t("achievements.titleBoutWins.titleAccent")}
              </span>
            </h2>
            <p
              className={`${styles.sectionDesc} ${styles.ri}`}
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {t("achievements.titleBoutWins.description")}
            </p>
            <div
              className={styles.ri}
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <HorizontalBarChart data={titleBoutWins} />
            </div>
          </div>
        </section>

        <section data-reveal className={styles.section}>
          <div className={styles.container}>
            <div className={styles.twoCol}>
              <div>
                <h2
                  className={`${styles.sectionTitle} ${styles.ri}`}
                  style={{ "--d": "0ms" } as React.CSSProperties}
                >
                  {t("achievements.mostKnockouts.title")}{" "}
                  <span className={styles.sectionAccent}>
                    {t("achievements.mostKnockouts.titleAccent")}
                  </span>
                </h2>
                <p
                  className={`${styles.sectionDesc} ${styles.ri}`}
                  style={{ "--d": "60ms" } as React.CSSProperties}
                >
                  {t("achievements.mostKnockouts.description")}
                </p>
                <div
                  className={styles.ri}
                  style={{ "--d": "120ms" } as React.CSSProperties}
                >
                  <RankTable
                    rows={mostKnockouts}
                    valueLabel={t("achievements.labels.ko")}
                    valueKey="value"
                  />
                </div>
              </div>

              <div>
                <h2
                  className={`${styles.sectionTitle} ${styles.ri}`}
                  style={{ "--d": "80ms" } as React.CSSProperties}
                >
                  {t("achievements.mostFinishes.title")}{" "}
                  <span className={styles.sectionAccent}>
                    {t("achievements.mostFinishes.titleAccent")}
                  </span>
                </h2>
                <p
                  className={`${styles.sectionDesc} ${styles.ri}`}
                  style={{ "--d": "140ms" } as React.CSSProperties}
                >
                  {t("achievements.mostFinishes.description")}
                </p>
                <div
                  className={styles.ri}
                  style={{ "--d": "200ms" } as React.CSSProperties}
                >
                  <RankTable
                    rows={mostFinishes}
                    valueLabel={t("achievements.labels.fin")}
                    valueKey="value"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section data-reveal className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.container}>
            <h2
              className={`${styles.sectionTitle} ${styles.ri}`}
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <span className={styles.sectionAccent}>
                {t("achievements.fastestKnockouts.titleAccent")}
              </span>{" "}
              {t("achievements.fastestKnockouts.title")}
            </h2>
            <p
              className={`${styles.sectionDesc} ${styles.ri}`}
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {t("achievements.fastestKnockouts.description")}
            </p>
            <div
              className={styles.ri}
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <SpeedTable data={fastestKnockouts} />
            </div>
          </div>
        </section>

        <section data-reveal className={styles.section}>
          <div className={styles.container}>
            <h2
              className={`${styles.sectionTitle} ${styles.ri}`}
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <span className={styles.sectionAccent}>
                {t("achievements.ppvRecords.titleAccent")}
              </span>{" "}
              {t("achievements.ppvRecords.title")}
            </h2>
            <p
              className={`${styles.sectionDesc} ${styles.ri}`}
              style={{ "--d": "60ms" } as React.CSSProperties}
            >
              {t("achievements.ppvRecords.description")}
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
                    <span className={styles.ppvBuys}>
                      {(ppv.buys / 1_000_000).toFixed(1)}M
                    </span>
                    <span className={styles.ppvBuysLabel}>
                      {t("achievements.labels.ppv")}
                    </span>
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

        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionAccent}>
                {t("achievements.hallOfFame.titleAccent")}
              </span>{" "}
              {t("achievements.hallOfFame.title")}
            </h2>
            <p className={styles.sectionDesc}>
              {t("achievements.hallOfFame.description")}
            </p>
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
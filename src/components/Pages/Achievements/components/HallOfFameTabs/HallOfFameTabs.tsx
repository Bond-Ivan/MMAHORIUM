import { useState, useEffect, useRef, type ReactElement } from "react";
import styles from "./HallOfFameTabs.module.css";
import type {
  HallOfFamer,
  Contributor,
  FightWinger,
} from "../../utils/achievementsData";
import { useLang } from "../../../../../hooks/useLang";

interface Props {
  pioneer: HallOfFamer[];
  modern: HallOfFamer[];
  contributors: Contributor[];
  fights: FightWinger[];
}

type TabId = "modern" | "pioneer" | "contributors" | "fights";

export default function HallOfFameTabs({
  pioneer,
  modern,
  contributors,
  fights,
}: Props): ReactElement {
  const { t } = useLang();
  const [active, setActive] = useState<TabId>("modern");
  const [visible, setVisible] = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const tabs: { id: TabId; label: string; emoji: string }[] = [
    {
      id: "modern",
      label: t("achievements.hallOfFame.tabs.modern"),
      emoji: "🏆",
    },
    {
      id: "pioneer",
      label: t("achievements.hallOfFame.tabs.pioneer"),
      emoji: "⚔️",
    },
    {
      id: "contributors",
      label: t("achievements.hallOfFame.tabs.contributors"),
      emoji: "🎙️",
    },
    {
      id: "fights",
      label: t("achievements.hallOfFame.tabs.fights"),
      emoji: "🥊",
    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleTabChange = (id: TabId) => {
    setVisible(false);
    setActive(id);
    setPanelKey((prev) => prev + 1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  };

  const renderFighter = (f: HallOfFamer, i: number) => (
    <div
      key={i}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${i * 45}ms` }}
    >
      <div className={styles.cardTop}>
        <span className={styles.flag}>{f.nationality}</span>
        <span className={styles.year}>{f.year}</span>
      </div>
      <span className={styles.name}>{f.name}</span>
      <span className={styles.achievement}>{t(f.achievementKey)}</span>
      <div className={styles.hof}>
        {t("achievements.hallOfFame.shortLabel")}
      </div>
    </div>
  );

  const renderContributor = (c: Contributor, i: number) => (
    <div
      key={i}
      className={`${styles.card} ${styles.cardContrib} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <div className={styles.cardTop}>
        <span className={styles.yearBig}>{c.year}</span>
      </div>
      <span className={styles.name}>{c.name}</span>
      <span className={styles.achievement}>{t(c.roleKey)}</span>
      <div className={styles.hof}>
        {t("achievements.hallOfFame.shortLabel")}
      </div>
    </div>
  );

  const renderFight = (f: FightWinger, i: number) => (
    <div
      key={i}
      className={`${styles.fightCard} ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <div className={styles.fightMeta}>
        <span className={styles.fightYear}>{f.year}</span>
        <span className={styles.fightAward}>
          {f.awardKey ? t(f.awardKey) : ""}
        </span>
      </div>
      <span className={styles.fightTitle}>{f.fight}</span>
      <span className={styles.fightEvent}>{f.event}</span>
      <span className={styles.fightResult}>{t(f.resultKey)}</span>
    </div>
  );

  return (
    <div ref={ref}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${active === tab.id ? styles.tabActive : ""}`}
            onClick={() => handleTabChange(tab.id)}
            type="button"
          >
            <span className={styles.tabEmoji}>{tab.emoji}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
            <span className={styles.tabCount}>
              {tab.id === "modern"
                ? modern.length
                : tab.id === "pioneer"
                  ? pioneer.length
                  : tab.id === "contributors"
                    ? contributors.length
                    : fights.length}
            </span>
          </button>
        ))}
      </div>

      <div key={panelKey} className={styles.panel}>
        {active === "modern" && (
          <div className={styles.grid}>
            {modern.map((f, i) => renderFighter(f, i))}
          </div>
        )}

        {active === "pioneer" && (
          <div className={styles.grid}>
            {pioneer.map((f, i) => renderFighter(f, i))}
          </div>
        )}

        {active === "contributors" && (
          <div className={styles.gridContrib}>
            {contributors.map((c, i) => renderContributor(c, i))}
          </div>
        )}

        {active === "fights" && (
          <div className={styles.fightList}>
            {fights.map((f, i) => renderFight(f, i))}
          </div>
        )}
      </div>
    </div>
  );
}
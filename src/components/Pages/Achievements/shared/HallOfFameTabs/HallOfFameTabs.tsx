import { useState, useEffect, useRef, type ReactElement } from "react";
import styles from "./HallOfFameTabs.module.css";
import type { HallOfFamer, Contributor, FightWinger } from "../../utils/achievementsData";

interface Props {
  pioneer: HallOfFamer[];
  modern: HallOfFamer[];
  contributors: Contributor[];
  fights: FightWinger[];
}

type TabId = "modern" | "pioneer" | "contributors" | "fights";

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: "modern",       label: "Современная эра",  emoji: "🏆" },
  { id: "pioneer",      label: "Пионеры",           emoji: "⚔️" },
  { id: "contributors", label: "Вне октагона",      emoji: "🎙️" },
  { id: "fights",       label: "Легендарные бои",   emoji: "🥊" },
];

export default function HallOfFameTabs({ pioneer, modern, contributors, fights }: Props): ReactElement {
  const [active, setActive] = useState<TabId>("modern");
  const [visible, setVisible] = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleTabChange = (id: TabId) => {
    // Сбрасываем visible → карточки уходят в opacity: 0
    setVisible(false);
    setActive(id);
    setPanelKey(prev => prev + 1);

    // Через один кадр снова включаем → анимация повторяется
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
      <span className={styles.achievement}>{f.achievement}</span>
      <div className={styles.hof}>ЗС</div>
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
      <span className={styles.achievement}>{c.role}</span>
      <div className={styles.hof}>ЗС</div>
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
        <span className={styles.fightAward}>{f.award}</span>
      </div>
      <span className={styles.fightTitle}>{f.fight}</span>
      <span className={styles.fightEvent}>{f.event}</span>
      <span className={styles.fightResult}>{f.result}</span>
    </div>
  );

  return (
    <div ref={ref}>
      <div className={styles.tabBar}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${active === t.id ? styles.tabActive : ""}`}
            onClick={() => handleTabChange(t.id)}
          >
            <span className={styles.tabEmoji}>{t.emoji}</span>
            <span className={styles.tabLabel}>{t.label}</span>
            <span className={styles.tabCount}>
              {t.id === "modern" ? modern.length
               : t.id === "pioneer" ? pioneer.length
               : t.id === "contributors" ? contributors.length
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
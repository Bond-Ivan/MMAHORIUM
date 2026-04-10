import { type ReactElement, useEffect, useRef } from "react";
import styles from "./Fighter.module.css";
import type { fighterType } from "../Fighters.types";

type FighterProps = {
  value: fighterType;
};

function Fighter({ value }: FighterProps): ReactElement {
  const koPercent = value.victory ? Math.round((value.KO * 100) / value.victory) : 0;
  const subPercent = value.victory ? Math.round((value.SUB * 100) / value.victory) : 0;
  const desPercent = value.victory ? 100 - koPercent - subPercent : 0;

  const cardRef = useRef<HTMLLIElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const innerCard = innerCardRef.current;
    const glare = glareRef.current;

    const calculateAngle = (e: MouseEvent) => {
      if (card && innerCard && glare) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        const calcAngleX = (y - halfHeight) / 20;
        const calcAngleY = (x - halfWidth) / 20;

        innerCard.style.transform = `rotateY(${calcAngleY}deg) rotateX(${-calcAngleX}deg) scale(1.03)`;

        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.04), transparent)`;
      }
    };

    const handleMouseLeave = () => {
      if (innerCard && glare) {
        innerCard.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        glare.style.background = `none`;
      }
    };

    if (card) {
      card.addEventListener("mousemove", calculateAngle);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", calculateAngle);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <li className={styles.card} ref={cardRef} tabIndex={0}>
      <div
        className={styles.innerCard}
        ref={innerCardRef}
        style={{ "--bg-image": `url(${value.img})` } as React.CSSProperties}
      >
        <div className={styles.glare} ref={glareRef} />

        <div className={styles.overlay} />

        <div className={styles.top}>
          {value.isChampion && (
            <span className={styles.champ}>Чемпион</span>
          )}
          {value.rang !== 0 && (
            <span className={styles.position}>{value.rang}</span>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.head}>
            <h3 className={styles.name}>{value.name}</h3>
            <h4 className={styles.nickname}>{value.nickname ?? ""}</h4>
          </div>

          <div className={styles.country}>
            <span>{value.country}</span>
          </div>
          <div>
            <div className={styles.rang}>
              <div className={styles.record}>
                <h4 className={styles.recordTitle}>{value.victory}</h4>
                <p className={styles.recordDescription}>побед</p>
              </div>
              <div className={styles.record}>
                <h4 className={styles.recordTitle}>{value.defeat}</h4>
                <p className={styles.recordDescription}>пор.</p>
              </div>
              <div className={styles.record}>
                <h4 className={styles.recordTitle}>{value.draw}</h4>
                <p className={styles.recordDescription}>нич.</p>
              </div>
            </div>

            <div className={styles.bar}>
              <div className={styles.barLabel}>
                <span>KO {koPercent}%</span>
                <span>SUB {subPercent}%</span>
                <span>DEC {desPercent}%</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barSegment} ${styles.ko}`}
                  style={{ width: `${koPercent}%` }}
                />
                <div
                  className={`${styles.barSegment} ${styles.sub}`}
                  style={{ width: `${subPercent}%` }}
                />
                <div
                  className={`${styles.barSegment} ${styles.dec}`}
                  style={{ width: `${desPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Fighter;
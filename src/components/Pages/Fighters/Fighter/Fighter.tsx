import { type ReactElement, useEffect, useRef, useState } from "react";
import styles from "./Fighter.module.css";
import type { fighterType } from "../Fighters.types";

type FighterProps = {
  value: fighterType;
  index: number;
};

function Fighter({ value, index }: FighterProps): ReactElement {
  const koPercent = value.victory ? Math.round((value.KO * 100) / value.victory) : 0;
  const subPercent = value.victory ? Math.round((value.SUB * 100) / value.victory) : 0;
  const desPercent = value.victory ? 100 - koPercent - subPercent : 0;

  const winRate =
    value.victory + value.defeat + value.draw > 0
      ? Math.round((value.victory / (value.victory + value.defeat + value.draw)) * 100)
      : 0;

  const cardRef = useRef<HTMLLIElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  useEffect(() => {
    const card = cardRef.current;
    const innerCard = innerCardRef.current;
    const glare = glareRef.current;

    const calculateAngle = (e: MouseEvent) => {
      if (isFlipped) return;

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
      if (isFlipped) return;

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
  }, [isFlipped]);

  useEffect(() => {
    if (isFlipped && innerCardRef.current) {
      innerCardRef.current.style.transform = "";
      if (glareRef.current) glareRef.current.style.background = "none";
    }
  }, [isFlipped]);

  return (
    <li
      className={styles.card}
      ref={cardRef}
      tabIndex={0}
      onClick={handleCardClick}
      style={{ animationDelay: `${index * 0.1}s` }} 
    >
      <div
        className={`${styles.innerCard} ${isFlipped ? styles.flipped : ""}`}
        ref={innerCardRef}
      >

        <div
          className={styles.front}
          style={{ "--bg-image": `url(${value.img})` } as React.CSSProperties}
        >
          <div className={styles.frontBg} />
          <div className={styles.glare} ref={glareRef} />
          <div className={styles.overlay} />

          <div className={styles.top}>
            {value.isChampion && <span className={styles.champ}>Чемпион</span>}
            <span className={styles.position}>{value.rang !== 0 ? value.rang : 'C'}</span>
          </div>

          <div className={styles.body}>
            <div className={styles.head}>
              <h3 className={styles.name}>{value.name}</h3>
              <h4 className={styles.nickname}>{value.nickname ?? ""}</h4>
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
                  <div className={`${styles.barSegment} ${styles.ko}`} style={{ width: `${koPercent}%` }} />
                  <div className={`${styles.barSegment} ${styles.sub}`} style={{ width: `${subPercent}%` }} />
                  <div className={`${styles.barSegment} ${styles.dec}`} style={{ width: `${desPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.flipHint}>
            <span>Нажмите, чтобы узнать больше</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
            </svg>
          </div>
        </div>

        <div className={styles.back}>
          <div className={styles.backGrid} />

          <div className={styles.backHero}>
            <div
              className={styles.backAvatar}
              style={{ backgroundImage: `url(${value.img})` }}
            />
            <div className={styles.backHeroInfo}>
              <h3 className={styles.backName}>{value.name}</h3>
              {value.nickname && (
                <p className={styles.backNickname}>"{value.nickname}"</p>
              )}
              {value.isChampion && (
                <span className={styles.backChampBadge}>🏆 Чемпион</span>
              )}
            </div>
          </div>

          <div className={styles.backDivider} />

          <div className={styles.backStats}>
            <div>
              <span className={styles.backStatLabel}>Страна: </span>
              <span className={styles.backStatValue}>{value.country}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>Возраст: </span>
              <span className={styles.backStatValue}>{value.age}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>Рост: </span>
              <span className={styles.backStatValue}>{value.height} см</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>Вес: </span>
              <span className={styles.backStatValue}>{value.weight} кг</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>Размах рук: </span>
              <span className={styles.backStatValue}>{value.armSpan} см</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>Дебют: </span>
              <span className={styles.backStatValue}>{value.debut}</span>
            </div>
          </div>

          <div className={styles.winRateBlock}>
            <span className={styles.winRateLabel}>% побед</span>
            <div className={styles.winRateBarTrack}>
              <div
                className={styles.winRateBarFill}
                style={{ width: isFlipped ? `${winRate}%` : "0%" }}
              />
            </div>
            <span className={styles.winRateValue}>{winRate}%</span>
          </div>

          <div className={styles.backFooter}>
            <span className={styles.backFooterText}>↩ Нажмите, чтобы вернуть</span>
          </div>
        </div>

      </div>
    </li>
  );
}

export default Fighter;
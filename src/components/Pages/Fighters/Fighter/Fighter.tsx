import { type ReactElement, useEffect, useRef } from "react";
import styles from "./Fighter.module.css";
import type { fighterType } from "../Fighters.types";
import { useLang } from "../../../../hooks/useLang";

type FighterProps = {
  value: fighterType & { weightClassName?: string };
  index: number;
  showCategory?: boolean;
  isFlipped: boolean;
  onFlip: () => void;
};

function Fighter({ value, index, showCategory, isFlipped, onFlip }: FighterProps): ReactElement {
  const { t } = useLang();
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
  const isAnimatingRef = useRef(false);

  const handleCardClick = () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    onFlip();

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 700);
  };

  useEffect(() => {
    const card = cardRef.current;
    const innerCard = innerCardRef.current;
    const glare = glareRef.current;

    const calculateAngle = (e: MouseEvent) => {
      if (isFlipped || isAnimatingRef.current) return;

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
      if (isFlipped || isAnimatingRef.current) return;

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
            <div className={styles.badges}>
              {showCategory && value.weightClassName && (
                <span className={styles.categoryBadge}>{t(`fighters.categories.${value.weightClassName}`)}</span>
              )}
              {value.isChampion && <span className={styles.champ}>{t("fighter.champion")}</span>}
            </div>
            <span className={styles.position}>{value.rang !== 0 ? value.rang : "C"}</span>
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
                  <p className={styles.recordDescription}>{t("fighter.records.wins")}</p>
                </div>
                <div className={styles.record}>
                  <h4 className={styles.recordTitle}>{value.defeat}</h4>
                  <p className={styles.recordDescription}>{t("fighter.records.losses")}</p>
                </div>
                <div className={styles.record}>
                  <h4 className={styles.recordTitle}>{value.draw}</h4>
                  <p className={styles.recordDescription}>{t("fighter.records.draws")}</p>
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
            <span>{t("fighter.flipHint")}</span>
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
              {value.nickname && <p className={styles.backNickname}>"{value.nickname}"</p>}
              {showCategory && value.weightClassName && (
                <span className={styles.backCategoryBadge}>{t(`fighters.categories.${value.weightClassName}`)}</span>
              )}
              {value.isChampion && <span className={styles.backChampBadge}>🏆 {t("fighter.champion")}</span>}
            </div>
          </div>

          <div className={styles.backDivider} />

          <div className={styles.backStats}>
            <div>
              <span className={styles.backStatLabel}>{t("fighter.stats.country")}: </span>
              <span className={styles.backStatValue}>{t(`countries.${value.country}`)}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>{t("fighter.stats.age")}: </span>
              <span className={styles.backStatValue}>{value.age}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>{t("fighter.stats.height")}: </span>
              <span className={styles.backStatValue}>{value.height} {t("fighter.units.cm")}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>{t("fighter.stats.weight")}: </span>
              <span className={styles.backStatValue}>{value.weight} {t("fighter.units.kg")}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>{t("fighter.stats.armSpan")}: </span>
              <span className={styles.backStatValue}>{value.armSpan} {t("fighter.units.cm")}</span>
            </div>
            <div>
              <span className={styles.backStatLabel}>{t("fighter.stats.debut")}: </span>
              <span className={styles.backStatValue}>{value.debut}</span>
            </div>
          </div>

          <div className={styles.winRateBlock}>
            <span className={styles.winRateLabel}>{t("fighter.winRate")}</span>
            <div className={styles.winRateBarTrack}>
              <div
                className={styles.winRateBarFill}
                style={{ width: isFlipped ? `${winRate}%` : "0%" }}
              />
            </div>
            <span className={styles.winRateValue}>{winRate}%</span>
          </div>

          <div className={styles.backFooter}>
            <span className={styles.backFooterText}>{t("fighter.backHint")}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Fighter;
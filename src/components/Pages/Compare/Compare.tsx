import { useMemo, useState, type ReactElement, lazy, Suspense } from "react";
import styles from "./Compare.module.css";
import Footer from "../../Footer/Footer";
import weightClasses from "../Fighters/Fighters.utils";

import { flyWeight } from "../Fighters/fighters/flyWeight";
import { featherWeight } from "../Fighters/fighters/featherWeight";
import { bantaWeight } from "../Fighters/fighters/bantaWeight";
import { lightWeight } from "../Fighters/fighters/lightWeight";
import { welterWeight } from "../Fighters/fighters/welterWeight";
import { middleWeight } from "../Fighters/fighters/middleWeight";
import { lightHeavyWeight } from "../Fighters/fighters/lightHeavyWeight";
import { heavyWeight } from "../Fighters/fighters/heavyWeight";

import FighterSelect from "./components/FighterSelect/FighterSelect";
import CategorySelect from "./components/CategorySelect/CategorySelect";
import type { FighterType } from "../../../types/fighter";
import { useLang } from "../../../hooks/useLang";

const CompareRadar = lazy(() => import("./components/CompareRadar/CompareRadar"));

type CompareMetric = {
  key: string;
  label: string;
  leftValue: number;
  rightValue: number;
  suffix?: string;
  reverse?: boolean;
};

const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// усиливаем визуальную разницу для пары значений
const normalizePair = (
  left: number,
  right: number,
  options?: { reverse?: boolean; power?: number; min?: number; max?: number }
) => {
  const { reverse = false, power = 1.8, min = 20, max = 100 } = options || {};

  if (left === right) {
    return { left: 100, right: 100 };
  }

  const better = reverse ? Math.min(left, right) : Math.max(left, right);
  const worse = reverse ? Math.max(left, right) : Math.min(left, right);

  const ratio = worse / better; // 0..1
  const boosted = Math.pow(ratio, power);

  const worseScore = Math.max(min, Math.round(boosted * max));
  const betterScore = max;

  if (reverse) {
    return left < right
      ? { left: betterScore, right: worseScore }
      : { left: worseScore, right: betterScore };
  }

  return left > right
    ? { left: betterScore, right: worseScore }
    : { left: worseScore, right: betterScore };
};

function Compare(): ReactElement {
  const { t } = useLang();

  const allWeightsData = useMemo<FighterType[][]>(
    () => [
      flyWeight.map((f) => ({ ...f, weightClassName: weightClasses[0] })),
      bantaWeight.map((f) => ({ ...f, weightClassName: weightClasses[1] })),
      featherWeight.map((f) => ({ ...f, weightClassName: weightClasses[2] })),
      lightWeight.map((f) => ({ ...f, weightClassName: weightClasses[3] })),
      welterWeight.map((f) => ({ ...f, weightClassName: weightClasses[4] })),
      middleWeight.map((f) => ({ ...f, weightClassName: weightClasses[5] })),
      lightHeavyWeight.map((f) => ({ ...f, weightClassName: weightClasses[6] })),
      heavyWeight.map((f) => ({ ...f, weightClassName: weightClasses[7] })),
    ],
    []
  );

  const allFighters = useMemo(() => allWeightsData.flat(), [allWeightsData]);

  const [leftCategory, setLeftCategory] = useState<number>(0);
  const [rightCategory, setRightCategory] = useState<number>(0);
  const [leftIndex, setLeftIndex] = useState<number>(0);
  const [rightIndex, setRightIndex] = useState<number>(1);

  const leftPool = leftCategory === 0 ? allFighters : allWeightsData[leftCategory - 1] || [];
  const rightPool = rightCategory === 0 ? allFighters : allWeightsData[rightCategory - 1] || [];

  const leftFighter = leftPool[leftIndex] ?? allFighters[0];
  const rightFighter = rightPool[rightIndex] ?? allFighters[1] ?? allFighters[0];

  const getWinRate = (fighter: FighterType): number => {
    const total = fighter.victory + fighter.defeat + fighter.draw;
    return total ? Math.round((fighter.victory / total) * 100) : 0;
  };

  const getTotalFights = (fighter: FighterType): number =>
    fighter.victory + fighter.defeat + fighter.draw;

  const metrics: CompareMetric[] = useMemo(
    () => [
      {
        key: "age",
        label: t("compare.metrics.age"),
        leftValue: leftFighter.age,
        rightValue: rightFighter.age,
        suffix: t("compare.units.years"),
        reverse: true,
      },
      {
        key: "height",
        label: t("compare.metrics.height"),
        leftValue: leftFighter.height,
        rightValue: rightFighter.height,
        suffix: t("compare.units.cm"),
      },
      {
        key: "weight",
        label: t("compare.metrics.weight"),
        leftValue: leftFighter.weight,
        rightValue: rightFighter.weight,
        suffix: t("compare.units.kg"),
      },
      {
        key: "armSpan",
        label: t("compare.metrics.armSpan"),
        leftValue: leftFighter.armSpan,
        rightValue: rightFighter.armSpan,
        suffix: t("compare.units.cm"),
      },
      {
        key: "fights",
        label: t("compare.metrics.totalFights"),
        leftValue: getTotalFights(leftFighter),
        rightValue: getTotalFights(rightFighter),
      },
      {
        key: "wins",
        label: t("compare.metrics.wins"),
        leftValue: leftFighter.victory,
        rightValue: rightFighter.victory,
      },
      {
        key: "ko",
        label: t("compare.metrics.ko"),
        leftValue: leftFighter.KO,
        rightValue: rightFighter.KO,
      },
      {
        key: "sub",
        label: t("compare.metrics.sub"),
        leftValue: leftFighter.SUB,
        rightValue: rightFighter.SUB,
      },
      {
        key: "draw",
        label: t("compare.metrics.draws"),
        leftValue: leftFighter.draw,
        rightValue: rightFighter.draw,
      },
      {
        key: "winRate",
        label: t("compare.metrics.winRate"),
        leftValue: getWinRate(leftFighter),
        rightValue: getWinRate(rightFighter),
        suffix: "%",
      },
    ],
    [leftFighter, rightFighter, t]
  );

  const radarData = useMemo(() => {
    const age = normalizePair(leftFighter.age, rightFighter.age, {
      reverse: true,
      power: 3.2,
      min: 18,
      max: 100,
    });

    const height = normalizePair(leftFighter.height, rightFighter.height, {
      power: 4,
      min: 22,
      max: 100,
    });

    const weight = normalizePair(leftFighter.weight, rightFighter.weight, {
      power: 4,
      min: 22,
      max: 100,
    });

    const reach = normalizePair(leftFighter.armSpan, rightFighter.armSpan, {
      power: 4.2,
      min: 20,
      max: 100,
    });

    const ko = normalizePair(leftFighter.KO, rightFighter.KO, {
      power: 1.8,
      min: 12,
      max: 100,
    });

    const winRate = normalizePair(getWinRate(leftFighter), getWinRate(rightFighter), {
      power: 3,
      min: 18,
      max: 100,
    });

    return [
      {
        statKey: "age",
        stat: t("compare.radar.age"),
        A: age.left,
        B: age.right,
        fullMark: 100,
      },
      {
        statKey: "height",
        stat: t("compare.radar.height"),
        A: height.left,
        B: height.right,
        fullMark: 100,
      },
      {
        statKey: "weight",
        stat: t("compare.radar.weight"),
        A: weight.left,
        B: weight.right,
        fullMark: 100,
      },
      {
        statKey: "reach",
        stat: t("compare.radar.reach"),
        A: reach.left,
        B: reach.right,
        fullMark: 100,
      },
      {
        statKey: "ko",
        stat: t("compare.radar.ko"),
        A: ko.left,
        B: ko.right,
        fullMark: 100,
      },
      {
        statKey: "winRate",
        stat: t("compare.radar.winRate"),
        A: winRate.left,
        B: winRate.right,
        fullMark: 100,
      },
    ];
  }, [leftFighter, rightFighter, t]);

  const getMetricWinner = (metric: CompareMetric): "left" | "right" | "draw" => {
    if (metric.leftValue === metric.rightValue) return "draw";
    if (metric.reverse) return metric.leftValue < metric.rightValue ? "left" : "right";
    return metric.leftValue > metric.rightValue ? "left" : "right";
  };

  const categoryOptions = useMemo(
    () => [
      t("fighters.categories.all"),
      ...weightClasses.map((_, index) =>
        t(
          `fighters.categories.${[
            "flyweight",
            "bantamweight",
            "featherweight",
            "lightweight",
            "welterweight",
            "middleweight",
            "lightHeavyweight",
            "heavyweight",
          ][index]}`
        )
      ),
    ],
    [t]
  );

  const getSummaryWinner = (
    leftValue: number,
    rightValue: number,
    leftName: string,
    rightName: string
  ) => {
    if (leftValue === rightValue) return t("compare.summary.equal");
    return leftValue > rightValue ? leftName : rightName;
  };

  const leftImgSrc = withBase(leftFighter.img);
  const rightImgSrc = withBase(rightFighter.img);

  return (
    <>
      <main className={styles.page}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroGlow} />

          <div className={styles.heroHeader}>
            <p className={styles.eyebrow}>{t("compare.hero.eyebrow")}</p>
            <h1 className={styles.title}>{t("compare.hero.title")}</h1>
            <p className={styles.subtitle}>{t("compare.hero.subtitle")}</p>
          </div>

          <div className={styles.selectionGrid}>
            <div className={styles.selectorCard}>
              <p className={styles.selectorLabel}>{t("compare.selectors.fighter1")}</p>
              <CategorySelect
                options={categoryOptions.map((label, value) => ({ label, value }))}
                value={leftCategory}
                onChange={(val) => {
                  setLeftCategory(val);
                  setLeftIndex(0);
                }}
                accentColor="orange"
              />
              <FighterSelect
                options={leftPool.map((fighter, value) => ({ label: fighter.name, value }))}
                value={leftIndex}
                onChange={setLeftIndex}
                accentColor="orange"
              />
            </div>

            <div className={styles.versus}>{t("compare.common.vs")}</div>

            <div className={styles.selectorCard}>
              <p className={styles.selectorLabel}>{t("compare.selectors.fighter2")}</p>
              <CategorySelect
                options={categoryOptions.map((label, value) => ({ label, value }))}
                value={rightCategory}
                onChange={(val) => {
                  setRightCategory(val);
                  setRightIndex(0);
                }}
                accentColor="blue"
              />
              <FighterSelect
                options={rightPool.map((fighter, value) => ({ label: fighter.name, value }))}
                value={rightIndex}
                onChange={setRightIndex}
                accentColor="blue"
              />
            </div>
          </div>

          <div className={styles.fightersShowcase}>
            <article className={styles.fighterHeroCard}>
              <div
                className={styles.fighterImage}
                style={{ backgroundImage: `url("${leftImgSrc}")` }}
              />
              <div className={styles.fighterOverlay} />
              <div className={styles.fighterContent}>
                <span className={styles.weightBadge}>{leftFighter.weightClassName}</span>
                <h2 className={styles.fighterName}>{leftFighter.name}</h2>
                <p className={styles.fighterNick}>
                  {leftFighter.nickname || t("compare.common.noNickname")}
                </p>
                <div className={styles.quickStats}>
                  <span>{leftFighter.country}</span>
                  <span>
                    {leftFighter.victory}-{leftFighter.defeat}-{leftFighter.draw}
                  </span>
                  <span>
                    {getWinRate(leftFighter)}% {t("compare.common.winRate")}
                  </span>
                </div>
              </div>
            </article>

            <article className={styles.fighterHeroCard}>
              <div
                className={styles.fighterImage}
                style={{ backgroundImage: `url("${rightImgSrc}")` }}
              />
              <div className={styles.fighterOverlay} />
              <div className={styles.fighterContent}>
                <span className={styles.weightBadge}>{rightFighter.weightClassName}</span>
                <h2 className={styles.fighterName}>{rightFighter.name}</h2>
                <p className={styles.fighterNick}>
                  {rightFighter.nickname || t("compare.common.noNickname")}
                </p>
                <div className={styles.quickStats}>
                  <span>{rightFighter.country}</span>
                  <span>
                    {rightFighter.victory}-{rightFighter.defeat}-{rightFighter.draw}
                  </span>
                  <span>
                    {getWinRate(rightFighter)}% {t("compare.common.winRate")}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* DASHBOARD */}
        <section className={styles.dashboard}>
          <div className={styles.metricsCard}>
            <div className={styles.sectionTop}>
              <h3 className={styles.sectionTitle}>{t("compare.sections.metricsTitle")}</h3>
              <p className={styles.sectionText}>{t("compare.sections.metricsText")}</p>
            </div>

            <div className={styles.metricList}>
              {metrics.map((metric) => {
                const max = Math.max(metric.leftValue, metric.rightValue, 1);
                const leftWidth = (metric.leftValue / max) * 100;
                const rightWidth = (metric.rightValue / max) * 100;
                const winner = getMetricWinner(metric);

                return (
                  <div key={metric.key} className={styles.metricRow}>
                    <div
                      className={`${styles.metricValue} ${
                        winner === "left" ? styles.winnerValue : ""
                      }`}
                    >
                      {metric.leftValue}
                      {metric.suffix || ""}
                    </div>

                    <div className={styles.metricCenter}>
                      <div className={styles.metricLabel}>{metric.label}</div>
                      <div className={styles.dualBar}>
                        <div className={styles.dualSide}>
                          <div
                            className={`${styles.barFill} ${styles.leftBar} ${
                              winner === "left" ? styles.barWinner : ""
                            }`}
                            style={{ width: `${leftWidth}%` }}
                          />
                        </div>
                        <div className={styles.metricDivider} />
                        <div className={styles.dualSide}>
                          <div
                            className={`${styles.barFill} ${styles.rightBar} ${
                              winner === "right" ? styles.barWinner : ""
                            }`}
                            style={{ width: `${rightWidth}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${styles.metricValue} ${
                        winner === "right" ? styles.winnerValue : ""
                      }`}
                    >
                      {metric.rightValue}
                      {metric.suffix || ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.sectionTop}>
              <h3 className={styles.sectionTitle}>{t("compare.sections.profileTitle")}</h3>
              <p className={styles.sectionText}>{t("compare.sections.profileText")}</p>
            </div>

            <div className={styles.chartLegend}>
              <span className={styles.legendDot} style={{ background: "#ff6b2c" }} />
              <span className={styles.legendName}>{leftFighter.name}</span>
              <span
                className={styles.legendDot}
                style={{ background: "#3b82f6", marginLeft: "16px" }}
              />
              <span className={styles.legendName}>{rightFighter.name}</span>
            </div>

            <Suspense
              fallback={<div className={styles.chartLoader}>{t("compare.common.loadingChart")}</div>}
            >
              <CompareRadar
                radarData={radarData}
                leftFighter={leftFighter}
                rightFighter={rightFighter}
                getWinRate={getWinRate}
              />
            </Suspense>
          </div>
        </section>

        {/* SUMMARY */}
        <section className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>{t("compare.summary.bestStriking")}</span>
            <strong className={styles.summaryValue}>
              {getSummaryWinner(leftFighter.KO, rightFighter.KO, leftFighter.name, rightFighter.name)}
            </strong>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>{t("compare.summary.bestWinRate")}</span>
            <strong className={styles.summaryValue}>
              {getSummaryWinner(
                getWinRate(leftFighter),
                getWinRate(rightFighter),
                leftFighter.name,
                rightFighter.name
              )}
            </strong>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>{t("compare.summary.longerReach")}</span>
            <strong className={styles.summaryValue}>
              {getSummaryWinner(
                leftFighter.armSpan,
                rightFighter.armSpan,
                leftFighter.name,
                rightFighter.name
              )}
            </strong>
          </div>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>{t("compare.summary.moreExperience")}</span>
            <strong className={styles.summaryValue}>
              {getSummaryWinner(
                getTotalFights(leftFighter),
                getTotalFights(rightFighter),
                leftFighter.name,
                rightFighter.name
              )}
            </strong>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Compare;
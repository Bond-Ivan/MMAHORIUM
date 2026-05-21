import { useMemo, useState, type ReactElement } from "react";
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

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import FighterSelect from "./components/FighterSelect/FighterSelect";
import CategorySelect from "./components/CategorySelect/CategorySelect";
import RadarTooltip from "./components/RadarTooltip/RadarTooltip";
import type { FighterType } from "../../../types/fighter";

type CompareMetric = {
    key: string;
    label: string;
    leftValue: number;
    rightValue: number;
    suffix?: string;
    reverse?: boolean;
};

function Compare(): ReactElement {
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

    const metrics: CompareMetric[] = [
        { key: "age", label: "Возраст", leftValue: leftFighter.age, rightValue: rightFighter.age, suffix: " лет", reverse: true },
        { key: "height", label: "Рост", leftValue: leftFighter.height, rightValue: rightFighter.height, suffix: " см" },
        { key: "weight", label: "Вес", leftValue: leftFighter.weight, rightValue: rightFighter.weight, suffix: " кг" },
        { key: "armSpan", label: "Размах рук", leftValue: leftFighter.armSpan, rightValue: rightFighter.armSpan, suffix: " см" },
        { key: "fights", label: "Всего боёв", leftValue: getTotalFights(leftFighter), rightValue: getTotalFights(rightFighter) },
        { key: "wins", label: "Победы", leftValue: leftFighter.victory, rightValue: rightFighter.victory },
        { key: "ko", label: "Нокауты", leftValue: leftFighter.KO, rightValue: rightFighter.KO },
        { key: "sub", label: "Сабмишены", leftValue: leftFighter.SUB, rightValue: rightFighter.SUB },
        { key: "draw", label: "Ничьи", leftValue: leftFighter.draw, rightValue: rightFighter.draw },
        { key: "winRate", label: "% побед", leftValue: getWinRate(leftFighter), rightValue: getWinRate(rightFighter), suffix: "%" },
    ];

    const radarData = [
        {
            stat: "Возраст",
            A: Math.max(1, 100 - leftFighter.age),
            B: Math.max(1, 100 - rightFighter.age),
            fullMark: 100,
        },
        {
            stat: "Рост",
            A: leftFighter.height,
            B: rightFighter.height,
            fullMark: Math.max(leftFighter.height, rightFighter.height, 200),
        },
        {
            stat: "Вес",
            A: leftFighter.weight,
            B: rightFighter.weight,
            fullMark: Math.max(leftFighter.weight, rightFighter.weight, 130),
        },
        {
            stat: "Reach",
            A: leftFighter.armSpan,
            B: rightFighter.armSpan,
            fullMark: Math.max(leftFighter.armSpan, rightFighter.armSpan, 220),
        },
        {
            stat: "KO",
            A: leftFighter.KO,
            B: rightFighter.KO,
            fullMark: Math.max(leftFighter.KO, rightFighter.KO, 20),
        },
        {
            stat: "Win %",
            A: getWinRate(leftFighter),
            B: getWinRate(rightFighter),
            fullMark: 100,
        },
    ];

    const getMetricWinner = (metric: CompareMetric): "left" | "right" | "draw" => {
        if (metric.leftValue === metric.rightValue) return "draw";
        if (metric.reverse) return metric.leftValue < metric.rightValue ? "left" : "right";
        return metric.leftValue > metric.rightValue ? "left" : "right";
    };

    const categoryOptions = ["Все", ...weightClasses];

    return (
        <>
            <main className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.heroGlow} />

                    <div className={styles.heroHeader}>
                        <p className={styles.eyebrow}>UFC analytics</p>
                        <h1 className={styles.title}>Сравнение бойцов</h1>
                        <p className={styles.subtitle}>
                            Выбирай любых двух бойцов, сравнивай их характеристики, рекорд,
                            нокаутирующую мощь, сабмишены, антропометрию и процент побед.
                        </p>
                    </div>

                    <div className={styles.selectionGrid}>
                        <div className={styles.selectorCard}>
                            <p className={styles.selectorLabel}>Боец 1</p>
                            <CategorySelect
                                options={categoryOptions.map((label, value) => ({ label, value }))}
                                value={leftCategory}
                                onChange={(val) => { setLeftCategory(val); setLeftIndex(0); }}
                                accentColor="orange"
                            />
                            <FighterSelect
                                options={leftPool.map((fighter, value) => ({ label: fighter.name, value }))}
                                value={leftIndex}
                                onChange={setLeftIndex}
                                accentColor="orange"
                            />
                        </div>

                        <div className={styles.versus}>VS</div>

                        <div className={styles.selectorCard}>
                            <p className={styles.selectorLabel}>Боец 2</p>
                            <CategorySelect
                                options={categoryOptions.map((label, value) => ({ label, value }))}
                                value={rightCategory}
                                onChange={(val) => { setRightCategory(val); setRightIndex(0); }}
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
                            <div className={styles.fighterImage} style={{ backgroundImage: `url(${leftFighter.img})` }} />
                            <div className={styles.fighterOverlay} />
                            <div className={styles.fighterContent}>
                                <span className={styles.weightBadge}>{leftFighter.weightClassName}</span>
                                <h2 className={styles.fighterName}>{leftFighter.name}</h2>
                                <p className={styles.fighterNick}>{leftFighter.nickname || "Без прозвища"}</p>
                                <div className={styles.quickStats}>
                                    <span>{leftFighter.country}</span>
                                    <span>{leftFighter.victory}-{leftFighter.defeat}-{leftFighter.draw}</span>
                                    <span>{getWinRate(leftFighter)}% win rate</span>
                                </div>
                            </div>
                        </article>

                        <article className={styles.fighterHeroCard}>
                            <div className={styles.fighterImage} style={{ backgroundImage: `url(${rightFighter.img})` }} />
                            <div className={styles.fighterOverlay} />
                            <div className={styles.fighterContent}>
                                <span className={styles.weightBadge}>{rightFighter.weightClassName}</span>
                                <h2 className={styles.fighterName}>{rightFighter.name}</h2>
                                <p className={styles.fighterNick}>{rightFighter.nickname || "Без прозвища"}</p>
                                <div className={styles.quickStats}>
                                    <span>{rightFighter.country}</span>
                                    <span>{rightFighter.victory}-{rightFighter.defeat}-{rightFighter.draw}</span>
                                    <span>{getWinRate(rightFighter)}% win rate</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section className={styles.dashboard}>
                    <div className={styles.metricsCard}>
                        <div className={styles.sectionTop}>
                            <h3 className={styles.sectionTitle}>Характеристики</h3>
                            <p className={styles.sectionText}>Визуально видно, кто сильнее по каждому параметру.</p>
                        </div>

                        <div className={styles.metricList}>
                            {metrics.map((metric) => {
                                const max = Math.max(metric.leftValue, metric.rightValue, 1);
                                const leftWidth = (metric.leftValue / max) * 100;
                                const rightWidth = (metric.rightValue / max) * 100;
                                const winner = getMetricWinner(metric);

                                return (
                                    <div key={metric.key} className={styles.metricRow}>
                                        <div className={`${styles.metricValue} ${winner === "left" ? styles.winnerValue : ""}`}>
                                            {metric.leftValue}{metric.suffix || ""}
                                        </div>

                                        <div className={styles.metricCenter}>
                                            <div className={styles.metricLabel}>{metric.label}</div>
                                            <div className={styles.dualBar}>
                                                <div className={styles.dualSide}>
                                                    <div
                                                        className={`${styles.barFill} ${styles.leftBar} ${winner === "left" ? styles.barWinner : ""}`}
                                                        style={{ width: `${leftWidth}%` }}
                                                    />
                                                </div>
                                                <div className={styles.metricDivider} />
                                                <div className={styles.dualSide}>
                                                    <div
                                                        className={`${styles.barFill} ${styles.rightBar} ${winner === "right" ? styles.barWinner : ""}`}
                                                        style={{ width: `${rightWidth}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.metricValue} ${winner === "right" ? styles.winnerValue : ""}`}>
                                            {metric.rightValue}{metric.suffix || ""}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.chartCard}>
                        <div className={styles.sectionTop}>
                            <h3 className={styles.sectionTitle}>Профиль бойцов</h3>
                            <p className={styles.sectionText}>Сводная форма по ключевым показателям.</p>
                        </div>

                        <div className={styles.chartLegend}>
                            <span className={styles.legendDot} style={{ background: "#ff6b2c" }} />
                            <span className={styles.legendName}>{leftFighter.name}</span>
                            <span className={styles.legendDot} style={{ background: "#3b82f6", marginLeft: "16px" }} />
                            <span className={styles.legendName}>{rightFighter.name}</span>
                        </div>

                        <div className={styles.chartWrap}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis dataKey="stat" tick={{ fill: "#c9d2e3", fontSize: 13 }} />
                                    <PolarRadiusAxis tick={false} axisLine={false} />
                                    <Tooltip
                                        content={
                                            <RadarTooltip
                                                leftFighter={leftFighter}
                                                rightFighter={rightFighter}
                                                getWinRate={getWinRate}
                                            />
                                        }
                                    />
                                    <Radar name={leftFighter.name} dataKey="A" stroke="#ff6b2c" fill="#ff6b2c" fillOpacity={0.35} />
                                    <Radar name={rightFighter.name} dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.28} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                <section className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Лучшая ударная мощь</span>
                        <strong className={styles.summaryValue}>
                            {leftFighter.KO === rightFighter.KO ? "Одинаково" : leftFighter.KO > rightFighter.KO ? leftFighter.name : rightFighter.name}
                        </strong>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Лучший винрейт</span>
                        <strong className={styles.summaryValue}>
                            {getWinRate(leftFighter) === getWinRate(rightFighter) ? "Одинаково" : getWinRate(leftFighter) > getWinRate(rightFighter) ? leftFighter.name : rightFighter.name}
                        </strong>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Больше рост</span>
                        <strong className={styles.summaryValue}>
                            {leftFighter.armSpan === rightFighter.armSpan ? "Одинаково" : leftFighter.armSpan > rightFighter.armSpan ? leftFighter.name : rightFighter.name}
                        </strong>
                    </div>
                    <div className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>Больше опыта</span>
                        <strong className={styles.summaryValue}>
                            {getTotalFights(leftFighter) === getTotalFights(rightFighter) ? "Одинаково" : getTotalFights(leftFighter) > getTotalFights(rightFighter) ? leftFighter.name : rightFighter.name}
                        </strong>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Compare;
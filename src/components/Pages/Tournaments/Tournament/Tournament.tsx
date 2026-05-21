import { useState, type ReactElement } from "react";
import styles from "./Tournament.module.css";
import type { TournamentType, FightEntry } from "../Tournaments.utils";
import { UfcWeightClass } from "../../../../constants/weights";

type TournamentProps = {
    item: TournamentType;
    index: number;
};

function Tournament({ item, index }: TournamentProps): ReactElement {
    const [isOpen, setIsOpen] = useState(false);
    const isPast = item.type === 'ПРОШЕДШИЙ';

    return (
        <li
            className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                <div className={styles.date}>
                    <h4 className={styles.dateDay}>{item.dateDay}</h4>
                    <p className={styles.dateMonth}>{item.dateMonth}</p>
                </div>

                <div className={styles.info}>
                    <div>
                        <h3 className={styles.name}>{item.name}</h3>
                        <p className={styles.weight}>{UfcWeightClass[item.weight]}</p>
                        <p className={styles.place}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {item.place}
                        </p>
                    </div>

                    <div className={styles.rightGroup}>
                        <p className={`${styles.type} ${item.type === 'NUMBERED' || item.type === 'FREEDOM' ? styles.typeNumbered : item.type === 'FIGHT NIGHT' ? styles.typeFN : ''}`}>
                            {item.type}
                        </p>
                        <svg
                            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </div>
            </button>

            <div className={`${styles.fights} ${isOpen ? styles.fightsOpen : ""}`}>
                <div className={styles.fightsInner}>
                    {item.fights.map((fight: FightEntry, i: number) => (
                        <div
                            key={i}
                            className={`${styles.fightRow} ${fight.isMain ? styles.fightRowMain : ""} ${fight.isTitle ? styles.fightRowTitle : ""}`}
                            style={{ animationDelay: `${i * 55}ms` }}
                        >
                            <div className={styles.fightWeightClass}>{fight.weightClass}</div>

                            <div className={styles.fightMatchup}>
                                <span className={`${styles.fighterName} ${isPast && fight.result ? (fight.fighter1.includes(fight.result) ? styles.winner : styles.loser) : ""}`}>
                                    {fight.fighter1}
                                </span>
                                <span className={styles.fightVs}>vs</span>
                                <span className={`${styles.fighterName} ${isPast && fight.result ? (fight.fighter2.includes(fight.result) ? styles.winner : styles.loser) : ""}`}>
                                    {fight.fighter2}
                                </span>
                            </div>

                            {isPast && fight.result && (
                                <div className={styles.fightResult}>
                                    <span className={styles.fightWinner}>✓ {fight.result}</span>
                                    <span className={styles.fightMethod}>{fight.method}</span>
                                </div>
                            )}

                            {!isPast && (
                                <div className={styles.fightResultAnnounced}>
                                    <span>Анонс</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </li>
    );
}

export default Tournament;
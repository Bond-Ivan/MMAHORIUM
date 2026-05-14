import type { ReactElement } from "react";
import styles from "./Tournament.module.css";
import type { TournamentType } from "../Tournaments.utils";
import { UfcWeightClass } from "../../../../constants/weights";

type TournamentProps = {
    item: TournamentType;
    index: number;
};

function Tournament({ item, index }: TournamentProps): ReactElement {
    return (
        <li className={styles.item} style={{
            animationDelay: `${0.1 + index * 0.1}s`
        }}>
            <div className={styles.date}>
                <h4 className={styles.dateDay}>{item.dateDay}</h4>
                <p className={styles.dateMonth}>{item.dateMonth}</p>
            </div>
            <div className={styles.info}>
                <div>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.weight}>{UfcWeightClass[item.weight]}</p>
                    <p className={styles.place}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {item.place}
                    </p>
                </div>
                <p className={`${styles.type} ${item.type === 'NUMBERED' || item.type === 'FREEDOM' ? styles.typeNumbered : item.type === 'FIGHT NIGHT' ? styles.typeFN : ''}`}>
                    {item.type}
                </p>
            </div>
        </li>
    )
}

export default Tournament;
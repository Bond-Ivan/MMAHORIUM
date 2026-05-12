import type { ReactElement } from "react";
import styles from './P4PChampion.module.css';

type P4PChampionProps = {
    rank: number;
    name: string;
    nickname: string | null;
    weightClass: string;
    record: string | null;
};

function P4PChampion({ rank, name, nickname, weightClass, record }: P4PChampionProps): ReactElement {
    return (
        <li className={styles.item}>
            <div className={styles.wrapper}>
                <div className={styles.raiting}>{rank}</div>
                <div className={styles.info}> 
                    <h3 className={styles.name}>{name} <span className={styles.nickname}>{nickname}</span></h3>
                    <p className={styles.weight}>{weightClass}</p>
                </div>
            </div>
            <p className={styles.record}>{record}</p>
        </li>
    );
};

export default P4PChampion;
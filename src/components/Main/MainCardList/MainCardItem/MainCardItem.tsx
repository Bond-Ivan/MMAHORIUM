import type { ReactElement } from "react";
import styles from './MainCardItem.module.css';

type Props = {
    title: string;
    text: string;
    value: number | null;
};

function MainCardItem({ title, text, value }: Props): ReactElement {    
    return (
        <li className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.valueContainer}>
                {value === null ? (
                    <span className={styles.spinner}></span>
                ) : (
                    <span className={styles.value}>{value}</span>
                )}
            </div>
            
            <p className={styles.text}>{text}</p>
        </li>
    );
}

export default MainCardItem;
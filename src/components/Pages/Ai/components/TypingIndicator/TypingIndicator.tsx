import { type ReactElement } from "react";
import styles from "./TypingIndicator.module.css";

function TypingIndicator(): ReactElement {
    return (
        <div className={styles.wrap}>
            <div className={styles.avatar}>🔮</div>

            <div className={styles.bubble}>
                <span className={styles.text}>Oracle думает</span>
                <div className={styles.dots}>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;
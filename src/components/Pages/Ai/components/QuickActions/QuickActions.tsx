import { type ReactElement } from "react";
import type { QuickAction } from "../../Ai.types";
import styles from "./QuickActions.module.css";

type Props = {
    actions: QuickAction[];
    onSelect: (value: string) => void | Promise<void>;
};

function QuickActions({ actions, onSelect }: Props): ReactElement {
    return (
        <div className={styles.grid}>
            {actions.map((action) => (
                <button
                    key={action.id}
                    className={`${styles.card} ${styles[action.accent]}`}
                    type="button"
                    onClick={() => onSelect(action.prompt)}
                >
                    <div className={styles.cardShine} />
                    <div className={styles.cardTop}>
                        <span className={styles.emoji}>{action.emoji}</span>
                        <span className={styles.pill}>Ready</span>
                    </div>

                    <div className={styles.cardBody}>
                        <span className={styles.cardTitle}>{action.title}</span>
                        <span className={styles.cardSubtitle}>{action.subtitle}</span>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.cardPrompt}>{action.prompt}</span>
                    </div>
                </button>
            ))}
        </div>
    );
}

export default QuickActions;
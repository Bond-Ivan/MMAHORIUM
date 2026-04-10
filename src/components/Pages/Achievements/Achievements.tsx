import type { ReactElement } from "react";
import styles from "./Achievements.module.css";
import Footer from "../../Footer/Footer";

function Achievements(): ReactElement {
    return (
        <>
            <main className={styles.main}>
                <h2 className={styles.title}>
                    Выдающиеся <span className={styles.pretitle}> достижения</span>
                </h2>
            </main>
            <Footer />
        </>
    )
}

export default Achievements;
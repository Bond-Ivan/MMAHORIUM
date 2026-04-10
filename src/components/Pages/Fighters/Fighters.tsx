import { useState, type ReactElement } from "react";
import styles from "./Fighters.module.css";
import Footer from "../../Footer/Footer";
import weightClasses from "./Fighters.utils";
import { flyWeight } from "./fighters/flyWeight";
import Fighter from "./Fighter/Fighter";

function Fighters(): ReactElement {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <main className={styles.main}>
                <h2 className={styles.title}>
                    Бойцы UFC<span className={styles.pretitle}> 2026</span>
                </h2>
                <ul className={styles.weights}>
                    {weightClasses.map((weightClass, index) => (
                        <li key={index}>
                            <button
                                className={`${styles.button} ${activeIndex === index ? styles.active : ""}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {weightClass}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className={styles.fighters}>
                    {flyWeight.map((value, index) => (
                        <Fighter key={index} value={value} />
                    ))}
                </ul>
            </main>
            <Footer />
        </>
    )
}

export default Fighters;
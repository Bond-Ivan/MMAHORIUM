import type { ReactElement } from "react";
import styles from "./News.module.css";
import NewItem from "./NewItem/NewItem";
import news from "./News.utils";
import Footer from "../../Footer/Footer";

function News(): ReactElement {
    return (
        <>
            <main className={styles.main}>
                <h2 className={styles.title}>
                    Новости <span className={styles.pretitle}> UFC</span>
                </h2>
                <ul className={styles.list}>
                    {news.map((item) => (
                        <NewItem key={item.id} newItem={item} />
                    ))}
                </ul>
            </main>
            <Footer />
        </>
    )
}

export default News; 
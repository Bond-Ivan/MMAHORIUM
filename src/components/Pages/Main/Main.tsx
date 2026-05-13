import MainCardList from "./MainCardList/MainCardList";
import MainTournament from "./MainTournament/MainTournament";
import P4PChampions from "./P4PChampions/P4PChampions";
import styles from '../../../App.module.css';
import Footer from "../../Footer/Footer";

function Main() {
    return (
        <>
            <main className={styles.main}>
                <MainCardList />
                <MainTournament />
                <P4PChampions />
            </main>
            <Footer />
        </>
    );
}

export default Main;
import MainCardList from "./MainCardList/MainCardList";
import MainTournament from "./MainTournament/MainTournament";
import P4PChampions from "./P4PChampions/P4PChampions";
import styles from './Main.module.css';

function Main() {
    return (
        <main className={styles.main}>
            <MainCardList />
            <MainTournament />
            <P4PChampions />
        </main>
    );
}

export default Main;
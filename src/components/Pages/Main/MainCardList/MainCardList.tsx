import { type ReactElement } from "react";
import styles from './MainCardList.module.css';
import MainCardItem from "./MainCardItem/MainCardItem";

function MainCardList(): ReactElement {
    const items = [
        { id: '1', title: 'АКТИВНЫХ БОЙЦОВ', text: 'В реестре UFC', value: 578 },
        { id: '2', title: 'ТУРНИРОВ ЗАПЛАНИРОВАНО', text: 'В этому году', value: 11 },
        { id: '3', title: 'ТУРНИРОВ ПРОШЛО', text: 'В этом году', value: 15 },
        { id: '4', title: 'ДЕБЮТИРОВАВШИХ БОЙЦОВ', text: 'В этом году', value: 43 },
    ];

    return (
        <section>
            <ul className={styles.list}>
                {items.map((item) => (
                    <MainCardItem
                        key={item.id}
                        title={item.title}
                        text={item.text}
                        value={item.value}
                    />
                ))}
            </ul>
        </section>
    );
}

export default MainCardList;
import { useEffect, useState, type ReactElement } from "react";
import styles from './MainCardList.module.css';
import MainCardItem from "./MainCardItem/MainCardItem";

function MainCardList(): ReactElement {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/ufc-count")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => setCount(data.total))
            .catch((e) => setError(e.message));
    }, []);

    if (error) {
        return <div>Ошибка загрузки: {error}</div>;
    }

    const items = [
        { id: '1', title: 'АКТИВНЫХ БОЙЦОВ', text: 'В реестре UFC', value: count },
        { id: '2', title: 'ТУРНИРОВ ЗАПЛАНИРОВАНО', text: 'В этому году', value: 35 },
        { id: '3', title: 'ТУРНИРОВ ПРОШЛО', text: 'В этом году', value: 9 },
        { id: '4', title: 'ДЕБЮТИРОВАВШИХ БОЙЦОВ', text: 'В этом году', value: 32 },
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
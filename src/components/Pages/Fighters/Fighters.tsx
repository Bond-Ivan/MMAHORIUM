import { useState, type ReactElement } from "react";
import styles from "./Fighters.module.css";
import Footer from "../../Footer/Footer";
import weightClasses from "./Fighters.utils";
import { flyWeight } from "./fighters/flyWeight";
import { bantaWeight } from "./fighters/bantaweight";

import Fighter from "./Fighter/Fighter";

function Fighters(): ReactElement {
    const [activeIndex, setActiveIndex] = useState(0);
    // Храним индексы перевернутых карточек
    const [flippedCards, setFlippedCards] = useState<number[]>([]);

    const allWeightsData = [
        flyWeight.map(fighter => ({ ...fighter, weightClassName: weightClasses[0] })), 
        bantaWeight.map(fighter => ({ ...fighter, weightClassName: weightClasses[1] }))
    ];

    const displayCategories = ["Все", ...weightClasses];

    const currentFighters = activeIndex === 0 
        ? allWeightsData.flat() 
        : allWeightsData[activeIndex - 1] || [];

    // При смене категории сбрасываем открытые карточки
    const handleCategoryChange = (index: number) => {
        setActiveIndex(index);
        setFlippedCards([]); 
    };

    // Логика ограничения переворота (максимум 2)
    const handleFlip = (index: number) => {
        setFlippedCards(prev => {
            if (prev.includes(index)) {
                // Если карточка уже была открыта, закрываем её
                return prev.filter(i => i !== index);
            }
            const newFlipped = [...prev, index];
            if (newFlipped.length > 2) {
                // Если открываем третью - закрываем первую из открытых
                return newFlipped.slice(1);
            }
            return newFlipped;
        });
    };

    return (
        <>
            <main className={styles.main}>
                <h2 className={styles.title}>
                    Бойцы UFC
                </h2>
                <ul className={styles.weights}>
                    {displayCategories.map((category, index) => (
                        <li key={index}>
                            <button
                                className={`${styles.button} ${activeIndex === index ? styles.active : ""}`}
                                onClick={() => handleCategoryChange(index)}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul key={activeIndex} className={styles.fighters}>
                    {currentFighters.map((value, index) => (
                        <Fighter 
                            key={index} 
                            value={value} 
                            index={index} 
                            showCategory={activeIndex === 0} 
                            isFlipped={flippedCards.includes(index)}
                            onFlip={() => handleFlip(index)}
                        />
                    ))}
                </ul>
            </main>
            <Footer />
        </>
    )
}

export default Fighters;
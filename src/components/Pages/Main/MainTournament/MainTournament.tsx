import { useEffect, useState, useRef, type ReactElement } from "react";
import styles from './MainTournament.module.css';
import { getTimeLeft } from "./MainTournament.utils";
import { UfcWeightClass } from "../../../../constants/weights";

type Fight = {
    fighter1: string;
    flag1: string;
    record1: string;
    fighter2: string;
    flag2: string;
    record2: string;
    weightClass: string;
    isMain?: boolean;
};

const mainCard: Fight[] = [
    {
        fighter1: 'Сонг Ядун', flag1: '🇨🇳', record1: '22-9-1',
        fighter2: 'Д. Фигередо', flag2: '🇧🇷', record2: '25-6-1',
        weightClass: 'Легчайший', isMain: true,
    },
    {
        fighter1: 'Чжан Минъян', flag1: '🇨🇳', record1: '17-3-0',
        fighter2: 'А. Менифилд', flag2: '🇺🇸', record2: '15-5-0',
        weightClass: 'Полутяжёлый',
    },
    {
        fighter1: 'С. Павлович', flag1: '🇷🇺', record1: '18-4-0',
        fighter2: 'Тай Тюваса', flag2: '🇦🇺', record2: '16-6-0',
        weightClass: 'Тяжёлый',
    },
    {
        fighter1: 'Рей Цуруя', flag1: '🇯🇵', record1: '8-1-0',
        fighter2: 'Цзян Яньчжу', flag2: '🇨🇳', record2: '13-1-0',
        weightClass: 'Наилегчайший',
    },
    {
        fighter1: 'Коди Хаддон', flag1: '🇺🇸', record1: '8-1-0',
        fighter2: 'Шаньру Чжао', flag2: '🇨🇳', record2: '11-2-0',
        weightClass: 'Легчайший',
    },
];

const prelims: Fight[] = [
    {
        fighter1: 'Мэн Дин', flag1: '🇨🇳', record1: '35-9-0',
        fighter2: 'Кирю Тагучи', flag2: '🇯🇵', record2: '29-16-2',
        weightClass: 'Полусредний',
    },
    {
        fighter1: 'Ву Яо', flag1: '🇨🇳', record1: '18-4-0',
        fighter2: 'Б. Сохо', flag2: '🇳🇬', record2: '9-2-0',
        weightClass: 'Полутяжёлый',
    },
    {
        fighter1: 'Дж. Хокинс', flag1: '🇺🇸', record1: '11-3-0',
        fighter2: 'Бо Никал', flag2: '🇺🇸', record2: '7-0-0',
        weightClass: 'Средний',
    },
    {
        fighter1: 'Ши Мин', flag1: '🇨🇳', record1: '16-5-0',
        fighter2: 'Сяоцань Фэн', flag2: '🇨🇳', record2: '10-2-0',
        weightClass: 'Соломенный (жен.)',
    },
];

function MainTournament(): ReactElement {
    const [timeLeft, setTimeLeft] = useState({
        days: '00', hours: '00', minutes: '00', seconds: '00'
    });

    // 'closed' | 'opening' | 'open' | 'closing'
    const [modalState, setModalState] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
    const closingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const targetDate = new Date("2026-05-30T14:00:00+03:00").getTime();
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Блокировка скролла страницы
    useEffect(() => {
        if (modalState !== 'closed') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [modalState]);

    const openModal = () => {
        if (closingTimer.current) clearTimeout(closingTimer.current);
        setModalState('opening');
        // После следующего тика запускаем полное открытие (нужен reflow)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setModalState('open');
            });
        });
    };

    const closeModal = () => {
        setModalState('closing');
        closingTimer.current = setTimeout(() => {
            setModalState('closed');
        }, 300); // совпадает с длительностью transition в CSS
    };

    const isVisible = modalState !== 'closed';

    return (
        <>
            <section className={styles.container}>
                <div className={styles.infoBlock}>
                    <div className={styles.eventLabel}>
                        <div className={styles.dot}></div>
                        Следующий турнир
                    </div>
                    <h2 className={styles.eventName}>UFC Fight Night 277: <br />Сонг vs Фигередо</h2>
                    <p className={styles.eventWeight}>
                        <svg className={styles.weightIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                            <path d="M5 21h14"></path>
                        </svg>
                        {UfcWeightClass.Bantamweight}
                    </p>

                    <div className={styles.fighters}>
                        <div className={styles.firstFighter}>
                            <h3 className={styles.fighterName}>🇨🇳Сонг</h3>
                            <p className={styles.fighterRaiting}>22-9-1</p>
                        </div>
                        <div className={styles.badge}>VS</div>
                        <div className={styles.secondFighter}>
                            <h3 className={styles.fighterName}>🇧🇷Фигередо</h3>
                            <p className={styles.fighterRaiting}>25-6-1</p>
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.footer}>
                            <p className={styles.footerElem}>
                                <svg className={styles.footerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M8 2v4"></path><path d="M16 2v4"></path>
                                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                    <path d="M3 10h18"></path>
                                </svg>
                                30 мая 2026
                            </p>
                            <p className={styles.footerElem}>
                                <svg className={styles.footerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                Китай, Макао
                            </p>
                            <p className={styles.footerElem}>
                                <svg className={styles.footerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="m17 2-5 5-5-5"></path>
                                    <rect width="20" height="15" x="2" y="7" rx="2"></rect>
                                </svg>
                                Paramount+
                            </p>
                        </div>

                        <button className={styles.cardBtn} onClick={openModal} aria-label="Показать полный кард">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                            Весь кард
                        </button>
                    </div>
                </div>

                <div className={styles.timeBlock}>
                    <h2 className={styles.timeTitle}>ДО НАЧАЛА</h2>
                    <div className={styles.timeWrapper}>
                        <div className={styles.timeBox}>
                            <h3 className={styles.timValue}>{timeLeft.days}</h3>
                            <p className={styles.timeText}>ДНЕЙ</p>
                        </div>
                        <div className={styles.timeBox}>
                            <h3 className={styles.timValue}>{timeLeft.hours}</h3>
                            <p className={styles.timeText}>ЧАСОВ</p>
                        </div>
                        <div className={styles.timeBox}>
                            <h3 className={styles.timValue}>{timeLeft.minutes}</h3>
                            <p className={styles.timeText}>МИНУТ</p>
                        </div>
                        <div className={styles.timeBox}>
                            <h3 className={styles.timValue}>{timeLeft.seconds}</h3>
                            <p className={styles.timeText}>СЕКУНД</p>
                        </div>
                    </div>
                    <p className={styles.timeLocal}>по Московскому времени</p>
                </div>
            </section>

            {isVisible && (
                <div
                    className={`${styles.overlay} ${modalState === 'open' ? styles.overlayVisible : ''}`}
                    onClick={closeModal}
                >
                    <div
                        className={`${styles.modal} ${modalState === 'open' ? styles.modalVisible : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Sticky header — ВНУТРИ modal, не создаёт отдельный stacking context */}
                        <div className={styles.modalHeader}>
                            <div>
                                <p className={styles.modalEyebrow}>UFC Fight Night 277 · 30 мая 2026 · Макао</p>
                                <h3 className={styles.modalTitle}>Сонг vs Фигередо — полный кард</h3>
                            </div>
                            <button
                                className={styles.closeBtn}
                                onClick={closeModal}
                                aria-label="Закрыть"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M18 6L6 18M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            <p className={styles.sectionLabel}>
                                <span className={styles.sectionDot}></span>
                                Основной кард · 14:00 МСК
                            </p>
                            <ul className={styles.fightList}>
                                {mainCard.map((fight, i) => (
                                    <li key={i} className={`${styles.fightRow} ${fight.isMain ? styles.mainEvent : ''}`}>
                                        {fight.isMain && <span className={styles.mainBadge}>MAIN EVENT</span>}
                                        <div className={styles.fightFighter}>
                                            <span className={styles.fightFlag}>{fight.flag1}</span>
                                            <div className={styles.fightFighterInfo}>
                                                <span className={styles.fightName}>{fight.fighter1}</span>
                                                <span className={styles.fightRecord}>{fight.record1}</span>
                                            </div>
                                        </div>
                                        <div className={styles.fightCenter}>
                                            <span className={styles.fightVs}>VS</span>
                                            <span className={styles.fightWeight}>{fight.weightClass}</span>
                                        </div>
                                        <div className={`${styles.fightFighter} ${styles.fightFighterRight}`}>
                                            <div className={`${styles.fightFighterInfo} ${styles.fightFighterInfoRight}`}>
                                                <span className={styles.fightName}>{fight.fighter2}</span>
                                                <span className={styles.fightRecord}>{fight.record2}</span>
                                            </div>
                                            <span className={styles.fightFlag}>{fight.flag2}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p className={styles.sectionLabel}>
                                <span className={`${styles.sectionDot} ${styles.sectionDotGray}`}></span>
                                Предварительный кард · 11:00 МСК
                            </p>
                            <ul className={styles.fightList}>
                                {prelims.map((fight, i) => (
                                    <li key={i} className={styles.fightRow}>
                                        <div className={styles.fightFighter}>
                                            <span className={styles.fightFlag}>{fight.flag1}</span>
                                            <div className={styles.fightFighterInfo}>
                                                <span className={styles.fightName}>{fight.fighter1}</span>
                                                <span className={styles.fightRecord}>{fight.record1}</span>
                                            </div>
                                        </div>
                                        <div className={styles.fightCenter}>
                                            <span className={styles.fightVs}>VS</span>
                                            <span className={styles.fightWeight}>{fight.weightClass}</span>
                                        </div>
                                        <div className={`${styles.fightFighter} ${styles.fightFighterRight}`}>
                                            <div className={`${styles.fightFighterInfo} ${styles.fightFighterInfoRight}`}>
                                                <span className={styles.fightName}>{fight.fighter2}</span>
                                                <span className={styles.fightRecord}>{fight.record2}</span>
                                            </div>
                                            <span className={styles.fightFlag}>{fight.flag2}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MainTournament;
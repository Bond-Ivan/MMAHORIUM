import { useEffect, useState, type ReactElement } from "react";
import styles from './MainTournament.module.css';

import { getTimeLeft } from "./MainTournament.utils";
import { UfcWeightClass } from "../../../../constants/weights";

function MainTournament(): ReactElement {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const targetDate = new Date("2026-05-16T02:00:00+03:00").getTime();

        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.infoBlock}>
                <div className={styles.eventLabel}><div className={styles.dot}></div>Следующий турнир</div>
                <h2 className={styles.eventName}>UFC Fight Night 276: <br />Аллен vs Коста</h2>
                <p className={styles.eventWeight}>
                    <svg className={styles.weightIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="crown" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                    {UfcWeightClass.Featherweight}
                </p>

                <div className={styles.fighters}>
                    <div className={styles.firstFighter}>
                        <h3 className={styles.fighterName}>🇬🇧Аллен</h3>
                        <p className={styles.fighterRaiting}>20-4-0</p>
                    </div>
                    <div className={styles.badge}>
                        VS
                    </div>
                    <div className={styles.secondFighter}>
                        <h3 className={styles.fighterName}>🇧🇷Коста</h3>
                        <p className={styles.fighterRaiting}>26-7-0</p>
                    </div>
                </div>

                <div className={styles.footer}>
                    <p className={styles.footerElem}>
                        <svg className={styles.footerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="calendar" aria-hidden="true" ><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        16 мая 2026
                    </p>
                    <p className={styles.footerElem}>
                        <svg className={styles.footerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="map-pin" aria-hidden="true" ><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        США, Невада
                    </p>
                    <p className={styles.footerElem}>
                        <svg className={styles.footerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="tv" aria-hidden="true" ><path d="m17 2-5 5-5-5"></path><rect width="20" height="15" x="2" y="7" rx="2"></rect></svg>
                        Paramount+
                    </p>
                </div>
            </div>

            <div className={styles.timeBlock}>
                <h2 className={styles.timeTitle}>ДО НАЧАЛА</h2>
                <div className={styles.timeWrapper}>
                    <div className={styles.timeBox}>
                        <h3 className={styles.timValue}>
                            {timeLeft.days}
                        </h3>
                        <p className={styles.timeText}>
                            ДНЕЙ
                        </p>
                    </div>
                    <div className={styles.timeBox}>
                        <h3 className={styles.timValue}>
                            {timeLeft.hours}
                        </h3>
                        <p className={styles.timeText}>
                            ЧАСОВ
                        </p>
                    </div>
                    <div className={styles.timeBox}>
                        <h3 className={styles.timValue}>
                            {timeLeft.minutes}
                        </h3>
                        <p className={styles.timeText}>
                            МИНУТ
                        </p>
                    </div>
                    <div className={styles.timeBox}>
                        <h3 className={styles.timValue}>
                            {timeLeft.seconds}
                        </h3>
                        <p className={styles.timeText}>
                            СЕКУНД
                        </p>
                    </div>
                </div>
                <p className={styles.timeLocal}>по Московскому времени</p>
            </div>
        </section>
    )
}

export default MainTournament;
import { type ReactElement } from "react";
import styles from "./MainCardList.module.css";
import MainCardItem from "./MainCardItem/MainCardItem";
import { useLang } from "../../../../hooks/useLang";

function MainCardList(): ReactElement {
  const { t } = useLang();

  const items = [
    {
      id: "1",
      title: t("home.mainCards.activeFighters.title"),
      text: t("home.mainCards.activeFighters.text"),
      value: 578,
    },
    {
      id: "2",
      title: t("home.mainCards.eventsPlanned.title"),
      text: t("home.mainCards.eventsPlanned.text"),
      value: 11,
    },
    {
      id: "3",
      title: t("home.mainCards.eventsCompleted.title"),
      text: t("home.mainCards.eventsCompleted.text"),
      value: 15,
    },
    {
      id: "4",
      title: t("home.mainCards.fightersDebuted.title"),
      text: t("home.mainCards.fightersDebuted.text"),
      value: 43,
    },
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
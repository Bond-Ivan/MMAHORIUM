import type { ReactElement } from "react";
import { useLang } from "../../../../hooks/useLang";
import styles from "./Cookies.module.css";

function Cookies(): ReactElement {
  const { t } = useLang();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t("legal.cookies.title")}</h1>
      <p className={styles.updated}>{t("legal.common.updated")}</p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.cookies.sections.general.title")}</h2>
        <p className={styles.text}>{t("legal.cookies.sections.general.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.cookies.sections.types.title")}</h2>
        <p className={styles.text}>{t("legal.cookies.sections.types.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.cookies.sections.consent.title")}</h2>
        <p className={styles.text}>{t("legal.cookies.sections.consent.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.cookies.sections.manage.title")}</h2>
        <p className={styles.text}>{t("legal.cookies.sections.manage.text")}</p>
      </div>
    </section>
  );
}

export default Cookies;
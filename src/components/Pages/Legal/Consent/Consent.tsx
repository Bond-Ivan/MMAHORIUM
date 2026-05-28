import type { ReactElement } from "react";
import { useLang } from "../../../../hooks/useLang";
import styles from "./Consent.module.css";

function Consent(): ReactElement {
  const { t } = useLang();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t("legal.consent.title")}</h1>
      <p className={styles.updated}>{t("legal.common.updated")}</p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.consent.sections.general.title")}</h2>
        <p className={styles.text}>{t("legal.consent.sections.general.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.consent.sections.forms.title")}</h2>
        <p className={styles.text}>{t("legal.consent.sections.forms.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.consent.sections.withdrawal.title")}</h2>
        <p className={styles.text}>{t("legal.consent.sections.withdrawal.text")}</p>
      </div>
    </section>
  );
}

export default Consent;
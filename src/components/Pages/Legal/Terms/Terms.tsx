import type { ReactElement } from "react";
import { useLang } from "../../../../hooks/useLang";
import styles from "./Terms.module.css";

function Terms(): ReactElement {
  const { t } = useLang();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t("legal.terms.title")}</h1>
      <p className={styles.updated}>{t("legal.common.updated")}</p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.terms.sections.general.title")}</h2>
        <p className={styles.text}>{t("legal.terms.sections.general.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.terms.sections.account.title")}</h2>
        <p className={styles.text}>{t("legal.terms.sections.account.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.terms.sections.prohibited.title")}</h2>
        <p className={styles.text}>{t("legal.terms.sections.prohibited.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.terms.sections.content.title")}</h2>
        <p className={styles.text}>{t("legal.terms.sections.content.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.terms.sections.liability.title")}</h2>
        <p className={styles.text}>{t("legal.terms.sections.liability.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.terms.sections.changes.title")}</h2>
        <p className={styles.text}>{t("legal.terms.sections.changes.text")}</p>
      </div>
    </section>
  );
}

export default Terms;
import type { ReactElement } from "react";
import { useLang } from "../../../../hooks/useLang";
import styles from "./Privacy.module.css";

function Privacy(): ReactElement {
  const { t } = useLang();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{t("legal.privacy.title")}</h1>
      <p className={styles.updated}>{t("legal.common.updated")}</p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.general.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.general.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.data.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.data.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.purposes.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.purposes.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.legalBasis.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.legalBasis.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.retention.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.retention.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.rights.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.rights.text")}</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>{t("legal.privacy.sections.contacts.title")}</h2>
        <p className={styles.text}>{t("legal.privacy.sections.contacts.text")}</p>
      </div>
    </section>
  );
}

export default Privacy;
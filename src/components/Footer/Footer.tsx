import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useLang } from "../../hooks/useLang";

function Footer(): ReactElement {
  const { t } = useLang();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link to="/privacy" className={styles.footerLink}>
          {t("footer.privacy")}
        </Link>
        <Link to="/terms" className={styles.footerLink}>
          {t("footer.terms")}
        </Link>
        <Link to="/cookies" className={styles.footerLink}>
          {t("footer.cookies")}
        </Link>
        <Link to="/consent" className={styles.footerLink}>
          {t("footer.consent")}
        </Link>
      </div>

      <div className={styles.footerBottom}>
        {t("footer.copyright")}
      </div>
    </footer>
  );
}

export default Footer;
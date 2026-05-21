import type { ReactElement } from "react";
import styles from "./Footer.module.css";
import { useLang } from "../../hooks/useLang";

function Footer(): ReactElement {
  const { t } = useLang();

  return (
    <footer className={styles.footer}>
      {t('footer.copyright')}
    </footer>
  );
}

export default Footer;
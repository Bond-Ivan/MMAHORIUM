import type { ReactElement } from "react";
import styles from "./Footer.module.css";

function Footer(): ReactElement {
    return (
        <footer className={styles.footer}>
            Copyright © 2026 OctaGrid Inc. All rights reserved.
        </footer>
    )
}

export default Footer;
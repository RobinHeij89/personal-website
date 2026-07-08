import React from 'react';
import styles from './footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <a href="#about" className={styles.footer__logo}>
      <img src="/logo.svg" alt="Robin" className={styles.footer__mark} />
      <span className={styles.footer__name}>ROBIN</span>
    </a>
    <p className={styles.footer__copy}>© 2026 — robinheij.nl</p>
  </footer>
);

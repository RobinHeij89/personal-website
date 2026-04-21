import React from 'react';
import styles from './footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__logo}>
      <img src="/logo.svg" alt="RH" width={22} />
      <span>Robin Heij</span>
    </div>
    <p>© 2026 — robinheij.nl</p>
  </footer>
);

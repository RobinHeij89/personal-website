import React from 'react';
import styles from './navigation.module.css';

const Navigation: React.FC = () => (
  <nav className={styles.nav}>
    <a href="#about" className={styles.nav__logo}>
      <img src="/logo.svg" alt="RH" width={28} />
      <span className={styles.nav__name}>Robin Heij</span>
    </a>
    <ul className={styles.nav__links}>
      <li><a href="#about">About</a></li>
      <li><a href="#works">Works</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
);

export default Navigation;

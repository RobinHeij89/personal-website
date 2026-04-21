import React from 'react';
import styles from './intro-section.module.css';

export const IntroSection: React.FC = () => (
  <section id="intro" className={styles.intro}>
    <div className={`${styles.intro__statement} reveal`}>
      <strong>Senior creative front-end developer</strong>
      {' '}with a design background and leadership experience.
      Indie game developer, coach, team player — and above all, a dad of 2 girls.
    </div>

    <div className={styles.intro__right}>
      <div className={styles.descriptor}>
        <p className={styles.descriptor__label}>Available as</p>
        <ul className={styles.descriptor__list}>
          <li>Tech Lead <span>01</span></li>
          <li>Senior Front-end Developer <span>02</span></li>
          <li>Design System Developer <span>03</span></li>
        </ul>
      </div>

      <div className={styles.descriptor}>
        <p className={styles.descriptor__label}>Expertise</p>
        <ul className={styles.descriptor__list}>
          <li>Creative development <span>—</span></li>
          <li>Design systems <span>—</span></li>
          <li>Indie game development <span>—</span></li>
          <li>Leadership &amp; coaching <span>—</span></li>
        </ul>
      </div>
    </div>
  </section>
);

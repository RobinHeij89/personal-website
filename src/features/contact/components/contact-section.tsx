import React from 'react';
import styles from './contact-section.module.css';

export const ContactSection: React.FC = () => (
  <section id="contact" className={styles.contact}>
    <div className={styles.contact__left}>
      <h2 className={styles.contact__headline}>
        Get in<br />touch.
        <em>Now.</em>
      </h2>
      <div className={styles.contact__cols}>
        <div className={styles.contact__col}>
          <span className={styles.contact__col_label}>Direct</span>
          <a href="mailto:robin@robinheij.nl" className={styles.contact__link}>robin@robinheij.nl</a>
          <a href="tel:+31618917987" className={styles.contact__link}>+31 6 18 91 79 87</a>
        </div>
        <div className={styles.contact__col}>
          <span className={styles.contact__col_label}>Social</span>
          <a href="https://www.linkedin.com/in/robinheij89/" target="_blank" rel="noreferrer" className={styles.contact__link}>LinkedIn</a>
          <a href="https://www.instagram.com/brooobiin/" target="_blank" rel="noreferrer" className={styles.contact__link}>Instagram</a>
        </div>
      </div>
    </div>

    <div className={`${styles.contact__right} reveal-right`}>
      <img src="/robin.jpg" alt="Robin Heij" />
    </div>
  </section>
);

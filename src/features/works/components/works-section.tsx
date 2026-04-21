import React from 'react';
import styles from './works-section.module.css';

const brands = [
  'BUUT', 'Heineken', 'IFFR', 'Zwijsen', 'Free a Girl', 'Aviko', 'Davidoff',
];

export const WorksSection: React.FC = () => (
  <section id="works" className={styles.works}>
    <div className={`${styles.works__header} reveal`}>
      <h2 className={styles.works__heading}>
        Selected<br /><em>Clients</em>
      </h2>
      <span className={styles.works__count}>{String(brands.length).padStart(2, '0')} brands</span>
    </div>

    <div className={`${styles.brands} stagger`}>
      {brands.map((name, i) => (
        <div key={name} className={styles.brand}>
          <span className={styles.brand__num}>{String(i + 1).padStart(2, '0')}</span>
          <span className={styles.brand__name}>{name}</span>
        </div>
      ))}
    </div>
  </section>
);

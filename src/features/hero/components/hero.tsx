import React, { useEffect, useRef } from 'react';
import styles from './hero.module.css';

const meta = [
  { label: 'Discipline', value: 'Creative Front-end', hi: false },
  { label: 'Role',       value: 'Tech Lead',          hi: true  },
  { label: 'Based in',  value: 'Netherlands',         hi: false },
  { label: 'Status',    value: 'Available',           hi: true  },
  { label: 'Since',     value: '2009',                hi: false },
];

export const Hero: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const BASE_ROTATE = -1.5;

  useEffect(() => {
    const wrap = photoRef.current;
    if (!wrap) return;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / window.innerWidth;
        const dy = (e.clientY - cy) / window.innerHeight;
        const rotY = dx * 18;
        const rotX = -dy * 14;
        wrap.style.transform = `rotate(${BASE_ROTATE}deg) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      });
    };
    const onLeave = () => {
      wrap.style.transform = `rotate(${BASE_ROTATE}deg)`;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" className={styles.hero}>
      {/* Polaroid photo */}
      <div className={styles.hero__photo} ref={photoRef}>
        <img src="/robin.jpg" alt="Robin Heij" className={styles.hero__photo_img} />
        <span className={styles.hero__photo_caption}>Robin Heij — NL</span>
      </div>

      {/* Giant name */}
      <div className={styles.hero__name}>
        <span className={`${styles.hero__line} reveal-left`} style={{ transitionDelay: '100ms' }}>ROBIN</span>
        <span className={`${styles.hero__line} ${styles['hero__line--accent']} reveal-right`} style={{ transitionDelay: '200ms' }}>HEIJ</span>
      </div>

      {/* Meta row */}
      <div className={`${styles.hero__meta} stagger`}>
        {meta.map(({ label, value, hi }) => (
          <div key={label} className={styles.hero__meta_col}>
            <span className={styles.hero__meta_label}>{label}</span>
            <span className={`${styles.hero__meta_value}${hi ? ` ${styles['hero__meta_value--hi']}` : ''}`}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

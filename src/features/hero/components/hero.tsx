import React, { useEffect, useRef } from 'react';
import styles from './hero.module.css';
import { NameRevealer } from './name-revealer';
import { Reveal, RevealGroup } from '@/components/ui/reveal/reveal';

const meta = [
  { label: 'Discipline', value: 'Creative Front-end', hi: false },
  { label: 'Based in', value: 'the Netherlands', hi: false },
  { label: 'Status', value: 'Available', hi: true },
  { label: 'Since', value: '2009', hi: false },
];

export const Hero: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);

  // Scroll-linked "unmask": the image starts a bit masked + scaled down and
  // opens up to its complete size as you scroll, then you scroll past it.
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      // Reveal completes over the first ~65% of a viewport's worth of scroll.
      const range = window.innerHeight * 0.65;
      const p = Math.min(Math.max(window.scrollY / range, 0), 1);
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" className={styles.hero}>
      <NameRevealer firstName='Robin' lastName='Heij' />

      {/* Promise — personal statement */}
      <Reveal as="p" className={styles.hero__promise} delay={300}>
        I&rsquo;m a front-end developer working where <em>design</em> meets <em>code</em> &mdash;
        turning ambitious ideas into products people actually love to use.
      </Reveal>

      {/* Smaller rectangular image — unmasks on scroll */}
      <div className={styles.hero__photo} ref={photoRef} data-cursor="photo">
        <img src="/robin2.jpg" alt="Robin Heij" className={styles.hero__photo_img} />
      </div>

      {/* Meta row */}
      <RevealGroup className={styles.hero__meta} staggerMs={80}>
        {meta.map(({ label, value, hi }, index) => (
          <Reveal key={label} index={index} className={styles.hero__meta_col}>
            <span className={styles.hero__meta_label}>{label}</span>
            <span className={`${styles.hero__meta_value}${hi ? ` ${styles['hero__meta_value--hi']}` : ''}`}>{value}</span>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
};

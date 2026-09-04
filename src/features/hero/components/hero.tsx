import React from 'react';
import { NameRevealer, Lead, Eyebrow, ScrollUnmaskImage } from '@robinheij89/design-system';
import styles from './hero.module.css';
import { Reveal, RevealGroup } from '@/components/ui/reveal/reveal';

const meta = [
  { label: 'Discipline', value: 'Creative Front-end', hi: false },
  { label: 'Based in', value: 'the Netherlands', hi: false },
  { label: 'Status', value: 'Available', hi: true },
  { label: 'Since', value: '2009', hi: false },
];

export const Hero: React.FC = () => (
  <section id="about" className={styles.hero}>
    <NameRevealer firstName='Robin' lastName='Heij' />

    {/* Promise — personal statement */}
    <Reveal as="div" delay={300}>
      <Lead className={styles.hero__promise}>
        I&rsquo;m a front-end developer working where <em>design</em> meets <em>code</em> &mdash;
        turning ambitious ideas into products people actually love to use.
      </Lead>
    </Reveal>

    {/* Smaller rectangular image — unmasks on scroll */}
    <ScrollUnmaskImage
      src="/robin2.jpg"
      alt="Robin Heij"
      className={styles.hero__photo}
      data-cursor="photo"
    />

    {/* Meta row */}
    <RevealGroup className={styles.hero__meta} staggerMs={80}>
      {meta.map(({ label, value, hi }, index) => (
        <Reveal key={label} index={index} className={styles.hero__meta_col}>
          <Eyebrow as="span" className={styles.hero__meta_label}>{label}</Eyebrow>
          <span className={`${styles.hero__meta_value}${hi ? ` ${styles['hero__meta_value--hi']}` : ''}`}>{value}</span>
        </Reveal>
      ))}
    </RevealGroup>
  </section>
);

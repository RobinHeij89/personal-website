import React from 'react';
import { Logo } from '@/components/ui/logo/logo';
import styles from './hero.module.css';

const roles = [
  'Senior creative front-end developer',
  'Indie game developer',
  'Developer with a design background',
  'Developer with leadership skills',
  'Coach',
  'Team player',
  'But above all a dad of 2 girls.',
];

const availableAs = [
  'Senior Front-end Developer',
  'Tech Lead',
  'Design System Developer',
];

export const Hero: React.FC = () => {
  return (
    <section id="hero" className={styles.hero} aria-label="Hero">
      <div className={styles.hero__layout}>
        {/* Main card */}
        <div className={styles.hero__card}>
          {/* Grid dividers */}
          <div className={styles.hero__divider} aria-hidden="true" />

          {/* Logo watermark */}
          <div className={styles.hero__watermark} aria-hidden="true">
            <Logo size="lg" />
          </div>

          {/* Content area (right of divider) */}
          <div className={styles.hero__content}>
            <h1 className={styles.hero__name}>Robin Heij</h1>
            <ul className={styles.hero__roles} aria-label="Roles">
              {roles.map((role) => (
                <li key={role} className={styles.hero__role}>
                  <RoleBullet />
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* Available as (bottom left) */}
          <div className={styles.hero__available}>
            <p className={styles.hero__available_label}>Available as:</p>
            {availableAs.map((role) => (
              <p key={role} className={styles.hero__available_role}>{role}</p>
            ))}
          </div>
        </div>

        {/* Photo card */}
        <div className={styles.hero__photo} aria-label="Photo of Robin Heij">
          <img
            src="/robin.jpg"
            alt="Robin Heij"
            className={styles.hero__photo_img}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.hero__scroll} aria-hidden="true">
        <ScrollArrow />
      </div>
    </section>
  );
};

const RoleBullet: React.FC = () => (
  <svg
    className={styles.hero__bullet}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="3" fill="currentColor" />
  </svg>
);

const ScrollArrow: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 12 16 16 12" />
    <line x1="12" y1="8" x2="12" y2="16" />
  </svg>
);

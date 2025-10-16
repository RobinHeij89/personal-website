/**
 * ## Component: HeroContent
 *
 * ### Purpose:
 * Hero section content including title, subtitle, tagline and action buttons with glow effects.
 * Contains the main introduction text and call-to-action elements.
 *
 * ### Props:
 * None - static hero content component
 *
 * ### Example:
 * ```tsx
 * <HeroContent />
 * ```
 */

import React from 'react';
import clsx from 'clsx';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import styles from './hero-content.module.css';

export const HeroContent: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles["hero-content"]}>
      <div className={clsx(styles["hero-content__logo-container"], 'floating')}>
        <Logo size="lg" className={styles["hero-content__logo"]} />
      </div>
      <h1 className={clsx(styles["hero-content__title"], 'text-glow')}>Robin Heij</h1>
      <p className={styles["hero-content__subtitle"]}>Creative Frontend Wizard</p>
      <p className={styles["hero-content__tagline"]}>
        Building digital experiences that make people go "whoa!" 
        <br />
        <span className={styles["hero-content__fun-text"]}>Dad by day, code ninja by night 🥷</span>
      </p>
      <div className={styles["hero-content__actions"]}>
        <Button 
          variant="primary"
          onClick={() => scrollToSection('work')}
          dataCursor="SEE MAGIC"
        >
          See My Magic
        </Button>
        <Button 
          variant="secondary"
          onClick={() => scrollToSection('contact')}
          dataCursor="LET'S TALK"
        >
          Let's Chat
        </Button>
      </div>
    </div>
  );
};
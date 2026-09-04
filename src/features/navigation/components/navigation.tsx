import React from 'react';
import { ThemeToggle, type Theme } from '@robinheij89/design-system';
import { useActiveSection } from '@/hooks/useActiveSection';
import styles from './navigation.module.css';

type Props = {
  theme: Theme;
  onThemeToggle: () => void;
};

// Module-level so the reference stays stable across renders.
const SECTION_IDS = ['about', 'works', 'contact'];

const Navigation: React.FC<Props> = ({ theme, onThemeToggle }) => {
  const active = useActiveSection(SECTION_IDS);
  const current = (id: string) => (active === id ? 'location' : undefined);

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__links}>
        <li><a href="#about" aria-current={current('about')}>About</a></li>
        <li><a href="#works" aria-current={current('works')}>Works</a></li>
      </ul>
      <a href="#about" className={styles.nav__logo}>
        <img src="/logo.svg" alt="Robin" className={styles.nav__mark} />
        <span className={styles.nav__name}>ROBIN</span>
      </a>
      <div className={styles.nav__right}>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <a href="#contact" className={styles.nav__contact} aria-current={current('contact')}>Contact</a>
      </div>
    </nav>
  );
};

export default Navigation;

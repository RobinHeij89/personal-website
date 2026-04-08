import React from 'react';
import { Logo } from '@/components/ui/logo/logo';
import styles from './navigation.module.css';

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Works', id: 'works' },
  { label: 'Contact', id: 'contact' },
];

const Navigation: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={styles.nav}>
      <div className={styles.nav__inner}>
        <button
          className={styles.nav__brand}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Go to top"
        >
          <Logo size="sm" />
          <span className={styles.nav__name}>Robin Heij</span>
        </button>

        <nav aria-label="Main navigation">
          <ul className={styles.nav__links}>
            {navLinks.map(({ label, id }) => (
              <li key={id}>
                <button
                  className={styles.nav__link}
                  onClick={() => scrollTo(id)}
                >
                  {label.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

import React from 'react';
import Navigation from '@/features/navigation/components/navigation';
import { Hero } from '@/features/hero/components/hero';
import styles from './App.module.css';
import '@/styles/animations.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        <Hero />
        <section id="about" className={styles.section} aria-label="About" />
        <section id="works" className={styles.section} aria-label="Works" />
        <section id="contact" className={styles.section} aria-label="Contact" />
      </main>
    </div>
  );
};

export default App;

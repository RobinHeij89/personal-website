/**
 * ## Component: App
 * 
 * ### Purpose:
 * Main application component that orchestrates the 3D portfolio experience.
 * Provides the layout structure and renders the hero scene.
 * 
 * ### Props:
 * None - root application component
 * 
 * ### Example:
 * ```tsx
 * <App />
 * ```
 */

import React from 'react';
import { Scene3D } from '@/components/three/scene-3d';
import { HeroScene } from '@/scenes/hero/components/hero-scene';
import styles from './app.module.css';

export const App: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-label="Hero section with 3D animation">
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Robin Heij</h1>
          <p className={styles.subtitle}>Frontend Developer & UI/UX Designer</p>
        </div>
        <Scene3D className={styles.scene}>
          <HeroScene />
        </Scene3D>
      </section>
    </main>
  );
};

export default App;

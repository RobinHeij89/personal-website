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
import { AboutSection } from '@/components/ui/about-section';
import { WorkSection } from '@/components/ui/work-section';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { Logo } from '@/components/ui/logo';
import Navigation from '@/components/ui/navigation';
import styles from './app.module.css';

export const App: React.FC = () => {
  return (
    <main className={styles.main}>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D Animation */}
      <section id="hero" className={styles.hero} aria-label="Hero section with 3D animation">
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Logo size="lg" className={styles.heroLogo} />
          </div>
          <h1 className={styles.title}>Robin Heij</h1>
          <p className={styles.subtitle}>Creative Frontend Wizard</p>
          <p className={styles.tagline}>
            Building digital experiences that make people go "whoa!" 
            <br />
            <span className={styles.funText}>Dad by day, code ninja by night 🥷</span>
          </p>
          <div className={styles.heroActions}>
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.heroButton}
            >
              See My Magic
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.heroButtonSecondary}
            >
              Let's Chat
            </button>
          </div>
        </div>
        <Scene3D className={styles.scene}>
          <HeroScene />
        </Scene3D>
      </section>

      {/* Content that scrolls over the fluid surface */}
      <div className={styles.content}>
        <div id="about">
          <AboutSection />
        </div>
        <div id="work">
          <WorkSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        {/* Contact Section placeholder */}
        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactContent}>
            <h2>Let's Work Together</h2>
            <p>Ready to bring your ideas to life? Let's talk.</p>
            <div className={styles.contactInfo}>
              <a href="mailto:hello@robinheij.dev" className={styles.contactLink}>
                hello@robinheij.dev
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;

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
import { HeroContent } from '@/components/ui/hero-content';
import { AboutSection } from '@/components/ui/about-section';
import { WorkSection } from '@/components/ui/work-section';
import { InterestsSection } from '@/components/ui/interests';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { CustomCursor } from '@/components/ui/custom-cursor';
import Navigation from '@/components/ui/navigation';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import styles from './app.module.css';
import '@/styles/animations.css';

export const App: React.FC = () => {
  return (
    <main className={styles["app"]}>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D Animation */}
      <section id="hero" className={styles["app__hero"]} aria-label="Hero section with 3D animation">
        <HeroContent />
        <Scene3D className={styles["app__scene"]}>
          <HeroScene />
        </Scene3D>
      </section>

      {/* Content that scrolls over the fluid surface */}
      <div className={styles["app__content"]}>
        <div id="about">
          <AboutSection />
        </div>
        <div id="work">
          <WorkSection />
        </div>
        <div id="interests">
          <InterestsSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        {/* Contact Section */}
        <section id="contact" className={styles["app__contact-section"]}>
          <div className={styles["app__contact-content"]}>
            <div className={styles["app__contact-header"]}>
              <h2>Let's Create Something Amazing</h2>
              <p>Ready to bring your ideas to life? Let's chat over coffee and pixels.</p>
            </div>
            
            <div className={styles["app__contact-info"]}>
              <Button 
                variant="primary"
                href="mailto:info@robinheij.nl"
                dataCursor="EMAIL ME"
              >
                info@robinheij.nl
              </Button>
            </div>
            
            <Footer />
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;

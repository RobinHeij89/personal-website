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
import { InterestsSection } from '@/components/ui/interests-section';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { Logo } from '@/components/ui/logo';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { FloatingParticles } from '@/components/ui/floating-particles';
import Navigation from '@/components/ui/navigation';
import styles from './app.module.css';
import '@/styles/animations.css';

export const App: React.FC = () => {
  return (
    <main className={styles.main}>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Floating Particles Background */}
      <FloatingParticles count={30} />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D Animation */}
      <section id="hero" className={styles.hero} aria-label="Hero section with 3D animation">
        <div className={styles.heroContent}>
          <div className={`${styles.logoContainer} floating`}>
            <Logo size="lg" className={styles.heroLogo} />
          </div>
          <h1 className={`${styles.title} text-glow`}>Robin Heij</h1>
          <p className={styles.subtitle}>Creative Frontend Wizard</p>
          <p className={styles.tagline}>
            Building digital experiences that make people go "whoa!" 
            <br />
            <span className={styles.funText}>Dad by day, code ninja by night 🥷</span>
          </p>
          <div className={styles.heroActions}>
            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className={`${styles.heroButton} shimmer`}
              data-cursor="SEE MAGIC"
            >
              See My Magic
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.heroButtonSecondary}
              data-cursor="LET'S TALK"
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
        <div id="interests">
          <InterestsSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        {/* Contact Section */}
        <section id="contact" className={styles.contactSection}>
          <div className={styles.contactContent}>
            <div className={styles.contactHeader}>
              <h2>Let's Create Something Amazing</h2>
              <p>Ready to bring your ideas to life? Let's chat over coffee and pixels.</p>
            </div>
            
            <div className={styles.contactInfo}>
              <a href="mailto:hello@robinheij.dev" className={styles.contactLink}>
                hello@robinheij.dev
              </a>
            </div>
            
            <div className={styles.contactFooter}>
              <div className={styles.socialSection}>
                <h3 className={styles.socialTitle}>Let's Connect</h3>
                <div className={styles.socialLinks}>
                  <a 
                    href="https://www.linkedin.com/in/robinheij89/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="LinkedIn Profile"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/rooobiin89/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="Instagram Profile"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:info@robinheij.nl"
                    className={styles.socialLink}
                    aria-label="Send Email"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.082l9.282 7.001 9.282-7.001H22.364A1.636 1.636 0 0 1 24 5.457z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://wa.link/6zxss5" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="WhatsApp Contact"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <img 
                src="/ps5-controller.svg" 
                alt="PS5 Controller" 
                className={styles.controllerIcon}
              />
              <p className={styles.footerText}>
                Always up for a gaming session between coding sprints! 🎮
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;

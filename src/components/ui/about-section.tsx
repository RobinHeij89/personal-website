/**
 * ## Component: AboutSecti          <div className={styles.decorativeHeader}>
            <span className={styles.symbol}>×</span>
            <span className={styles.subtitle}>DIGITAL EXPERIENCE ARCHITECT</span>
            <span className={styles.symbol}>×</span>
          </div>
          
          <h2 className={styles.title}>
            HEY THERE! <span className={styles.sparkle}>✦</span>
          </h2>
          
          <div className={styles.description}>
            <p className={styles.intro}>
              I'm a <strong>Frontend Wizard & Pixel Perfectionist</strong> who turns wild ideas into 
              jaw-dropping digital experiences that users actually enjoy using.
            </p>
            <p>
              When I'm not crafting beautiful code, you'll find me being the world's most dedicated 
              dad to Tanna, adventuring with my amazing partner Nathalie, or brewing the perfect cup 
              of coffee while debugging at 2 AM ☕
            </p>
            <p className={styles.funFact}>
              <strong>Fun fact:</strong> I can center a div in my sleep and have strong opinions about semicolons! 
              Currently working my magic at Team Rockstars IT in Rotterdam. 🚀
            </p>se:
 * Displays Robin's personal information, background, and current role.
 * Provides context about his experience and availability.
 * 
 * ### Props:
 * None - static content component
 * 
 * ### Example:
 * ```tsx
 * <AboutSection />
 * ```
 */

import React from 'react';
import { useScrollAnimation, useMagneticHover } from '@/hooks/useAnimations';
import styles from './about-section.module.css';

export const AboutSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const magneticRef = useMagneticHover<HTMLImageElement>(0.2);
  
  return (
    <section 
      ref={sectionRef} 
      className={`${styles.container} ${isVisible ? styles.visible : ''}`} 
      id="about"
    >
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img 
            ref={magneticRef}
            src="/rose.png" 
            alt="Rose decorative element" 
            className={styles.decorativeImage}
          />
        </div>
        <div className={styles.textContent}>
          <div className={styles.decorativeHeader}>
            <span className={styles.symbol}>×</span>
            <span className={styles.subtitle}>CREATIVE FRONTEND DEVELOPER</span>
            <span className={styles.symbol}>×</span>
          </div>
          
          <h2 className={styles.title}>
            HI THERE <span className={styles.sparkle}>✦</span>
          </h2>
          
          <div className={styles.description}>
            <p className={styles.intro}>
              I'm a <strong>Frontend Developer & Design Enthusiast</strong> passionate about crafting 
              beautiful digital experiences.
            </p>
            <p>
              Dad of Tanna, partner of Nathalie, senior Front-end Developer at Team Rockstars IT. 
              Based in Rotterdam, Netherlands.
            </p>
            <p>
              Available for freelance work, one day in a week.
            </p>
            <p className={styles.highlight}>
              With a background in design, I approach projects with a unique perspective that 
              combines aesthetic appeal with efficient functionality.
            </p>
          </div>
          
          <div className={styles.socialSection}>
            <p className={styles.connectText}>LET'S CONNECT! ☟</p>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.linkedin.com/in/robinheij89/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                → LINKEDIN →
              </a>
              <a 
                href="https://www.instagram.com/rooobiin89/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram Profile"
              >
                → INSTAGRAM →
              </a>
              <a 
                href="mailto:info@robinheij.nl"
                className={styles.socialLink}
                aria-label="Email"
              >
                → EMAIL →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
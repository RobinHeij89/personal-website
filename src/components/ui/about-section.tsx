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
              beautiful digital experiences that users actually love using.
            </p>
            <p>
              Dad of Tanna and Merel, partner of Nathalie, and part-time game developer. 
              When I'm not writing code, you'll find me building games in Godot, 
              diving deep into tech rabbit holes, or optimizing workflows just for fun.
            </p>
            <p>
              Based in Rotterdam, Netherlands. Available for freelance work, one day a week.
            </p>
            <p className={styles.highlight}>
              With a background in design and a passion for interactive experiences, I approach 
              every project with creativity and attention to detail.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
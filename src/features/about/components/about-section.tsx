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
import clsx from 'clsx';
import { useScrollAnimation, useMagneticHover } from '@/hooks/useAnimations';
import { SocialMediaLinks } from '@/components/ui/social-media-links';
import styles from './about-section.module.css';

export const AboutSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const magneticRef = useMagneticHover<HTMLImageElement>(0.2);
  
  return (
    <section 
      ref={sectionRef} 
      className={clsx(
        styles["about-section"],
        {
          [styles["about-section--visible"]]: isVisible
        }
      )} 
      id="about"
    >
      <div className={styles["about-section__content"]}>
        <div className={styles["about-section__image-container"]}>
          <img 
            ref={magneticRef}
            src="/rose.png" 
            alt="Rose decorative element" 
            className={styles["about-section__decorative-image"]}
          />
        </div>
        <div className={styles["about-section__text-content"]}>
          <div className={styles["about-section__decorative-header"]}>
            <span className={styles["about-section__symbol"]}>×</span>
            <span className={styles["about-section__subtitle"]}>CREATIVE FRONTEND DEVELOPER</span>
            <span className={styles["about-section__symbol"]}>×</span>
          </div>
          
          <h2 className={styles["about-section__title"]}>
            HI THERE <span className={styles["about-section__sparkle"]}>✦</span>
          </h2>
          
          <div className={styles["about-section__description"]}>
            <p className={styles["about-section__intro"]}>
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
            <p className={styles["about-section__highlight"]}>
              With a background in design and a passion for interactive experiences, I approach 
              every project with creativity and attention to detail.
            </p>
          </div>
          
          <div className={styles["about-section__social-section"]}>
            <p className={styles["about-section__connect-text"]}>LET'S CONNECT! ☟</p>
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </section>
  );
};
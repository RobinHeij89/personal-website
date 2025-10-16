/**
 * ## Component: Footer
 * 
 * ### Purpose:
 * Reusable footer component containing contact information, social media links,
 * and personal touch elements. Promotes component separation and reusability.
 * 
 * ### Props:
 * None - static content component
 * 
 * ### Example:
 * ```tsx
 * <Footer />
 * ```
 */

import React from 'react';
import { SocialMediaLinks } from '@/components/ui/social-media-links/social-media-links';
import styles from './footer.module.css';

export const Footer: React.FC = () => {
  return (
    <div className={styles["footer__contact-footer"]}>
      <div className={styles["footer__social-section"]}>
        <h3 className={styles["footer__social-title"]}>Let's Connect</h3>
        <SocialMediaLinks />
      </div>
      
      <img 
        src="/ps5-controller.svg" 
        alt="PS5 Controller" 
        className={styles["footer__controller-icon"]}
      />
      <p className={styles["footer__footer-text"]}>
        Always up for a gaming session between coding sprints! 🎮
      </p>
    </div>
  );
};
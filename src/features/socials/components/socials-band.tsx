import React from 'react';
import { SocialMediaLinks } from '@/components/ui/social-media-links/social-media-links';
import styles from './socials-band.module.css';

export const SocialsBand: React.FC = () => (
  <section className={styles.band}>
    {/* Wavy line field */}
    <svg className={styles.band__waves} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="rh-wave" width="48" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 11 Q 12 0 24 11 T 48 11" fill="none" stroke="currentColor" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rh-wave)" />
    </svg>

    {/* Game controller (indie game dev nod) */}
    {/* <img src="/ps5-controller.svg" alt="" aria-hidden="true" className={styles.band__controller} /> */}

    {/* Rotating circular badge with social icons in the centre */}
    <div className={styles.badge}>
      <svg className={styles.badge__ring} viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="rh-badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text textLength="490" lengthAdjust="spacingAndGlyphs">
          <textPath href="#rh-badge-circle" startOffset="0">
            CHECK MY SOCIALS • CHECK MY SOCIALS • CHECK MY SOCIALS •
          </textPath>
        </text>
      </svg>
      <div className={styles.badge__center}>
        <SocialMediaLinks />
      </div>
    </div>
  </section>
);

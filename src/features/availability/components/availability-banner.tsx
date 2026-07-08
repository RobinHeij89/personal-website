import React from 'react';
import styles from './availability-banner.module.css';

const ITEM = 'Available for work · Starting September 2026 · Through Team Rockstars IT      ';

export const AvailabilityBanner: React.FC = () => (
  <div className={styles.banner} aria-label="Availability notice">
    <div className={styles.banner__track}>
      <span className={styles.banner__content}>{ITEM.repeat(6)}</span>
      <span className={styles.banner__content} aria-hidden="true">{ITEM.repeat(6)}</span>
    </div>
  </div>
);

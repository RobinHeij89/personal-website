import React from 'react';
import { Marquee } from '@robinheij89/design-system';
import styles from './availability-banner.module.css';

const ITEM = 'Available for work · Starting September 2026 · Through Team Rockstars IT      ';

export const AvailabilityBanner: React.FC = () => (
  <Marquee className={styles.banner} text={ITEM} ariaLabel="Availability notice" />
);

/**
 * ## Component: FamilyCard
 * 
 * ### Purpose:
 * Specialized interest card displaying family information with a personal touch.
 * Shows a family image with heartwarming content about family life.
 * 
 * ### Features:
 * - Family photo display
 * - Personal family moments
 * - Warm, personal messaging
 * - Image-focused back content
 * 
 * @returns {JSX.Element} Family card component
 */

import { memo } from 'react';
import { CardItemLayout } from '../shared/card-item-layout';
import styles from './family-card.module.css';

export const FamilyCard = memo(() => {
  return (
    <CardItemLayout
    >
          <img 
            src="/family-photo.jpg" 
            alt="Family moment with Tanna and Merel" 
            className={styles['family-card__image']}
          />
        
    </CardItemLayout>
  );
});

FamilyCard.displayName = 'FamilyCard';
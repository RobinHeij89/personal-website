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
      title="👨‍👧 Family"
      badges={[{ text: "Life's Best", color: "warning" }]}
    >
      <div className={styles['family-card__content']}>
        <div className={styles['family-card__image-container']}>
          <img 
            src="/family-photo.jpg" 
            alt="Family moment with Tanna and Merel" 
            className={styles['family-card__image']}
            onError={(e) => {
              // Fallback to a placeholder if image doesn't exist
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9InJnYmEoMjM0LCA2NCwgMzAsIDAuMykiLz4KPHRleHQgeD0iMTUwIiB5PSIxNzAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNykiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZhbWlseSBNb21lbnRzPC90ZXh0Pgo8L3N2Zz4=';
            }}
          />
          <div className={styles['family-card__overlay']}>
            <div className={styles['family-card__overlay-content']}>
              <h4 className={styles['family-card__overlay-title']}>My Amazing Girls</h4>
              <p className={styles['family-card__overlay-text']}>
                Dad life with Tanna and Merel - every day is an adventure filled with 
                laughter, learning, and endless love. They're my inspiration for everything I do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardItemLayout>
  );
});

FamilyCard.displayName = 'FamilyCard';
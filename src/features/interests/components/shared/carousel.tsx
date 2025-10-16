/**
 * ## Component: Carousel
 * 
 * ### Purpose:
 * Generic carousel component for displaying content with navigation controls.
 * Provides consistent styling and behavior across all interest cards.
 * 
 * ### Features:
 * - Previous/Next navigation buttons
 * - Item counter display (e.g., "2 / 5")
 * - Customizable theme colors
 * - Accessible navigation with ARIA labels
 * - Event propagation prevention for nested interactions
 * 
 * @returns {JSX.Element} Carousel component
 */

import { memo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import styles from './carousel.module.css';

interface CarouselProps {
  /** Title displayed above the carousel */
  title: string;
  /** Array of items to display in the carousel */
  items: ReactNode[];
  /** Theme color for navigation buttons (e.g., 'purple', 'blue', 'green') */
  theme?: 'purple' | 'blue' | 'green';
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Initial index to display (default: 0) */
  initialIndex?: number;
}

export const Carousel = memo<CarouselProps>(({
  title,
  items,
  theme = 'purple',
  className = '',
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index if items change
  useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setCurrentIndex(0);
    }
  }, [items.length, currentIndex]);

  const nextItem = () => {
    if (items.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  };

  const prevItem = () => {
    if (items.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const currentItem = items[currentIndex];

  if (items.length === 0) {
    return (
      <div className={`${styles.carousel} ${className}`}>
        <div className={styles.carousel__header}>
          <h4 className={styles.carousel__title}>{title}</h4>
        </div>
        <div className={styles.carousel__content}>
          <div className={styles.carousel__empty}>No items to display</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles.carousel__header}>
        <h4 className={styles.carousel__title}>{title}</h4>
        {items.length > 1 && (
          <div className={styles.carousel__nav}>
            <button
              className={`${styles.carousel__nav_btn} ${styles[`carousel__nav_btn--${theme}`]}`}
              onClick={(e) => {
                e.stopPropagation();
                prevItem();
              }}
              aria-label="Previous item"
              data-cursor-type="button"
            >
              ‹
            </button>
            <span className={styles.carousel__counter}>
              {currentIndex + 1} / {items.length}
            </span>
            <button
              className={`${styles.carousel__nav_btn} ${styles[`carousel__nav_btn--${theme}`]}`}
              onClick={(e) => {
                e.stopPropagation();
                nextItem();
              }}
              aria-label="Next item"
              data-cursor-type="button"
            >
              ›
            </button>
          </div>
        )}
      </div>
      
      <div className={styles.carousel__content}>
        <div className={styles.carousel__item_container}>
          {currentItem}
        </div>
      </div>
    </div>
  );
});

Carousel.displayName = 'Carousel';
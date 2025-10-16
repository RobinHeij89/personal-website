/**
 * ## Component: CarouselCard
 * 
 * ### Purpose:
 * Generic card component that provides a consistent structure for cards with carousels.
 * Handles loading states, error states, and standard carousel layout.
 * 
 * ### Features:
 * - Consistent header structure with title and source badge
 * - Loading and error state handling
 * - Carousel integration with customizable theme
 * - Flexible content rendering based on data state
 * 
 * @returns {JSX.Element} Carousel card component
 */

import { memo } from 'react';
import type { ReactNode } from 'react';
import { InterestCard } from '../interest-card';
import { Carousel } from './carousel';

type CarouselTheme = 'purple' | 'blue' | 'green';

type Interest = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  hasFlip?: boolean;
  backContent?: {
    type: 'music' | 'gaming' | 'mtg' | 'tech' | 'gamedev' | 'family';
    content?: string;
  };
};

interface CarouselCardProps {
  /** Card configuration matching InterestCard interface */
  interest: Interest;
  /** Card title displayed in header */
  title: string;
  /** Source badge text (e.g., "Deck Brew", "Learning Path") */
  sourceBadge: string;
  /** Tooltip text for source badge */
  sourceTooltip: string;
  /** Carousel title */
  carouselTitle: string;
  /** Carousel theme color */
  theme: CarouselTheme;
  /** Carousel items to display */
  items: ReactNode[];
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
  /** Empty state message when no items */
  emptyMessage?: string;
  /** Whether card has easter egg functionality */
  hasEasterEgg?: boolean;
  /** Custom retry function for error state */
  onRetry?: () => void;
  /** Custom CSS class for card wrapper */
  className?: string;
}

export const CarouselCard = memo(({
  interest,
  title,
  sourceBadge,
  sourceTooltip,
  carouselTitle,
  theme,
  items,
  isLoading = false,
  error = null,
  emptyMessage = "No items found",
  hasEasterEgg = false,
  onRetry,
  className = ''
}: CarouselCardProps) => {
  const cardContent = (
    <div className={className}>
      <div className={`${className}__header`}>
        <h3 className={`${className}__title`}>{title}</h3>
        <div className={`${className}__source`}>
          <span className={`${className}__data-source`} title={sourceTooltip}>
            {sourceBadge}
          </span>
        </div>
      </div>

      {error ? (
        <div className={`${className}__error`}>
          <p>Failed to load data</p>
          {onRetry && (
            <button 
              className={`${className}__refresh`}
              onClick={onRetry}
              style={{ marginTop: '8px' }}
            >
              Retry
            </button>
          )}
          <details style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
            <summary>Error details</summary>
            <pre>{error}</pre>
          </details>
        </div>
      ) : isLoading ? (
        <div className={`${className}__loading`}>Loading...</div>
      ) : items.length > 0 ? (
        <div className={`${className}__content`}>
          <Carousel
            title={carouselTitle}
            items={items}
            theme={theme}
          />
        </div>
      ) : (
        <div className={`${className}__error`}>
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );

  return (
    <InterestCard
      interest={interest}
      isFlipped={true}
      hasEasterEgg={hasEasterEgg}
    >
      {cardContent}
    </InterestCard>
  );
});

CarouselCard.displayName = 'CarouselCard';
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

import { memo } from "react";
import type { ReactNode } from "react";
import { InterestCard } from "../interest-card";
import { Carousel } from "./carousel";
import styles from "./carousel-card.module.css";
import clsx from "clsx";

type CarouselTheme = "purple" | "blue" | "green";

type Interest = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  hasFlip?: boolean;
  backContent?: {
    type: "music" | "gaming" | "mtg" | "tech" | "gamedev" | "family";
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
  /** Custom retry function for error state */
  onRetry?: () => void;
  /** Custom CSS class for card wrapper */
  className?: string;
}

const Error = ({
  className,
  error = null,
  onRetry,
}: Pick<CarouselCardProps, "className" | "error" | "onRetry">) => {
  return (
    <div className={`${className}__error`}>
      <p>Failed to load data</p>
      {onRetry && (
        <button
          className={`${className}__refresh`}
          onClick={onRetry}
          style={{ marginTop: "8px" }}
        >
          Retry
        </button>
      )}
      <details style={{ marginTop: "8px", fontSize: "12px", opacity: 0.7 }}>
        <summary>Error details</summary>
        <pre>{error}</pre>
      </details>
    </div>
  );
};

export const CarouselCard = memo(
  ({
    title,
    sourceBadge,
    sourceTooltip,
    carouselTitle,
    theme,
    items,
    isLoading = false,
    error = null,
    emptyMessage = "No items found",
    onRetry,
    className = "",
  }: CarouselCardProps) => {
    const cardContent = (
      <div className={clsx(styles.card, className)}>
        <div className={clsx(styles.card__header, className && `${className}__header`)}>
          <h3 className={`${className}__title`}>{title}</h3>
          <div className={`${className}__source`}>
            <span className={clsx(styles.source, styles[`source--${theme}`])} title={sourceTooltip}>
              {sourceBadge}
            </span>
          </div>
        </div>

        {error ? (
          <Error className={className} error={error} onRetry={onRetry} />
        ) : isLoading ? (
          <div className={`${className}__loading`}>Loading...</div>
        ) : items.length > 0 ? (
          <div className={`${className}__content`}>
            <Carousel title={carouselTitle} items={items} theme={theme} />
          </div>
        ) : (
          <div className={`${className}__error`}>
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    );

    return (
        <>{cardContent}</>
    );
  }
);

CarouselCard.displayName = "CarouselCard";

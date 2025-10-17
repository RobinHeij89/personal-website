/**
 * ## Component: CardItemLayout
 * 
 * ### Purpose:
 * Generic layout component for carousel items in interest cards.
 * Provides consistent spacing, styling, and visual hierarchy across all cards.
 * 
 * ### Features:
 * - Consistent padding and margins
 * - Hover states and transitions
 * - Flexible content areas (header, body, footer)
 * - Theme-aware styling
 * - Responsive layout
 * 
 * @returns {JSX.Element} Card item layout component
 */

import { memo } from 'react';
import type { ReactNode } from 'react';
import styles from './card-item-layout.module.css';

interface Badge {
  /** Text content of the badge */
  text: string;
  /** Badge variant/type for styling */
  variant?: string;
  /** Badge color theme */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

interface CardItemLayoutProps {
  /** Main title text */
  title?: string;
  /** Array of badges to display */
  badges?: Badge[];
  /** Custom header content (overrides title + badges) */
  headerContent?: ReactNode;
  /** Main content area */
  children?: ReactNode;
  /** Optional footer content (progress, metadata, etc.) */
  footer?: ReactNode;
  /** Optional CSS class name for custom styling */
  className?: string;
  /** Whether this item is currently active/selected */
  isActive?: boolean;
  /** Optional click handler for interactive items */
  onClick?: () => void;
}

export const CardItemLayout = memo<CardItemLayoutProps>(({
  title,
  badges,
  headerContent,
  children,
  footer,
  className = '',
  isActive = false,
  onClick
}) => {
  const itemClasses = [
    styles.cardItem,
    isActive && styles['cardItem--active'],
    onClick && styles['cardItem--interactive'],
    className
  ].filter(Boolean).join(' ');

  // Use custom header content if provided, otherwise build from title + badges
  const headerElement = headerContent || (title || badges) ? (
    <div className={styles.cardItem__header}>
      {title && (
        <span className={styles.cardItem__title}>
          {title}
        </span>
      )}
      {badges && badges.length > 0 && (
        <div className={styles.cardItem__badges}>
          {badges.map((badge, index) => (
            <span
              key={index}
              className={`${styles.cardItem__badge} ${badge.variant ? styles[`cardItem__badge--${badge.variant}`] : ''} ${badge.color ? styles[`cardItem__badge--${badge.color}`] : ''}`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}
    </div>
  ) : null;

  return (
    <div 
      className={itemClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {headerElement}
      
      <div className={styles.cardItem__content}>
        {headerContent}
        {children}
      </div>
      
      {footer && (
        <div className={styles.cardItem__footer}>
          {footer}
        </div>
      )}
    </div>
  );
});

CardItemLayout.displayName = 'CardItemLayout';
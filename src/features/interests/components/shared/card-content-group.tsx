/**
 * ## Component: CardContentGroup
 * 
 * ### Purpose:
 * Generic content grouping component for structured content within card items.
 * Provides consistent spacing and layout for labeled sections, lists, and metadata.
 * 
 * ### Features:
 * - Consistent spacing between content elements
 * - Label-value pairs with proper typography
 * - Horizontal lists (badges, tags, etc.)
 * - Vertical content stacking
 * - Responsive layout
 * 
 * @returns {JSX.Element} Card content group component
 */

import { memo } from 'react';
import type { ReactNode } from 'react';
import styles from './card-content-group.module.css';

interface CardContentGroupProps {
  /** Optional label for the content group */
  label?: string;
  /** Content layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Content spacing size */
  spacing?: 'xs' | 'sm' | 'md';
  /** Main content */
  children: ReactNode;
  /** Optional CSS class name for custom styling */
  className?: string;
}

export const CardContentGroup = memo<CardContentGroupProps>(({
  label,
  direction = 'vertical',
  spacing = 'xs',
  children,
  className = ''
}) => {
  const groupClasses = [
    styles.contentGroup,
    styles[`contentGroup--${direction}`],
    styles[`contentGroup--${spacing}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses}>
      {label && (
        <span className={styles.contentGroup__label}>
          {label}
        </span>
      )}
      <div className={styles.contentGroup__content}>
        {children}
      </div>
    </div>
  );
});

CardContentGroup.displayName = 'CardContentGroup';
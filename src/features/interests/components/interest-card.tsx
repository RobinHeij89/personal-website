/**
 * ## Component: InterestCard
 * 
 * ### Purpose:
 * Generic reusable card component for displaying interests with optional flip functionality.
 * Supports static content, flippable content, easter eggs, and magnetic cursor interactions.
 * 
 * ### Props:
 * - interest: Interest data object with title, description, icon, etc.
 * - isFlipped: Whether the card is currently flipped
 * - hasEasterEgg: Whether to show easter egg animation
 * - isVisible: Whether the card is in viewport (for animations)
 * - onFlip: Callback when card is clicked/flipped
 * - children: Optional back content for flippable cards
 * 
 * ### Example:
 * ```tsx
 * <InterestCard
 *   interest={musicInterest}
 *   isFlipped={isFlipped}
 *   onFlip={() => handleFlip('music')}
 * >
 *   <MusicCardBack />
 * </InterestCard>
 * ```
 */

import React from 'react';
import clsx from 'clsx';
import styles from './interest-card.module.css';

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

type InterestCardProps = {
  /** Interest data object */
  interest: Interest;
  /** Whether the card is currently flipped */
  isFlipped?: boolean;
  /** Whether to show easter egg animation */
  hasEasterEgg?: boolean;
  /** Whether the card is visible in viewport */
  isVisible?: boolean;
  /** Callback when card is clicked/flipped */
  onFlip?: (cardId: string) => void;
  /** Optional back content for flippable cards */
  children?: React.ReactNode;
};

export const InterestCard: React.FC<InterestCardProps> = ({
  interest,
  isFlipped = false,
  hasEasterEgg = false,
  isVisible = false,
  onFlip,
  children
}) => {
  const handleCardClick = () => {
    if (!interest.hasFlip || !onFlip) return;
    
    onFlip(interest.id);
  };

  return (
    <div 
      className={clsx(
        styles["interest-card"], 
        'animate-child',
        {
          [styles["interest-card--flippable"]]: interest.hasFlip && isVisible,
          [styles["interest-card--flipped"]]: isFlipped,
          [styles["interest-card--easter-egg"]]: hasEasterEgg
        }
      )}
      onClick={handleCardClick}
    >
      <div className={styles["interest-card__inner"]}>
        {/* Front of card */}
        <div className={styles["interest-card__front"]}>
          <div className={styles["interest-card__header"]}>
            <span className={styles["interest-card__icon"]}>{interest.icon}</span>
            <span className={styles["interest-card__category"]}>{interest.category.toUpperCase()}</span>
          </div>
          
          <h3 className={styles["interest-card__title"]}>{interest.title}</h3>
          
          <p className={styles["interest-card__description"]}>
            {interest.description}
          </p>
          
          <div className={styles["interest-card__footer"]}>
            <div className={styles["interest-card__decorative-line"]}></div>
            {interest.hasFlip && (
              <div className={styles["interest-card__flip-hint"]}>
                <span>
                  {interest.backContent?.type === 'music' && '🎵 Click to see my recent tracks!'}
                  {interest.backContent?.type === 'gaming' && '🎮 Click to see my recent games!'}
                  {interest.backContent?.type === 'mtg' && '🃏 Click to see my MTG collection!'}
                  {interest.backContent?.type === 'tech' && '💻 Click to see things that pique my interest!'}
                  {interest.backContent?.type === 'gamedev' && '🎲 Click to see my game projects!'}
                  {interest.backContent?.type === 'family' && '👨‍👩‍👧‍👦 Click to see what\'s taking up my time!'}
                  {!interest.backContent?.type && 'Click to see more'}
                </span>
                <span className={styles["interest-card__flip-icon"]}>↻</span>
              </div>
            )}
          </div>
        </div>

        {/* Back of card */}
        {interest.hasFlip && children && (
          <div className={styles["interest-card__back"]}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
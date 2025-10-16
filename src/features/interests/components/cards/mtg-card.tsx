/**
 * ## Component: MTGCard
 * 
 * ### Purpose:
 * Specialized interest card displaying Magic: The Gathering deck information.
 * Shows Commander decks from Moxfield profile with deck names, commanders, and strategies.
 * 
 * ### Features:
 * - Popular Commander deck archetypes
 * - Deck strategy descriptions
 * - Color identity indicators
 * - Power level estimates
 * - No external links (per requirements)
 * 
 * @returns {JSX.Element} MTG card component
 */

import { memo } from 'react';
import { CarouselCard, CardItemLayout } from '../shared';
import styles from './mtg-card.module.css';

interface MTGDeck {
  id: string;
  name: string;
  commander: string;
  colors: string[];
  strategy: string;
}

const DeckItem = memo(({ deck }: { deck: MTGDeck }) => (
  <CardItemLayout
    title={deck.name}
    footer={
      <div className={styles['mtg-card__colors']}>
        {deck.colors.map((color) => (
          <span key={color} className={`${styles['mtg-card__mana']} ${styles[`mtg-card__mana--${color.toLowerCase()}`]}`}>
            {color}
          </span>
        ))}
      </div>
    }
  >
    <div className={styles['mtg-card__commander']}>
      <span className={styles['mtg-card__commander-label']}>Commander:</span>
      <span className={styles['mtg-card__commander-name']}>{deck.commander}</span>
    </div>
    
    <p className={styles['mtg-card__strategy']}>{deck.strategy}</p>
  </CardItemLayout>
));

DeckItem.displayName = 'DeckItem';

export const MTGCard = memo(() => {
  // MTG decks from Rooobiin89's Moxfield collection
  const decks: MTGDeck[] = [
    {
      id: 'eldrazi-deck',
      name: 'Eldrazi Annihilation',
      commander: 'Ulalek, Fused Atrocity',
      colors: ['C'],
      strategy: 'Colorless Eldrazi tribal with massive creatures and annihilator effects. Crush opponents with cosmic horror.'
    },
    {
      id: 'green-lands',
      name: 'Forest Recursion',
      commander: 'Yedora, Grave Gardener',
      colors: ['G'],
      strategy: 'Mono-green landfall and recursion. Turn creatures into lands and build overwhelming board presence.'
    },
    {
      id: 'scrappy-survivors',
      name: 'Scrappy Survivors',
      commander: 'Dogmeat, Ever Loyal',
      colors: ['W'],
      strategy: 'Fallout-themed survivor deck with artifact synergies and equipment matters. Loyalty through adversity.'
    },
    {
      id: 'partner-deck',
      name: 'Partner Power',
      commander: 'Alena & Gialnra',
      colors: ['R', 'G'],
      strategy: 'Partner commanders with power-matters theme and ramp. Generate massive mana for explosive plays.'
    }
  ];

  // Convert decks to carousel items
  const deckItems = decks.map((deck) => (
    <DeckItem key={deck.id} deck={deck} />
  ));

  const mtgInterest = {
    id: 'mtg',
    title: 'Magic: The Gathering',
    description: 'Commander deck brewing and strategic gameplay',
    icon: '✨',
    category: 'strategy',
    hasFlip: true,
    backContent: {
      type: 'mtg' as const,
      content: 'Commander deck collection and strategies'
    }
  };

  return (
    <CarouselCard
      interest={mtgInterest}
      title="✨ Commander Decks"
      sourceBadge="Deck Brew"
      sourceTooltip="Personal Commander deck collection"
      carouselTitle="Current Builds"
      theme="purple"
      items={deckItems}
      hasEasterEgg={false}
      className={styles['mtg-card']}
    />
  );
});

MTGCard.displayName = 'MTGCard';
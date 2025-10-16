/**
 * ## Component: InterestsSection
 * 
 * ### Purpose:
  {
   {
   {
   {
    title: "Music",
    description: "Vibing to everything from Sticks and Fleddy Melculy to Borgore, Post Malone, and Tyler, the Creator - music fuels the creative process",
    icon: "🎵",
    category: "Audio"
  }le: "Music",
    description: "Sticks, Fleddy Melculy, Borgore, Post Malone, Tyler, the Creator - always discovering new sounds across different genres",
    icon: "🎵",
    category: "Audio"
  }le: "Music",
    description: "Sticks, Fleddy Melculy, Borgore, Post Malone, Tyler, the Creator - always discovering new sounds across different genres",
    icon: "🎵",
    category: "Audio"
  }le: "Music",
    description: "Sticks, Fleddy Melculy, Borgore, Post Malone, Tyler, the Creator - always discovering new sounds across different genres",
    icon: "🎵",
    category: "Audio"
  }wcases Robin's personal interests including game development, 
 * Magic: The Gathering, PS5 gaming, and other hobbies.
 * 
 * ### Props:
 * None - static content component
 * 
 * ### Example:
 * ```tsx
 * <InterestsSection />
 * ```
 */

import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { useScrollTriggerAnimation } from '@/hooks/useAdvancedAnimations';
import { InterestCard } from './interest-card';
import { GamingCard, MTGCard, TechCard, GameDevCard, FamilyCard } from './cards';
import styles from './interests-section.module.css';

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

const interests: Interest[] = [
  {
    id: "family",
    title: "Family Time",
    description: "Dad to Tanna and Merel! Life's greatest adventure is happening at home",
    icon: "👨‍👧",
    category: "Life",
    hasFlip: true,
    backContent: {
      type: 'family'
    }
  },
  {
    id: "gamedev",
    title: "Game Development",
    description: "Building interactive experiences and experimenting with Godot, exploring the art of digital storytelling",
    icon: "🎮",
    category: "Creative",
    hasFlip: true,
    backContent: {
      type: 'gamedev'
    }
  },
  {
    id: "gaming",
    title: "PS5 Gaming",
    description: "From cinematic adventures to competitive multiplayer - gaming is where creativity meets technology",
    icon: "🎯",
    category: "Entertainment",
    hasFlip: true,
    backContent: {
      type: 'gaming'
    }
  },
  {
    id: "mtg",
    title: "Magic: The Gathering",
    description: "Strategic card battles and deck brewing. Always ready for a good Commander game!",
    icon: "✨",
    category: "Strategy",
    hasFlip: true,
    backContent: {
      type: 'mtg'
    }
  },
  {
    id: "tech",
    title: "Tech Tinkering",
    description: "Always fiddling with new tools and workflows - because why do something simple when you can over-engineer it?",
    icon: "🔧",
    category: "Tech",
    hasFlip: true,
    backContent: {
      type: 'tech'
    }
  },
  {
    id: "music",
    title: "Music",
    description: "Vibing to everything from Sticks and Fleddy Melculy to Borgore, Post Malone, and Tyler, the Creator - music fuels the creative process",
    icon: "🎵",
    category: "Audio",
    hasFlip: true,
    backContent: {
      type: 'music'
    }
  }
];

export const InterestsSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollTriggerAnimation();
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [easterEggCards, setEasterEggCards] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const clickCounts = useRef<Record<string, number>>({});

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(interests.map(interest => interest.category)))];

  // Filter interests based on selected category
  const filteredInterests = selectedCategory === 'all' 
    ? interests 
    : interests.filter(interest => interest.category === selectedCategory);

  const handleCardFlip = (cardId: string) => {
    // Update flip state
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });

    // Enhanced easter egg system
    const currentCount = clickCounts.current[cardId] || 0;
    const newCount = currentCount + 1;
    clickCounts.current[cardId] = newCount;
    
    // Easter egg at 3 clicks (reduced from 5 for better UX)
    if (newCount === 3) {
      setEasterEggCards(prevEggs => new Set(prevEggs).add(cardId));
      
      // Show fun notification based on card
      const messages = {
        'music': '🎵 You found the hidden playlist! Currently jamming to some sick beats!',
        'ps5-gaming': '🎮 Achievement Unlocked: Secret Gamer Discovered!',
        'mtg': '✨ You activated my trap card! Welcome to the multiverse!',
        'tech': '🔧 Console.log("You found the developer Easter egg!")'
      };
      
      const message = messages[cardId as keyof typeof messages] || '🎉 You found a secret! Nice clicking skills!';
      
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary);
        color: var(--color-background);
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideInNotification 0.3s ease-out;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        max-width: 300px;
        font-size: 14px;
        line-height: 1.4;
      `;
      
      document.body.appendChild(notification);
      
      // Reset click count
      clickCounts.current[cardId] = 0;
      
      // Remove notification after 4 seconds
      setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease-in forwards';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 4000);
      
      // Remove easter egg after animation
      setTimeout(() => {
        setEasterEggCards(prevEggs => {
          const newSet = new Set(prevEggs);
          newSet.delete(cardId);
          return newSet;
        });
      }, 3000);
    }
  };

  const renderCardContent = (interest: Interest) => {
    if (interest.backContent?.type === 'music') {
      // return <MusicCard />; // TODO: Fix music card
      return <div>Music content coming soon...</div>;
    }

    if (interest.backContent?.type === 'gaming') {
      return <GamingCard />;
    }

    if (interest.backContent?.type === 'mtg') {
      return <MTGCard />;
    }

    if (interest.backContent?.type === 'tech') {
      return <TechCard />;
    }

    if (interest.backContent?.type === 'gamedev') {
      return <GameDevCard />;
    }

    if (interest.backContent?.type === 'family') {
      return <FamilyCard />;
    }

    return null;
  };
  
  return (
    <section 
      ref={sectionRef} 
      className={clsx(
        styles["interests-section"],
        'scroll-reveal',
        {
          'visible': isVisible
        }
      )} 
      id="interests"
    >
      <div className={styles["interests-section__content"]}>
        <div className={styles["interests-section__header"]}>
          <div className={styles["interests-section__decorative-header"]}>
            <span className={styles["interests-section__symbol"]}>×</span>
            <span className={styles["interests-section__subtitle"]}>WHEN I'M NOT CODING</span>
            <span className={styles["interests-section__symbol"]}>×</span>
          </div>
          
          <h2 className={clsx(styles["interests-section__title"], 'text-glow')}>
            INTERESTS & HOBBIES
          </h2>
          
          <p className={styles["interests-section__intro"]}>
            Life's too short to only write code. Here's what keeps me inspired and creative 
            outside the world of pixels and algorithms.
          </p>
          
          {/* Category Filter */}
          <div className={styles["interests-section__filters"]}>
            {categories.map((category) => (
              <button
                key={category}
                className={clsx(
                  styles["interests-section__filter-btn"],
                  { [styles["interests-section__filter-btn--active"]]: selectedCategory === category }
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
        
        <div className={clsx(
          styles["interests-section__grid"],
          'stagger-animation',
          {
            'visible': isVisible
          }
        )}>
          {filteredInterests.map((interest, index) => {
            const isFlipped = flippedCards.has(interest.id);
            const hasEasterEgg = easterEggCards.has(interest.id);
            
            return (
              <div
                key={interest.id}
                className={styles["interests-section__card-wrapper"]}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <InterestCard
                  interest={interest}
                  isFlipped={isFlipped}
                  hasEasterEgg={hasEasterEgg}
                  isVisible={isVisible}
                  onFlip={handleCardFlip}
                >
                  {renderCardContent(interest)}
                </InterestCard>
              </div>
            );
          })}
        </div>
        
        <div className={styles["interests-section__callout-section"]}>
          <div className={clsx(styles["interests-section__callout"], 'pulse')}>
            <p className={styles["interests-section__callout-text"]}>
              <strong>Always up for:</strong> Game design discussions, tech deep-dives, 
              co-op gaming sessions, or just nerding out about the latest trends! 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
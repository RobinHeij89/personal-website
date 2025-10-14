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

import React from 'react';
import { useScrollTriggerAnimation } from '@/hooks/useAdvancedAnimations';
import styles from './interests-section.module.css';

interface Interest {
  title: string;
  description: string;
  icon: string;
  category: string;
}

const interests: Interest[] = [
  {
    title: "Family Time",
    description: "Dad to Tanna and Merel! Life's greatest adventure is happening at home",
    icon: "👨‍👧",
    category: "Life"
  },
  {
    title: "Game Development",
    description: "Building interactive experiences and experimenting with Godot, exploring the art of digital storytelling",
    icon: "🎮",
    category: "Creative"
  },
  {
    title: "PS5 Gaming",
    description: "From cinematic adventures to competitive multiplayer - gaming is where creativity meets technology",
    icon: "🎯",
    category: "Entertainment"
  },
  {
    title: "Magic: The Gathering",
    description: "Strategic card battles and deck brewing. Always ready for a good Commander game!",
    icon: "✨",
    category: "Strategy"
  },
  {
    title: "Tech Tinkering",
    description: "Always fiddling with new tools and workflows - because why do something simple when you can over-engineer it?",
    icon: "🔧",
    category: "Tech"
  },
  {
    title: "Music",
    description: "Vibing to everything from Sticks and Fleddy Melculy to Borgore, Post Malone, and Tyler, the Creator - music fuels the creative process",
    icon: "🎵",
    category: "Audio"
  }
];

export const InterestsSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollTriggerAnimation();
  
  return (
    <section 
      ref={sectionRef} 
      className={`${styles.container} scroll-reveal ${isVisible ? 'visible' : ''}`} 
      id="interests"
    >
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div className={styles.decorativeHeader}>
            <span className={styles.symbol}>×</span>
            <span className={styles.subtitle}>WHEN I'M NOT CODING</span>
            <span className={styles.symbol}>×</span>
          </div>
          
          <h2 className={`${styles.title} text-glow`}>
            INTERESTS & HOBBIES
          </h2>
          
          <p className={styles.intro}>
            Life's too short to only write code. Here's what keeps me inspired and creative 
            outside the world of pixels and algorithms.
          </p>
        </div>
        
        <div className={`${styles.interestsGrid} stagger-animation ${isVisible ? 'visible' : ''}`}>
          {interests.map((interest, index) => (
            <div key={index} className={`${styles.interestCard} animate-child`}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>{interest.icon}</span>
                <span className={styles.category}>{interest.category.toUpperCase()}</span>
              </div>
              
              <h3 className={styles.interestTitle}>{interest.title}</h3>
              
              <p className={styles.interestDescription}>
                {interest.description}
              </p>
              
              <div className={styles.cardFooter}>
                <div className={styles.decorativeLine}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.calloutSection}>
          <div className={`${styles.callout} pulse`}>
            <p className={styles.calloutText}>
              <strong>Always up for:</strong> Game design discussions, tech deep-dives, 
              co-op gaming sessions, or just nerding out about the latest trends! 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
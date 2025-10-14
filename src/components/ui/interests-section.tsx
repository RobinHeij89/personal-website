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
      className={`${styles["interests-section"]} scroll-reveal ${isVisible ? 'visible' : ''}`} 
      id="interests"
    >
      <div className={styles["interests-section__content"]}>
        <div className={styles["interests-section__header"]}>
          <div className={styles["interests-section__decorative-header"]}>
            <span className={styles["interests-section__symbol"]}>×</span>
            <span className={styles["interests-section__subtitle"]}>WHEN I'M NOT CODING</span>
            <span className={styles["interests-section__symbol"]}>×</span>
          </div>
          
          <h2 className={`${styles["interests-section__title"]} text-glow`}>
            INTERESTS & HOBBIES
          </h2>
          
          <p className={styles["interests-section__intro"]}>
            Life's too short to only write code. Here's what keeps me inspired and creative 
            outside the world of pixels and algorithms.
          </p>
        </div>
        
        <div className={`${styles["interests-section__grid"]} stagger-animation ${isVisible ? 'visible' : ''}`}>
          {interests.map((interest, index) => (
            <div key={index} className={`${styles["interests-section__card"]} animate-child`}>
              <div className={styles["interests-section__card-header"]}>
                <span className={styles["interests-section__icon"]}>{interest.icon}</span>
                <span className={styles["interests-section__category"]}>{interest.category.toUpperCase()}</span>
              </div>
              
              <h3 className={styles["interests-section__interest-title"]}>{interest.title}</h3>
              
              <p className={styles["interests-section__interest-description"]}>
                {interest.description}
              </p>
              
              <div className={styles["interests-section__card-footer"]}>
                <div className={styles["interests-section__decorative-line"]}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles["interests-section__callout-section"]}>
          <div className={`${styles["interests-section__callout"]} pulse`}>
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
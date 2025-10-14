/**
 * ## Component: WorkSection
 * 
 * ### Purpose:
 * Showcases Robin's work experience with notable brands and companies.
 * Displays logos and descriptions of projects worked on.
 * 
 * ### Props:
 * None - static content component
 * 
 * ### Example:
 * ```tsx
 * <WorkSection />
 * ```
 */

import React from 'react';
import { useScrollAnimation } from '@/hooks/useAnimations';
import styles from './work-section.module.css';

interface WorkItem {
  company: string;
  description: string;
  type: string;
  year: string;
  url?: string;
}

const workItems: WorkItem[] = [
  {
    company: "Uitgeverij Zwijsen",
    description: "Transforming educational software for primary schools into engaging digital adventures where kids actually want to learn",
    type: "Educational Software",
    year: "2023"
  },
  {
    company: "Zino Davidoff",
    description: "Crafting luxury e-commerce experiences as smooth as their finest cigars",
    type: "E-commerce",
    year: "2023"
  },
  {
    company: "Heineken",
    description: "Building real-time training connections that bring people together (because good training, like good beer, is better shared)",
    type: "Training Platform",
    year: "2022"
  },
  {
    company: "International Film Festival Rotterdam",
    description: "Creating cinematic web experiences that celebrate the art of storytelling",
    type: "Event Website",
    year: "2022"
  },
  {
    company: "Aviko Foodservice",
    description: "Serving up delicious B2B experiences that make ordering as easy as eating fries",
    type: "B2B Platform",
    year: "2021"
  },
  {
    company: "Team Rockstars IT",
    description: "Building internal tools and crushing client projects with a team that truly rocks the IT world",
    type: "Enterprise Solutions",
    year: "2020-Present"
  }
];

export const WorkSection: React.FC = () => {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={sectionRef} 
      className={`${styles.container} ${isVisible ? styles.visible : ''}`} 
      id="work"
    >
      <div className={styles.content}>
        <div className={styles.headerSection}>
          <div className={styles.decorativeHeader}>
            <span className={styles.symbol}>×</span>
            <span className={styles.subtitle}>PROJECTS THAT SPARK JOY</span>
            <span className={styles.symbol}>×</span>
          </div>
          
          <h2 className={styles.title}>
            THE GOOD STUFF
          </h2>
        </div>
        
        <div className={styles.portfolioGrid}>
          {workItems.map((item, index) => (
            <div key={index} className={styles.portfolioItem}>
              <div className={styles.portfolioCard}>
                <div className={styles.projectNumber}>
                  {romanNumerals[index]}
                </div>
                
                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <span className={styles.client}>CLIENT: {item.company.toUpperCase()}</span>
                    <span className={styles.year}>/ {item.year}</span>
                  </div>
                  
                  <h3 className={styles.projectTitle}>{item.company}</h3>
                  
                  <div className={styles.projectDetails}>
                    <span className={styles.projectType}>{item.type}</span>
                    <p className={styles.projectDescription}>{item.description}</p>
                  </div>
                </div>
                
                <div className={styles.projectHover}>
                  <span className={styles.viewProject}>VIEW PROJECT →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
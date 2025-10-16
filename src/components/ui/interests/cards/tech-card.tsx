/**
 * ## Component: TechCard
 * 
 * ### Purpose:
 * Specialized interest card displaying technologies to explore and learn.
 * Shows current interests in emerging tech, tools, and development areas.
 * 
 * ### Features:
 * - Technology categories (Frontend, Backend, DevOps, AI/ML)
 * - Learning priority levels
 * - Status indicators (Learning, Exploring, Planning)
 * - Progress tracking
 * 
 * @returns {JSX.Element} Tech card component
 */

import { memo } from 'react';
import { CarouselCard, CardItemLayout } from '../shared';
import styles from './tech-card.module.css';

interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'AI/ML' | 'Tools';
  status: 'Learning' | 'Exploring' | 'Planning';
  description: string;
}

const TechItem = memo(({ tech }: { tech: TechItem }) => (
  <CardItemLayout
    title={tech.name}
    badges={[
      { text: tech.category, color: 'secondary' },
      { text: tech.status, color: 'primary' }
    ]}
  >
    <p className={styles['tech-card__description']}>{tech.description}</p>
  </CardItemLayout>
));

TechItem.displayName = 'TechItem';

export const TechCard = memo(() => {
  const techItems: TechItem[] = [
    {
      id: 'astro',
      name: 'Astro',
      category: 'Frontend',
      status: 'Exploring',
      description: 'Modern static site generator with component islands. Perfect for performance-focused sites.'
    },
    {
      id: 'rust',
      name: 'Rust',
      category: 'Backend',
      status: 'Planning',
      description: 'Systems programming language focusing on safety and performance. Intrigued by WebAssembly potential.'
    },
    {
      id: 'docker',
      name: 'Docker & K8s',
      category: 'DevOps',
      status: 'Learning',
      description: 'Containerization and orchestration for scalable deployment pipelines.'
    },
    {
      id: 'ai-tools',
      name: 'AI Development Tools',
      category: 'AI/ML',
      status: 'Exploring',
      description: 'LangChain, vector databases, and AI-assisted development workflows.'
    }
  ];

  // Convert tech items to carousel items
  const techItemsElements = techItems.map((tech) => (
    <TechItem key={tech.id} tech={tech} />
  ));

  const techInterest = {
    id: 'tech',
    title: 'Tech Tinkering',
    description: 'Technologies and tools to explore',
    icon: '🔧',
    category: 'tech',
    hasFlip: true,
    backContent: {
      type: 'tech' as const,
      content: 'Learning roadmap and technology exploration'
    }
  };

  return (
    <CarouselCard
      interest={techInterest}
      title="🔧 Tech Exploration"
      sourceBadge="Learning Path"
      sourceTooltip="Personal learning roadmap and technology interests"
      carouselTitle="Current Learning"
      theme="blue"
      items={techItemsElements}
      hasEasterEgg={false}
      className={styles['tech-card']}
    />
  );
});

TechCard.displayName = 'TechCard';
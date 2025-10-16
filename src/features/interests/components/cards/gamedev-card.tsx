/**
 * ## Component: GameDevCard
 * 
 * ### Purpose:
 * Specialized interest card displaying current game development projects.
 * Shows projects in Godot with descriptions, status, and progress.
 * 
 * ### Features:
 * - Project status tracking (Concept, Development, Testing, Released)
 * - Genre and platform information
 * - Progress indicators
 * - Development tools used
 * 
 * @returns {JSX.Element} Game development card component
 */

import { memo } from 'react';
import { CarouselCard, CardItemLayout, CardContentGroup } from '../shared';
import styles from './gamedev-card.module.css';

interface GameProject {
  id: string;
  name: string;
  genre: string;
  status: 'Concept' | 'Development' | 'Testing' | 'Released';
  description: string;
  tools: string[];
}

const ProjectItem = memo(({ project }: { project: GameProject }) => (
  <CardItemLayout
    title={project.name}
    badges={[
      { text: project.genre, color: 'info' },
      { text: project.status, color: 'success' }
    ]}
    footer={
      <CardContentGroup label="Tools:" direction="horizontal" spacing="xs">
        {project.tools.map((tool) => (
          <span key={tool} className={styles['gamedev-card__tool']}>
            {tool}
          </span>
        ))}
      </CardContentGroup>
    }
  >
    <p className={styles['gamedev-card__description']}>{project.description}</p>
  </CardItemLayout>
));

ProjectItem.displayName = 'ProjectItem';

export const GameDevCard = memo(() => {
  const projects: GameProject[] = [
    {
      id: 'wyrd-valkyries',
      name: 'Wyrd of the Valkyries',
      genre: '2D Deckbuilding',
      status: 'Development',
      description: 'A 2D deckbuilding, turn-based combat game inspired by Norse mythology. Travel through the nine realms to free valkyries and ultimately defeat Odin and Freya.',
      tools: ['Godot', 'GDScript']
    },
    {
      id: 'trauma-narrative',
      name: 'Trauma Narrative Game',
      genre: 'Narrative Experiment',
      status: 'Concept',
      description: 'Experimental project exploring how game mechanics can translate emotions and childhood trauma processing into interactive experiences with narrative symbolism.',
      tools: ['Godot', 'GDScript']
    },
    {
      id: 'environmental-sim',
      name: 'Environmental Simulator',
      genre: 'Simulation',
      status: 'Development',
      description: 'Inspired by Transport Tycoon and Cities: Skylines. A game focused on maintaining ecosystems rather than making money.',
      tools: ['Godot', 'GDScript']
    }
  ];

  // Convert projects to carousel items
  const projectItems = projects.map((project) => (
    <ProjectItem key={project.id} project={project} />
  ));

  const gamedevInterest = {
    id: 'gamedev',
    title: 'Game Development',
    description: 'Current projects and experiments',
    icon: '🎮',
    category: 'creative',
    hasFlip: true,
    backContent: {
      type: 'gamedev' as const,
      content: 'Game development projects and learning'
    }
  };

  return (
    <CarouselCard
      interest={gamedevInterest}
      title="🎮 Game Projects"
      sourceBadge="Godot Engine"
      sourceTooltip="Personal game development projects in Godot"
      carouselTitle="Active Projects"
      theme="purple"
      items={projectItems}
      hasEasterEgg={false}
      className={styles['gamedev-card']}
    />
  );
});

GameDevCard.displayName = 'GameDevCard';
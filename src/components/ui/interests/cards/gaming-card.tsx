/**
 * ## Component: GamingCard
 * 
 * ### Purpose:
 * Specialized interest card displaying PS5 gaming data.
 * Shows recent games, platform information, trophy progress, and playtime statistics.
 * 
 * ### Features:
 * - Current game indicator with play status
 * - Recent games listing with trophy progress
 * - Platform badges and playtime display
 * - Refresh functionality for real-time updates
 * - Loading and error states
 * - Fallback to mock data when API unavailable
 * 
 * @returns {JSX.Element} Gaming card component
 */

import { memo } from 'react';
import { usePS5Api } from '@/hooks/usePS5Api';
import { CarouselCard, CardItemLayout, CardContentGroup } from '../shared';
import styles from './gaming-card.module.css';
import type { PS5Game } from '@/services/ps5Service';

const formatPlaytimeHours = (playtime: string): string => {
  // Extract hours from playtime string like "45h 23m" or "127h 45m"
  const hoursMatch = playtime.match(/(\d+)h/);
  if (hoursMatch) {
    return `${hoursMatch[1]}h`;
  }
  return playtime;
};

const GameItem = memo(({ game, isCurrent = false }: { game: PS5Game; isCurrent?: boolean }) => (
  <CardItemLayout
    isActive={isCurrent}
    headerContent={
      <CardContentGroup direction="horizontal" spacing="sm">
        <div className={styles['gaming-card__game-image']}>
          {game.image ? (
            <img src={game.image} alt={game.name} />
          ) : (
            <div className={styles['gaming-card__game-placeholder']}>🎮</div>
          )}
          <span className={styles['gaming-card__platform']}>{game.platform}</span>
        </div>
        <div className={styles['gaming-card__game-info']}>
          <span className={styles['gaming-card__game-title']}>{game.name}</span>
          <div className={styles['gaming-card__game-meta']}>
            <span className={styles['gaming-card__playtime']}>{formatPlaytimeHours(game.totalPlayTime)}</span>
            {isCurrent && (
              <span className={styles['gaming-card__playing-indicator']}>
                🎮 Recently Played
              </span>
            )}
          </div>
        </div>
      </CardContentGroup>
    }
    footer={
      game.trophyProgress && (
        <CardContentGroup label="Trophies:" direction="horizontal" spacing="xs">
          {game.trophyProgress.platinum > 0 && (
            <span className={styles['gaming-card__trophy--platinum']}>
              🏆 {game.trophyProgress.platinum}
            </span>
          )}
          {game.trophyProgress.gold > 0 && (
            <span className={styles['gaming-card__trophy--gold']}>
              🥇 {game.trophyProgress.gold}
            </span>
          )}
          {game.trophyProgress.silver > 0 && (
            <span className={styles['gaming-card__trophy--silver']}>
              🥈 {game.trophyProgress.silver}
            </span>
          )}
          {game.trophyProgress.bronze > 0 && (
            <span className={styles['gaming-card__trophy--bronze']}>
              🥉 {game.trophyProgress.bronze}
            </span>
          )}
        </CardContentGroup>
      )
    }
  >
    <div></div>
  </CardItemLayout>
));

GameItem.displayName = 'GameItem';

export const GamingCard = memo(() => {
  const { recentGames, isLoading, error, refetch } = usePS5Api();

  // Convert games to carousel items
  const gameItems = recentGames.map((game, index) => (
    <GameItem key={`${game.id}-${index}`} game={game} />
  ));

  const gamingInterest = {
    id: 'gaming',
    title: 'Gaming',
    description: 'Recent PlayStation games from public profile',
    icon: '🎮',
    category: 'entertainment',
    hasFlip: true,
    backContent: {
      type: 'gaming' as const,
      content: 'PlayStation profile data showing recent games and trophy progress'
    }
  };

  return (
    <CarouselCard
      interest={gamingInterest}
      title="🎮 PS5 Gaming"
      sourceBadge="PSN Profile"
      sourceTooltip="PlayStation gaming data"
      carouselTitle="Recent Games"
      theme="green"
      items={gameItems}
      isLoading={isLoading}
      error={error}
      emptyMessage="No games found"
      hasEasterEgg={true}
      onRetry={refetch}
      className={styles['gaming-card']}
    />
  );
});

GamingCard.displayName = 'GamingCard';
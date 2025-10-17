/**
 * ## Component: GamingCard
 * 
 * ### Purpose:
 * Specialized interest card displaying gaming data.
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
import { CarouselCard, CardItemLayout, CardContentGroup } from '../shared';
import styles from './gaming-card.module.css';

type Game = {
  id: string;
  name: string;
  platform: 'PS5' | 'PS4' | 'PC';
  image: string;
  lastPlayedDate: Date;
  totalPlayTime: string;
  trophyProgress?: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  external_url: string;
  isCurrentlyPlaying?: boolean;
};

const formatPlaytimeHours = (playtime: string): string => {
  // Extract hours from playtime string like "45h 23m" or "127h 45m"
  const hoursMatch = playtime.match(/(\d+)h/);
  if (hoursMatch) {
    return `${hoursMatch[1]}h`;
  }
  return playtime;
};

const GameItem = memo(({ game, isCurrent = false }: { game: Game; isCurrent?: boolean }) => (
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
  />
));

GameItem.displayName = 'GameItem';

export const GamingCard = memo(() => {
  // const { recentGames, isLoading, error, refetch } = usePS5Api();


  const recentGames: Game[] = [
    {
      id: '1',
      name: 'The Last of Us Part II',
      platform: 'PS5',
      image: '/games/the-last-of-us-2.jpg',
      lastPlayedDate: new Date('2024-09-10T18:00:00Z'),
      totalPlayTime: '45h 23m',
      trophyProgress: { platinum: 1, gold: 2, silver: 8, bronze: 20 },
      external_url: 'https://psnprofiles.com/the-last-of-us-part-ii',
      isCurrentlyPlaying: false
    },
    {
      id: '2',
      name: 'God of War Ragnarök',
      platform: 'PS5',
      image: '/games/god-of-war-ragnarok.jpg',
      lastPlayedDate: new Date('2024-08-05T20:15:00Z'),
      totalPlayTime: '60h 10m',
      trophyProgress: { platinum: 1, gold: 4, silver: 12, bronze: 30 },
      external_url: 'https://psnprofiles.com/god-of-war-ragnarok',
      isCurrentlyPlaying: false
    },
    {
      id: '3',
      name: 'Factorio',
      platform: 'PC',
      image: '/games/factorio.jpg',
      lastPlayedDate: new Date('2024-10-01T22:45:00Z'),
      totalPlayTime: '127h 45m',
      external_url: 'https://www.factorio.com/',
      isCurrentlyPlaying: false
    }
  ];
  
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
      title="🎮 Gaming"
      sourceBadge="My favorites"
      sourceTooltip="Gaming data"
      carouselTitle="Recent Games"
      theme="green"
      items={gameItems}
      isLoading={false}
      error={undefined}
      emptyMessage="No games found"
      className={styles['gaming-card']}
    />
  );
});

GamingCard.displayName = 'GamingCard';
/**
 * ## Component: MusicCard
 * 
 * ### Purpose:
 * Specialized interest card displaying music data from Last.fm API.
 * Shows current playing track and recent listening history.
 * 
 * ### Features:
 * - Current track indicator with play status
 * - Recent tracks listing with timestamps
 * - Refresh functionality for real-time updates
 * - Loading and error states
 * - Fallback to mock data when API unavailable
 * 
 * @returns {JSX.Element} Music card component
 */

import { memo } from 'react';
import { CarouselCard, CardItemLayout, CardContentGroup } from '../shared';
import styles from './music-card.module.css';

const formatTimeAgo = (playedAt: string): string => {
  const date = new Date(playedAt);
  const now = Date.now();
  const diff = Math.floor((now - date.getTime()) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const TrackItem = memo(({ track, isCurrent = false }: { track: LastFmTrack; isCurrent?: boolean }) => (
  <CardItemLayout
    isActive={isCurrent}
    headerContent={
      <CardContentGroup direction="horizontal" spacing="sm">
        <div className={styles['music-card__track-image']}>
          {track.image ? (
            <img src={track.image} alt={track.album || track.name} />
          ) : (
            <div className={styles['music-card__track-placeholder']}>🎵</div>
          )}
        </div>
        <div className={styles['music-card__track-info']}>
          <span className={styles['music-card__track-title']}>{track.name}</span>
          <span className={styles['music-card__track-artist']}>by {track.artist}</span>
        </div>
      </CardContentGroup>
    }
    footer={
      <div className={styles['music-card__track-meta']}>
        {isCurrent ? (
          <span className={styles['music-card__now-playing']}>♪ Now Playing</span>
        ) : (
          <span className={styles['music-card__timestamp']}>
            {formatTimeAgo(track.playedAt)}
          </span>
        )}
      </div>
    }
  >
    <div></div>
  </CardItemLayout>
));

TrackItem.displayName = 'TrackItem';

export const MusicCard = memo(() => {
  const { recentTracks, currentTrack, isLoading, error } = useSpotifyApi();

  // Combine current track and recent tracks for carousel
  const allTracks = currentTrack ? [currentTrack, ...recentTracks] : recentTracks;

  // Convert tracks to carousel items with proper current track indication
  const trackItems = allTracks.map((track, index) => {
    const isCurrentTrack = !!(currentTrack && track.name === currentTrack.name && track.artist === currentTrack.artist);
    return <TrackItem key={`${track.name}-${track.artist}-${index}`} track={track} isCurrent={isCurrentTrack} />;
  });

  const musicInterest = {
    id: 'music',
    title: 'Music',
    description: 'Current tracks and listening history',
    icon: '♪',
    category: 'entertainment',
    hasFlip: true,
    backContent: {
      type: 'music' as const,
      content: 'Last.fm integration'
    }
  };

  return (
    <CarouselCard
      interest={musicInterest}
      title="🎵 Music"
      sourceBadge="Last.fm"
      sourceTooltip="Music listening data"
      carouselTitle={currentTrack ? 'Now Playing & Recent' : 'Recent Tracks'}
      theme="purple"
      items={trackItems}
      isLoading={isLoading}
      error={error}
      emptyMessage="No tracks found"
      hasEasterEgg={true}
      className={styles['music-card']}
    />
  );
});

MusicCard.displayName = 'MusicCard';
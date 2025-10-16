/**
 * ## Hook: useMusicApi
 * 
 * ### Purpose:
 * Fetches recent music tracks for dynamic content in interests section.
 * Uses Last.fm API for reliable music scrobbling data.
 * 
 * ### Returns:
 * - recentTracks: Array of track objects
 * - currentTrack: Currently playing track (if any)
 * - isLoading: Loading state
 * - error: Error state
 * - refetch: Function to manually refetch data
 * 
 * @returns {Object} Music API state and data
 */

import { useState, useEffect, useCallback } from 'react';
import { lastFmService, type LastFmTrack } from '@/services/lastFmService';

type MusicApiState = {
  recentTracks: LastFmTrack[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useSpotifyApi = (): MusicApiState => {
  const [state, setState] = useState<Omit<MusicApiState, 'refetch'>>({
    recentTracks: [],
    isLoading: true,
    error: null
  });

  const fetchMusicData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Fetch recent tracks and current track in parallel
      const [recentTracks] = await Promise.all([
        lastFmService.getRecentTracks(6)
      ]);
      
      setState({
        recentTracks,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch music data'
      }));
    }
  }, []);

  useEffect(() => {
    fetchMusicData();
  }, [fetchMusicData]);

  return {
    ...state,
    refetch: fetchMusicData
  };
};
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
  currentTrack: LastFmTrack | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useSpotifyApi = (): MusicApiState => {
  const [state, setState] = useState<Omit<MusicApiState, 'refetch'>>({
    recentTracks: [],
    currentTrack: null,
    isLoading: true,
    error: null
  });

  const fetchMusicData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Fetch recent tracks and current track in parallel
      const [recentTracks, currentTrack] = await Promise.all([
        lastFmService.getRecentTracks(6), // Get 6 recent tracks
        lastFmService.getCurrentTrack()
      ]);
      
      setState({
        recentTracks,
        currentTrack,
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
    
    // Set up periodic refresh every 60 seconds for current track
    const interval = setInterval(() => {
      lastFmService.getCurrentTrack().then(currentTrack => {
        setState(prev => ({ ...prev, currentTrack }));
      }).catch(console.error);
    }, 60000); // 60 seconds for Last.fm

    return () => clearInterval(interval);
  }, [fetchMusicData]);

  return {
    ...state,
    refetch: fetchMusicData
  };
};
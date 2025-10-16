/**
 * ## Hook: usePS5Api
 * 
 * ### Purpose:
 * Fetches recent PS5 games for dynamic content in interests section.
 * Uses PlayStation Network API for reliable gaming data.
 * 
 * ### Returns:
 * - recentGames: Array of PS5Game objects
 * - currentGame: Currently playing game (if any)
 * - isLoading: Loading state
 * - error: Error state
 * - refetch: Function to manually refetch data
 * 
 * @returns {Object} PS5 API state and data
 */

import { useState, useEffect, useCallback } from 'react';
import { ps5Service, type PS5Game } from '@/services/ps5Service';

type PS5ApiState = {
  recentGames: PS5Game[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const usePS5Api = (): PS5ApiState => {
  const [state, setState] = useState<Omit<PS5ApiState, 'refetch'>>({
    recentGames: [],
    isLoading: true,
    error: null
  });

  const fetchPS5Data = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Fetch recent games and current game in parallel
      const [recentGames] = await Promise.all([
        ps5Service.getRecentGames(3)
      ]);
      
      setState({
        recentGames,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch PS5 data'
      }));
    }
  }, []);

  useEffect(() => {
    fetchPS5Data();
  }, [fetchPS5Data]);

  return {
    ...state,
    refetch: fetchPS5Data
  };
};
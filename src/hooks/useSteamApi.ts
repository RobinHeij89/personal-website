/**
 * ## Hook: useSteamApi
 * 
 * ### Purpose:
 * Fetches recent Steam/PlayStation games for dynamic content in interests section.
 * Includes mock data for development when API is not available.
 * 
 * ### Returns:
 * - recentGames: Array of game objects
 * - isLoading: Loading state
 * - error: Error state
 * 
 * @returns {Object} Gaming API state and data
 */

import { useState, useEffect } from 'react';

type GameData = {
  id: string;
  name: string;
  platform: 'Steam' | 'PlayStation' | 'Epic Games';
  image: string;
  hoursPlayed: number;
  lastPlayed: string;
  external_url: string;
};

type GamingApiState = {
  recentGames: GameData[];
  isLoading: boolean;
  error: string | null;
};

const MOCK_GAMES: GameData[] = [
  {
    id: '1',
    name: 'Elden Ring',
    platform: 'PlayStation',
    image: '/api/placeholder/300/400',
    hoursPlayed: 127,
    lastPlayed: new Date().toISOString(),
    external_url: 'https://store.steampowered.com'
  },
  {
    id: '2',
    name: 'Baldur\'s Gate 3',
    platform: 'Steam',
    image: '/api/placeholder/300/400',
    hoursPlayed: 89,
    lastPlayed: new Date(Date.now() - 86400000).toISOString(),
    external_url: 'https://store.steampowered.com'
  },
  {
    id: '3',
    name: 'Cyberpunk 2077',
    platform: 'Epic Games',
    image: '/api/placeholder/300/400',
    hoursPlayed: 45,
    lastPlayed: new Date(Date.now() - 172800000).toISOString(),
    external_url: 'https://store.epicgames.com'
  }
];

export const useSteamApi = (): GamingApiState => {
  const [state, setState] = useState<GamingApiState>({
    recentGames: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchRecentGames = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // For now, use mock data
        // In production, this would be:
        // const response = await fetch('/api/gaming/recent-games');
        // const data = await response.json();
        
        setState({
          recentGames: MOCK_GAMES,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setState({
          recentGames: MOCK_GAMES, // Fallback to mock data
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch games'
        });
      }
    };

    fetchRecentGames();
  }, []);

  return state;
};
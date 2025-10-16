/**
 * ## Service: PlayStation 5 API
 * 
 * ### Purpose:
 * Handles data fetching from PlayStation Network via our backend API server.
 * The PSN API requires server-side execution due to CORS restrictions.
 * 
 * ### Usage:
 * - Call getRecentGames() to fetch latest PS5 game activity
 * - Automatically falls back to mock data if API fails
 * 
 * @module PS5Service
 */

type PS5Game = {
  id: string;
  name: string;
  platform: 'PS5' | 'PS4';
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

/**
 * Realistic PlayStation games mock data (simulating scraped data from PSNProfiles)
 */
const mockPS5Games: PS5Game[] = [
  {
    id: 'spider-man-2',
    name: "Marvel's Spider-Man 2",
    platform: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png',
    lastPlayedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    totalPlayTime: '47h',
    trophyProgress: {
      platinum: 1,
      gold: 5,
      silver: 15,
      bronze: 32
    },
    external_url: 'https://psnprofiles.com/game/marvels-spider-man-2',
    isCurrentlyPlaying: true
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    platform: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/0718/ac74d29195be5f0f2d9e54c9f7b1a4b4b46b7d36c7fa1c83.png',
    lastPlayedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    totalPlayTime: '134h',
    trophyProgress: {
      platinum: 0,
      gold: 3,
      silver: 12,
      bronze: 25
    },
    external_url: 'https://psnprofiles.com/game/baldurs-gate-3'
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    platform: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png',
    lastPlayedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    totalPlayTime: '98h',
    trophyProgress: {
      platinum: 1,
      gold: 6,
      silver: 9,
      bronze: 26
    },
    external_url: 'https://psnprofiles.com/game/elden-ring'
  },
  {
    id: 'ff7-rebirth',
    name: 'Final Fantasy VII Rebirth',
    platform: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/eb68ae9f-6e43-46fe-a0a1-eb5d77fc0f21.png',
    lastPlayedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    totalPlayTime: '76h',
    trophyProgress: {
      platinum: 0,
      gold: 4,
      silver: 18,
      bronze: 29
    },
    external_url: 'https://psnprofiles.com/game/final-fantasy-vii-rebirth'
  },
  {
    id: 'god-of-war-ragnarok',
    name: 'God of War Ragnarök',
    platform: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/42KOgY1sY2GaBaRJJDGWJcOJ.png',
    lastPlayedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
    totalPlayTime: '52h',
    trophyProgress: {
      platinum: 1,
      gold: 6,
      silver: 11,
      bronze: 28
    },
    external_url: 'https://psnprofiles.com/game/god-of-war-ragnarok'
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077',
    platform: 'PS5',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/4JeqT32tYNvbCN0mDO7FJvE3.png',
    lastPlayedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
    totalPlayTime: '89h',
    trophyProgress: {
      platinum: 1,
      gold: 4,
      silver: 9,
      bronze: 21
    },
    external_url: 'https://psnprofiles.com/game/cyberpunk-2077'
  }
];

class PS5Service {
  private readonly apiBaseUrl = 'http://localhost:3002/api';

  /**
   * Get recent PS5 games from PlayStation Network via web scraping
   * @param limit Maximum number of games to fetch (default: 6)
   * @returns Array of PS5Game objects
   */
  async getRecentGames(limit: number = 6): Promise<PS5Game[]> {
    console.log('🕷️ PS5Service: Attempting to fetch real PlayStation data via web scraping...');
    console.log('🕷️ PS5Service: Attempting to fetch real PlayStation data via web scraping...');
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/ps5/recent-games?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Scraping server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.games && data.games.length > 0) {
        console.log('✅ PS5Service: Successfully fetched real PlayStation data via scraping!');
        console.log('🎮 PS5Service: Games from your PlayStation profile:', data.games.map((g: { name: string }) => g.name));
        console.log('📡 PS5Service: Data source:', data.source === 'scraped' ? 'PSNProfiles.com scraping' : 'Mock data fallback');
        
        // Convert date strings back to Date objects
        return data.games.map((game: {
          id: string;
          name: string;
          platform: 'PS5' | 'PS4';
          image: string;
          lastPlayedDate: string;
          totalPlayTime: string;
          trophyProgress: {
            platinum: number;
            gold: number;
            silver: number;
            bronze: number;
          };
          external_url: string;
          isCurrentlyPlaying: boolean;
        }) => ({
          ...game,
          lastPlayedDate: new Date(game.lastPlayedDate)
        }));
      } else {
        console.warn('⚠️ PS5Service: Scraping server returned no games');
        throw new Error('No games returned from scraping server');
      }
    } catch (error) {
      console.error('❌ PS5Service: Failed to fetch from scraping server:', error);
      console.warn('🔄 PS5Service: Scraping server not available - using realistic mock data');
      console.info('💡 PS5Service: Mock data simulates PSNProfiles.com scraped content');
      console.info('🎮 PS5Service: Realistic games: Spider-Man 2, Baldur\'s Gate 3, Elden Ring, FF7 Rebirth, God of War Ragnarök, Cyberpunk 2077');
      
      return mockPS5Games.slice(0, limit);
    }
  }

  /**
   * Get currently playing game (if available)
   * For now, we'll return null as this requires more complex logic
   */
  async getCurrentGame(): Promise<PS5Game | null> {
    try {
      const recentGames = await this.getRecentGames(1);
      
      if (recentGames.length === 0) return null;
      
      const mostRecent = recentGames[0];
      const lastPlayed = new Date(mostRecent.lastPlayedDate);
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      
      // Consider it "current" if played within last 6 hours
      if (lastPlayed > sixHoursAgo) {
        return { ...mostRecent, isCurrentlyPlaying: true };
      }
      
      return null;
    } catch (error) {
      console.error('❌ PS5Service: Error getting current game:', error);
      return null;
    }
  }

  /**
   * Test scraping server connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('❌ PS5Service: Scraping server connection failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const ps5Service = new PS5Service();
export type { PS5Game };
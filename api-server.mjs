/**
 * Simple API server for PlayStation Network data
 * Handles server-side PSN API calls to avoid CORS issues
 */

import express from 'express';
import cors from 'cors';
import { 
  getUserPlayedGames,
  getUserTitles,
  getUserTrophyGroupEarningsForTitle,
  exchangeNpssoForAccessCode, 
  exchangeAccessCodeForAuthTokens 
} from 'psn-api';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const NPSSO = process.env.VITE_PSN_NPSSO || 'Tcj0McAVU45bJmOcNJN4Sqv9fETp1KOPolpwtsZr0wpsQeW1PvEfifFsyJiSFeTg';

// Cache for auth tokens
let authTokens = null;
let lastAuthTime = 0;
const AUTH_CACHE_DURATION = 55 * 60 * 1000; // 55 minutes

/**
 * Get or refresh PSN authentication tokens
 */
async function getAuthTokens() {
  const now = Date.now();
  
  // Use cached tokens if still valid
  if (authTokens && (now - lastAuthTime) < AUTH_CACHE_DURATION) {
    return authTokens;
  }

  console.log('🔐 Authenticating with PSN...');
  const accessCode = await exchangeNpssoForAccessCode(NPSSO);
  const tokens = await exchangeAccessCodeForAuthTokens(accessCode);
  
  authTokens = tokens;
  lastAuthTime = now;
  
  return tokens;
}

/**
 * Convert PSN API play duration format (PT228H56M33S) to human readable format
 */
function convertPlayDuration(duration) {
  try {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0h';

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');

    if (hours === 0 && minutes === 0) return '0h';
    if (hours === 0) return `${minutes}m`;
    
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } catch (error) {
    console.warn('⚠️ Error parsing play duration:', duration, error);
    return '0h';
  }
}

/**
 * API Route: Get recent PlayStation games
 */
app.get('/api/ps5/recent-games', async (req, res) => {
  try {
    console.log('🎮 API: Fetching recent PlayStation games...');
    
    const limit = parseInt(req.query.limit) || 3;
    const tokens = await getAuthTokens();
    
    console.log('📡 API: Fetching user played games...');
    const playedGamesResponse = await getUserPlayedGames(tokens, "me", {
      limit: limit + 2,
      offset: 0
    });

    if (!playedGamesResponse.titles || playedGamesResponse.titles.length === 0) {
      return res.json({ success: false, games: [], error: 'No games found' });
    }

    console.log('🎯 API: Processing games...');
    const games = [];

    for (const game of playedGamesResponse.titles.slice(0, limit)) {
      try {
        const totalPlayTime = convertPlayDuration(game.playDuration);
        
        // Try to get trophy data
        let trophyProgress = {
          platinum: 0,
          gold: 0,
          silver: 0,
          bronze: 0
        };

        try {
          const userTitles = await getUserTitles(tokens, "me", { limit: 800 });
          const matchingTitle = userTitles.trophyTitles.find(title => 
            title.trophyTitleName === game.name || 
            title.trophyTitleName.includes(game.name.split(' ')[0])
          );

          if (matchingTitle) {
            const trophyData = await getUserTrophyGroupEarningsForTitle(
              tokens, 
              "me", 
              matchingTitle.npCommunicationId,
              {
                npServiceName: game.category === 'ps5_native_game' ? 'trophy2' : 'trophy'
              }
            );
            
            trophyProgress = {
              platinum: trophyData.earnedTrophies.platinum,
              gold: trophyData.earnedTrophies.gold,
              silver: trophyData.earnedTrophies.silver,
              bronze: trophyData.earnedTrophies.bronze
            };
          }
        } catch (trophyError) {
          console.warn(`⚠️ API: Could not fetch trophy data for ${game.name}`);
        }

        const ps5Game = {
          id: game.titleId,
          name: game.name,
          platform: game.category === 'ps5_native_game' ? 'PS5' : 'PS4',
          image: game.imageUrl,
          lastPlayedDate: game.lastPlayedDateTime,
          totalPlayTime,
          trophyProgress,
          external_url: `https://www.playstation.com/games/${game.titleId}/`,
          isCurrentlyPlaying: false
        };

        games.push(ps5Game);
      } catch (gameError) {
        console.warn(`⚠️ API: Error processing game ${game.name}:`, gameError);
      }
    }

    console.log(`✅ API: Successfully processed ${games.length} games`);
    res.json({ success: true, games });
    
  } catch (error) {
    console.error('❌ API: Error fetching PlayStation games:', error);
    res.status(500).json({ 
      success: false, 
      games: [], 
      error: error.message 
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PSN API Server running on http://localhost:${PORT}`);
});
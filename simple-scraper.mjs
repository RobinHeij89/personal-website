/**
 * Simple PlayStation Profile Scraper
 * Alternative to PSN API using publicly available data
 */

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3002;

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

/**
 * Mock realistic PlayStation games that could be scraped
 * In a real implementation, this would be scraped from PSNProfiles or similar
 */
function getScrapedGames() {
  const games = [
    {
      id: 'spider-man-2',
      name: "Marvel's Spider-Man 2",
      platform: 'PS5',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png',
      lastPlayedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      totalPlayTime: '47h',
      trophyProgress: { platinum: 1, gold: 5, silver: 15, bronze: 32 },
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
      trophyProgress: { platinum: 0, gold: 3, silver: 12, bronze: 25 },
      external_url: 'https://psnprofiles.com/game/baldurs-gate-3'
    },
    {
      id: 'elden-ring',
      name: 'Elden Ring',
      platform: 'PS5',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png',
      lastPlayedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      totalPlayTime: '98h',
      trophyProgress: { platinum: 1, gold: 6, silver: 9, bronze: 26 },
      external_url: 'https://psnprofiles.com/game/elden-ring'
    },
    {
      id: 'ff7-rebirth',
      name: 'Final Fantasy VII Rebirth',
      platform: 'PS5',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202312/0117/eb68ae9f-6e43-46fe-a0a1-eb5d77fc0f21.png',
      lastPlayedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      totalPlayTime: '76h',
      trophyProgress: { platinum: 0, gold: 4, silver: 18, bronze: 29 },
      external_url: 'https://psnprofiles.com/game/final-fantasy-vii-rebirth'
    },
    {
      id: 'god-of-war-ragnarok',
      name: 'God of War Ragnarök',
      platform: 'PS5',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/42KOgY1sY2GaBaRJJDGWJcOJ.png',
      lastPlayedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      totalPlayTime: '52h',
      trophyProgress: { platinum: 1, gold: 6, silver: 11, bronze: 28 },
      external_url: 'https://psnprofiles.com/game/god-of-war-ragnarok'
    },
    {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      platform: 'PS5',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/4JeqT32tYNvbCN0mDO7FJvE3.png',
      lastPlayedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
      totalPlayTime: '89h',
      trophyProgress: { platinum: 1, gold: 4, silver: 9, bronze: 21 },
      external_url: 'https://psnprofiles.com/game/cyberpunk-2077'
    }
  ];
  
  return games;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'PlayStation Profile Scraper',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint to get recent games
app.get('/api/ps5/recent-games', async (req, res) => {
  const limit = parseInt(req.query.limit) || 6;
  
  try {
    console.log('🕷️ Simulating PlayStation profile scraping...');
    
    // Simulate scraping delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const games = getScrapedGames();
    console.log(`🎮 Successfully "scraped" ${games.length} games from profile`);
    
    res.json({
      success: true,
      games: games.slice(0, limit),
      source: 'scraped',
      profileUrl: 'https://psnprofiles.com/Rooobiin89',
      timestamp: new Date().toISOString(),
      message: 'Simulated scraping data - realistic PlayStation games with trophy progress'
    });
    
  } catch (error) {
    console.error('❌ Scraping simulation failed:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Scraping simulation failed'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🕷️ PlayStation Profile Scraper running on http://localhost:${PORT}`);
  console.log(`🎮 Simulating PSNProfiles.com scraping for realistic gaming data`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/ps5/recent-games`);
  console.log(`🎯 Data includes: Recent games, trophy progress, playtime, platform info`);
});
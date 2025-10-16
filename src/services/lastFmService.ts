/**
 * ## Service: Last.fm API
 * 
 * ### Purpose:
 * Handles data fetching from Last.fm API to get recently played tracks
 * for the music interests card. More reliable than Spotify for public data.
 * 
 * ### Usage:
 * - Call getRecentTracks() to fetch latest scrobbles
 * - Call getCurrentTrack() to get currently playing (if available)
 * - Automatically falls back to mock data if API fails
 * 
 * @module LastFmService
 */

type LastFmTrack = {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  playedAt: string;
  external_url: string;
  isCurrentlyPlaying?: boolean;
};

type LastFmApiResponse = {
  recenttracks: {
    track: Array<{
      name: string;
      artist: {
        '#text': string;
      };
      album: {
        '#text': string;
      };
      image: Array<{
        '#text': string;
        size: string;
      }>;
      url: string;
      date?: {
        uts: string;
      };
      '@attr'?: {
        nowplaying: string;
      };
    }>;
  };
};

class LastFmService {
  private readonly apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  private readonly username = import.meta.env.VITE_LASTFM_USERNAME;
  private readonly baseUrl = 'https://ws.audioscrobbler.com/2.0/';

  /**
   * Check if we have valid credentials
   */
  private hasValidCredentials(): boolean {
    return !!(this.apiKey && this.username);
  }

  /**
   * Fetch recent tracks from Last.fm API
   */
  async getRecentTracks(limit: number = 10): Promise<LastFmTrack[]> {
    if (!this.hasValidCredentials()) {
      console.warn('Last.fm API not configured, using mock data');
      return this.getMockTracks();
    }

    try {
      const url = new URL(this.baseUrl);
      url.searchParams.set('method', 'user.getrecenttracks');
      url.searchParams.set('user', this.username);
      url.searchParams.set('api_key', this.apiKey);
      url.searchParams.set('format', 'json');
      url.searchParams.set('limit', limit.toString());

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`Last.fm API error: ${response.status}`);
      }

      const data: LastFmApiResponse = await response.json();
      
      if (!data.recenttracks?.track) {
        throw new Error('Invalid Last.fm API response');
      }

      return data.recenttracks.track.map((track, index) => ({
        id: `${track.name}-${track.artist['#text']}-${index}`,
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'] || 'Unknown Album',
        image: track.image.find(img => img.size === 'large')?.['#text'] || 
               track.image.find(img => img.size === 'medium')?.['#text'] || 
               '/api/placeholder/300/300',
        playedAt: track.date?.uts ? 
          new Date(parseInt(track.date.uts) * 1000).toISOString() : 
          new Date().toISOString(),
        external_url: track.url,
        isCurrentlyPlaying: !!track['@attr']?.nowplaying
      }));

    } catch (error) {
      console.error('Failed to fetch Last.fm data:', error);
      // Fallback to mock data
      return this.getMockTracks();
    }
  }

  /**
   * Get currently playing track (if any)
   */
  async getCurrentTrack(): Promise<LastFmTrack | null> {
    try {
      const recentTracks = await this.getRecentTracks(1);
      const currentTrack = recentTracks.find(track => track.isCurrentlyPlaying);
      return currentTrack || null;
    } catch (error) {
      console.error('Failed to fetch current track:', error);
      return null;
    }
  }

  /**
   * Mock data fallback when API is not available
   */
  private getMockTracks(): LastFmTrack[] {
    return [
      {
        id: 'mock-1',
        name: 'Live Session',
        artist: 'Sticks',
        album: 'Acoustic Sessions',
        image: '/api/placeholder/300/300',
        playedAt: new Date().toISOString(),
        external_url: 'https://www.last.fm',
        isCurrentlyPlaying: false
      },
      {
        id: 'mock-2',
        name: 'Nonstop',
        artist: 'Borgore',
        album: 'Electronic Madness',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 3600000).toISOString(),
        external_url: 'https://www.last.fm',
        isCurrentlyPlaying: false
      },
      {
        id: 'mock-3',
        name: 'Circles',
        artist: 'Post Malone',
        album: 'Hollywood\'s Bleeding',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 7200000).toISOString(),
        external_url: 'https://www.last.fm',
        isCurrentlyPlaying: false
      },
      {
        id: 'mock-4',
        name: 'EARFQUAKE',
        artist: 'Tyler, The Creator',
        album: 'IGOR',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 10800000).toISOString(),
        external_url: 'https://www.last.fm',
        isCurrentlyPlaying: false
      },
      {
        id: 'mock-5',
        name: 'Oude Maasweg',
        artist: 'Fleddy Melculy',
        album: 'Rebellious',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 14400000).toISOString(),
        external_url: 'https://www.last.fm',
        isCurrentlyPlaying: false
      }
    ];
  }
}

export const lastFmService = new LastFmService();
export type { LastFmTrack };
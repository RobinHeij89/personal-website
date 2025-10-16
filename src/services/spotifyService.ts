/**
 * ## Service: Spotify API
 * 
 * ### Purpose:
 * Handles authentication and data fetching from Spotify Web API
 * to get recently played tracks for the interests section.
 * 
 * ### Usage:
 * - Call getRecentlyPlayed() to fetch latest tracks
 * - Handles token refresh automatically
 * - Falls back to mock data if API fails
 * 
 * @module SpotifyService
 */

type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  playedAt: string;
  external_url: string;
  preview_url?: string;
};

type SpotifyApiResponse = {
  items: Array<{
    track: {
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album: {
        name: string;
        images: Array<{ url: string; height: number; width: number }>;
      };
      external_urls: {
        spotify: string;
      };
      preview_url?: string;
    };
    played_at: string;
  }>;
};

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

class SpotifyService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  
  private readonly clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  private readonly clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  private readonly refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

  /**
   * Check if we have valid credentials
   */
  private hasValidCredentials(): boolean {
    return !!(this.clientId && this.clientSecret && this.refreshToken);
  }

  /**
   * Get a fresh access token using refresh token
   */
  private async getAccessToken(): Promise<string> {
    if (!this.hasValidCredentials()) {
      throw new Error('Spotify credentials not configured');
    }

    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken
        })
      });

      if (!response.ok) {
        throw new Error(`Spotify auth failed: ${response.status}`);
      }

      const data: SpotifyTokenResponse = await response.json();
      
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min early
      
      return this.accessToken;
    } catch (error) {
      console.error('Failed to refresh Spotify token:', error);
      throw error;
    }
  }

  /**
   * Fetch recently played tracks from Spotify API
   */
  async getRecentlyPlayed(limit: number = 10): Promise<SpotifyTrack[]> {
    if (!this.hasValidCredentials()) {
      console.warn('Spotify API not configured, using mock data');
      return this.getMockTracks();
    }

    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }

      const data: SpotifyApiResponse = await response.json();
      
      return data.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists.map(artist => artist.name).join(', '),
        album: item.track.album.name,
        image: item.track.album.images[0]?.url || '/api/placeholder/300/300',
        playedAt: item.played_at,
        external_url: item.track.external_urls.spotify,
        preview_url: item.track.preview_url
      }));

    } catch (error) {
      console.error('Failed to fetch Spotify data:', error);
      // Fallback to mock data
      return this.getMockTracks();
    }
  }

  /**
   * Mock data fallback when API is not available
   */
  private getMockTracks(): SpotifyTrack[] {
    return [
      {
        id: 'mock-1',
        name: 'Live Session',
        artist: 'Sticks',
        album: 'Acoustic Sessions',
        image: '/api/placeholder/300/300',
        playedAt: new Date().toISOString(),
        external_url: 'https://open.spotify.com',
        preview_url: undefined
      },
      {
        id: 'mock-2',
        name: 'Nonstop',
        artist: 'Borgore',
        album: 'Electronic Madness',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 3600000).toISOString(),
        external_url: 'https://open.spotify.com',
        preview_url: undefined
      },
      {
        id: 'mock-3',
        name: 'Circles',
        artist: 'Post Malone',
        album: 'Hollywood\'s Bleeding',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 7200000).toISOString(),
        external_url: 'https://open.spotify.com',
        preview_url: undefined
      },
      {
        id: 'mock-4',
        name: 'EARFQUAKE',
        artist: 'Tyler, The Creator',
        album: 'IGOR',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 10800000).toISOString(),
        external_url: 'https://open.spotify.com',
        preview_url: undefined
      },
      {
        id: 'mock-5',
        name: 'Oude Maasweg',
        artist: 'Fleddy Melculy',
        album: 'Rebellious',
        image: '/api/placeholder/300/300',
        playedAt: new Date(Date.now() - 14400000).toISOString(),
        external_url: 'https://open.spotify.com',
        preview_url: undefined
      }
    ];
  }

  /**
   * Get current playing track (bonus feature)
   */
  async getCurrentTrack(): Promise<SpotifyTrack | null> {
    if (!this.hasValidCredentials()) {
      return null;
    }

    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (response.status === 204 || !response.ok) {
        // No track currently playing
        return null;
      }

      const data = await response.json();
      
      if (!data.item) {
        return null;
      }

      return {
        id: data.item.id,
        name: data.item.name,
        artist: data.item.artists.map((artist: { name: string }) => artist.name).join(', '),
        album: data.item.album.name,
        image: data.item.album.images[0]?.url || '/api/placeholder/300/300',
        playedAt: new Date().toISOString(),
        external_url: data.item.external_urls.spotify,
        preview_url: data.item.preview_url
      };

    } catch (error) {
      console.error('Failed to fetch current track:', error);
      return null;
    }
  }
}

export const spotifyService = new SpotifyService();
export type { SpotifyTrack };
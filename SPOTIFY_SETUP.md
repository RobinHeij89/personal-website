# Spotify API Setup voor Robin's Portfolio

## 🎵 Overzicht

De interests section toont nu je laatst afgespeelde muziek via de Spotify Web API. Deze guide helpt je om de API te configureren.

## 📋 Vereisten

1. **Spotify Account** - Premium of gratis
2. **Spotify Developer Account** - [Dashboard](https://developer.spotify.com/dashboard)

## 🔧 Setup Stappen

### 1. Spotify App Maken

1. Ga naar [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Klik "Create app"
3. Vul in:
   - **App name**: "Robin's Portfolio Website"
   - **App description**: "Personal website music integration"
   - **Website**: `http://localhost:5176` (voor development)
   - **Redirect URI**: `http://localhost:5176/callback`
   - **APIs used**: Web API

### 2. Credentials Verkrijgen

Na het maken van de app:

1. Kopieer de **Client ID**
2. Klik "Show client secret" en kopieer de **Client Secret**

### 3. Refresh Token Verkrijgen

Voor de **Refresh Token** heb je een eenmalige autorisatie nodig:

1. Ga naar deze URL (vervang `YOUR_CLIENT_ID`):
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:5176/callback&scope=user-read-recently-played,user-read-currently-playing
```

2. Log in en geef toestemming
3. Je wordt doorgestuurd naar `http://localhost:5176/callback?code=AUTHORIZATION_CODE`
4. Kopieer de `code` parameter uit de URL

5. Gebruik deze code om een refresh token te krijgen (vervang waarden):
```bash
curl -X POST "https://accounts.spotify.com/api/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic $(echo -n 'YOUR_CLIENT_ID:YOUR_CLIENT_SECRET' | base64)" \
  -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=http://localhost:5176/callback"
```

6. In de response vind je de `refresh_token` - bewaar deze!

### 4. Environment Variables

Voeg toe aan je `.env.local` bestand:

```env
VITE_SPOTIFY_CLIENT_ID=jouw_client_id_hier
VITE_SPOTIFY_CLIENT_SECRET=jouw_client_secret_hier
VITE_SPOTIFY_REFRESH_TOKEN=jouw_refresh_token_hier
```

## 🎯 Resultaat

Na configuratie toont je music card:

- ✅ **Currently Playing** - Live wat je nu luistert
- ✅ **Recently Played** - Laatste 6 tracks
- ✅ **Album Art** - Echte Spotify afbeeldingen
- ✅ **Clickable Links** - Direct naar Spotify
- ✅ **Auto Refresh** - Updates elke 30 seconden
- ✅ **Fallback** - Mock data als API faalt

## 🔒 Security Notes

- Client Secret wordt alleen gebruikt voor token refresh
- Refresh token heeft beperkte scope (alleen read access)
- Geen gebruikersdata wordt opgeslagen
- API calls gaan direct naar Spotify (geen proxy server)

## 🐛 Troubleshooting

### "API not configured" bericht?
- Check of alle environment variables zijn ingesteld
- Restart de development server na `.env.local` wijzigingen

### Token expired errors?
- De refresh token zou niet moeten verlopen
- Als het toch gebeurt, herhaal de autorisatie stappen

### CORS errors?
- Dit gebeurt niet omdat we server-side token refresh doen
- Client calls gaan naar Spotify's publieke API

## 🎉 Klaar!

Je music card toont nu je echte Spotify data! 🎵
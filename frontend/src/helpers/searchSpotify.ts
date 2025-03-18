import axios from "axios";

interface SpotifySearchResult {
  tracks: {
    items: any[];
  };
  artists: {
    items: any[];
  };
}

// Funktion för att söka efter låtar och artister på Spotify
async function searchSpotify(
  query: string,
  accessToken: string
): Promise<SpotifySearchResult> {
  const SPOTIFY_API_URL = "https://api.spotify.com/v1/search";

  try {
    // Gör API-anrop till Spotify
    const response = await axios.get(SPOTIFY_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: "track,artist",
        limit: 5, // Begränsa till 5 resultat per typ
      },
    });

    return {
      tracks: response.data.tracks,
      artists: response.data.artists,
    };
  } catch (error: any) {
    console.error("Error searching Spotify:", error.message);
    return {
      tracks: { items: [] },
      artists: { items: [] },
    };
  }
}

export default searchSpotify;

import ArtistCard from "@/components/ui/ArtistCard";
import useAccessStore from "@/store/store";
import { usePlayerStore } from "@/store/playerStore";
import axios from "axios";
import { release } from "os";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const ArtistId = () => {
  const [artist, setArtist] = useState();
  const location = useLocation();
  const path = location.pathname;
  const artistUri = path.startsWith("/artist/") ? path.substring(8) : null;
  const accessToken = useAccessStore().accessToken;
  const setTrack = usePlayerStore((state) => state.setTrack);
  console.log("accessToken:", accessToken);

  const handlePlayTrack = (uri: string) => {
    console.log("🎵 Clicked track URI from ArtistId:", uri);
    setTrack(uri); // Uppdatera Zustand-store
  };

  useEffect(() => {
    async function getTopTracks() {
      if (accessToken) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistUri}/top-tracks`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data.tracks);
          return response.data.tracks;
        } catch (error) {
          console.error("Error fetching top artists:", error);
          throw error; // Re-throw the error to be handled by the caller, if needed
        }
      }
    }
    async function getArtistInfo() {
      if (accessToken) {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistUri}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching top artists:", error);
          throw error; // Re-throw the error to be handled by the caller, if needed
        }
      }
    }
    async function updateArtist() {
      const artistInfo = await getArtistInfo();
      const topTracks = await getTopTracks();
      const combinedData = {
        name: artistInfo.name,
        popularity: artistInfo.popularity,
        external_urls: artistInfo.external_urls,
        image: artistInfo.images[0].url,
        topTracks: topTracks.map((track) => ({
          album: {
            image: track.album.images[0].url,
            name: track.album.name,
            release_date: track.album.release_date,
          },
          artists: {
            name: track.artists[0].name,
          },
          duration_ms: track.duration_ms,
          name: track.name,
          uri: track.uri,
        })),
      };
      if (combinedData) {
        setArtist(combinedData);
      }
    }
    updateArtist();
  }, [accessToken]);
  console.log("artist:", artist);
  return (
    <main>
      {artist && (
        <ArtistCard artist={artist} handlePlayTrack={handlePlayTrack} />
      )}
    </main>
  );
};

export default ArtistId;

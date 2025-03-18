import useAccessStore from "@/store/store";
import axios from "axios";
import SongList from "./SongList";
import { useState, useEffect } from "react";

interface Song {
  id: string;
  name: string;
  images: { url: string }[];
}

export default function SongListContainer() {
  const [songs, setSongs] = useState<Song[]>([]);
  const accessToken = useAccessStore().accessToken;

  useEffect(() => {
    async function getTopTracks() {
      if (!accessToken) return; // Prevents API call if token is missing

      try {
        console.log("Fetching top tracks...");
        const response = await axios.get<{ items: any[] }>(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Top Tracks Response:", response.data.items);
        const formattedSongs: Song[] = response.data.items.map((track) => ({
          id: track.id,
          name: track.name,
          images: track.album.images, // Extract images from album
        }));

        setSongs(formattedSongs);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    }

    getTopTracks();
  }, [accessToken]); // useEffect only runs when accessToken changes

  return (
    <div className="rounded-md border-4 border-black bg-colors-customGreen m-4 p-4 sm:w-full md:w-1/2 lg:w-1/3 h-[70vh] sm:h-[70vh] md:h-[70vh] lg:h-[60vh] overflow-y-auto">
      <h2 className="text-4xl font-bold mb-4 bg-colors-customGreen">
        Top Tracks
      </h2>
      <SongList songs={songs} />
    </div>
  );
}

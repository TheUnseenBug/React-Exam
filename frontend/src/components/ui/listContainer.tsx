import useAccessStore from "@/store/store";
import axios from "axios";
import ArtistList from "./ArtistList";
import { useState, useEffect } from "react";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

export default function ListContainer() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const accessToken = useAccessStore().accessToken;

  useEffect(() => {
    async function getTopArtists() {
      // const accessToken = useAccessStore().accessToken;
      if (accessToken) {
        try {
          const response = await axios.get<{ items: Artist[] }>(
            "https://api.spotify.com/v1/me/top/artists",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setArtists(response.data.items);
          // return response.data.items; // Optionally return the data
        } catch (error) {
          console.error("Error fetching top artists:", error);
          throw error; // Re-throw the error to be handled by the caller, if needed
        }
      }
    }

    getTopArtists();
  }, [accessToken]);

  return (
    <div className="rounded-md border-4 border-black bg-colors-customYellow m-4 p-4 sm:w-full  h-[70vh] sm:h-[70vh] md:h-[70vh] lg:h-[75vh] overflow-y-auto">
      <h2 className="text-4xl font-bold mb-4 bg-colors-customYellow">
        Top Artists
      </h2>
      <ArtistList artists={artists} />
    </div>
  );
}

// #EEBB36

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import searchSpotify from "../helpers/searchSpotify";
import useAccessStore from "@/store/store";
import SongList from "./ui/SongList";
import ArtistList from "./ui/ArtistList";

interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface SearchResults {
  tracks: {
    items: SpotifyTrack[];
  };
  artists: {
    items: SpotifyArtist[];
  };
}

export default function SearchBar() {
  // State för sökterm och sökresultat
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>({
    tracks: { items: [] },
    artists: { items: [] },
  });
  const accessToken = useAccessStore().accessToken;

  // Sök med fördröjning när användaren skriver
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      async function performSearch() {
        if (searchTerm && accessToken) {
          const results = await searchSpotify(searchTerm, accessToken);
          setSearchResults(results);
        } else {
          setSearchResults({ tracks: { items: [] }, artists: { items: [] } });
        }
      }

      performSearch();
    }, 500); // 500ms fördröjning

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, accessToken]);

  // Formatera sökresultaten för visning
  const formattedSongs = searchResults.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    images: track.album.images,
  }));

  const formattedArtists = searchResults.artists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    images: artist.images,
  }));

  return (
    <div className="w-full">
      <div className="flex justify-center w-full px-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder:text-white text-white mt-5 w-full sm:w-full md:w-[calc(100%-2rem)] lg:w-[calc(66.67%-2rem)]"
        />
      </div>

      {searchTerm && (
        <div className="p-2 flex align-middle justify-center flex-col md:flex-row lg:flex-row">
          <div className="rounded-md border-4 border-black bg-colors-customYellow m-4 p-4 sm:w-full md:w-1/2 lg:w-1/3 h-[100%] overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4 bg-colors-customYellow">
              Search Results: Artists
            </h2>
            <ArtistList artists={formattedArtists} />
          </div>

          <div className="rounded-md border-4 border-black bg-colors-customGreen m-4 p-4 sm:w-full md:w-1/2 lg:w-1/3 h-[100%] overflow-y-auto">
            <h2 className="text-4xl font-bold mb-4 bg-colors-customGreen">
              Search Results: Songs
            </h2>
            <SongList songs={formattedSongs} />
          </div>
        </div>
      )}
    </div>
  );
}

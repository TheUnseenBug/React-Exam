import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAccessStore from "@/store/store";
import axios from "axios";

interface Track {
  id: string;
  name: string;
  album: { images: { url: string }[] };
}

export default function ArtistPage() {
  const { id } = useParams(); // Get artist ID from URL
  const [artist, setArtist] = useState<{ name: string; image: string }>({ name: "", image: "" });
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const accessToken = useAccessStore().accessToken;

  useEffect(() => {
    async function fetchArtistData() {
      if (!accessToken || !id) return;

      try {
        // Fetch artist details
        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Fetch top tracks
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setArtist({
          name: artistResponse.data.name,
          image: artistResponse.data.images[0]?.url || "",
        });

        setTopTracks(tracksResponse.data.tracks);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    }

    fetchArtistData();
  }, [id, accessToken]);

  return (
    <div className="flex items-center flex-col">
      <section className="flex items-center gap-4">
        {artist.image && <img src={artist.image} className="w-28 h-28 border-4 border-black rounded-full" />}
        <h2 className="text-white font-bold text-5xl">{artist.name}</h2>
      </section>
      <h3 className="text-white font-bold text-3xl m-4">Top Songs</h3>
      <section className="rounded-md border-4 border-black bg-colors-customYellow m-2 p-4 w-3/4 self-center">
        <ul>
          {topTracks.length > 0 ? (
            topTracks.map((track) => (
              <li key={track.id} className="border-b-2 border-black p-2 flex items-center gap-4">
                {track.album.images.length > 0 && (
                  <img src={track.album.images[0].url} alt={track.name} className="w-12 h-12 rounded" />
                )}
                <p className="text-lg">{track.name}</p>
              </li>
            ))
          ) : (
            <p>No top tracks available.</p>
          )}
        </ul>
      </section>
    </div>
  );
}


// import yellow from "../images/yellow-dog.jpg";


// export default function ArtistPage() {
//     return (
//         <div className="flex items-center flex-col">
//             <section className="flex items-center gap-4">
//                 <img src={yellow} className="w-28 h-28 border-4 border-black rounded-full"></img>
//                 <h2 className="text-white font-bold text-5xl">Artist Name</h2>
//             </section>
//             <h3 className="text-white font-bold text-3xl m-4">Top Songs</h3>
//             <section className="rounded-md border-4 border-black bg-colors-customYellow m-2 p-4 w-3/4 self-center">

//             </section>
//         </div>
//     )
// }
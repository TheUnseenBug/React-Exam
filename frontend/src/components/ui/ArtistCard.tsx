import { FC } from "react";
import PlayerComponent from "../PlayerComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import timeConverter from "@/helpers/timeConverter";
import { usePlayerStore } from "@/store/playerStore";

type Props = {
  artist: {
    name: string;
    popularity: number;
    external_urls: string;
    image: string;
    topTracks: {
      album: {
        image: string;
        name: string;
        release_date: string;
      };
      artists: { name: string }[];
      duration_ms: number;
      name: string;
      uri: string;
    }[];
  };
  handlePlayTrack: (uri: string) => void; // 🔹 Ta emot funktionen som en prop
};

const ArtistCard: FC<Props> = ({ artist, handlePlayTrack }) => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <section className="max-w-4xl m-auto">
      <Card>
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
          <CardDescription>Popularity: {artist.popularity}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <img src={artist.image} alt="artist image" />
        </CardContent>

        <CardContent>
          <article className="grid md:grid-cols-4 grid-cols-2 gap-3 justify-center items-center">
            {artist.topTracks.map((track) => (
              <Card
                onClick={() => {
                  console.log("play");
                  handlePlayTrack(track.uri);
                  console.log(isPlaying);
                  togglePlay(true);
                  console.log(isPlaying);
                }}
                className=" cursor-pointer hover:bg-white/60 hover:text-blue-500"
              >
                <CardHeader>
                  <CardTitle>{track.name}</CardTitle>
                  <img src={track.album.image} alt="Album image" />
                </CardHeader>
                <CardContent className="text-xs">
                  <CardDescription className="font-semibold text-sm">
                    Artist: {track.artists.name}
                  </CardDescription>
                  <CardDescription className="">
                    Album: {track.album.name}
                  </CardDescription>
                  <CardDescription>
                    Release Date: {track.album.release_date}
                  </CardDescription>
                  <CardDescription>
                    Duration: {timeConverter(track.duration_ms)}
                  </CardDescription>
                </CardContent>
                <CardDescription>
                  <a href={track.uri}>Listen on Spotify</a>
                </CardDescription>
              </Card>
            ))}
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistCard;

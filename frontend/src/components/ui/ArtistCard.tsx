import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import timeConverter from "@/helpers/timeConverter";
import { usePlayerStore } from "@/store/playerStore";
import { Artist, Track } from "@/types";

type Props = {
  artist: Artist;
  handlePlayTrack: (track: Track) => void; // 🔹 Ta emot funktionen som en prop
};

const ArtistCard: FC<Props> = ({ artist, handlePlayTrack }) => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  return (
    <section className="max-w-4xl m-auto ">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
          <CardDescription>Popularity: {artist.popularity}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <img
            className="h-2/3 rounded-lg"
            src={artist.image}
            alt="artist image"
          />
        </CardContent>

        <CardContent className="h-full">
          <article className="grid md:grid-cols-4 grid-cols-2 gap-3 justify-center items-center">
            {artist?.topTracks?.map((track) => (
              <Card
                onClick={() => {
                  handlePlayTrack(track);
                  togglePlay(true);
                }}
                className=" cursor-pointer hover:bg-white/60 h-full hover:text-blue-500"
              >
                <CardHeader>
                  <CardTitle>{track.name}</CardTitle>
                  <img
                    className="rounded-lg h-2/3"
                    src={track.album.image}
                    alt="Album image"
                  />
                </CardHeader>
                <CardContent className="text-xs">
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
              </Card>
            ))}
          </article>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistCard;

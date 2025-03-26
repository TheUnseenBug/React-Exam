import { Track } from "@/types";
import SongItem from "../ui/SongItem";

export default function SongList(tracks: Track[]) {
  return (
    <ul className="mt-4">
      {tracks.length > 0 ? (
        tracks.map((track) => <SongItem key={track.name} track={track} />)
      ) : (
        <p className="bg-colors-customPink rounded-md border-4 border-black p-4">
          No tracks found.
        </p>
      )}
    </ul>
  );
}

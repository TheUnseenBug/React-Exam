import { FC } from "react";
import { usePlayerStore } from "@/store/playerStore";
import { Track } from "@/types";

interface SongItemProps {
  track: Track;
}

const SongItem: FC<SongItemProps> = ({ track }) => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const setTrack = usePlayerStore((state) => state.setTrack);

  return (
    <li
      className="flex items-center gap-4 p-2 m-2 border-4 border-black rounded-md cursor-pointer bg-colors-customPink hover:bg-colors-customBlue"
      onClick={() => {
        setTrack(track);
        togglePlay(true);
      }}
    >
      {track.album?.image ? (
        <img
          src={track.album.image}
          alt={track.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
          <span className="text-neutral-400">♪</span>
        </div>
      )}
      <p className="font-semibold">{track.name}</p>
    </li>
  );
};

export default SongItem;

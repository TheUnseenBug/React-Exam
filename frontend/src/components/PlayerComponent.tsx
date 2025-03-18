import { usePlayerStore } from "@/store/playerStore";

import { Slider } from "@radix-ui/react-slider";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "./ui/PlayerButtons";
import timeConverter from "@/helpers/timeConverter";
import { useSpotifyPlayer } from "@/helpers/SpotifyPlayer";

const PlayerComponent = () => {
  const { isPlaying, togglePlay, track } = usePlayerStore();
  const player = useSpotifyPlayer();

  const handlePlayPause = async () => {
    if (!player) return;
    console.log(isPlaying);
    if (isPlaying) {
      player.pause();
      togglePlay(false);
    } else {
      player.resume();
      togglePlay(true);
    }
  };

  return (
    <div className="player-container p-2 flex justify-center rounded-md border-4 border-black bg-yellow-400 fixed w-full bottom-0 h-[20vh]">
      {track ? (
        <div className="flex items-stretch  gap-3 self-center bg-colors-customYellow border-4 border-black rounded-md p-4 w-full">
          <img
            src={track.album.image}
            alt="Album Cover"
            className="rounded-md border-4 border-black w-1/3 self-center object-cover"
          />
          <div className="rounded-md border-4 border-black w-2/3 p-2 bg-colors-customPink text-left">
            <h2 className="text-3xl text-strong">{track.name}</h2>
            {/* <h3 className="text-2xl">
              {track.artists.map((artist) => artist.name).join(", ")}
            </h3> */}
            <p>{track.album.name}</p>
            <Slider
              min={0}
              max={track.duration_ms}
              defaultValue={[1]}
              step={1}
              className="w-full"
              aria-label="Volume"
            />
            <div className="flex gap-3 justify-center">
              <PreviousButton onClick={() => player?.previousTrack()} />
              {isPlaying ? (
                <PauseButton onClick={() => handlePlayPause()} />
              ) : (
                <PlayButton onClick={() => handlePlayPause()} />
              )}
              <NextButton onClick={() => player?.nextTrack()} />
            </div>
          </div>
        </div>
      ) : (
        <p>No song is playing...</p>
      )}
    </div>
  );
};

export default PlayerComponent;

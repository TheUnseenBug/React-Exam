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
import { Volume2 } from "lucide-react";
import { useState } from "react";
const PlayerComponent = () => {
  const { isPlaying, togglePlay, track } = usePlayerStore();
  const player = useSpotifyPlayer();
  const [volume, setVolume] = useState(70);

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

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    if (player) {
      player.setVolume(newVolume[0] / 100);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 w-screen bg-yellow-400 border-neutral-800 h-20">
      {track ? (
        <div className="max-w-screen-xl mx-auto h-full flex items-center">
          {/* Left: Track info */}
          <div className="flex items-center w-1/3">
            <img
              src={track.album.image}
              alt="Album Cover"
              className="h-14 w-14 object-cover mr-4"
            />
            <div className="flex flex-col">
              <p className="text-blue-500 font-medium truncate ">
                {track.name}
              </p>
              <p className="text-blue-500 text-sm truncate text-left">
                {track.album.name}
              </p>
            </div>
          </div>

          {/* Center: Player controls */}
          <div className="flex flex-col items-center w-1/3">
            <div className="flex items-center space-x-4">
              <PreviousButton onClick={() => player?.previousTrack()} />
              {isPlaying ? (
                <PauseButton onClick={() => handlePlayPause()} />
              ) : (
                <PlayButton onClick={() => handlePlayPause()} />
              )}
              <NextButton onClick={() => player?.nextTrack()} />
            </div>
            <div className="w-full mt-2">
              <Slider
                min={0}
                max={track.duration_ms}
                defaultValue={[1]}
                step={1}
                className="w-full"
                aria-label="Progress"
              />
            </div>
          </div>

          {/* Right: Volume control */}
          <div className="flex items-center justify-end w-1/3">
            <Volume2 size={20} className="text-black mr-2" />
            <div className="w-32">
              <Slider
                min={0}
                max={100}
                value={[volume]}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-full"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 h-20 px-4 flex items-center justify-center">
          <p className="text-neutral-400">No song is playing...</p>
        </div>
      )}
    </div>
  );
};

export default PlayerComponent;

/*
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
        </h3> *}
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
*/

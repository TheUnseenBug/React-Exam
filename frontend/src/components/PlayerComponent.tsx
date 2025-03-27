import { usePlayerStore } from "@/store/playerStore";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "./ui/PlayerButtons";
import { useSpotifyPlayer } from "@/helpers/SpotifyPlayer";
import { Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CustomSlider from "./ui/CustomSlider";
import DeviceMenu from "./ui/DeviceMenu";

const PlayerComponent = () => {
  const { isPlaying, togglePlay, track } = usePlayerStore();
  const player = useSpotifyPlayer();
  const [volume, setVolume] = useState(20);
  const [progress, setProgress] = useState(0);
  const accessToken = localStorage.getItem("spotify_access_token");
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = async () => {
      if (player) {
        const state = await player.getCurrentState();
        if (state) {
          setProgress(state.position);
        }
      }
    };

    if (isPlaying && track) {
      updateProgress(); // Initial update
      intervalRef.current = window.setInterval(updateProgress, 1000);
    } else if (!isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, track, player]);

  useEffect(() => {
    // Reset progress only when a new track starts
    if (track) {
      setProgress(0);
    }
  }, [track]);

  const handlePlayPause = async () => {
    if (!player) return;
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

  const handleDeviceSelect = async (deviceId: string) => {
    if (!player) return;

    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/transfer",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_ids: [deviceId],
            play: isPlaying,
          }),
        }
      );

      if (!response.ok) {
        console.error(
          "Transfer failed:",
          response.status,
          await response.text()
        );
        const fallbackResponse = await fetch(
          `https://api.spotify.com/v1/me/player`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              device_ids: [deviceId],
            }),
          }
        );

        if (!fallbackResponse.ok) {
          console.error(
            "Fallback failed:",
            fallbackResponse.status,
            await fallbackResponse.text()
          );
        }
      }
    } catch (error) {
      console.error("Error transferring playback:", error);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="sticky bottom-0 right-0 left-0 w-full bg-blue-500 border-neutral-800 h-20">
      {track ? (
        <div className="max-w-screen-2xl mx-auto h-full flex items-center">
          {/* Left: Track info */}
          <div className="flex items-center w-1/3 lg:px-4 px-2 text-xs lg:text-md overflow-hidden">
            <img
              src={track.album.image}
              alt="Album Cover"
              className="md:h-14 md:w-14 object-cover w-7 h-7 rounded-lg"
            />
            <div className="flex flex-col px-2 overflow-hidden">
              <p className="text-yellow-100 font-semibold truncate text-left">
                {track.name}
              </p>
              <p className="text-yellow-100 truncate text-left">
                {track.album.name}
              </p>
            </div>
          </div>

          {/* Center: Player controls */}
          <div className="flex flex-col items-center md:w-4/6 w-2/3 px-4">
            <div className="flex items-center space-x-4">
              <PreviousButton
                size="sm"
                onClick={() => player?.previousTrack()}
              />
              {isPlaying ? (
                <PauseButton size="sm" onClick={() => handlePlayPause()} />
              ) : (
                <PlayButton size="sm" onClick={() => handlePlayPause()} />
              )}
              <NextButton size="sm" onClick={() => player?.nextTrack()} />
            </div>

            {/* Timer bar */}
            <div className="w-full mt-2 flex items-center overflow-hidden">
              <span className="text-xs text-yellow-100 mr-2 w-10 text-right whitespace-nowrap">
                {formatTime(progress)}
              </span>
              <div className="flex-1 min-w-0">
                <CustomSlider
                  min={0}
                  max={track.duration_ms}
                  value={progress}
                  onChange={(value) => {
                    setProgress(value);
                    player?.seek(progress);
                  }}
                  className="w-full"
                />
              </div>
              <span className="text-xs text-yellow-100 ml-2 w-10 whitespace-nowrap">
                {formatTime(track.duration_ms)}
              </span>
            </div>
          </div>

          {/* Right: Volume control */}
          <div className="flex items-center justify-center w-1/3 px-4 overflow-hidden">
            <DeviceMenu onDeviceSelect={handleDeviceSelect} />
            <Volume2 size={20} className="text-white mx-2" />
            <div className="w-32">
              <CustomSlider
                min={0}
                max={100}
                value={volume}
                onChange={(value) => handleVolumeChange([value])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 h-20 px-4 flex items-center justify-center">
          <p className="text-neutral-400">No song is playing...</p>
        </div>
      )}
    </div>
  );
};

export default PlayerComponent;

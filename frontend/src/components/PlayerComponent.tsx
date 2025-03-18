import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/playerStore";
import useAccessStore from "@/store/store.ts";
import axios from "axios";
import { Slider } from "@radix-ui/react-slider";
import {
  PreviousButton,
  PlayButton,
  PauseButton,
  NextButton,
} from "./ui/PlayerButtons";
import { Track } from "@/types";
import timeConverter from "@/helpers/timeConverter";

const PlayerComponent = () => {
  const { accessToken } = useAccessStore();
  const { trackUri, isPlaying, deviceId, setDeviceId, togglePlay } =
    usePlayerStore();
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [value, setValue] = useState<number>(0);

  // 🔹 Lägg till denna för att se när `trackUri` ändras
  useEffect(() => {
    //startar automatiskt låt
    console.log("🎵 Current track URI from Zustand:", trackUri);
    try {
      axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {
          uris: [trackUri], // Spotify track URIs to play (array)
          device_id: deviceId, // Optional: Specify the device to play on
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Playback started successfully.");
    } catch (error) {
      console.error("Error starting playback:", error);
    }
  }, [trackUri]); // Logga varje gång `trackUri` ändras

  useEffect(() => {
    if (!accessToken) return;

    console.log("Initializing Spotify Web Playback SDK...");

    if (window.Spotify) {
      initializePlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onload = () => initializePlayer();
    document.body.appendChild(script);
  }, [accessToken]);

  const initializePlayer = () => {
    console.log("Spotify Web Playback SDK Ready!");

    const spotifyPlayer = new window.Spotify.Player({
      name: "Dennis Spotify",
      getOAuthToken: (cb) => cb(accessToken),
      volume: 0.2,
    });

    setPlayer(spotifyPlayer);

    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("✅ Spotify Player is ready with Device ID:", device_id);
      setDeviceId(device_id);
      axios.put(
        "https://api.spotify.com/v1/me/player",
        {
          device_ids: [device_id],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    });

    spotifyPlayer.addListener("player_state_changed", (state) => {
      if (!state) return;
      console.log("🎵 Now Playing:", state.track_window.current_track);
      setCurrentTrack(state.track_window.current_track);
    });

    spotifyPlayer.connect().then((success) => {
      if (success) {
        console.log("✅ Spotify Player connected!");
      } else {
        console.error("❌ Failed to connect to Spotify Player");
      }
    });
  };

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
      {currentTrack ? (
        <div className="flex items-stretch  gap-3 self-center bg-colors-customYellow border-4 border-black rounded-md p-4 w-full">
          <img
            src={currentTrack.album.images[0]?.url}
            alt="Album Cover"
            className="rounded-md border-4 border-black w-1/3 self-center object-cover"
          />
          <div className="rounded-md border-4 border-black w-2/3 p-2 bg-colors-customPink text-left">
            <h2 className="text-3xl text-strong">{currentTrack.name}</h2>
            <h3 className="text-2xl">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </h3>
            <p>{currentTrack.album.name}</p>
            <Slider
              min={0}
              max={currentTrack.duration_ms}
              defaultValue={[1]}
              step={1}
              className="w-full"
              aria-label="Volume"
            />
            {/*
            <div className="flex items-center space-x-2">
              <label
                htmlFor="volume"
                className="text-sm font-medium text-gray-700"
              >
                Volume:
              </label>
              <input
                type="range"
                id="volume"
                min={0}
                max={timeConverter(currentTrack.duration_ms)}
                value={value}
                step={1}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">{value}</span>
            </div>
            */}
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

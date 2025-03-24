import { usePlayerStore } from "@/store/playerStore";
import useAccessStore from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";

export const useSpotifyPlayer = () => {
  const { accessToken } = useAccessStore();
  const { track, deviceId, setDeviceId } = usePlayerStore();
  const [player, setPlayer] = useState<Spotify.Player>();
  useEffect(() => {
    if (track) {
      console.log("track:", track);
      try {
        axios.put(
          "https://api.spotify.com/v1/me/player/play",
          {
            uris: [track.uri],
            device_id: deviceId,
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
    }
  }, [accessToken, deviceId, track]);

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

    spotifyPlayer.connect().then((success) => {
      if (success) {
        console.log("✅ Spotify Player connected!");
      } else {
        console.error("❌ Failed to connect to Spotify Player");
      }
    });
  };

  return player;
};

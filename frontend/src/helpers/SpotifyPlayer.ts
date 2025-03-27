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
    if (!accessToken) {
      console.log("No access token available");
      return;
    }

    let mounted = true;
    console.log("Initializing Spotify Web Playback SDK...");

    const initializePlayer = async () => {
      try {
        console.log("Spotify Web Playback SDK Ready!");

        const spotifyPlayer = new window.Spotify.Player({
          name: "Dennis Spotify",
          getOAuthToken: (cb) => cb(accessToken),
          volume: 0.02,
        });

        // Add error listeners first
        spotifyPlayer.addListener("initialization_error", ({ message }) => {
          console.error("Failed to initialize:", message);
        });

        spotifyPlayer.addListener("authentication_error", ({ message }) => {
          console.error("Failed to authenticate:", message);
        });

        spotifyPlayer.addListener("account_error", ({ message }) => {
          console.error("Failed to validate Spotify account:", message);
        });

        spotifyPlayer.addListener("playback_error", ({ message }) => {
          console.error("Failed to perform playback:", message);
        });

        // Only set the player if the component is still mounted
        if (mounted) {
          setPlayer(spotifyPlayer);
        }

        spotifyPlayer.addListener("ready", ({ device_id }) => {
          console.log("✅ Spotify Player is ready with Device ID:", device_id);
          if (mounted) {
            setDeviceId(device_id);
            // Try to set active device
            try {
              axios.put(
                "https://api.spotify.com/v1/me/player",
                {
                  device_ids: [device_id],
                  play: false,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
            } catch (error) {
              console.error("Failed to set active device:", error);
            }
          }
        });

        // Connect and handle the promise
        const success = await spotifyPlayer.connect();
        if (success) {
          console.log("✅ Spotify Player connected!");
        } else {
          throw new Error("Failed to connect to Spotify Player");
        }
      } catch (error) {
        console.error("❌ Error during player initialization:", error);
      }
    };

    if (window.Spotify) {
      initializePlayer();
    } else {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      script.onload = () => {
        // Wait a brief moment after script loads before initializing
        setTimeout(initializePlayer, 1000);
      };

      script.onerror = (error) => {
        console.error("Failed to load Spotify SDK:", error);
      };

      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      mounted = false;
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken]);

  return player;
};

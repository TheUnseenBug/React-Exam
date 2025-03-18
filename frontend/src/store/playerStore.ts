import { Track } from "@/types";
import { create } from "zustand";
interface PlayerState {
  track: Track | undefined;
  isPlaying: boolean;
  deviceId: string | null;
  setTrack: (track: Track) => void;
  setDeviceId: (id: string) => void;
  togglePlay: (boolean: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  track: undefined,
  isPlaying: false,
  deviceId: null,
  setTrack: (track) => set({ track: track, isPlaying: true }),
  setDeviceId: (id) => set({ deviceId: id }),
  togglePlay: (boolean: boolean) => set(() => ({ isPlaying: boolean })),
}));

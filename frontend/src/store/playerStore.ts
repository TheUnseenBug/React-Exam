import { create } from "zustand";

interface PlayerState {
  trackUri: string | null;
  isPlaying: boolean;
  deviceId: string | null;
  setTrack: (uri: string) => void;
  setDeviceId: (id: string) => void;
  togglePlay: (boolean: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  trackUri: null,
  isPlaying: false,
  deviceId: null,
  setTrack: (uri) => set({ trackUri: uri, isPlaying: true }),
  setDeviceId: (id) => set({ deviceId: id }),
  togglePlay: (boolean: boolean) => set(() => ({ isPlaying: boolean })),
}));

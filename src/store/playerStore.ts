import type { CurrentMusicInterface } from "@/models/currentMusic";
import { create } from "zustand";

interface PlayerStore {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  currentMusic: CurrentMusicInterface;
  setCurrentMusic: (currentMusic: CurrentMusicInterface) => void;
  volume: number;
  setVolume: (value: number) => void;
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  currentMusic: { playlist: null, song: null, songs: [] },
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  volume: 0.50,
  setVolume: (volume) => set({ volume }),
}));

import type { CurrentMusicInterface } from '@/models/currentMusic';
import { create } from 'zustand'


type PlayerStore = {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  currentMusic: CurrentMusicInterface;
  setCurrentMusic: (currentMusic: CurrentMusicInterface) => void;
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  currentMusic: { playlist: null, song: null, songs: [] },
  setCurrentMusic: (currentMusic) => set({ currentMusic })
}))

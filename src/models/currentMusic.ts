import type {  Song } from "@/lib/data";
import { colors } from "@/lib/colors";

interface Playlist {
    id: string;
    albumId?: number;
    title?: string;
    color?: (typeof colors)[keyof typeof colors];
    cover?: string;
    artists?: string[];
  }

export interface CurrentMusicInterface {
    playlist: Playlist | null;
    song?: Song | null;
    songs?: Song[];

}
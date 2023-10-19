import { PauseIcon } from "@/icons/PauseIcon"
import { PlayIcon } from "@/icons/PlayIcon"
import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef, useState } from "react"
import { CurrentSong } from "./CurrentSong"





export const Player = () => {
    const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
    const audioRef = useRef()

    useEffect(() => {
        isPlaying 
        ? audioRef.current.play() 
        : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        const {song, playlist, songs} = currentMusic;
        if (song) {
            const src =`/music/${playlist?.id}/0${song.id}.mp3`;
            audioRef.current.src = src;
            audioRef.current.play();
        }
    }, [currentMusic])

    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                <CurrentSong currentMusic={currentMusic} />
            </div>
            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                </div>
            </div>
            <div className="grid place-content-center">
                Volumen
            </div>

            <audio ref={audioRef}></audio>
        </div>
    )
}

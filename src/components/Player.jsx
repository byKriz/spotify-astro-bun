import { PauseIcon } from "@/icons/PauseIcon"
import { PlayIcon } from "@/icons/PlayIcon"
import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef, useState } from "react"





export const Player = () => {
    // const [isPlaying, setIsPlaying] = useState(false);
    const {currentMusic, isPlaying, setIsPlaying, setCurrentMusic} = usePlayerStore(state => state)
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef()
    // console.log({isPlaying});

    useEffect(() => {
        audioRef.current.src = `/music/1/01.mp3`
    }, [])

    const handleClick = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
            audioRef.current.volume = 0.1
        }

        setIsPlaying(!isPlaying)

    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                Current Song...
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

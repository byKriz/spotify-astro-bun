import type { CurrentMusicInterface } from "@/models/currentMusic"

interface Props {
    currentMusic: CurrentMusicInterface
}

export const CurrentSong = ({ currentMusic }: Props) => {

    // const { title, image } = currentMusic.song as Song

    return (
        <div className={`flex items-center gap-5 relative overflow-hidden`}>
            <picture className="w-16 h-16 bg-zinc-600 rounded-md shadow-lg overflow-hidden">
                <img src={currentMusic.song?.image} alt={currentMusic.song?.title} />
            </picture>
            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block">{currentMusic.song?.title}</h3>
                <span className="text-xs opacity-80">{currentMusic.song?.artists.join(', ')}</span>    
            </div>
        </div>
    )

}

import { usePlayerStore } from '@/store/playerStore'
import { PauseIcon } from '@/icons/PauseIcon'
import { PlayIcon } from '@/icons/PlayIcon'
import type { Playlist, Song } from '@/lib/data'

interface Props {
  id: string
}

interface SelectPlaylistInterface {
  playlist: Playlist
  songs: Song[]
}


export const CardPlayButton = ({ id }: Props) => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }
    

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then<SelectPlaylistInterface>(res => res.json())
      .then(data =>{
        const {playlist, songs} = data

        setIsPlaying(true)
        setCurrentMusic({songs, playlist, song: songs[0]})

        console.log({songs, playlist});
        
      })


    // setCurrentMusic({
    //   playList: { id }
    // })
    // setIsPlaying(!isPlaying)
  }


  return (
    <button onClick={handleClick} className='card-play-button bg-green-500 rounded-full p-3 text-3xl hover:scale-105 hover:bg-green-400'>
      {!isPlayingPlaylist ? <PlayIcon /> : <PauseIcon />}
    </button>
  )
}

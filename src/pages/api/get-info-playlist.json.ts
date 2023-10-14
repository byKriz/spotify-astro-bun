import { allPlaylists, songs as allSongs } from "@/lib/data"
import type { Playlist, Song } from "@/lib/data"

interface GetMusicInterface {
    params: Response
    request: Request
}


export async function GET({params, request}: GetMusicInterface) {
    // get id from the url search params
    const {url} = request
    const urlObject = new URL(url)
    const id = urlObject.searchParams.get('id')

    const playlist = allPlaylists.find((playlist : Playlist) => playlist.id === id)
    const songs = allSongs.filter((song: Song) => song.albumId === playlist?.albumId)

    return new Response(JSON.stringify({playlist, songs}))
}
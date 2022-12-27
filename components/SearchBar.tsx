import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import TopTracksContainer from './TopTracks'
// import {TrackSearchResponse} from 'types/spotify-api';


const SearchBar = () => {
    const { data: session, status} = useSession()
    const spotifyApi = useSpotify();
    const [tracks, setTracks] = useState<SpotifyApi.TrackSearchResponse>()
    const [query, setQuery] = useState('')


    function searchRequest(e: React.MouseEvent<HTMLInputElement>) {
        // console.log("here")
        e.preventDefault()
        if(spotifyApi.getAccessToken()){
          spotifyApi.searchTracks(`artist:${query}`).then((data: SpotifyApi.TrackSearchResponse) => setTracks(data)).catch((err: unknown)=> {
            console.log('Something went wrong: Tracks', err)
          })
        }
      }

    return (
        <div className=''>
          <form className='flex justify-center'>
            <label className='text-white mr-5'>Search Artist</label>
            <input className='mr-10 pl-2' onChange={(e) => setQuery(e.target.value)}/>
            <input className='text-white' type="submit" onClick={(e) => searchRequest(e)}/>
          </form>
          <div className='mt-16 m-8 ml-32'>
            {query.length > 0 ? <TopTracksContainer topTracks={tracks?.body.tracks.items}/> : null}
          </div>
       </div>
    )
}

export default SearchBar
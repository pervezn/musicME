import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import SearchCard from './SearchCard'


const SearchBar = () => {
    const { data: session, status} = useSession()
    const spotifyApi = useSpotify();
    const [tracks, setTracks] = useState<any | undefined>()
    const [query, setQuery] = useState('')


    function searchRequest(e: React.MouseEvent<HTMLInputElement>) {
        // console.log("here")
        e.preventDefault()
        if(spotifyApi.getAccessToken()){
          spotifyApi.searchTracks(`artist:${query}`).then((data: any) => setTracks(data.body.tracks.items)).catch((err:any)=> {
            console.log('Something went wrong: Tracks', err)
          })
        }
      }

    return (
        <div>
        <form>
        <label style={{margin: '15px'}}>Search Artist</label>
        <input style={{margin: '15px'}} onChange={(e) => setQuery(e.target.value)}/>
        <input style={{margin: '15px'}} type="submit" onClick={(e) => searchRequest(e)}/>
      </form>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        { 
          tracks?.map((item: any, key: any) => <SearchCard key={key} 
                                                                    imgHref={item.album.images[2].url} 
                                                                    albumName={item.album.name} 
                                                                    songName={item.name} />
          )
        } 
      </div>
        </div>
    )
}

export default SearchBar
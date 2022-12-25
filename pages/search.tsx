import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import Layout from '../components/Layout'
import TopTracksContainer from '../components/TopTracks'
import SearchBar from '../components/SearchBar'


const Search = () => {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession()
    const [songs, setSongs] = useState()

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getMySavedTracks({
                limit : 50,
                offset: 1
              }).then(function(data:any) {
                console.log("LIKED SONGS: ", data.body.items);
                setSongs(data.body.items)
              }, function(err: any) {
                console.log('Something went wrong!', err);
              });
        }
       }, [session, spotifyApi])

    return (
        <Layout>
            <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold text-white'>Search</h1>
            <SearchBar />
        </Layout>
    )
}

export default Search

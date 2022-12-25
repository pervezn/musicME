import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import Layout from '../components/Layout'
import moment from "moment"


const LikedSongs = () => {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession()
    const [songs, setSongs] = useState()

    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getMySavedTracks({
                limit : 50,
                offset: 1
              }).then(function(data:any) {
                // console.log("LIKED SONGS: ", data.body.items);
                setSongs(data.body.items)
              }, function(err: any) {
                console.log('Something went wrong!', err);
              });
        }
       }, [session, spotifyApi])

    return (
        <Layout>
            <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold text-white'>Liked Songs</h1>
            <LikedSongsContainer tracks={songs} />
        </Layout>
    )
}

export default LikedSongs

const LikedSongsContainer = (props:any) => {
    const { tracks } = props
    const {data: session } = useSession();
    // const topTracks = useRecoilValue(topTrackState)
    // console.log("topTracks ", topTracks)
    return (
        <div className='m-8 ml-16'>
            <div className='text-gray-500 flex'>
                <div className='flex items-center basis-1/3'>
                    <p className='pl-5 '>#</p>
                    <p className='pl-20'>TITLE</p>

                </div>
                <p className='pl-40 basis-1/2'>ARTIST</p>
                <p className='pl-20 basis-1/2'>ALBUM</p>
                <p className='pl-20 basis-1/2'>DATE ADDED</p>
            </div>
            <div className='text-white'> 
            {tracks ? tracks.map((track: any, i: number) => <LikedSongsCard order={i + 1} key={track.track.id} track={track}/>) : null}
            </div>
        </div>
        
    )
}


const LikedSongsCard = (props: any) => {
    const {order, track} = props

    return (
        <div className='flex text-white items-center'> 
            <div className='flex items-center basis-1/2'>
                <p  className='p-5 '>{order}</p>
                <img  className='p-5 pr-0' src={track.track.album.images[2].url } alt={track.track.name}/>
                <p className='p-5'>{track.track.name}</p>

            </div>
            <a className='p-5 basis-1/2' href={`/artists/${track.track.artists[0].name}?q=${track.track.artists[0].id}`}>{track.track.artists[0].name}</a>
            <a className='p-5  basis-1/2' href={`/albums/${track.track.album.name}?q=${track.track.album.id}`}>{track.track.album.name}</a>
            <p className='p-5 basis-1/2'>{moment(`${track.added_at}`).utc().format('MM-DD-YYYY')}</p>
        </div>
    )
}




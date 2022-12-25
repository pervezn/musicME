import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import Layout from '../../components/Layout'
import { ClockIcon } from "@heroicons/react/24/outline";
// import TopTracksContainer from '../../components/TopTracks'

const AlbumDetails = () => {
    const router = useRouter();
    const albumName = router.query.album 
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession()
    // console.log('&&&&&&&&&&: ', router.query)
    const artistName = router.query.artist 
    const id = router.query.q

    const [album, setAlbum] = useState()


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            spotifyApi.getAlbum(id)
            .then(function(data: any) {
                // console.log('Album information', data.body);
                setAlbum(data.body)
            }, function(err: any) {
                console.error(err);
            });

        }
       }, [session, spotifyApi, id])


        // console.log('%%%%%%%%%%: ', album.tracks.items)
    return (
        <Layout>
           <AlbumHeader album={album}/>
           <AlbumContainer album={album} />
        </Layout>
    )
} 

export default AlbumDetails

const AlbumHeader = (props: any) => {
    const { album } = props

    function displayArtists() {
        let artists: string[] = []
        album.artists.map((artist:any) => {
            artists.push(artist.name)
        })
        let str = artists.join(', ')
        let artistString = `Artists: ${str}`
        return artistString
    }

    return (
        <div >
            {
                album ?
                <div>
                    <div className='flex items-end'> 
                        <img className='h-60' src={album.images[0].url} alt={album.name}/>
                        <div className='ml-5' >
                            <h1 className='mt-5 font-bold text-white text-2xl md:text-3xl xl:text-5xl'>{album.name}</h1>
                            <p className='text-white text-sm'>{displayArtists()}</p>
                        </div>   
                    </div>
                    
                </div>
                
                : null
            }
        </div>
    )
}


const AlbumContainer = (props:any) => {
    const { album } = props

    return (
        <div className='m-8 ml-16'>
            <div className='text-gray-500 flex'>
                <p className='pl-5 '>#</p>
                <p className='pl-20'>TRACK</p>
                <p className='pl-40'>ARTISTS</p>
                <div className='pl-40'><ClockIcon className='h-5 w-5'/></div>
            </div>
            <div className='text-white'> 
                {album ? album.tracks.items.map((track: any) => <AlbumTracksCard order={track.track_number} key={track.id} track={track}/>) : null}
            </div>
        </div>
        
    )
}


const AlbumTracksCard = (props: any) => {
    const {order, track} = props
    const router = useRouter();
    // console.log('^^^^^^^^^^^^^ ',track)
    
    function millisToMinutesAndSeconds(millis: number) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <div className='flex text-white'> 
            <p  className='p-5  flex items-center  '>{order}</p>
            <p className='p-5 flex  items-center '>{track.name}</p>
            <a className='p-5 flex  items-center' href={`/artists/${track.artists[0].name}?q=${track.artists[0].id}`}>{track.artists[0].name}</a>
            <p className='p-5 flex  items-center '>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        </div>
    )
}



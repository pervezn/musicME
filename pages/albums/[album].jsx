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
            .then(function(data) {
                // console.log('Album information', data.body);
                setAlbum(data.body)
            }, function(err) {
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

const AlbumHeader = (props) => {
    const { album } = props

    function displayArtists() {
        let artists = []
        album.artists.map((artist) => {
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


const AlbumContainer = (props) => {
    const { album } = props

    return (
        <div className='m-8 ml-16'>
            <div className='text-gray-500 flex'>
                <div className='flex items-center basis-1/3'>
                    <p className='pl-5 '>#</p>
                    <p className='pl-20'>TRACK</p>
                </div>
                <p className='pl-40 basis-1/2'>ARTISTS</p>
                <div className='pl-40 basis-1/2'><ClockIcon className='h-5 w-5'/></div>
            </div>
            <div className='text-white'> 
                {album ? album.tracks.items.map((track) => <AlbumTracksCard order={track.track_number} key={track.id} track={track}/>) : null}
            </div>
        </div>
        
    )
}


const AlbumTracksCard = (props) => {
    const {order, track} = props
    const router = useRouter();
    // console.log('^^^^^^^^^^^^^ ',track)
    
    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
    }

    return (
        <div className='flex text-white items-center'> 
            <div className='flex items-center basis-1/2'>
                <p  className='p-5   '>{order}</p>
                <p className='p-5  '>{track.name}</p>
                
            </div>
            <a className='p-5 basis-1/2' href={`/artists/${track.artists[0].name}?q=${track.artists[0].id}`}>{track.artists[0].name}</a>
            <p className='p-5 basis-1/2 '>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        </div>
    )
}



import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import TopTracksContainer from '../../components/TopTracks'
import { TopArtistCard } from '../../components/TopArtists'


const ArtistDetails = () => {
    const router = useRouter();
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession()
    // console.log('&&&&&&&&&&: ', router.query)
    const artistName = router.query.artist 
    const id = router.query.q

    const [artist, setArtist] = useState()
    const [artistTopTracks, setArtistTopTracks] = useState()
    const [relatedArtists, setRelatedArtists] = useState()


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            // Get an artist
            spotifyApi.getArtist(id).then(function(data: any) {
                console.log('Artist information', data.body);
                setArtist(data.body)
            }, function(err: any) {
            console.error(err);
            });

          // Get an artist's top tracks
          spotifyApi.getArtistTopTracks(id, 'US')
            .then(function(data: any) {
                console.log('Artist Top Tracks', data.body);
                setArtistTopTracks(data.body.tracks)
            }, function(err: any) {
                console.log('Something went wrong!', err);
            });
      
          //Get related artists
          spotifyApi.getArtistRelatedArtists(id)
            .then(function(data: any) {
                console.log('Related Artist', data.body);
                setRelatedArtists(data.body.artists)
            }, function(err: any) {
                console.log('Something went wrong!', err);
            });
        }
       }, [session, spotifyApi, id])
      





    return (
        <div className='bg-black h-screen'>
            {
                artist ?
                <div>
                    <div className='flex'> 
                        <img className='h-60 m-5' src={artist.images[0].url} alt={artist.name}/>
                        <div>
                            <h1 className='mt-5 font-bold text-white text-2xl md:text-3xl xl:text-5xl'>{artist.name}</h1>
                            <p className='text-white text-sm'>Followers: {artist.followers.total}</p>
                            <p className='text-white text-sm'>Rank: {artist.popularity}</p>
                        </div>   
                    </div>
                    
                </div>
                
                : null
            }
            <TopTracksContainer topTracks={artistTopTracks} />
            <RelatedArtists relatedArtists={relatedArtists}/>
            
        </div>
    )
} 

export default ArtistDetails


export const RelatedArtists = (props: any) => {
    const { relatedArtists } = props

    return (
        <div className='font-bold text-1xl md:text-2xl xl:text-3xl'>
            <h3 className=''>Related Artists</h3>
            <div className='flex flex-wrap'>
                {relatedArtists ? relatedArtists.map((artist: any) => <TopArtistCard key={artist.id} artist={artist}/>) : null}
            </div>
        </div>
    )
}
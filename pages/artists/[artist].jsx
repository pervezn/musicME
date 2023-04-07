import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import TopTracksContainer from '../../components/TopTracks'
import { TopArtistCard } from '../../components/TopArtists'
import Layout from '../../components/Layout'


const ArtistDetails = () => {
    const router = useRouter();
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession()
    const id = router.query.q

    const [artist, setArtist] = useState()
    const [artistTopTracks, setArtistTopTracks] = useState()
    const [relatedArtists, setRelatedArtists] = useState()


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            // Get an artist
            spotifyApi.getArtist(id).then(function(data) {
                setArtist(data.body)
            }, function(err) {
            console.error(err);
            });

          // Get an artist's top tracks
          spotifyApi.getArtistTopTracks(id, 'US')
            .then(function(data) {
                // console.log('Artist Top Tracks', data.body);
                setArtistTopTracks(data.body.tracks)
            }, function(err) {
                console.log('Something went wrong!', err);
            });
      
          //Get related artists
          spotifyApi.getArtistRelatedArtists(id)
            .then(function(data) {
                // console.log('Related Artist', data.body);
                setRelatedArtists(data.body.artists)
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }
       }, [session, spotifyApi, id])
      

    return (
        <Layout>
            <ArtistHeader artist={artist} />
            <div className='m-16 mt-8'><TopTracksContainer topTracks={artistTopTracks} /></div>
            <RelatedArtists relatedArtists={relatedArtists} />
        </Layout>
    )
} 

export default ArtistDetails

const ArtistHeader = (props) => {
    const { artist } = props

    return (
        <div >
            {
                artist ?
                <div>
                    <div className='flex items-end'> 
                        <img className='h-60' src={artist.images[0].url} alt={artist.name}/>
                        <div className='ml-5' >
                            <h1 className='mt-5 font-bold text-white text-2xl md:text-3xl xl:text-5xl'>{artist.name}</h1>
                            <p className='text-white text-sm'>Followers: {artist.followers.total}</p>
                        </div>   
                    </div>
                </div>
                : null
            }
        </div>
    )
}


export const RelatedArtists = (props) => {
    const { relatedArtists } = props

    return (
        <div className='m-8 mt-16'>
            <h3 className='font-bold text-1xl md:text-2xl xl:text-3xl text-white'>Related Artists</h3>
            <div className='grid grid-flow-row-dense grid-cols-5'>
                {relatedArtists ? relatedArtists.map((artist) => <TopArtistCard key={artist.id} artist={artist}/>) : null}
            </div>
        </div>
    )
}
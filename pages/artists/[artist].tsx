import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import TopTracksContainer from '../../components/TopTracks'
import { TopArtistCard } from '../../components/TopArtists'
import Layout from '../../components/Layout'
import {SingleArtistResponse, ArtistsTopTracksResponse, ArtistsRelatedArtistsResponse } from 'types/spotify-api'


const ArtistDetails = () => {
    const router = useRouter();
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession()
    const id: string | string[] | undefined = router.query.q

    const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse>()
    const [artistTopTracks, setArtistTopTracks] = useState<SpotifyApi.ArtistsTopTracksResponse>()
    const [relatedArtists, setRelatedArtists] = useState<SpotifyApi.ArtistsRelatedArtistsResponse>()


    useEffect(() => {
        if(spotifyApi.getAccessToken()){
            // Get an artist
            spotifyApi.getArtist(String(id)).then((data: SpotifyApi.SingleArtistResponse) => {
                setArtist(data)
            }, function(err: unknown) {
            console.error(err);
            });

          // Get an artist's top tracks
          spotifyApi.getArtistTopTracks(String(id), 'US')
            .then((data: SpotifyApi.ArtistsTopTracksResponse) => {
                // console.log('Artist Top Tracks', data.body);
                setArtistTopTracks(data)
            }, function(err: unknown) {
                console.log('Something went wrong!', err);
            });
      
          //Get related artists
          spotifyApi.getArtistRelatedArtists(String(id))
            .then((data: SpotifyApi.ArtistsRelatedArtistsResponse) => {
                // console.log('Related Artist', data.body);
                setRelatedArtists(data)
            }, function(err: unknown) {
                console.log('Something went wrong!', err);
            });
        }
       }, [session, spotifyApi, id])
      

    return (
        <Layout>
            <ArtistHeader artist={artist?.body} />
            <div className='m-16 mt-8'><TopTracksContainer topTracks={artistTopTracks?.body.tracks} /></div>
            <RelatedArtists relatedArtists={relatedArtists?.body.artists} />
        </Layout>
    )
} 

export default ArtistDetails

const ArtistHeader = (props: any) => {
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


export const RelatedArtists = (props: any) => {
    const { relatedArtists } = props

    return (
        <div className='m-8 mt-16'>
            <h3 className='font-bold text-1xl md:text-2xl xl:text-3xl text-white'>Related Artists</h3>
            <div className='flex flex-wrap m-8'>
                {relatedArtists ? relatedArtists.map((artist: any) => <TopArtistCard key={artist.id} artist={artist}/>) : null}
            </div>
        </div>
    )
}
import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import { topArtistState } from '../atoms/topArtistsAtom';
import { useRecoilValue } from 'recoil';



const TopArtistContainer = () => {
    const topArtists = useRecoilValue<SpotifyApi.UsersTopArtistsResponse>(topArtistState)
    // console.log("topArtist ", topArtists)
    return (
        <div className='flex flex-wrap'>
            <div className='text-white flex flex-wrap'> 
              {topArtists ? topArtists.body.items.map((artist: SpotifyApi.SingleArtistResponse) => <TopArtistCard key={artist.id} artist={artist}/>) : null}
            </div>
        </div>
        
    )
}


export const TopArtistCard = (props: any) => {
    const {artist} = props
    const {data: session } = useSession();
    // const topArts = useRecoilValue<any | undefined>(topTrackState)

    return (
        <div className='text-white p-5'> 
            <img  className='flex justify-center' src={artist?.images[2]?.url } alt={artist.name}/>
            <a href={`/artists/${artist.name}?q=${artist.id}`} className='flex justify-center p-3'>{artist.name}</a>
            <p className='flex justify-center '>Followers: {artist.followers.total}</p>
        </div>
    )
}


export default TopArtistContainer
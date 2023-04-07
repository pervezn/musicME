import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import { topArtistState } from '../atoms/topArtistsAtom';
import { useRecoilValue } from 'recoil';



const TopArtistContainer = () => {
    const topArtists = useRecoilValue(topArtistState)
    console.log("topArtist ", topArtists)
    return (
        <div className=''>
            <div className='text-white grid grid-flow-row-dense grid-cols-5'> 
              {topArtists ? topArtists.map((artist) => <TopArtistCard key={artist.id} artist={artist}/>) : null}
            </div>
        </div>
        
    )
}


export const TopArtistCard = (props) => {
    const {artist} = props
    const {data: session } = useSession();
    // const topArts = useRecoilValue<any | undefined>(topTrackState)

    return (
        <div className='text-white p-5'> 
            <img  className='flex' src={artist?.images[2]?.url } alt={artist.name}/>
            <a href={`/artists/${artist.name}?q=${artist.id}`} className='flex'>{artist.name}</a>
            <p className='flex '>Popularity: {artist.popularity}</p>
        </div>
    )
}


export default TopArtistContainer
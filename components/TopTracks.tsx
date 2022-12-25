import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { topTrackState } from '../atoms/topTracksAtom'
import { useRecoilValue } from 'recoil';



const TopTracksContainer = (props:any) => {
    const { topTracks } = props
    const {data: session } = useSession();
    // const topTracks = useRecoilValue(topTrackState)
    // console.log("topTracks ", topTracks)
    return (
        <div>
            <div className='text-gray-500 flex'>
                <p className='pl-5 '>#</p>
                <p className='pl-20'>TITLE</p>
                <p className='pl-40'>ARTIST</p>
                <p className='pl-20'>ALBUM</p>

            </div>
            <div className='text-white'> 
            {topTracks ? topTracks.map((track: any, i: number) => <TopTracksCard order={i} key={track.id} track={track}/>) : null}
            </div>
        </div>
        
    )
}


const TopTracksCard = (props: any) => {
    const {order, track} = props
    const {data: session } = useSession();
    const topTracks = useRecoilValue<any | undefined>(topTrackState)
    // console.log("INDIVIDUAL TRACK IS: ", track)

    return (
        <div className='flex text-white'> 
            <p  className='p-5  flex items-center  '>{order}</p>
            <img  className='p-5 pr-0' src={track.album.images[2].url } />
            <p className='p-5 flex  items-center '>{track.name}</p>
            <a className='p-5 flex  items-center' href={`/artists/${track.artists[0].name}?q=${track.artists[0].id}`}>{track.artists[0].name}</a>
            <a className='p-5  flex items-center' href={`/albums/${track.album.name}?q=${track.album.id}`}>{track.album.name}</a>
        </div>
    )
}


export default TopTracksContainer
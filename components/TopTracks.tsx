import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { topTrackState } from '../atoms/topTracksAtom'
import { useRecoilValue } from 'recoil';



const TopTracksContainer = () => {
    const {data: session } = useSession();
    const topTracks = useRecoilValue(topTrackState)
    console.log("topTracks ", topTracks)
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

    return (
        <div className='flex text-white'> 
            <p  className='p-5  flex items-center  '>{order}</p>
            <img  className='p-5 pr-0' src={track.album.images[2].url } />
            <p className='p-5 flex  items-center '>{track.name}</p>
            <p className='p-5 flex  items-center '>{track.artists[0].name}</p>
            <p className='p-5  flex items-center  '>{track.album.name}</p>

        </div>
    )
}


export default TopTracksContainer
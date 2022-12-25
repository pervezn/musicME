import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
// import useSpotify from '../hooks/useSpotify'
// import { topTrackState } from '../atoms/topTracksAtom'
// import { useRecoilValue } from 'recoil';



const TopTracksContainer = (props:any) => {
    const { topTracks } = props
    const {data: session } = useSession();
    // const topTracks = useRecoilValue(topTrackState)
    // console.log("topTracks ", topTracks)
    return (
        <div>
            <div className='text-gray-500 flex'>
                <p className='pl-5 '>#</p>
                <p className='pl-20 basis-1/3'>TITLE</p>
                <p className='pl-40 basis-1/2'>ARTIST</p>
                <p className='pl-20 basis-1/2'>ALBUM</p>

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
    // const topTracks = useRecoilValue<any | undefined>(topTrackState)
    // console.log("INDIVIDUAL TRACK IS: ", track)

    return (
        <div className='flex text-white items-center text-left' > 
            <div className='flex items-center basis-1/2'>
                <p  className='p-5   '>{order}</p>
                <img  className='p-5 pr-0' src={track.album.images[2].url } />
                <p className='p-5 '>{track.name}</p>
            </div>
            <a className='p-5  basis-1/2 ' href={`/artists/${track.artists[0].name}?q=${track.artists[0].id}`}>{track.artists[0].name}</a>
            <a className='p-5  basis-1/2' href={`/albums/${track.album.name}?q=${track.album.id}`}>{track.album.name}</a>
        </div>
    )
}


export default TopTracksContainer
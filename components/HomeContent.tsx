import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import TopTracksContainer from './TopTracks'
import TopArtistContainer from './TopArtists'




const HomeContent = (props: any) => {
    const {topTracks} = props

    return (
       <>
        <div className='items-end space-x-7 p-8 pt-0'>
            <div className='pt-0 pl-16'>
                <TopArtistContainer />
            </div>
        </div>


        <section className='items-end space-x-7 h-80 p-8'>
            <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold text-white'>Top Tracks</h1>
            <div className='pt-8 pl-8'>
            <TopTracksContainer  topTracks={topTracks}/>
            </div>
        </section>   
       </>
    )
}

export default HomeContent



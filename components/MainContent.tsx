import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import TopTracksContainer from './TopTracks'

import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";



const MainContent = () => {
    const {data: session } = useSession();

    return (
        <div className='flex-grow overflow-y-scroll scrollbar-hide h-screen'> 
           <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white'>
                    <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="profile_pic" />
                    <h2>{session?.user?.name}</h2>
                </div>
           </header>

           <section className='flex items-end space-x-7 bg-gradient-to-b to-black from-[#18D860] h-80 p-8'>
                <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold text-white'>Top Artists</h1>
           </section>

           <section className='items-end space-x-7 h-80 p-8'>
            <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold text-white'>Top Tracks</h1>
            <div className='items-end space-x-7 h-80 p-8'>
                <TopTracksContainer />
           </div>
           </section>

           <div className='flex items-end space-x-7 h-80 p-8'>
                {/* <TopTracksContainer /> */}
           </div>
           

        </div>
    )
}

export default MainContent
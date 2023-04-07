import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import router from 'next/router';



const SideBar = () => {
    

    return (
        <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
            <div className='space-y-4'>
                <button className='items-center space-x-2 hover:text-white' onClick={() => signOut()}>Log Out</button>
                <button className='flex items-center space-x-2 hover:text-white' onClick={() => router.push('/')}>
                    <HomeIcon className='h-5 w-5'/>    
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white' onClick={() => router.push('/search')}>
                    <MagnifyingGlassIcon className='h-5 w-5'/>    
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white' onClick={() => router.push('/likedSongs')}>
                    <BuildingLibraryIcon className='h-5 w-5'/>    
                    <p>Liked Songs</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900'/>
                {/* <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p>
                <p>Project....</p> */}
            </div>
        </div>
    )
}

export default SideBar
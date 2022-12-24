import React, {useState, useEffect, use} from 'react'
import {signOut, useSession, getSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'

import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";



const TopArtistCard = () => {
    const {data: session } = useSession();

    return (
        <div className='flex-grow'> 
        

        </div>
    )
}

export default TopArtistCard
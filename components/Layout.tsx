import React, {useState, useEffect} from 'react'
import SideBar from './SideBar'
import {signOut, useSession, getSession } from 'next-auth/react'
import HomeContent from './HomeContent'


const Layout = (props: any) => {
    const { children } = props
    // console.log("CHILDREN ARE HERE: ",children)
    return (
      <div className='bg-black h-screen overflow-hidden'>
        <main className='flex '>
            <SideBar />
            <MainContentLayout>{children}</MainContentLayout>
        </main>
      </div>
    )
}

export default Layout


const MainContentLayout = (props: any) => {
    const {children} = props
    const {data: session } = useSession();
    return(
        <div className='flex-grow overflow-y-scroll scrollbar-hide h-screen'> 
        <header className='absolute top-5 right-8'>
             <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white'>
                 <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="profile_pic" />
                 <h2>{session?.user?.name}</h2>
             </div>
        </header>

        <section className='flex items-end space-x-7 bg-gradient-to-b to-black from-[#18D860] h-80 p-8'> 
            {children[0]}
        </section>

        {children.length > 1 ? children.slice(1) : null}

           
     </div>
    )

}
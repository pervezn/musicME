//dynamic route is identified with brackets around the page name
import Head from 'next/head'
import React, {useState, useEffect, use} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

interface GenreProps {
  genres: Array<string>
}

export default function Genre(props: GenreProps) {
 
  

  return (
    <div >
      <Head>
        <title>MusicMe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}


// export async function getStaticProps() {
//   const spotify = Credentials()


//   const data = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
//     headers:{
//       Authorization: `Bearer ${spotify.OAuth_Token}`
//     }
//   }).then(response => response.json());

//   console.log(data);
  
//   return {
//     props: {
//       genres: data.genres
//     }
//   }

// }
import Head from 'next/head'
import React, {useState, useEffect, use} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Credentials } from '../Credentials';
import SearchCard from '../components/SearchCard'
import { SearchContent } from "spotify-types";
// import type { TrackSearchResponse } from "/spotify-api" 

interface HomeProps {
  genres: Array<string>
}
// type SpotifyTrack = {
//   album: object,
//   artists: 
// }

export default function Home(props: HomeProps) {
  const { genres } = props
  const [query, setQuery] = useState('')
  const [res, setRes] = useState<SearchContent | undefined>()
  const spotify = Credentials()
  // console.log(genres)

 
 function searchRequest(e: React.MouseEvent<HTMLInputElement>) {
    console.log("here")
    e.preventDefault()
    const q = 'https://api.spotify.com/v1/search' + '?q=' + query + '&type=track&limit=50'
    const data = fetch(q, {
      headers:{
        Authorization: `Bearer ${spotify.OAuth_Token}`
      }
    }).then(response => response.json())
    .then(data => setRes(data));    
  }
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
       {/* <div>{
          genres.map((genre, key) => <li key={key}>{genre}</li>)
        }</div> */}
        <form>
          <label style={{margin: '15px'}}>Search Artist</label>
          <input style={{margin: '15px'}} onChange={(e) => setQuery(e.target.value)}/>
          <input style={{margin: '15px'}} type="submit" onClick={(e) => searchRequest(e)}/>
        </form>
        {/* {console.log(res.tracks)} */}
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          { res && res.tracks ?
            res.tracks.items.map((item: any, key: any) => <SearchCard key={key} 
                                                                      imgHref={item.album.images[2].url} 
                                                                      albumName={item.album.name} 
                                                                      songName={item.name} />
            ) : null
          } 
      </div>
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


export async function getStaticProps() {
  const spotify = Credentials()


  const data = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
    headers:{
      Authorization: `Bearer ${spotify.OAuth_Token}`
    }
  }).then(response => response.json());

  console.log(data);
  
  return {
    props: {
      genres: data.genres
    }
  }

}
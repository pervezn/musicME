import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react' 
import { RecoilRoot } from 'recoil'
import React from 'react'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return ( 
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshedAccessToken } = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN: ", refreshedAccessToken)

        return {
            ...token,
            accessToken: refreshedAccessToken.access_token,
            accessTokenExpires: Date.now() + refreshedAccessToken.expires_in * 1000,
            refreshToken: refreshedAccessToken.refresh_token ?? token.refreshToken
        }
    } catch (err) {
        console.log(err)
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({token, account, user}) {
        //initial
        if(account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000,
            }
        }

        //return previous token if access token not expired
        if(Date.now() < token.accessTokenExpires){
            return token;
        }

        //expired token
        console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...')
        return await refreshAccessToken(token)
    },
    async session({session, token}){
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session
    }
  }
});
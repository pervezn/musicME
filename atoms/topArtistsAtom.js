import {atom} from 'recoil'

export const topArtistState = atom({
    key: 'topArtistState',
    default: SpotifyApi.UsersTopArtistsResponse //
})
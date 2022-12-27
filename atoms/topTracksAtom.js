import {atom} from 'recoil'

export const topTrackState = atom({
    key: 'topTrackStateKey',
    default: SpotifyApi.UsersTopTracksResponse //
})
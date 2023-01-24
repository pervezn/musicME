import {atom} from 'recoil'

const defaultData: SpotifyApi.UsersTopArtistsResponse = {
    href:  "",
    items: [],
    limit: 20,
    next: null,
    offset: 0,
    previous: null,
    total:0
}

export const topArtistState = atom({
    key: 'topArtistState',
    default: defaultData //
})
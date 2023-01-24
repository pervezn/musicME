import {atom} from 'recoil'


const defaultData: SpotifyApi.UsersTopTracksResponse = {
    href:  "",
    items: [],
    limit: 20,
    next: null,
    offset: 0,
    previous: null,
    total:0
}

export const topTrackState = atom({
    key: 'topTrackStateKey',
    default: defaultData //
})
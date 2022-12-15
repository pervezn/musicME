import * as React from 'react'

interface SearchCardProps {
    imgHref: string,
    albumName: string,
    songName: string
}

const SearchCard = (props: SearchCardProps) => {
    const {imgHref, albumName, songName } = props
    return (
        <div>
            <img src={imgHref}/>
            <span>{albumName}</span>
            <span>{songName}</span>
        </div>
    )
}

export default SearchCard
import * as React from 'react'

interface SearchCardProps {
    imgHref: string,
    albumName: string,
    songName: string
}

const SearchCard = (props: SearchCardProps) => {
    const {imgHref, albumName, songName } = props
    return (
        <div style={{margin: '20px', alignItems: 'center'}}>
            <img src={imgHref}/>
            <div>{albumName}</div>
            <div>{songName}</div>
        </div>
    )
}

export default SearchCard
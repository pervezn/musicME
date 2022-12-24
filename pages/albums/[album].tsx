import { useRouter } from 'next/router'

const AlbumDetails = () => {
    const router = useRouter();
    const albumName = router.query.album 
    return (
        <div>{albumName}</div>
    )
} 

export default AlbumDetails
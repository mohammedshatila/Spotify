import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Album from "./Album"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [TheAlbum, setAlbum] = useState(null)
  const [searchAlbums, setSearchAlbums] = useState([])

  

  function chooseTrack(track) {
    
    setSearch("")
    setAlbum(track.id)
    

  }


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchArtists(search).then(res => {
        console.log(res)
      if (cancel) return
      setSearchResults(
        res.body.artists.items.map(track => {
         

          return {
            artist: track.name,
            id: track.id,
            uri: track.uri,
            followers:track.followers.total,
            popularity: Math.ceil(track.popularity/20),
            albumUrl: track.images[0]?.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

   useEffect(()=>{
    if(!TheAlbum) return 
    if (!accessToken) return

   
    
    spotifyApi.getArtistAlbums(TheAlbum).then(res=>{
      console.log(res)
      setSearchAlbums(
        res.body.items.map(Albums => {
         

          return {
            name: Albums.name,
            albumUrl: Albums.images[0].url,
            artists:Albums.artists[0].name,
            date: Albums.release_date,
            totalTracks:Albums.total_tracks,
            uri:Albums.external_urls.spotify
          }
        })
      )
    }
    
    );
       

},[TheAlbum,accessToken])


  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
            
          />
        ))}
        
      </div>
      <div>
        
     {searchAlbums.map(Albums => (
           <Album
            Albums={Albums}
            key={Albums.uri}
            
          />
        ))}
      </div>
    </Container>
  )
}
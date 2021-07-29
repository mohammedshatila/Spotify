import React,{useState} from "react"
import './App.css';
import { Rating } from 'react-simple-star-rating'
import { Card } from 'react-bootstrap';

export default function TrackSearchResult({ track,chooseTrack }) {

  function handlePlay() {
    chooseTrack(track);
  
    
  }
  
  const [rating, setRating] = useState(track.popularity)

  return (

    <Card style={{ cursor: "pointer" }} className="d-flex m-2 align-items-center card" style={{ width: '15rem' ,height: '40%' }} onClick={handlePlay} >
    <Card.Img style={{height:"200px"}} variant="top" src={track.albumUrl} />
    <Card.Body>
      <Card.Title className="Title" >{track.artist}</Card.Title>
      
      <Card.Text className="albums">
      {track.followers} followers
       
      </Card.Text>
      
    </Card.Body>
   
    <Rating className="ratings"  ratingValue={rating}  />
   
  </Card>
    
  )
}
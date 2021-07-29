import React from "react"
import { Card } from 'react-bootstrap';

export default function Album({Albums}) {


  return (
    <Card className="d-flex m-2 align-items-center artists card "  style={{ width: '15rem'   }} >
    <Card.Img style={{height:"200px"}}  variant="top" src={Albums.albumUrl} />
    <Card.Body>
      <Card.Title className="Title">{Albums.name}</Card.Title>
      <Card.Text className="albums" >
      {Albums.artists} 
       
      </Card.Text>
      <Card.Text className="Date">
      {Albums.date} <br/> {Albums.totalTracks} tracks
       
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Card.Link href={Albums.uri}>Preview on Spotify</Card.Link>
    </Card.Footer>
  </Card>
    
  )
}
import React from 'react'
import { Link } from 'react-router-dom'

export default function TripTag({trip}) {

    let fontSize = Math.ceil(Math.random()*36)
    fontSize > 8 && fontSize < 36 ? fontSize : fontSize = 16

  return (
    <span style={{fontSize: fontSize}}><Link to={`${window.location.origin}/trip/${trip.id}`}> {trip.name}</Link> </span>
  )
}

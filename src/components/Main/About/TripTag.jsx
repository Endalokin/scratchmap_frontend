import React from 'react'

export default function TripTag({trip}) {

    let fontSize = Math.ceil(Math.random()*36)
    fontSize > 8 && fontSize < 36 ? fontSize : fontSize = 16

  return (
    <span style={{fontSize: fontSize}}>{trip.name} </span>
  )
}

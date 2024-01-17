import React from 'react'
import { Link } from 'react-router-dom'
import TripTag from './TripTag'

export default function AllTripsTagView({trips}) {
    return (
        <>
            <h2>Discover all your trips</h2>
            <p style={{maxWidth: "880px"}}>{trips?.map(trip => <TripTag key={trip.id} trip={trip} /> )}</p>
            <Link to="/trips"><button className="notching">Discover trips</button></Link>
        </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleTripShortView({trip}) {
    return (
        <>
            <div>
                <h2>{trip.name}</h2>
                <div>
                    <ul>
                        <li>From: {trip.placeFrom}</li>
                        <li>To: {trip.placeTo}</li>
                    </ul>
                </div>
                <Link to="/"><button className="notching">Show trip details</button></Link>
            </div>
            <div>Here comes an image of the trip</div>
        </>
    )
}

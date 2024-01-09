import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleTripShortView({trip, experiences}) {
    const displayImage = experiences?.find((e) => e.trip.sys.id == trip.id)
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
            <div id="animated-img"><img  src={`${displayImage?.imgUrl}?fm=webp&w=600`} alt={`${displayImage?.name}`} /></div>
        </>
    )
}

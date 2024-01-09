import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleTripShortView({ trip, experiences }) {
    const displayImage = experiences?.find((e) => e.trip.sys.id == trip?.id)
    return (
        <>
            <h2>{trip?.name}</h2>
            <div></div>
            <div className="single-content">
                <div>
                    <div>
                        <ul>
                            <li>From: {trip?.placeDeparture}</li>
                            <li>To: {trip?.placeArrival}</li>
                            <li>{new Date(trip?.periodFrom).toLocaleDateString()} - {new Date(trip?.periodUntil).toLocaleDateString()}</li>
                        </ul>
                    </div>
                    <Link to="/"><button className="notching">Show trip details</button></Link>
                </div>
            </div>
            <div id="animated-img"><img src={`${displayImage?.imgUrl}?fm=webp&w=600`} alt={`${displayImage?.name}`} /></div>
        </>
    )
}

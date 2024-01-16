import React from 'react'
import { Link } from 'react-router-dom'
import TripInfo from '../SingleTripDetails/TripInfo'
import PolaroidImageLarge from './PolaroidImageLarge'

export default function SingleTripShortView({ trip, experiences }) {
    const mainImage = experiences?.find((e) => e.trip.sys.id == trip.id)
    return (
        <>
            <div>
                <TripInfo trip={trip} />
                <Link to={`${window.location.origin}/trip/${trip?.id}`}><button className="notching">Show trip</button></Link>
            </div>
            {mainImage && <PolaroidImageLarge mainImage={mainImage} />}
        </>
    )
}
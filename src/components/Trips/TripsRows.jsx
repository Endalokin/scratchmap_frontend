import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ImgGalleryItem from '../Main/SingleTripDetails/ImgGalleryItem'

export default function TripsRows({ trip, experience }) {
    const navigate = useNavigate()

    function goToTrip (e) {
        e.preventDefault()
        navigate(`/trip/${trip.id}`)
    }

    return (
        <>
            <tr onClick={goToTrip} style={{cursor: "pointer"}}>
                <td style={{ textAlign: "center" }}>
                    <ImgGalleryItem singleTripExperience={experience} widthSize="200" />
                </td>
                <td>{trip.name}</td>
                <td className="hide-xs">{trip.placeDeparture} ↔ {trip.placeArrival} {trip.vehicle == "flight-economy" ? `\u2708` : trip.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip.travellers)].map(() => '\u{026F9}')}</td>
                <td style={{ textAlign: "right" }}>{new Date(trip?.periodFrom).toLocaleDateString()} ⟶ {new Date(trip?.periodUntil).toLocaleDateString()} </td>
            </tr>
        </>
    )
}

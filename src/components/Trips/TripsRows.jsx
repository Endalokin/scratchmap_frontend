import React from 'react'
import { Link } from 'react-router-dom'
import ImgGalleryItem from '../Main/SingleTripDetails/ImgGalleryItem'

export default function TripsRows({ trip, experience }) {


    return (
        <>
            <tr>
                <td style={{ textAlign: "center" }}>
                    <ImgGalleryItem singleTripExperience={experience} />
                </td>
                <td><Link to={`${window.location.origin}/trip/${trip.id}`} >{trip.name}</Link></td>
                <td className="hide-xs">{trip.placeDeparture} ↔ {trip.placeArrival} {trip.vehicle == "flight-economy" ? `\u2708` : trip.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip.travellers)].map(() => '\u{026F9}')}</td>
                <td style={{ textAlign: "right" }}>{new Date(trip?.periodFrom).toLocaleDateString()} ⟶ {new Date(trip?.periodUntil).toLocaleDateString()} </td>
            </tr>
        </>
    )
}

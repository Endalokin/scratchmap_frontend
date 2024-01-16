import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function TableRowPerTrip({ trip, setIsOpen, setActiveTrip }) {

    const navigate = useNavigate()

    function compensateCheck(e) {
        e.preventDefault();
        setActiveTrip(trip)
        setIsOpen(prev => !prev)
    }

    function goToTrip(e) {
        e.preventDefault()
        console.log(e.target)
        if (e.target.type != "checkbox") {
            navigate(`/trip/${trip.id}`)
        }
    }

    return (
        <>
            <tr onClick={goToTrip} style={{ cursor: "pointer" }}>
                <td>{trip.name}</td>
                <td className="hide-xs">{trip.placeDeparture} ↔ {trip.placeArrival} {trip.vehicle == "flight-economy" ? `\u2708` : trip.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip.travellers)].map(() => '\u{026F9}')}</td>
                <td style={{ textAlign: "right" }}>{trip.footprint?.distance?.toFixed(0)} km</td>
                <td style={{ textAlign: "right" }}>{trip.footprint?.emission?.toFixed(0)} kg</td>
                <td style={{ textAlign: "right" }}>{trip.footprint?.amount?.toFixed(2)} €</td>
                <td style={{ textAlign: "center" }}><input id={`${trip?.id}-compensated`} type='checkbox' onClick={compensateCheck} checked={trip.footprint?.compensated} /></td>
            </tr>
        </>
    )
}

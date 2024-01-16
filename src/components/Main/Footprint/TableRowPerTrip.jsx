import React from 'react'
import { Link } from 'react-router-dom'

export default function TableRowPerTrip({ trip, setIsOpen, setActiveTrip }) {

    function compensateCheck(e) {
        e.preventDefault();
        setActiveTrip(trip)
        setIsOpen(prev => !prev)  
    }

    return (
        <>
            <tr>
                <td><Link to={`${window.location.origin}/trip/${trip.id}`} >{trip.name}</Link></td>
                <td className="hide-xs">{trip.placeDeparture} ↔ {trip.placeArrival} {trip.vehicle == "flight-economy" ? `\u2708` : trip.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip.travellers)].map(() => '\u{026F9}')}</td>
                <td style={{ textAlign: "right" }}>{trip.footprint?.distance?.toFixed(0)} km</td>
                <td style={{ textAlign: "right" }}>{trip.footprint?.emission?.toFixed(0)} kg</td>
                <td style={{ textAlign: "right" }}>{trip.footprint?.amount?.toFixed(2)} €</td>
                <td style={{ textAlign: "center" }}><input id={`${trip?.id}-compensated`} type='checkbox' onClick={compensateCheck} checked={trip.footprint?.compensated} /></td>
            </tr>
        </>
    )
}

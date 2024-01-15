import React from 'react'
import { Link } from 'react-router-dom'

export default function TableRowPerTrip({ trip, setTrips, setIsOpen, setActiveTrip }) {

    function compensateCheck(e) {
        setActiveTrip(trip)
        setTrips(prev => {
            prev.find((p) => p.id == e.target.id.split("-")[0]).footprint.compensated = e.target.checked
            return [...prev]
        })
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
                <td style={{ textAlign: "center" }}>{trip.footprint?.compensated ? <input id={`${trip?.id}-compensated`} type='checkbox' onChange={compensateCheck} checked /> : <input id={`${trip?.id}-compensated`} type='checkbox' onChange={compensateCheck} />}</td>
            </tr>
        </>
    )
}

import React from 'react'

export default function TableRowPerTrip({trip}) {
    return (
        <tr>
            <td>{trip.name}</td>
            <td>{trip.placeDeparture} ↔ {trip.placeArrival} {trip.vehicle == "flight-economy" ? `\u2708` : trip.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip.travellers)].map(() => '\u{026F9}')}</td>
            <td style={{textAlign: "right"}}>{trip.footprint?.distance?.toFixed(0)} km</td>
            <td style={{textAlign: "right"}}>{trip.footprint?.emission?.toFixed(0)} kg</td>
            <td style={{textAlign: "right"}}>{trip.footprint?.amount?.toFixed(2)} €</td>
            <td style={{textAlign: "center"}}>{trip.footprint?.compensated ? <input type='checkbox' checked /> : <input type='checkbox' />}</td>
        </tr>
    )
}

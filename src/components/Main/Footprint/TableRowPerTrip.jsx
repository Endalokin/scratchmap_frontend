import React from 'react'

export default function TableRowPerTrip({trip}) {
    return (
        <tr>
            <td>{trip.name}</td>
            <td>{trip.placeFrom} arrow {trip.placeTo} {trip.vehicle == "Plane" ? `\u2708` : trip.vehicle == "Car" ? '\u{1F697}' : '\u{1F686}'} </td>
            <td>{trip.footprint?.emission} kg</td>
            <td>{trip.footprint?.compensated ? "yes" : "no"}</td>
        </tr>
    )
}

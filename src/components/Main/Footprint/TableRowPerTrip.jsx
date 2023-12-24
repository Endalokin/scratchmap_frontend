import React from 'react'

export default function TableRowPerTrip({trip}) {
    return (
        <tr>
            <td>{trip.name}</td>
            <td>{trip.placeFrom} arrow {trip.placeTo} {trip.vehicle == "Plane" ? "PlaneSymbol" : trip.vehicle == "Car" ? "carSymbol" : "trainSymbol"} </td>
            <td>{trip.emissions} kg</td>
            <td>{trip.compensated ? "yes" : "no"}</td>
        </tr>
    )
}

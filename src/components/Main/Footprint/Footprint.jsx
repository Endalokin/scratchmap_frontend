import React from 'react'
import { useState } from 'react'

import TableRowPerTrip from './TableRowPerTrip'
import CompensationTree from './CompensationTree'

export default function Footprint() {

    /* Contentful API nachschauen: Extend oder expand um Verknüpfungen sichtbar zu machen! Dadurch weniger Abfragen von Foto -> Asset nötig!!! */
    const [trips, setTrips] = useState([
        {
            name: "Griechenland 2023",
            periodFrom: "18.06.2023",
            periodTo: "30.06.2023",
            placeFrom: "Frankfurt Hahn",
            placeTo: "Corfu",
            vehicle: "Plane",
            travellers: 2,
            emissions: 234.567,
            compensated: true
        },
        {
            name: "Schweden 2023",
            periodFrom: "02.09.2023",
            periodTo: "18.09.2023",
            placeFrom: "Rostock",
            placeTo: "Göteborg",
            vehicle: "Car",
            travellers: 5,
            emissions: 43.567,
            compensated: false
        }
    ])

    return (
        <>
            <div>{trips.map((trip) => <CompensationTree compensatedTrip={trip.compensated}/>)} </div>
            <div class="full-width">
                <table>
                    <thead>
                        <tr>

                            <th>Trip</th>
                            <th>Emissions</th>
                            <th></th>
                            <th>Compensated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip) => <TableRowPerTrip trip={trip} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

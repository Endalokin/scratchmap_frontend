import React from 'react'
import TableRowPerTrip from './TableRowPerTrip'
import CalculateNextTrip from './CalculateNextTrip'

export default function FootprintTable({sortBy, trips, setTrips, setActiveTrip, setIsOpen}) {
    return (
        <div className="full-width">
            <table>
                <thead>
                    <tr>
                        <th onClick={sortBy}>Name of the Trip {'\u21F5'}</th>
                        <th className="hide-xs">Directions</th>
                        <th onClick={sortBy}>Distance* {'\u21F5'}</th>
                        <th onClick={sortBy}>Emission* {'\u21F5'}</th>
                        <th>Amount</th>
                        <th>Compensated</th>
                    </tr>
                </thead>
                <tbody>
                    {trips?.map((trip) => <TableRowPerTrip key={`row-${trip.id}`} trip={trip} setTrips={setTrips} setIsOpen={setIsOpen} setActiveTrip={setActiveTrip} />)}
                </tbody>
            </table>
            <p className="fine-print">*Calculated by CarbonTracer (<a href="https://carbontracer.uni-graz.at/">https://carbontracer.uni-graz.at/</a>)</p>
        </div>
    )
}

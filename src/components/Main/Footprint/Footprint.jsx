import React from 'react'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import TableRowPerTrip from './TableRowPerTrip'
import CompensationTree from './CompensationTree'

export default function Footprint() {

    const [,,trips] = useOutletContext();

    return (
        <div className="fixed-site">
            <div>{trips?.map((trip) => <CompensationTree key={`tree-${trip.id}`} compensatedTrip={trip.compensated}/>)} </div>
            <div className="full-width">
                <table>
                    <thead>
                        <tr>

                            <th>Trip</th>
                            <th></th>
                            <th>Emissions</th>
                            <th>Compensated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips?.map((trip) => <TableRowPerTrip key={`row-${trip.id}`} trip={trip} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

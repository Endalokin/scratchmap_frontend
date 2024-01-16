import React from 'react'
import CompensationTree from '../Footprint/CompensationTree'
import { Link } from 'react-router-dom'

export default function FootprintSection({trips}) {
    return (
        <>
            <h2>Got to know your footprint</h2>
            <p>Some further explanation about it</p>
            <Link to="/footprint"><button className="notching">Go to footprint overview</button></Link>
            <div>{trips?.map((trip) => <CompensationTree key={`about-tree-${trip.id}`} compensatedTrip={trip?.footprint?.compensated} />)}</div>
        </>
    )
}

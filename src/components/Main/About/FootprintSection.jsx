import React from 'react'
import CompensationTree from '../Footprint/CompensationTree'
import { Link } from 'react-router-dom'

export default function FootprintSection({trips}) {
    return (
        <>
            <h2>Got to know your footprint</h2>
            <p>All this is fun, but unfortunately travelling is usually bad for the environment</p>
            <p>Receive a realistic insight of how your trips influence the environment and learn about different options for your next journey. </p>
            <Link to="/footprint"><button className="notching">Go to footprint overview</button></Link>
            <div>{trips?.map((trip) => <CompensationTree key={`about-tree-${trip.id}`} compensatedTrip={trip?.footprint?.compensated} />)}</div>
        </>
    )
}

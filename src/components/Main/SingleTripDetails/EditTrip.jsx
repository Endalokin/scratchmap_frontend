import React from 'react'
import SeasonFilter from './SeasonFilter'
import ClockFilter from './ClockFilter'

export default function EditTrip({ toggleFilterVisibility }) {

    return (
        <>
            <button onClick={toggleFilterVisibility}>Hide</button>
            <h2>Edit</h2>
            <div>
                <h3>Tracks</h3>
            </div>
        </>
    )
}

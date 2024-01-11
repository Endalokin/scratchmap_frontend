import React from 'react'
import SeasonFilter from './SeasonFilter'
import ClockFilter from './ClockFilter'

export default function MapFilters({ displaySeasons, setDisplaySeasons, displayDaytime, setDisplayDaytime, toggleFilterVisibility }) {

    return (
        <>
            <button onClick={toggleFilterVisibility}>Hide</button>
            <h2>Filter</h2>
            <div>
                <h3>by Season</h3>
                <SeasonFilter displaySeasons={displaySeasons} setDisplaySeasons={setDisplaySeasons} />
            </div>
            <div>
                <h3>by Daytime</h3>
                <ClockFilter displayDaytime={displayDaytime} setDisplayDaytime={setDisplayDaytime} />
            </div>
        </>
    )
}

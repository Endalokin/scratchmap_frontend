import React from 'react'
import SeasonFilter from './SeasonFilter'
import ClockFilter from './ClockFilter'

export default function MapFilters({ displaySeasons, setDisplaySeasons, displayDaytime, setDisplayDaytime }) {

    return (
        <div style={{ display: "flex" }}>
            <SeasonFilter displaySeasons={displaySeasons} setDisplaySeasons={setDisplaySeasons} />
            <ClockFilter displayDaytime={displayDaytime} setDisplayDaytime={setDisplayDaytime} />
        </div>
    )
}

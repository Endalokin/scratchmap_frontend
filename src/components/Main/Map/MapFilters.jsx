import React from 'react'

export default function MapFilters({displaySeasons, setDisplaySeasons}) {

    console.log("MapFilters is rerendered")

    function toggleSeason(e) {
        if (displaySeasons?.includes(e.target.id)) {
            setDisplaySeasons(prev => {
                prev.splice(displaySeasons.indexOf(e.target.id), 1)
                return prev
            })
        } else {
            setDisplaySeasons(prev => {
                prev.push(e.target.id)
                return prev
            })
        }
        console.log(displaySeasons)
    }

    return (
        <div>
            <input className="checkbox-season" type="checkbox" id="season-winter" onChange={toggleSeason} />
            <label className="label-season" htmlFor="season-winter">{'\u2603'}</label>
            <input className="checkbox-season" type="checkbox" id="season-spring" onChange={toggleSeason} />
            <label className="label-season" htmlFor="season-spring" onChange={toggleSeason}>{'\u2698'}</label>
            <br />
            <input className="checkbox-season" type="checkbox" id="season-autumn" onChange={toggleSeason} />
            <label className="label-season" htmlFor="season-autumn">{'\u{1F341}'}</label>
            <input className="checkbox-season" type="checkbox" id="season-summer" onChange={toggleSeason} />
            <label className="label-season" htmlFor="season-summer">{'\u2600'}</label>
        </div>
    )
}

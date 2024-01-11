import React from 'react'

export default function SeasonFilter({ displaySeasons, setDisplaySeasons }) {

    function toggleSeason(e) {
        if (displaySeasons?.includes(e.target.id)) {
            setDisplaySeasons(prev => prev.filter(id => id !== e.target.id))
        } else {
            setDisplaySeasons(prev => [...prev, e.target.id])
        }
    }

    return (
        <div id="season-filter">
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="season-winter" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-winter">{'\u2603'}</label>
                <span className="tooltiptext">Winter</span>
            </div>
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="season-spring" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-spring" onChange={toggleSeason}>{'\u2698'}</label>
                <span className="tooltiptext">Spring</span>
            </div>
            <br /> 
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="season-autumn" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-autumn">{'\u{1F341}'}</label>
                <span className="tooltiptext">Autumn</span>
            </div>
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="season-summer" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-summer">{'\u2600'}</label>
                <span className="tooltiptext">Summer</span>
            </div>
        </div>
    )
}

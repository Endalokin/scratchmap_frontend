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
                <span className="tooltiptext">Winter</span>
                <label className="label-season" htmlFor="season-winter">{'\u2603'}</label>
            </div>
            <div className="tooltip">
                <span className="tooltiptext">Spring</span>
                <input className="checkbox-season" type="checkbox" id="season-spring" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-spring" onChange={toggleSeason}>{'\u2698'}</label>
            </div>
            <div className="tooltip">
                <span className="tooltiptext">Autumn</span>
                <input className="checkbox-season" type="checkbox" id="season-autumn" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-autumn">{'\u{1F341}'}</label>
            </div>
            <div className="tooltip">
                <span className="tooltiptext">Summer</span>
                <input className="checkbox-season" type="checkbox" id="season-summer" onChange={toggleSeason} />
                <label className="label-season" htmlFor="season-summer">{'\u2600'}</label>
            </div>
        </div>
    )
}

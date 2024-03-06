import React from 'react'

export default function ClockFilter({ displayDaytime, setDisplayDaytime }) {

    function toggleDaytime(e) {
        if (displayDaytime?.includes(e.target.id)) {
            setDisplayDaytime(prev => prev.filter(id => id !== e.target.id))
        } else {
            setDisplayDaytime(prev => [...prev, e.target.id])
        }
    }

    return (

        <div className='grid-3' id="clock-filter">
            <div></div>
            <div className="tooltip">
                <span className="tooltiptext">0-6am</span>
                <input className="checkbox-season" type="checkbox" id="clock-night" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-night">N</label>
            </div>
            <div></div>
            <div className="tooltip">
                <span className="tooltiptext">6-12pm</span>
                <input className="checkbox-season" type="checkbox" id="clock-evening" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-evening" onChange={toggleDaytime}>W</label>
            </div>
            <div>{'\u2B9D'}</div>
            <div className="tooltip">
                <span className="tooltiptext">6-12am</span>
                <input className="checkbox-season" type="checkbox" id="clock-morning" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-morning">E</label>
            </div>
            <div></div>
            <div className="tooltip">
                <span className="tooltiptext">12-6pm</span>
                <input className="checkbox-season" type="checkbox" id="clock-midday" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-midday">S</label>
            </div>
            <div></div>
        </div>
    )
}

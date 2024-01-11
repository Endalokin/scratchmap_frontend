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
                <input className="checkbox-season" type="checkbox" id="clock-night" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-night">N</label>
                <span className="tooltiptext">0-6am</span>
            </div>
            <div></div>
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="clock-evening" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-evening" onChange={toggleDaytime}>W</label>
                <span className="tooltiptext">6-12pm</span>
            </div>
            <div>{'\u2B9D'}</div>
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="clock-morning" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-morning">E</label>
                <span className="tooltiptext">6-12am</span>
            </div>
            <div></div>
            <div className="tooltip">
                <input className="checkbox-season" type="checkbox" id="clock-midday" onChange={toggleDaytime} />
                <label className="label-clock" htmlFor="clock-midday">S</label>
                <span className="tooltiptext">12-6pm</span>
            </div>
            <div></div>
        </div>

        /*        <div>
                   <div className="tooltip">
                       <input className="checkbox-season" type="checkbox" id="clock-morning" onChange={toggleDaytime} />
                       <label className="label-season" htmlFor="clock-morning">{'\u2603'}</label>
                       <span className="tooltiptext">6-12am</span>
                   </div>
                   <div className="tooltip">
                       <input className="checkbox-season" type="checkbox" id="clock-midday" onChange={toggleDaytime} />
                       <label className="label-season" htmlFor="clock-midday" onChange={toggleDaytime}>{'\u2698'}</label>
                       <span className="tooltiptext">12-6pm</span>
                   </div>
                   <br /> 
                   <div className="tooltip">
                       <input className="checkbox-season" type="checkbox" id="clock-evening" onChange={toggleDaytime} />
                       <label className="label-season" htmlFor="clock-evening">{'\u{1F341}'}</label>
                       <span className="tooltiptext">6-12pm</span>
                   </div>
                   <div className="tooltip">
                       <input className="checkbox-season" type="checkbox" id="clock-night" onChange={toggleDaytime} />
                       <label className="label-season" htmlFor="clock-night">{'\u2600'}</label>
                       <span className="tooltiptext">0-6am</span>
                   </div>
               </div> */
    )
}

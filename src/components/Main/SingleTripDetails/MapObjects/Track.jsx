import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet'
import Peak from './Peak';
import Path from './Path';

export default function Track({ singleTripDetails, t }) {

    let lineOptions = { color: getComputedStyle(document.body).color, dashArray: "2 25", weight: "2.5" }

    if (!t.altitude) {
        return (<Polyline key={`track${singleTripDetails.tracks.indexOf(t)}`} pathOptions={lineOptions} positions={t?.path} >
            <Tooltip sticky>
                {t?.name}
            </Tooltip>
        </Polyline>)
    } else {
        return (
            <>
                {t.path.map(p => <Path singleTripDetails={singleTripDetails} t={t} p={p} />)}
                <Peak t={t} />
            </>
        )
    }
}


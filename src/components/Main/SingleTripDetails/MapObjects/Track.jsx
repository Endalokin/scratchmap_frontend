import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet'
import Peak from './Peak';
import Path from './Path';

export default function Track({ singleTripDetails, track }) {

    console.log("Track is accessed")
    console.log(track)

    let lineOptions = { color: getComputedStyle(document.body).color, dashArray: "2 25", weight: "2.5" }

    if (!track.path[0].alt) {
        // This has to be made fit for mongoDB with pathObjects
        return (<Polyline key={`track${singleTripDetails.tracks.indexOf(track)}`} pathOptions={lineOptions} positions={track?.path} >
            <Tooltip sticky>
                {track?.name}
            </Tooltip>
        </Polyline>)
    } else {
        return (
            <>
                {track.path.map(position =><Path singleTripDetails={singleTripDetails} track={track} position={position} />)}
                <Peak t={track} />
            </>
        )
    }
}


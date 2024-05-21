import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet'

export default function Path({ singleTripDetails, track, position }) {

    const distance = (positions) => {
        let dx = positions[0][0] - positions[1][0];
        let dy = positions[0][1] - positions[1][1];

        let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) * 100000;

        return dist;
    }

    const percentageToHsl = (percentage, hue0, hue1) => {
        var hue = (percentage * (hue1 - hue0)) + hue0;
        return 'hsl(' + hue + ', 100%, 50%)';
    }

    let lineOptions

    if (track.path[track.path.indexOf(position) + 1]) {
        let positions = [[position.lat, position.lon], [track.path[track.path.indexOf(position) + 1].lat, track.path[track.path.indexOf(position) + 1].lon]]
        let altitudeDifference = position.alt - track.path[track.path.indexOf(position) + 1].alt
        let perc = Math.abs(altitudeDifference / distance(positions)) * 5

        if (altitudeDifference < 0) {
            let color = percentageToHsl(perc, 292.5, 360);
            lineOptions = { color: color, dashArray: "2 25", weight: "2.5" }
        } else {
            let color = percentageToHsl(perc, 292.5, 225);
            lineOptions = { color: color, dashArray: "2 25", weight: "2.5" }
        }

        return (
            <>
                < Polyline key={`track${singleTripDetails.tracks.indexOf(track)}_segment${track.path.indexOf(position)}`} pathOptions={lineOptions} positions={positions} >
                    <Tooltip sticky>
                        {track?.name}<br />
                        Steigung: ~{Math.round(perc / 5 * 100)}% {altitudeDifference < 0 ? "↗" : "↘"}<br />
                    </Tooltip>
                </Polyline>
            </>)
    }
}

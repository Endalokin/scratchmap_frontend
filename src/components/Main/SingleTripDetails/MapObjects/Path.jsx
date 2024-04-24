import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet'

export default function Path({ singleTripDetails, t, p }) {

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

    if (t.path[t.path.indexOf(p) + 1]) {
        let positions = [[p[0], p[1]], [t.path[t.path.indexOf(p) + 1][0], t.path[t.path.indexOf(p) + 1][1]]]
        let altitudeDifference = t.altitude[t.path.indexOf(p)] - t.altitude[t.path.indexOf(p) + 1]

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
                < Polyline key={`track${singleTripDetails.tracks.indexOf(t)}_segment${t.path.indexOf(p)}`} pathOptions={lineOptions} positions={positions} >
                    <Tooltip sticky>
                        {t?.name}<br />
                        Steigung: ~{Math.round(perc / 5 * 100)}% {altitudeDifference < 0 ? "↗" : "↘"}<br />
                    </Tooltip>
                </Polyline>
            </>)
    }
}

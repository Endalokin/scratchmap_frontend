import React from 'react'
import { Marker, Tooltip } from 'react-leaflet'

export default function Peak({ t }) {

    if (t.altitude) {
        const peak = Math.max(...t.altitude)
        const peakIndex = t.altitude.indexOf(peak)
        const peakPosition = t.path[peakIndex]

        return (
            
            <Marker position={peakPosition} icon={new L.DivIcon({ className: 'leaflet-div-icon2', html: `<div>⭐</div>`})} >
                <Tooltip sticky>
                    Peak: {Math.round(peak)}m
                </Tooltip>
            </Marker>
        )
    }
}

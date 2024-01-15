import React from 'react'
import { Popup, Rectangle, Tooltip } from 'react-leaflet'
import filteredArray from './filteredArray'
import { Link } from 'react-router-dom'



export default function DisplayColourTiles({ experiences, displaySeasons, displayDaytime }) {

    function uniquePlaces(data) {
        return [...new Map(data.map(x => {
            return [`${Math.ceil(x.location.lon)}, ${Math.ceil(x.location.lat)}`, x]
        })).values()
        ]
    }

    let currentArray
    let tileExperiences

    if (experiences) {
        currentArray = filteredArray(experiences, displaySeasons, displayDaytime)
        tileExperiences = uniquePlaces(currentArray)
    }

    return (
        <>
            {tileExperiences?.map(e => {
                return <Rectangle key={e.id} bounds={[[Math.ceil(e.location.lat) - 0.005, Math.ceil(e.location.lon) - 0.005], [Math.floor(e.location.lat) + 0.005, Math.floor(e.location.lon) + 0.005]]} pathOptions={{ color: e.imgAccentColour ? e.imgAccentColour : e.imgColour, fillOpacity: 0.5 }} >
                    <Popup>
                        {e?.name}
                        <p><Link to={`${window.location.origin}/trip/${e?.trip.sys.id}/${e?.id}`}>Show Trip Details</Link></p>
                    </Popup>
                    {<Tooltip sticky direction="bottom">
                        <p><span style={{ color: e.imgAccentColour, fontWeight: "bold" }}>{e?.name}</span> <br />
                            {new Date(e?.date).toLocaleDateString()}</p>
                    </Tooltip>}
                </Rectangle>
            })}
        </>
    )
}

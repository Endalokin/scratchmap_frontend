import React from 'react'
import { Rectangle, Tooltip } from 'react-leaflet'
import filteredArray from './filteredArray'
import { useNavigate } from 'react-router-dom'

export default function DisplayColourTiles({ experiences, displaySeasons, displayDaytime, factor = 1 }) {

    function uniquePlaces(data) {
        return [...new Map(data.filter(x => x.location?.lat || x.exif?.lat).map(x => {
            return [`${Math.ceil(x.location?.lon * factor || x.exif?.lon * factor) / factor}, ${Math.ceil(x.location?.lat * factor || x.exif?.lat * factor) / factor}`, x]
        })).values()
        ]
    }

    let currentArray
    let tileExperiences

    if (experiences) {
        currentArray = filteredArray(experiences, displaySeasons, displayDaytime)
        tileExperiences = uniquePlaces(currentArray)
    }

    const navigate = useNavigate()

    return (
        <>
            {tileExperiences?.filter(e => e.location?.lat || e.exif?.lat).map(e => {
                let locationField = e.location ? e.location : e.exif
                return <Rectangle key={e.id} bounds={[[Math.ceil(locationField.lat * factor) / factor - 0.005, Math.ceil(locationField.lon * factor) / factor - 0.005], [Math.floor(locationField.lat * factor) / factor + 0.005, Math.floor(locationField.lon * factor) / factor + 0.005]]} pathOptions={{ color: e.imgAccentColour ? e.imgAccentColour : e.imgColour, fillOpacity: 0.5 }} eventHandlers={{ click: () => navigate(`/trip/${e?.trip.sys.id}/${e?.id}`) }}>
                    <Tooltip sticky direction="bottom">
                        <p><span style={{ color: e.imgAccentColour, fontWeight: "bold" }}>{e?.name}</span> <br />
                            {new Date(e?.exif?.dateTime || e?.date).toLocaleDateString()}</p>
                    </Tooltip>
                </Rectangle>
            })}
        </>
    )
}

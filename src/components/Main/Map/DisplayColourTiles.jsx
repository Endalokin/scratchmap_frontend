import React from 'react'
import { Popup, Rectangle } from 'react-leaflet'

export default function DisplayColourTiles({ mapExperiences }) {
    return (
        <>
            {mapExperiences?.map(e => {
                return <Rectangle key={e.id} bounds={[[Math.ceil(e.location.lat) - 0.005, Math.ceil(e.location.lon) - 0.005], [Math.floor(e.location.lat) + 0.005, Math.floor(e.location.lon) + 0.005]]} pathOptions={{ color: e.imgAccentColour ? e.imgAccentColour : e.imgColour, fillOpacity: 0.5 }} >
                    <Popup>
                        {e.image.sys.id} <br />
                        <a href={e.imgUrl} target="_blank">{e.imgUrl}</a>
                    </Popup>
                </Rectangle>
            })}
        </>
    )
}

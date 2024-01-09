import React from 'react'
import { Popup, Rectangle } from 'react-leaflet'
import filteredArray from './filteredArray'



export default function DisplayColourTiles({ experiences, displaySeasons }) {

    function uniquePlaces(data) {
        return [...new Map(data.map(x => {
            return [`${Math.ceil(x.location.lon)}, ${Math.ceil(x.location.lat)}`, x]
        })).values()
        ]
    }

    let currentArray

    if (experiences) {
        let tileExperiences = uniquePlaces(experiences)
        currentArray = filteredArray(tileExperiences, displaySeasons)
    }

    return (
        <>
            {currentArray?.map(e => {
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

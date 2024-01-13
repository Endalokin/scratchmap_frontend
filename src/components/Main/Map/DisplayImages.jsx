import React from 'react'
import L from 'leaflet'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import filteredArray from './filteredArray'

export default function DisplayImages({ experiences, displaySeasons, displayDaytime }) {

    let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)

    return (
        <>
            {currentArray?.map(e => {
                return <Marker key={e.id} position={[e.location.lat, e.location.lon]} icon={L.icon({ iconUrl: `${e?.imgUrl}?fm=webp&w=100`, className: "polaroid", iconSize: [100, ] })} >
                    <Popup>
                        {e.image.sys.id} <br />
                        <a href={e.imgUrl} target="_blank">{e.imgUrl}</a>
                    </Popup>
                    {<Tooltip sticky direction="bottom">
                        <p><span style={{color: e.imgAccentColour, fontWeight: "bold"}}>{e?.name}</span> <br />
                            {new Date(e?.date).toLocaleDateString()},
                            {new Date(e?.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} Uhr
                        </p>
                    </Tooltip>}
                </Marker>
            })}
        </>
    )
}

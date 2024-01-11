import React from 'react'
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import filteredArray from './filteredArray'

export default function DisplayImages({ experiences, displaySeasons, displayDaytime }) {

    let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)

    return (
        <>
            {currentArray?.map(e => {
                return <Marker key={e.id} position={[e.location.lat, e.location.lon]} icon={L.icon({ iconUrl: `${e?.imgUrl}?fm=webp&w=80` })} >
                    <Popup>
                        {e.image.sys.id} <br />
                        <a href={e.imgUrl} target="_blank">{e.imgUrl}</a>
                    </Popup>
                </Marker>
            })}
        </>
    )
}

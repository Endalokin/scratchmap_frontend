import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents } from 'react-leaflet'

export default function DisplayImages({ experiences }) {
    return (
        <>
            {experiences?.map(e => {
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

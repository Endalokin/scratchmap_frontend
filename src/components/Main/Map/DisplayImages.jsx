import React from 'react';
import L from 'leaflet'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import filteredArray from './filteredArray'
import { useNavigate } from 'react-router-dom';

export default function DisplayImages({ experiences, displaySeasons, displayDaytime }) {
    const {pathname} = window.location

    let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)
    return (
        <>
            {currentArray?.reverse().map((e,index) => {
                const htmlValue = pathname != "/map" ? `<p style="text-align: center">Stop ${index + 1}</p>` : `<p></p>`

                return <Marker key={e.id}  position={[e.location.lat, e.location.lon]} icon={new L.DivIcon({ html: `<img src="${e?.imgUrl}?fm=webp&w=100"/>${htmlValue}`, className: "polaroid", iconSize: [100, ] })} >
                    <Popup>
                        {e.image.sys.id} <br />
                        <a href={e.imgUrl} target="_blank" rel="noreferrer">{e.imgUrl}</a>
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

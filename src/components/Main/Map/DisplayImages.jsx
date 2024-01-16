import React from 'react';
import L from 'leaflet'
import { Marker, Tooltip } from 'react-leaflet'
import filteredArray from './filteredArray'
import { useNavigate } from 'react-router-dom';

export default function DisplayImages({ experiences, displaySeasons, displayDaytime }) {
    const { pathname } = window.location

    const navigate = useNavigate()

    let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)

return (
    <>
        {currentArray?.reverse().map((experience, index) => {
            const htmlValue = pathname != "/map" ? `<p style="text-align: center">Stop ${index + 1}</p>` : `<p></p>`
            return <Marker key={experience.id} position={[experience.location.lat, experience.location.lon]} icon={new L.DivIcon({ html: `<img src="${experience?.imgUrl}?fm=webp&w=100"/>${htmlValue}`, className: `polaroid ${window.location.pathname.split("/")[3] == experience?.id && "activeTab"} `, iconSize: [100,] })} eventHandlers={{click: () => navigate(`/trip/${experience?.trip.sys.id}/${experience?.id}`)}} >
                {<Tooltip sticky direction="bottom">
                    <p><span style={{ color: experience.imgAccentColour, fontWeight: "bold" }}>{experience?.name}</span> <br />
                        {new Date(experience?.date).toLocaleDateString()},
                        {new Date(experience?.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} Uhr
                    </p>
                </Tooltip>}
            </Marker>
        })}
    </>
)
}

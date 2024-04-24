import React from 'react';
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import filteredArray from '../../Map/filteredArray';
import { useNavigate } from 'react-router-dom';
import DisplayImagesTooltip from '../../Map/DisplayImagesTooltip';

export default function ImagesAsDots({ experiences, displaySeasons, displayDaytime }) {
    
    const navigate = useNavigate()

    let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)

    return (
        <>
            {currentArray?.reverse().map((experience) => {
                let position = experience.location ? [experience.location?.lat, experience.location?.lon] : [experience.exif.lat, experience.exif?.lon]
                return <Marker key={experience.id} position={position} icon={new L.DivIcon({ className: 'leaflet-div-icon2', html: `<div>📷</div>`})}  eventHandlers={{ click: () => navigate(`/trip/${experience?.trip.sys.id}/${experience?.id}`) }} >
                    <DisplayImagesTooltip experience={experience} />
                </Marker>
            })}
        </>
    )
}

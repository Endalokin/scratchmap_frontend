import React from 'react';
import L from 'leaflet'
import { Marker } from 'react-leaflet'
import filteredArray from '../../Map/filteredArray';
import { useNavigate } from 'react-router-dom';
import DisplayImagesTooltip from '../../Map/DisplayImagesTooltip';

export default function ImagesAsDots({ experiences, displaySeasons, displayDaytime }) {
    const { pathname } = window.location
    
    const navigate = useNavigate()

    let currentArray = filteredArray(experiences, displaySeasons, displayDaytime)

    return (
        <>
            {currentArray?.reverse().map((experience, index) => {
                let position = experience.location ? [experience.location?.lat, experience.location?.lon] : [experience.exif.lat, experience.exif?.lon]
                let htmlValue = pathname != "/map" ? `<p style="text-align: center; line-height: 1; margin: 3px">Stop ${index + 1}` : `<p style="text-align: center; line-height: 1; margin: 6px">`
                htmlValue += !experience.location && experience.exif?.positioningError > 400 ? `<span style="color: red; font-weight: bold; text-shadow: 1px 0px 3px white, -1px 0px 3px white, 0px 1px 3px white, 0px -1px 3px white ;)"> ${"\uA71D"}</span></p>` : "</p>"
                return <Marker key={experience.id} position={position} icon={new L.DivIcon({ className: 'leaflet-div-icon2', html: `<div>📷</div>`})}  eventHandlers={{ click: () => navigate(`/trip/${experience?.trip.sys.id}/${experience?.id}`) }} >
                    <DisplayImagesTooltip experience={experience} />
                </Marker>
            })}
        </>
    )
}

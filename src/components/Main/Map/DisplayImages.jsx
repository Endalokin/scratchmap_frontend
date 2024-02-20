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
            {currentArray?.reverse().filter(experience => experience.exif || experience.location).map((experience, index) => {
                const htmlValue = pathname != "/map" ? `<p style="text-align: center">Stop ${index + 1}</p>` : ``
                return <Marker key={experience.id} position={[experience.exif?.lat || experience.location?.lat, experience.exif?.lon || experience.location?.lon]} icon={new L.DivIcon({ html: `<img src="${experience?.imgUrl}?fm=webp&w=100"/>${htmlValue}`, className: `polaroid polaroid-text ${window.location.pathname.split("/")[3] == experience?.id ? "activeTab" : ""}`, iconSize: [100,] })} eventHandlers={{ click: () => navigate(`/trip/${experience?.trip.sys.id}/${experience?.id}`) }} >
                    {<Tooltip sticky direction="bottom">
                        <p><span style={{ color: experience.imgAccentColour, fontWeight: "bold" }}>{experience?.name}</span> <br />
                            {new Date(experience?.exif?.dateTime || experience?.date).toLocaleDateString()},
                            {new Date(experience?.exif?.dateTime || experience?.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} Uhr {experience?.exif?.offsetTime && `(${experience?.exif?.offsetTime})`}
                        </p>
                    </Tooltip>}
                </Marker>
            })}
        </>
    )
}

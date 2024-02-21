import React from 'react'
import { Tooltip } from 'react-leaflet'

export default function DisplayImagesTooltip({experience}) {
    const htmlPositioningError = `Positioning Error of ${Math.round(experience.exif.positioningError)} m`
    return (
        <Tooltip sticky direction="bottom">
            <p><span style={{ color: experience.imgAccentColour, fontWeight: "bold" }}>{experience?.name}</span> <br />
                {new Date(experience?.exif?.dateTime || experience?.date).toLocaleDateString()},
                {new Date(experience?.exif?.dateTime || experience?.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} Uhr {experience?.exif?.offsetTime && `(${experience?.exif?.offsetTime})`}
                <br/>{!experience.location && experience.exif?.positioningError > 400 && htmlPositioningError}
            </p>
        </Tooltip>
    )
}

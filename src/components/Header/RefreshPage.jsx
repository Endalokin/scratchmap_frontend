import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import fetchData from '../../utils/fetchAPI'

export default function RefreshPage({ experiences, trips }) {
    const [rotate, setRotate] = useState()

    const { VITE_SERVER_URL } = import.meta.env;

    async function handleClick(e) {
        e.preventDefault();
        setRotate("rotating")
        if (!window.location.pathname.includes("/footprint")) {
            let experiencesNeedUpdate = experiences.filter(experience => !experience.imgColour || !experience.exif).map(experience => ({
                id: experience.image.sys.id,
                url: experience.imgUrl,
                updateColour: experience.imgColour ? false : true,
                updateExif: experience.exif ? false : true
            }))
            const URL = `${VITE_SERVER_URL}/experiences/images/update`
            await fetchData(URL, data => {
                console.log(`Experiences were updated`)
            }, 'POST', {experiencesNeedUpdate})
        } else {
            console.log("this is a footprint")
            for (let trip of trips) {
                console.log(trip)
                if (!trip.footprint) {
                    console.log(trip)
                    const URL = `${VITE_SERVER_URL}/trips/${trip.id}`;
                    await fetchData(URL, (data) => {
                        console.log(`${trip.id} was updated`)
                    }, 'POST', trip)
                }
            }
        }
        window.location.reload()
    }

    return (
        <NavLink onClick={handleClick} className={rotate}>{'\u27F3'}</NavLink>
    )
}

import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import fetchData from '../../utils/fetchAPI'

export default function RefreshPage({ experiences, trips}) {
    const location = useLocation()
    const [rotate, setRotate] = useState()

    async function handleClick(e) {
        e.preventDefault();
        setRotate("rotating")
        if (document.URL != "http://localhost:5173/footprint") {
            for (let experience of experiences) {
                if (!experience.imgColour) {
                    const URL = `http://localhost:8080/experiences/images/colour?id=${experience.image.sys.id}&url=${experience.imgUrl}`;
                    await fetchData(URL, (data) => {
                        console.log(`${experience.id} was updated`)
                    }, 'POST')
                }
            }
        } else {
            for (let trip of trips) {
                if (!trip.footprint) {
                    const URL = `http://localhost:8080/trips/${trip.id}`;
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

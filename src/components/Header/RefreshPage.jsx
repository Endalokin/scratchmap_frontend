import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import fetchData from '../../utils/fetchAPI'

export default function RefreshPage({ experiences, trips}) {
    const location = useLocation()
    const [rotate, setRotate] = useState()

    const { VITE_SERVER_URL } = import.meta.env;

    async function handleClick(e) {
        e.preventDefault();
        setRotate("rotating")
        console.log("hello")
        if (!window.location.pathname.includes("/footprint")) {
            for (let experience of experiences) {
                if (!experience.imgColour) {
                    const URL = `${VITE_SERVER_URL}/experiences/images/colour?id=${experience.image.sys.id}&url=${experience.imgUrl}`;
                    await fetchData(URL, (data) => {
                        console.log(`${experience.id} was updated`)
                    }, 'POST')
                }
            }
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

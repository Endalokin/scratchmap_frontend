import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import fetchData from '../../utils/fetchAPI'

export default function RefreshPage({ experiences, setExperiences }) {
    const location = useLocation()
    const [rotate, setRotate] = useState()

    async function handleClick(e) {
        e.preventDefault();
        setRotate("rotating")
        for (let experience of experiences) {
            if (!experience.imgColour) {
                const URL = `http://localhost:8080/contentful/images/colour?id=${experience.image.sys.id}&url=${experience.imgUrl}`;
                await fetchData(URL, (data) => {
                    console.log(`${experience.id} was updated`)
                }, 'POST')
            }
        }
        window.location.reload()
        
    }

    return (
        <NavLink onClick={handleClick} className={rotate}>{'\u27F3'}</NavLink>
    )
}

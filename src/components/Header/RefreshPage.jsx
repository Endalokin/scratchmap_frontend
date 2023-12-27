import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import fetchData from '../../utils/fetchAPI'

export default function RefreshPage({ experiences, setExperiences }) {
    const location = useLocation()

    // map-method in useState? oder besser mit setExperiences arbeiten?
    experiences?.map(e => {
        if (!e.imgColour) {
            const URL = `http://localhost:8080/contentful/images/colour?id=${e.image.sys.id}&url=${e.imgUrl}`;
            fetchData(URL, (data) => {
                console.log(data)
            }, 'POST')
        }
        return e
    })

    return (
        <NavLink to={location}>{'\u27F3'}</NavLink>
    )
}

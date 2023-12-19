import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import fetchData from '../../../utils/fetchAPI'

export default function Map() {

    const [experiences, setExperiences] = useState()
    const testURL = "http://localhost:8080/contentful/experiences"

    useEffect(() => {
        fetchData(testURL, (data) => {
            setExperiences(data)
        })
    }, [])

    return (
        <MapContainer center={[40.505, -0.09]} zoom={3} scrollWheelZoom={false} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {experiences?.map(e => <Marker key={e.id} position={[e.location.lat, e.location.lon]} />)}
        </MapContainer>)
}

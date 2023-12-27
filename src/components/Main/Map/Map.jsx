import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet'
import { useOutletContext } from 'react-router-dom'

export default function Map() {
    const [experiences] = useOutletContext();

    return (
        <MapContainer center={[40.505, -0.09]} zoom={3} scrollWheelZoom={false} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {experiences?.map(e => <Marker key={e.id} position={[e.location.lat, e.location.lon]} />)} */}
            {experiences?.map(e => <Rectangle key={e.id} bounds={[[Math.ceil(e.location.lat)-0.005, Math.ceil(e.location.lon)-0.005], [Math.floor(e.location.lat)+0.005, Math.floor(e.location.lon)+0.005]]} pathOptions={{color: e.imgColour}} /> )}
        </MapContainer>)
}

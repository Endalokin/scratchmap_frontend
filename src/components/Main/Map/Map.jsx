import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet'
import { useOutletContext } from 'react-router-dom'

export default function Map() {
    const [experiences] = useOutletContext();

    return (
        <MapContainer center={[40.505, -0.09]} zoom={3} minZoom={1} maxZoom={19} scrollWheelZoom={true} id="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                
            />
            {/* {experiences?.map(e => <Marker key={e.id} position={[e.location.lat, e.location.lon]} />)} */}
            {experiences?.map(e => <Rectangle key={e.id} bounds={[[Math.ceil(e.location.lat)-0.005, Math.ceil(e.location.lon)-0.005], [Math.floor(e.location.lat)+0.005, Math.floor(e.location.lon)+0.005]]} pathOptions={{color: e.imgAccentColour ? e.imgAccentColour : e.imgColour, fillOpacity:0.5}} >      <Popup>
        {e.image.sys.id} <br/>
        <a href={e.imgUrl} target="_blank">{e.imgUrl}</a>
      </Popup></Rectangle> )}
        </MapContainer>)
}

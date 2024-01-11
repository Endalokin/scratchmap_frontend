import React, { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useOutletContext } from 'react-router-dom'
import DisplayImages from './DisplayImages'
import DisplayColourTiles from './DisplayColourTiles'
import MapFilters from './MapFilters'


export default function Map() {
    const [experiences, , , ] = useOutletContext();
    const [zoomLevel, setZoomLevel] = useState(3);

    function ZoomTeller() {
        const mapEvents = useMapEvents({
            zoomend: () => {
                setZoomLevel(mapEvents.getZoom());
            },
        });
        return null
    }

    const [displaySeasons, setDisplaySeasons] = useState([])
    const [displayDaytime, setDisplayDaytime] = useState([])

    return (
        <div className="fixed-site">
            <MapFilters displaySeasons={displaySeasons} setDisplaySeasons={setDisplaySeasons} displayDaytime={displayDaytime} setDisplayDaytime={setDisplayDaytime} />
            <MapContainer center={[40.505, -0.09]} zoom={zoomLevel} minZoom={1} maxZoom={19} scrollWheelZoom={true} className="map" /* ref={(ref) => { this.map = ref; }} */>
                <ZoomTeller />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

                />
                {zoomLevel < 8 ?
                    <DisplayColourTiles experiences={experiences} displaySeasons={displaySeasons} displayDaytime={displayDaytime}/>
                    : <DisplayImages experiences={experiences} displaySeasons={displaySeasons} displayDaytime={displayDaytime} />
                }
            </MapContainer>
        </div>
    )
}

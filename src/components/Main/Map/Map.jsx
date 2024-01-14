import React, { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { useOutletContext } from 'react-router-dom'
import DisplayImages from './DisplayImages'
import DisplayColourTiles from './DisplayColourTiles'
import MapFilters from './MapFilters'
import { Link } from 'react-router-dom'


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
    const [displayState, setDisplayState] = useState("display-none")

    function toggleFilterVisibility() {
        setDisplayState(prev => prev == "display-none" ? "display-flex" : "display-none")
    }

    return (
        <div className="fixed-site">
            <button className="ribbon" onClick={toggleFilterVisibility}>Show Filter</button>
            <div id="mapFilterSection" className={`${displayState} modal`}><MapFilters displaySeasons={displaySeasons} setDisplaySeasons={setDisplaySeasons} displayDaytime={displayDaytime} setDisplayDaytime={setDisplayDaytime} toggleFilterVisibility={toggleFilterVisibility} /></div>
            <MapContainer center={[40.505, -0.09]} zoom={zoomLevel} minZoom={1} maxZoom={19} scrollWheelZoom={true} className="map">
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

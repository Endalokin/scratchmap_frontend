import React from 'react'
import { MapContainer, Polyline, TileLayer, Marker, Tooltip } from 'react-leaflet'
import DisplayImages from '../Map/DisplayImages';
import Track from './MapObjects/Track';

export default function SingleTripMap({singleTripExperiencesMapable, singleTripDetails}) {
    
    let lineOptions = { color: getComputedStyle(document.body).color }
    
    let bounds = {}
    if (singleTripExperiencesMapable?.length > 1) {
        bounds.maxLat = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) + 0.05
        bounds.minLat = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) - 0.2
        bounds.maxLon = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) + 0.1
        bounds.minLon = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) - 0.1
    } else if (singleTripExperiencesMapable?.length > 0) {
        bounds.maxLat = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) + 1
        bounds.minLat = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) - 1
        bounds.maxLon = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) + 1
        bounds.minLon = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) - 1
    }

  return (
    <div>{
        singleTripExperiencesMapable?.length > 0 && <MapContainer bounds={[[bounds?.minLat, bounds?.minLon], [bounds?.maxLat, bounds?.maxLon]]} minZoom={2} maxZoom={19} className="map" scrollWheelZoom={false} id="trip-map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <DisplayImages experiences={singleTripExperiencesMapable} />
            {<Polyline pathOptions={lineOptions} positions={singleTripExperiencesMapable?.map((ste) => [ste.location?.lat || ste.exif?.lat, ste.location?.lon || ste.exif?.lon])} />}

            {singleTripDetails?.tracks && singleTripDetails?.tracks?.map(t => <Track singleTripDetails={singleTripDetails} t={t} />)}
            <Marker position={[singleTripDetails?.placeArrivalCoords.lat, singleTripDetails?.placeArrivalCoords.lon]} >
                <Tooltip sticky>
                    {singleTripDetails?.placeArrival} <br />
                    Arrival: {new Date(singleTripDetails?.periodFrom).toLocaleDateString()} <br />
                    Departure: {new Date(singleTripDetails?.periodUntil).toLocaleDateString()}
                </Tooltip>
            </Marker>
            <Marker position={[singleTripDetails?.placeDepartureCoords.lat, singleTripDetails?.placeDepartureCoords.lon]} >
                <Tooltip sticky>
                    {singleTripDetails?.placeDeparture} <br />
                    Departure: {new Date(singleTripDetails?.periodFrom).toLocaleDateString()} <br />
                    Arrival: {new Date(singleTripDetails?.periodUntil).toLocaleDateString()}
                </Tooltip>
            </Marker>
        </MapContainer>
    }</div >
  )
}

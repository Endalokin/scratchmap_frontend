import React, { useRef } from 'react'
import { useParams, useOutletContext, Link } from 'react-router-dom'
import ImgGallery from './ImgGallery';
import { MapContainer, Polyline, TileLayer, Marker, Tooltip } from 'react-leaflet'
import DisplayImages from '../Map/DisplayImages';
import TripInfo from './TripInfo';
import PolaroidImageLarge from '../About/PolaroidImageLarge';

export default function SingleTripDetails() {

    const ref = useRef(null)

    const [experiences, , trips] = useOutletContext();

    let { id, imgid } = useParams()
    const singleTripDetails = trips?.find(t => t.id == id)
    const singleTripExperiences = experiences?.filter(e => {
        return e.trip?.sys.id == singleTripDetails?.id
    })

    const lineOptions = { color: getComputedStyle(document.body).color }

    let mainImage
    let bounds = {}
    if (singleTripExperiences) {
        singleTripExperiences.sort((a, b) => {
            let dateA = new Date(a.date ? a.date : a.exif?.dateTime)
            let dateB = new Date(b.date ? b.date : b.exif?.dateTime)
            console.log(dateA)
            console.log(dateB)
            if (dateA > dateB) {
                console.log("a is bigger than b")
                return -1
            } else if (dateA < dateB) {
                console.log("b is bigger than a")
                return 1
            }
            return 0
        })
        console.log(singleTripExperiences)
        if (imgid) {
            mainImage = singleTripExperiences.find(e => e.id == imgid)
        } else {
            mainImage = singleTripExperiences[0]
        }
        if (singleTripExperiences?.length > 1) {
            bounds.maxLat = Math.max(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lat || o.exif?.lat)) + 0.05
            bounds.minLat = Math.min(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lat || o.exif?.lat)) - 0.2
            bounds.maxLon = Math.max(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lon || o.exif?.lon)) + 0.1
            bounds.minLon = Math.min(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lon || o.exif?.lon)) - 0.1
        } else {
            bounds.maxLat = Math.max(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lat || o.exif?.lat)) + 1
            bounds.minLat = Math.min(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lat || o.exif?.lat)) - 1
            bounds.maxLon = Math.max(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lon || o.exif?.lon)) + 1
            bounds.minLon = Math.min(...singleTripExperiences?.filter(o => o.exif || o.location).map(o => o.location?.lon || o.exif?.lon)) - 1
            console.log("single", bounds)
        }
    }

    function scrollToMap(e) {
        e.preventDefault();
        ref?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div id="single-details" className='single-details centered-element showUp'>
                <div >
                    <TripInfo trip={singleTripDetails} />
                    <button className="notching" onClick={scrollToMap}>⮟ Map ⮟</button>
                </div>
                {singleTripExperiences && singleTripExperiences[0] && <PolaroidImageLarge mainImage={mainImage} />}
                <div className="img-gallery">
                    <ImgGallery singleTripExperiences={singleTripExperiences} />
                </div>
            </div>
            <div ref={ref}></div>
            <div>{
                singleTripExperiences?.filter(e => e.location?.lat || e.exif?.lat).length > 0 && <MapContainer bounds={[[bounds?.minLat, bounds?.minLon], [bounds?.maxLat, bounds?.maxLon]]} minZoom={2} maxZoom={19} className="map" scrollWheelZoom={false} id="trip-map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <DisplayImages experiences={singleTripExperiences} />
                    <Polyline pathOptions={lineOptions} positions={singleTripExperiences?.filter(ste => ste.exif || ste.location).map((ste) => [ste.location?.lat || ste.exif?.lat, ste.location?.lon || ste.exif?.lon])} />
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
            }</div>
        </>
    )
}

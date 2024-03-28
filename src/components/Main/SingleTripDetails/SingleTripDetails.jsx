import React, { useRef, useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import ImgGallery from './ImgGallery';
import { MapContainer, Polyline, TileLayer, Marker, Tooltip } from 'react-leaflet'
import DisplayImages from '../Map/DisplayImages';
import TripInfo from './TripInfo';
import PolaroidImageLarge from '../About/PolaroidImageLarge';
import MapFilters from '../Map/MapFilters';
import gpxParser from 'gpxparser'
import traumschleife from '../../../../public/assets/t3479518_traumschleife frau holle.gpx'
import { parseGpxFile } from '../../../utils/parseGPXFile';

export default function SingleTripDetails() {


    /* var traumschleife = '../../../../public/assets/t3479518_traumschleife frau holle.gpx' */
    /*     var gpx = new gpxParser(); //Create gpxParser Object
        gpx.parse(traumschleife) */
    console.log(traumschleife)
    const [rawdata, setRawData] = useState([]);
    useEffect(() => {
        const parseGpx = async () => {
            const parseGpxData = await parseGpxFile(traumschleife);
            setRawData(parseGpxData[0])

        }
        parseGpx()
    }, [])
    console.log(rawdata)
    const ref = useRef(null)

    const [experiences, , trips, , user] = useOutletContext();

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
            if (dateA > dateB) {
                return -1
            } else if (dateA < dateB) {
                return 1
            }
            return 0
        })
        if (imgid) {
            mainImage = singleTripExperiences.find(e => e.id == imgid)
        } else {
            mainImage = singleTripExperiences[0]
        }
    }

    let singleTripExperiencesMapable = singleTripExperiences?.filter(e => (e.location?.lat || e.exif?.lat) && (e.location?.lon || e.exif?.lon))

    if (singleTripExperiencesMapable?.length > 1) {
        bounds.maxLat = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) + 0.05
        bounds.minLat = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) - 0.2
        bounds.maxLon = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) + 0.1
        bounds.minLon = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) - 0.1
    } else if (singleTripExperiences?.length > 0) {
        bounds.maxLat = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) + 1
        bounds.minLat = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lat || o.exif?.lat)) - 1
        bounds.maxLon = Math.max(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) + 1
        bounds.minLon = Math.min(...singleTripExperiencesMapable?.map(o => o.location?.lon || o.exif?.lon)) - 1
    }

    function scrollToMap(e) {
        e.preventDefault();
        ref?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const [displayState, setDisplayState] = useState("display-none")

    function toggleFilterVisibility() {
        setDisplayState(prev => prev == "display-none" ? "display-flex" : "display-none")
    }

    return (
        <>
            {user && <div>
                <button className="ribbon ribbon-small" onClick={toggleFilterVisibility}>Edit</button>
                <div id="mapFilterSection" className={`${displayState} modal showUp`}><MapFilters toggleFilterVisibility={toggleFilterVisibility} /></div>
            </div>}
            <div id="single-details" className='single-details centered-element showUp'>

                <div >
                    <TripInfo trip={singleTripDetails} />
                    {singleTripExperiencesMapable?.length > 0 && <button className="notching" onClick={scrollToMap}>⮟ Map ⮟</button>}
                </div>
                {singleTripExperiences && singleTripExperiences[0] && <PolaroidImageLarge mainImage={mainImage} />}
                <div className="img-gallery">
                    <ImgGallery singleTripExperiences={singleTripExperiences} />
                </div>
            </div>
            <div ref={ref}></div>
            <div>{
                singleTripExperiencesMapable?.length > 0 && <MapContainer bounds={[[bounds?.minLat, bounds?.minLon], [bounds?.maxLat, bounds?.maxLon]]} minZoom={2} maxZoom={19} className="map" scrollWheelZoom={false} id="trip-map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                    <DisplayImages experiences={singleTripExperiencesMapable} />
                    {<Polyline pathOptions={lineOptions} positions={singleTripExperiencesMapable?.map((ste) => [ste.location?.lat || ste.exif?.lat, ste.location?.lon || ste.exif?.lon])} />}
                    {rawdata?.positions && <Polyline pathOptions={lineOptions} positions={rawdata.positions?.map((ste) => [ste[0], ste[1]])} >
                        <Tooltip sticky>
                            {rawdata?.name}
                        </Tooltip>
                    </Polyline>}
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

import React from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import ImgGallery from './ImgGallery';
import { MapContainer, Polyline, TileLayer, Marker, Tooltip } from 'react-leaflet'
import DisplayImages from '../Map/DisplayImages';
import { Link, redirect } from 'react-router-dom';
import TripInfo from './TripInfo';

export default function SingleTripDetails() {

    const [experiences, , trips] = useOutletContext();

    const navigate = useNavigate()

    let { id, imgid } = useParams()

    const singleTripDetails = trips?.find(t => t.id == id)
    const singleTripExperiences = experiences?.filter(e => {
        return e.trip.sys.id == singleTripDetails?.id
    })

    const lineOptions = { color: getComputedStyle(document.body).color }

    let mainImage
    if (singleTripExperiences) {
        singleTripExperiences.sort((a, b) => {
            if (a.date > b.date) {
                return -1
            } else if (a.date < b.date) {
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

    return (
        <>
            <div id="single-details">
                <div >
                    <TripInfo trip={singleTripDetails} />
                </div>
                {singleTripExperiences && singleTripExperiences[0] &&
                    <div id="animated-img" className="polaroid polaroid-big" style={{ position: "relative" }}>
                        <img src={`${mainImage.imgUrl}?fm=webp&w=600`} alt={`${mainImage.name}`} />
                        <h2 className="edding">{mainImage.name.substr(0, 29)}</h2>
                        <Link to={`${window.location.origin}/3d/${mainImage?.id}`} ><button className='ribbon' style={{ position: "absolute", top: "0px", right: "0px" }}>3D</button></Link>
                    </div>
                }
                <div className="img-gallery">
                    <ImgGallery singleTripExperiences={singleTripExperiences} />
                </div>
            </div>
            <div>{singleTripExperiences?.length > 0 && <MapContainer center={[mainImage.location.lat, mainImage.location.lon]} zoom={9} minZoom={1} maxZoom={19} className="map" scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <DisplayImages experiences={singleTripExperiences} />
                <Polyline pathOptions={lineOptions} positions={singleTripExperiences?.map((ste) => [ste.location.lat, ste.location.lon])} />
                <Marker position={[singleTripDetails?.placeArrivalCoords.lat, singleTripDetails?.placeArrivalCoords.lon]} >
                    <Tooltip sticky>
                        {singleTripDetails?.placeArrival} <br />
                        Arrival: {new Date(singleTripDetails?.periodFrom).toLocaleDateString()} <br />
                        Departure: {new Date(singleTripDetails?.periodUntil).toLocaleDateString()}
                    </Tooltip>
                </Marker>
                <Marker position={[singleTripDetails?.placeDepartureCoords.lat, singleTripDetails?.placeDepartureCoords.lon]} eventHandlers={{ click: () => console.log("I wish I'd forward you") }} >
                    <Tooltip sticky>
                        {singleTripDetails?.placeDeparture} <br />
                        Departure: {new Date(singleTripDetails?.periodFrom).toLocaleDateString()} <br />
                        Arrival: {new Date(singleTripDetails?.periodUntil).toLocaleDateString()}
                    </Tooltip>
                </Marker>
            </MapContainer>
            }

            </div>
        </>
    )
}

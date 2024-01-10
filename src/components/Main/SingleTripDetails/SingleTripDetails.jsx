import React from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import SingleTripShortView from '../About/SingleTripShortView';
import ImgGallery from './ImgGallery';
import { MapContainer, Polyline, TileLayer, Marker } from 'react-leaflet'
import DisplayImages from '../Map/DisplayImages';

export default function SingleTripDetails() {

    const [experiences, , trips] = useOutletContext();


    let { id } = useParams()

    const singleTripDetails = trips?.find(t => t.id == id)
    const singleTripExperiences = experiences?.filter(e => {
        return e.trip.sys.id == singleTripDetails?.id
    })

    const lineOptions = { color: getComputedStyle(document.body).color }

    if (singleTripExperiences) {
        singleTripExperiences.sort((a, b) => {
            if (a.date > b.date) {
                return -1
            } else if (a.date < b.date) {
                return 1
            }
            return 0
        })
    }


    return (
        <>
            <div id="single-details">
                <div>
                    <h2>{singleTripDetails?.name}</h2>
                    <div>
                        <ul>
                            <li>From: {singleTripDetails?.placeDeparture}</li>
                            <li>To: {singleTripDetails?.placeArrival}</li>
                            <li>{new Date(singleTripDetails?.periodFrom).toLocaleDateString()} - {new Date(singleTripDetails?.periodUntil).toLocaleDateString()}</li>
                        </ul>
                    </div>
                </div>
                {singleTripExperiences && singleTripExperiences[0] && <div id="animated-img" className="polaroid polaroid-big"><img src={`${singleTripExperiences[0].imgUrl}?fm=webp&w=600`} alt={`${singleTripExperiences[0].name}`} /><h2 className="edding">{singleTripExperiences[0].name.substr(0,29)}</h2></div>}
                <div className="img-gallery">
                    <ImgGallery singleTripExperiences={singleTripExperiences} />
                </div>
            </div>
            <div>{singleTripExperiences?.length > 0 && <MapContainer center={[singleTripExperiences[0].location.lat, singleTripExperiences[0].location.lon]} zoom={9} minZoom={1} maxZoom={19} className="map" scrollWheelZoom={false} /* ref={(ref) => { this.map = ref; }} */>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <DisplayImages experiences={singleTripExperiences} />
                <Polyline pathOptions={lineOptions} positions={singleTripExperiences?.map((ste) => [ste.location.lat, ste.location.lon])} />
                <Marker position={[singleTripDetails?.placeArrivalCoords.lat, singleTripDetails?.placeArrivalCoords.lon]} />
            </MapContainer>
            }

            </div>
        </>
    )
}

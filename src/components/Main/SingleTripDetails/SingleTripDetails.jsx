import React, { useRef, useState } from 'react'
import { useParams, useOutletContext } from 'react-router-dom'
import ImgGallery from './ImgGallery';
import TripInfo from './TripInfo';
import PolaroidImageLarge from '../About/PolaroidImageLarge';
import EditTrip from './EditTrip';
import SingleTripMap from './SingleTripMap';

export default function SingleTripDetails() {

    const ref = useRef(null)

    const [experiences, , trips, , user] = useOutletContext();

    let { id, imgid } = useParams()
    const singleTripDetails = trips?.find(t => t.id == id)
    const singleTripExperiences = experiences?.filter(e => {
        return e.trip?.sys.id == singleTripDetails?.id
    })

    let mainImage

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
            {user &&
                <div>
                    <button className="ribbon ribbon-small" onClick={toggleFilterVisibility}>Edit</button>
                    <div id="mapFilterSection" className={`${displayState} modal showUp`}><EditTrip singleTripDetails={singleTripDetails} toggleFilterVisibility={toggleFilterVisibility} /></div>
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
            <SingleTripMap singleTripExperiencesMapable={singleTripExperiencesMapable} singleTripDetails={singleTripDetails} />
        </>
    )
}

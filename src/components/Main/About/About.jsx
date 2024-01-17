import React from 'react'
import { useOutletContext } from 'react-router-dom'
import SingleTripShortView from './SingleTripShortView'
import AllTripsTagView from './AllTripsTagView'
import TitleSection from './TitleSection'
import FootprintSection from './FootprintSection'
import SceneSection from './SceneSection'
import MapSection from './MapSection'

export default function About() {

    const [experiences, , trips] = useOutletContext();

    return (
        <div id="about">
            <div id="title">
                <TitleSection />
            </div>
            <div id="teaser-map">
                <MapSection />
            </div>
            <div id="teaser-single" className='centered-element'>
                {trips && trips[0] && <SingleTripShortView trip={trips[0]} experiences={experiences} />}
            </div>
            <div id="teaser-3d">
                <SceneSection trips={trips} />
            </div>
            <div id="teaser-footprint" className='centered-element'>
                <FootprintSection trips={trips} />
            </div>
            <div id="teaser-all" className='centered-element'>
                <AllTripsTagView trips={trips} />
            </div>
        </div>
    )
}

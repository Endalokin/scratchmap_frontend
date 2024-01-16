import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import SingleTripShortView from './SingleTripShortView'
import AllTripsTagView from './AllTripsTagView'
import TitleSection from './TitleSection'
import FootprintSection from './FootprintSection'
import SceneSection from './SceneSection'

export default function About() {

    const [experiences, , trips] = useOutletContext();

    return (
        <div id="about">
            <div id="title">
                <TitleSection />
            </div>
            <div id="teaser-map">
                <div>Here comes an image of the map</div>
                <div>
                    <h2>Your trips on the digital scratch map</h2>
                    <div>
                        <ul>
                            <li>Have it everywhere with you</li>
                            <li>No borders</li>
                        </ul>
                    </div>
                    <Link to="/map"><button className="notching">Go to map</button></Link>
                </div>
            </div>
            <div id="teaser-single" className='centered-element'>
                {trips && trips[0] && <SingleTripShortView trip={trips[0]} experiences={experiences} />}
            </div>
            <div id="teaser-3d">
                <SceneSection trips={trips} />
            </div>
            <div id="teaser-footprint">
                <FootprintSection trips={trips} />
            </div>
            <div id="teaser-all">
                <AllTripsTagView trips={trips} />
            </div>
        </div>
    )
}

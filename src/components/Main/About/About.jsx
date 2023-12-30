import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CompensationTree from '../Footprint/CompensationTree'
import SingleTripShortView from './SingleTripShortView'
import AllTripsTagView from './AllTripsTagView'
import TitleSection from './TitleSection'

export default function About() {

    const [trips, setTrips] = useState([
        {
            name: "Griechenland 2023",
            periodFrom: "18.06.2023",
            periodTo: "30.06.2023",
            placeFrom: "Frankfurt Hahn",
            placeTo: "Corfu",
            vehicle: "Plane",
            travellers: 2,
            emissions: 234.567,
            compensated: true
        },
        {
            name: "Schweden 2023",
            periodFrom: "02.09.2023",
            periodTo: "18.09.2023",
            placeFrom: "Rostock",
            placeTo: "Göteborg",
            vehicle: "Car",
            travellers: 5,
            emissions: 43.567,
            compensated: false
        }
    ])

    return (
        <div id="about">
            <div id="title">
                <TitleSection />
            </div>
            <div id="teaser-map">
                <div>Here comes an image of the map</div>
                <div>
                    <h2>Your trips on the digital scratch map</h2>
                    <p>
                        <ul>
                            <li>Have it everywhere with you</li>
                            <li>No borders</li>
                        </ul>
                    </p>
                    <Link to="/map"><button>Go to map</button></Link>
                </div>
            </div>
            <div id="teaser-footprint">
                <h2>Got to know your footprint</h2>
                <p>Some further explanation about it</p>
                <Link to="/footprint"><button class="btn-secondary">Go to footprint overview</button></Link>
                <div className="notching">Something</div>
                <div>{trips.map((trip) => <CompensationTree compensatedTrip={trip.compensated} />)}</div>
            </div>
            <div id="teaser-single">
                {trips[0] && <SingleTripShortView trip={trips[0]} />}
            </div>
            <div id="teaser-all">
                <AllTripsTagView trips={trips} />
            </div>
        </div>
    )
}

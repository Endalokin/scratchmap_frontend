import React from 'react'
import { Link } from 'react-router-dom'

export default function MapSection() {
    return (<>
        <div><img src="./assets/scratchmap.png" alt="" /></div>
        <div className='centered-element'>
            <h2>Your trips on the digital scratch map</h2>
            <div>
                <ul style={{ textAlign: "left" }}>
                    <li>Always with you</li>
                    <li>Worldwide overview of all your trips</li>
                    <li>Colours fitting your photos</li>
                    <li>Accurate positions of the places you've been to</li>
                    <li>Unbiased by countries and borders</li>
                </ul>
            </div>
            <Link to="/map"><button className="notching">Go to map</button></Link>
        </div>
    </>
    )
}

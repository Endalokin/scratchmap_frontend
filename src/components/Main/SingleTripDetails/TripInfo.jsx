import React from 'react'

export default function TripInfo({ trip }) {
    return (
        <>
            <h2>{trip?.name}</h2>
            <div>
                <div className="tooltip">
                    <p style={{ textAlign: "center" }}>{trip?.placeDeparture} ↔ {trip?.placeArrival} </p>
                    <span className="tooltiptext">Trip from {trip?.placeDeparture} to {trip?.placeArrival} and back</span>
                </div>
                <div className="tooltip">
                    <p style={{ textAlign: "center" }}>{trip?.vehicle == "flight-economy" ? `\u2708` : trip?.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip?.travellers)].map(() => '\u{026F9}')}</p>
                    <span className="tooltiptext">{trip?.travellers} traveller(s) by {trip?.vehicle}</span>
                </div>
            </div>
            <div>
                <div className="flex-between">
                    <div className="tooltip">
                        <span className="tooltiptext">Dates</span>
                        <p>{'\u{1F5D3}'}</p>
                    </div>
                    <p>{new Date(trip?.periodFrom).toLocaleDateString()} - {new Date(trip?.periodUntil).toLocaleDateString()}</p>
                </div>
                <div className="flex-between">
                    <div className="tooltip">
                        <span className="tooltiptext">Emissions</span>
                        <p>CO₂</p>
                    </div>
                    <p>{trip?.footprint?.emission} kg</p>
                </div>
                <div className="flex-between">
                    <div className='tooltip'>
                        <span className='tooltiptext'>Pictures</span>
                        <p>{'\u{1F5BD}'}</p>
                    </div>
                    <p>{trip?.experiences?.length}</p>
                </div>
            </div>
        </>
    )
}

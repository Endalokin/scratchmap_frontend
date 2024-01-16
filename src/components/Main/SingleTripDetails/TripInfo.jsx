import React from 'react'

export default function TripInfo({ trip }) {
    return (
        <>
            <h2>{trip?.name}</h2>
            <div>
                <p style={{ textAlign: "center" }}>{trip?.placeDeparture} ↔ {trip?.placeArrival} </p>
                <p style={{ textAlign: "center" }}>{trip?.vehicle == "flight-economy" ? `\u2708` : trip?.vehicle == "car" ? '\u{1F697}' : '\u{1F686}'} {[...Array(trip?.travellers)].map(() => '\u{026F9}')}</p>
            </div>
            <div>
                <div className="flex-between"><p>{'\u{1F5D3}'}</p> <p>{new Date(trip?.periodFrom).toLocaleDateString()} - {new Date(trip?.periodUntil).toLocaleDateString()}</p></div>
                <div className="flex-between"><p>CO₂</p> <p>{trip?.footprint?.emission} kg</p></div>
                <div className="flex-between"><p>{'\u{1F5BD}'}</p><p>{trip?.experiences?.length}</p></div>
            </div>
        </>
    )
}

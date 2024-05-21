import React from 'react'
import { useOutletContext } from 'react-router-dom'
import fetchData from '../../../../utils/fetchAPI';

export default function DeleteTrackModal({setIsOpen, activeTrack, singleTripDetails}) {

    const { VITE_SERVER_URL } = import.meta.env;
    const [, , , setTrips,] = useOutletContext();

    function deleteNo(e) {
        e.preventDefault()
        setIsOpen(false)
    }

    function deleteYes(e) {
        e.preventDefault()

        setTrips(prev => {
            prev.find((p) => p.id == singleTripDetails.id).tracks = singleTripDetails.tracks.filter(track => track != activeTrack)
            return [...prev]
        })

        const DELETE_URL = `${VITE_SERVER_URL}/trips/deleteTrack/${activeTrack._id}`
        fetchData(DELETE_URL, (data) => {
        }, "DELETE")
        setIsOpen(false)
    }

    return (
        <>
            <div className='modal' id="compensationModal" >
                Do you want to permanently delete track {activeTrack.name}?
                <div>
                    <button className="ribbon ribbon-secondary" onClick={deleteNo}>No</button>
                    <button className="notching" onClick={deleteYes}>Yes</button>
                </div>
            </div>
            <div className="modal-back"></div>
        </>
    )
}

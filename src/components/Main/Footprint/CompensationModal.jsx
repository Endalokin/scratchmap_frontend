import React from 'react'
import fetchData from '../../../utils/fetchAPI';

export default function CompensationModal({ activeTrip, setIsOpen, setTrips }) {

    const { VITE_SERVER_URL } = import.meta.env;

    function compensateNo(e) {
        e.preventDefault()
        if (activeTrip.footprint.compensated == true) {
            setTrips(prev => {
                prev.find((p) => p.id == activeTrip.id).footprint.compensated = false
                return [...prev]
            })
            const UPDATE_URL = `${VITE_SERVER_URL}/trips/updateCompensation/${activeTrip.id}?set=false`
            fetchData(UPDATE_URL, (data) => {
              }, "PUT")
        }
        setIsOpen(false)
    }

    function compensateYes(e) {
        e.preventDefault()
        if (activeTrip.footprint.compensated == false) {
            setTrips(prev => {
                prev.find((p) => p.id == activeTrip.id).footprint.compensated = true
                console.log(activeTrip.footprint.compensated)
                return [...prev]
            })
            const UPDATE_URL = `${VITE_SERVER_URL}/trips/updateCompensation/${activeTrip.id}?set=true`
            fetchData(UPDATE_URL, (data) => {
              }, "PUT")
        }
        setIsOpen(false)
    }

    return (
        <>
            <div className='modal' id="compensationModal" >
                I compensate my travel {activeTrip?.name} with an amount of {activeTrip?.footprint.amount.toFixed(2)} €.
                <div>
                    <button className="ribbon ribbon-secondary" onClick={compensateNo}>No</button>
                    <button className="notching" onClick={compensateYes}>Yes</button>
                </div>
            </div>
            <div className="modal-back"></div>
        </>
    )
}

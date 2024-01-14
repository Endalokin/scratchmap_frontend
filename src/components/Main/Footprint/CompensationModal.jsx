import React from 'react'

export default function CompensationModal({ activeTrip, setIsOpen }) {


    function closeModal (e) {
        e.preventDefault()
        setIsOpen(false)
    }

    function changeCompensation (e) {
        e.preventDefault()
        setIsOpen(false)
    }


    return (
        <>
        <div className='modal' id="compensationModal" >
            I compensate my travel {activeTrip?.name} with an amount of {activeTrip?.amount}.
            <div>
                <button className="ribbon2" onClick={closeModal}>Cancel</button>
                <button className="notching" onClick={changeCompensation}>Agree</button>
            </div>
        </div>
        <div className="modal-back"></div>
        </>
    )
}

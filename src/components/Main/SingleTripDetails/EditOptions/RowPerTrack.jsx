import React, { useState } from 'react'
import CompensationModal from '../../Footprint/CompensationModal'

export default function RowPerTrack({ t, setIsOpen }) {

    function openDeleteTrackDialog(e) {
        e.preventDefault();
        setIsOpen(true)
    }
    console.log(t)

    return (
        <>
            <li>{t.name}<button onClick={openDeleteTrackDialog}>{'\u2716'}</button></li>
        </>
    )
}

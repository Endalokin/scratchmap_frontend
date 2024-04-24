import React, { useState } from 'react'
import CompensationModal from '../../Footprint/CompensationModal'

export default function RowPerTrack({ t, setIsOpen, setActiveTrack }) {

    function openDeleteTrackDialog(e) {
        e.preventDefault();
        setActiveTrack(t)
        setIsOpen(true)
    }

    return (
        <>
            <li>{t.name}<button onClick={openDeleteTrackDialog}>{'\u2716'}</button></li>
        </>
    )
}

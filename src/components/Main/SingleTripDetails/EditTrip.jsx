import React, { useState } from 'react'
import { parseGpxFile } from '../../../utils/parseGPXFile';
import fetchData from '../../../utils/fetchAPI';
import RowPerTrack from './EditOptions/RowPerTrack';

export default function EditTrip({ singleTripDetails, toggleFilterVisibility }) {

    const { VITE_SERVER_URL } = import.meta.env;
    const [valueTracks, setValueTracks] = useState()
    const [isOpen, setIsOpen] = useState(false)

    async function trackUpload(e) {
        e.preventDefault()
        console.log("A track is loading")
        console.log("It is ", valueTracks[0])
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            async () => {
                const parseGpxData = await parseGpxFile(reader.result);

                let body = {
                    name: parseGpxData[0]?.name,
                    path: parseGpxData[0]?.positions
                }
                const POST_TRACK_URL = `${VITE_SERVER_URL}/trips/addTrack/${singleTripDetails?.id}`
                fetchData(POST_TRACK_URL, (data) => {
                    console.log(data)
                }, "POST", body)
            },
            false,
        );

        if (valueTracks[0]) {
            reader.readAsText(valueTracks[0]);
        }
    }

    function handleChange(e) {
        let inputId = e.target.id;
        if (inputId == "add_gpx_track") {
            setValueTracks(e.target.files);
        }
    }

    function deleteNo () {
        setIsOpen(false)
    }
    function deleteYes () {
        setIsOpen(false)
    }

    return (
        <>
            <button onClick={toggleFilterVisibility}>Hide</button>
            <h2>Edit</h2>
            <div>
                <h3>Tracks</h3>
                <ul>
                    {singleTripDetails?.tracks?.map(t => <RowPerTrack key={t.id} t={t} setIsOpen={setIsOpen} /> )}
                </ul>
                <form action="" onSubmit={trackUpload}>
                    <input type="file" name="add_gpx_track" id="add_gpx_track" accept=".gpx" onChange={handleChange} /* multiple */ /><br />
                    <button>Add track</button>
                </form>
            </div>
            {isOpen && 
            <>
                <div className='modal' id="compensationModal" >
                Do you want to permanently delete this track?
                <div>
                    <button className="ribbon ribbon-secondary" onClick={deleteNo}>No</button>
                    <button className="notching" onClick={deleteYes}>Yes</button>
                </div>
                </div>
                <div className="modal-back"></div>
            </>
            }
        </>
    )
}

import React, { useState } from 'react'
import { parseGpxFile } from '../../../utils/parseGPXFile';
import fetchData from '../../../utils/fetchAPI';
import RowPerTrack from './EditOptions/RowPerTrack';
import { useOutletContext } from 'react-router-dom'

export default function EditTrip({ singleTripDetails, toggleFilterVisibility }) {

    const { VITE_SERVER_URL } = import.meta.env;
    const [newTrack, setNewTrack] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [activeTrack, setActiveTrack] = useState()
    const [adder, setAdder] = useState(<button>Add track</button>)
    const [, , , setTrips, user ] = useOutletContext();

    async function trackUpload(e) {
        e.preventDefault()
        setAdder(<p className="rotating">{'\u27F3'}</p>)
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
                    const TRIPS_URL = `${VITE_SERVER_URL}/trips`
                    let controller = new AbortController();
                    fetchData(TRIPS_URL, (data) => {
                        setTrips(data)
                      }, "GET", null, user?.token, controller)
                    e.target.reset()
                    setAdder(<button>Add track</button>)
                }, "POST", body)
            },
            false,
        );

        if (newTrack[0]) {
            reader.readAsText(newTrack[0]);
        }
    }

    function handleChange(e) {
        let inputId = e.target.id;
        if (inputId == "add_gpx_track") {
            setNewTrack(e.target.files);
        }
    }

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

        const DELETE_URL = `${VITE_SERVER_URL}/trips/deleteTrack/${activeTrack.id}`
        fetchData(DELETE_URL, (data) => {
        }, "DELETE")
        setIsOpen(false)
    }

    return (
        <>
            <button onClick={toggleFilterVisibility}>Hide</button>
            <h2>Edit</h2>
            <div>
                <h3>Tracks</h3>
                <ul>
                    {singleTripDetails?.tracks?.map(t => <RowPerTrack key={t.id} t={t} setIsOpen={setIsOpen} setActiveTrack={setActiveTrack}/>)}
                </ul>
                <form action="" onSubmit={trackUpload}>
                    <input type="file" name="add_gpx_track" id="add_gpx_track" accept=".gpx" onChange={handleChange} /* multiple */ /><br />
                    {adder}
                </form>
            </div>
            {isOpen &&
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
            }
        </>
    )
}

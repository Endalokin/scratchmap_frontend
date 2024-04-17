import React, { useState } from 'react'
import { parseGpxFile } from '../../../utils/parseGPXFile';
import fetchData from '../../../utils/fetchAPI';

export default function EditTrip({ singleTripDetails, toggleFilterVisibility }) {

    const { VITE_SERVER_URL } = import.meta.env;
    const [valueTracks, setValueTracks] = useState()

    async function trackUpload(e) {
        e.preventDefault()
        console.log("A track is loading")
        console.log("It is ", valueTracks[0])
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            async () => {
                // this will then display a text file
                const parseGpxData = await parseGpxFile(reader.result);
                console.log("I transformed it to: ", parseGpxData)

                let body = {
                    name: parseGpxData[0]?.name,
                    path: parseGpxData[0]?.positions
                }
                console.log(body)
                const POST_TRACK_URL = `${VITE_SERVER_URL}/trips/addTrack/${singleTripDetails?.id}`
                console.log(POST_TRACK_URL)
                fetchData(POST_TRACK_URL, (data) => {
                    console.log(data)
                }, "POST", body)
            },
            false,
        );

        if (valueTracks[0]) {
            reader.readAsText(valueTracks[0]);
        }
/*         const parseGpxData = await parseGpxFile(valueTracks[0].name);
        console.log(parseGpxData) 
 */    }
    function handleChange(e) {
        let inputId = e.target.id;
        if (inputId == "add_gpx_track") {
            setValueTracks(e.target.files);
        }
    }

    return (
        <>
            <button onClick={toggleFilterVisibility}>Hide</button>
            <h2>Edit</h2>
            <div>
                <h3>Tracks</h3>
                <form action="" onSubmit={trackUpload}>
                    <input type="file" name="add_gpx_track" id="add_gpx_track" accept=".gpx" onChange={handleChange} multiple /><br />
                    <button>Add tracks</button>
                </form>
            </div>
        </>
    )
}

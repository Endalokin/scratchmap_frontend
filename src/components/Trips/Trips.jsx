import React, { useState } from 'react'
import { useOutletContext } from 'react-router';
import TripsRows from './TripsRows';
import ImgGallery from '../Main/SingleTripDetails/ImgGallery';

export default function Trips() {

    const [experiences, , trips, setTrips] = useOutletContext();
    const [lastSort, setLastSort] = useState({ term: "", direction: "" })

    function sortBy(e) {
        e.preventDefault();
        let sortTerm = e.target.id.split("-")[1]
        let sorted
        if (lastSort.term != sortTerm || lastSort.direction != "asc") {
            sorted = [...trips]?.sort((a, b) => {
                if (a[sortTerm] > b[sortTerm]) {
                    return 1
                } else if (a[sortTerm] < b[sortTerm]) {
                    return -1
                }
                return 0
            })
            setLastSort({ term: sortTerm, direction: "asc" })
        } else {
            sorted = [...trips]?.sort((a, b) => {
                if (a[sortTerm] < b[sortTerm]) {
                    return 1
                } else if (a[sortTerm] > b[sortTerm]) {
                    return -1
                }
                return 0
            })
            setLastSort({ term: sortTerm, direction: "desc" })
        }
        setTrips(sorted)
    }

    return (
        <>
            <div className="pre-table-content" >
            </div>
            <div className="full-width vertical-scroll-80" style={{ maxHeight: "calc(100vh - 197px)" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Impression</th>
                            <th onClick={sortBy} id="th-name">Name of the Trip {'\u21F5'}</th>
                            <th className="hide-xs">Directions</th>
                            <th onClick={sortBy} id="th-periodFrom">Dates {'\u21F5'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips?.map((trip) => <TripsRows key={`row-${trip.id}`} trip={trip} setTrips={setTrips} experience={experiences?.find(experience => experience.id == trip.experiences[0].sys.id)} />)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

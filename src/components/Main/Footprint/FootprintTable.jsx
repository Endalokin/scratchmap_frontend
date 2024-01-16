import React from 'react'
import TableRowPerTrip from './TableRowPerTrip'

export default function FootprintTable({trips, setTrips, setActiveTrip, setIsOpen}) {

    function sortBy(e) {
        e.preventDefault();
        let sortTerm = e.target.textContent.toLowerCase().split(" ")[0]
        console.log(sortTerm)
        let sorted = [...trips]?.sort((a, b) => {
            if (a.footprint && a.footprint[sortTerm] > b.footprint[sortTerm]) {
                return -1
            } else if (a.footprint && a.footprint[sortTerm] < b.footprint[sortTerm]) {
                return 1
            } else if (a[sortTerm] > b[sortTerm]) {
                return 1
            } else if (a[sortTerm] < b[sortTerm]) {
                return -1
            }
            return 0
        })
        setTrips(sorted)
    }

    return (
        <div className="full-width vertical-scroll-80" style={{maxHeight: "calc(100vh - 197px)"}}>
            <table>
                <thead>
                    <tr>
                        <th onClick={sortBy}>Name of the Trip {'\u21F5'}</th>
                        <th className="hide-xs">Directions</th>
                        <th onClick={sortBy}>Distance * {'\u21F5'}</th>
                        <th onClick={sortBy}>Emission * {'\u21F5'}</th>
                        <th>Amount **</th>
                        <th>Compensated</th>
                    </tr>
                </thead>
                <tbody>
                    {trips?.map((trip) => <TableRowPerTrip key={`row-${trip.id}`} trip={trip} setTrips={setTrips} setIsOpen={setIsOpen} setActiveTrip={setActiveTrip} />)}
                </tbody>
            </table>
            <p className="fine-print">*Calculation by CarbonTracer (<a href="https://carbontracer.uni-graz.at/">https://carbontracer.uni-graz.at/</a>)</p>
            <p className="fine-print">**Amount equates CO2-price from 2022 of 30€ per tonne according to German Bundesfinanzministerium (<a href="https://www.bundesfinanzministerium.de/Content/DE/FAQ/klimaschutz.html">https://www.bundesfinanzministerium.de/Content/DE/FAQ/klimaschutz.html</a>)</p>
        </div>
    )
}

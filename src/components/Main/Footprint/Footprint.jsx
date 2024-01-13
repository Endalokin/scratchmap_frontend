import React, { useEffect } from 'react'
import { useOutletContext, useParams, Link } from 'react-router-dom'
import TableRowPerTrip from './TableRowPerTrip'
import CompensationTree from './CompensationTree'
import CalculateNextTrip from './CalculateNextTrip'
import FootprintComparisonChart from './FootprintComparisonChart'

export default function Footprint() {

    const [, , trips, setTrips] = useOutletContext();

    useEffect(() => {
        trips?.sort((a, b) => {
            if (a.footprint?.amount > b.footprint?.amount) {
                return -1
            } else if (a.footprint?.amount < b.footprint?.amount) {
                return 1
            }
            return 0
        })
    }, [])

    const { display = "table" } = useParams()

    function sortBy(e) {
        e.preventDefault();
        let sortTerm = e.target.textContent.toLowerCase().split(" ")[0]
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
        <div className="fixed-site">
            <div>
                <div>
                    {display == "chart" ? <Link to={`${window.location.origin}/footprint/table`}><button className="ribbon">Show Table</button></Link> : <Link to={`${window.location.origin}/footprint/chart`}><button className="ribbon">Show Chart</button></Link>}
                </div>
                
            </div>
            {display == "chart" ? <FootprintComparisonChart trips={trips} /> :
                <div className="full-width">
                    <div style={{ height: "89px" }} >{trips?.map((trip) => <CompensationTree key={`tree-${trip.id}`} compensatedTrip={trip.footprint?.compensated} />)} </div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={sortBy}>Name of the Trip {'\u21F5'}</th>
                                <th className="hide-xs">Directions</th>
                                <th onClick={sortBy}>Distance {'\u21F5'}</th>
                                <th onClick={sortBy}>Emission {'\u21F5'}</th>
                                <th>Amount</th>
                                <th>Compensated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips?.map((trip) => <TableRowPerTrip key={`row-${trip.id}`} trip={trip} setTrips={setTrips} />)}
                        </tbody>
                    </table>
                    <CalculateNextTrip />
                </div>
            }
        </div>
    )
}

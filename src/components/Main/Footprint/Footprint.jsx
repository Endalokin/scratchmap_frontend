import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams, Link } from 'react-router-dom'
import CompensationTree from './CompensationTree'
import CalculateNextTrip from './CalculateNextTrip'
import FootprintComparisonChart from './FootprintComparisonChart'
import CompensationModal from './CompensationModal'
import FootprintTable from './FootprintTable'

export default function Footprint() {

    const [, , trips, setTrips] = useOutletContext();
    const [isOpen, setIsOpen] = useState(false)
    const [activeTrip, setActiveTrip] = useState()

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

    return (
        <div className="fixed-site">
            <div className="pre-table-content" >
                <div>
                    {trips?.map((trip) => <CompensationTree key={`tree-${trip.id}`} compensatedTrip={trip.footprint?.compensated} />)}
                </div>
                <div>
                    <Link to={`${window.location.origin}/footprint/table`}><button className={`ribbon ribbon-first ${display == "table" && "ribbon-active"}`}>Table</button></Link>
                    <Link to={`${window.location.origin}/footprint/chart`}><button className={`ribbon ribbon-middle ${display == "chart" && "ribbon-active"}`}>Chart</button></Link>
                    <Link to={`${window.location.origin}/footprint/calc`}><button className={`ribbon ribbon-last ${display == "calc" && "ribbon-active"}`}>Calc</button></Link>
                </div>
            </div>
            {display == "chart" ? <FootprintComparisonChart trips={trips} /> : display == "table" ? <FootprintTable trips={trips} setTrips={setTrips} setActiveTrip={setActiveTrip} setIsOpen={setIsOpen} /> : <CalculateNextTrip />}
            {isOpen && <CompensationModal activeTrip={activeTrip} setIsOpen={setIsOpen} setTrips={setTrips} />}
        </div>
    )
}

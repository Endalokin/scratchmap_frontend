import React, { useState } from 'react'
import fetchData from '../../../utils/fetchAPI'

export default function CalculateNextTrip() {

    const { VITE_SERVER_URL } = import.meta.env

    const [warning, setWarning] = useState()
    const [valueFrom, setValueFrom] = useState()
    const [valueTo, setValueTo] = useState()
    const [valuePer, setValuePer] = useState()
    const [valueTravellers, setValueTravellers] = useState()
    const [valueRoundtrip, setValueRoundtrip] = useState(false)
    const [nextTrip, setNextTrip] = useState()

    function handleChange(e) {
        // gives the value of the targetted element
        let value = e.target.value;
        let inputId = e.target.id;
        if (inputId == "input-from") {
            setValueFrom(value);
        } else if (inputId == "input-to") {
            setValueTo(value);
        } else if (inputId == "vehicle") {
            setValuePer(value);
        } else if (inputId == "input-travellers") {
            setValueTravellers(value);
        } else if (inputId == "input-roundtrip") {
            setValueRoundtrip(prev => {
                return !prev
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (valueFrom && valueTo && valuePer && valueTravellers) {
            setWarning()
            setNextTrip()
            const NEXT_URL = `${VITE_SERVER_URL}/trips/calculateNext?vehicle=${valuePer}&departure=${valueFrom}&arrival=${valueTo}&travellers=${valueTravellers}&roundtrip=${valueRoundtrip}`
            fetchData(NEXT_URL, (data) => {
                console.log(data)
                if (!data.errors) {
                    setNextTrip(`This trip using a ${valuePer} will cause ~ ${Math.ceil(data.emission)} kg CO2 per person (${Math.ceil(data.amount)} €).`)
                } else {
                    setWarning(`No emissions could be calculated with your input. ${data.errors.map(e => e)}`)
                }
            })
        } else {
            setWarning("Please fill out all fields.")
            setNextTrip()
        }
    }

    return (
        <div className='showUp'>
            {/* This needs some formatting */}
            <div className="centered-element">
                <h2>Calculator</h2>
                <p>Type in the properties of your future trip to know the emissions it cause.</p>
            </div>

            <div className='single-details centered-element' style={{ display: "block" }}>
                <form action="" onSubmit={handleSubmit}>
                    <p style={{ color: "red" }}>{warning}</p>
                    <div className='input-fields'>
                        <div>
                            <label htmlFor="input-from">From</label>
                            <input type="text" id="input-from" placeholder='Berlin' value={valueFrom} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="">To</label>
                            <input type="text" id="input-to" placeholder='Paris' value={valueTo} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="vehicle">Per</label>
                            <select name="vehicle" id="vehicle" value={valuePer} onChange={handleChange} >
                                <option disabled selected value> -- select an option -- </option>
                                <option value="car">car</option>
                                <option value="e-car">e-car</option>
                                <option value="bus">bus</option>
                                <option value="e-bus">e-bus</option>
                                <option value="train">train</option>
                                <option value="flight-economy">flight-economy</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="input-travellers">Travellers</label>
                            <input type="number" min={1} id="input-travellers" value={valueTravellers} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="input-roundtrip">Round Trip</label>
                            <input type="checkbox" id="input-roundtrip" value={valueRoundtrip} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="notching">Calculate Emissions</button>
                </form>
                {nextTrip && <p>{nextTrip}</p>}
            </div>
            <p className="fine-print">*Calculation by CarbonTracer (<a href="https://carbontracer.uni-graz.at/">https://carbontracer.uni-graz.at/</a>)</p>
            <p className="fine-print">**Amount equates CO2-price from 2022 of 30€ per tonne according to German Bundesfinanzministerium (<a href="https://www.bundesfinanzministerium.de/Content/DE/FAQ/klimaschutz.html">https://www.bundesfinanzministerium.de/Content/DE/FAQ/klimaschutz.html</a>)</p>
        </div>
    )
}

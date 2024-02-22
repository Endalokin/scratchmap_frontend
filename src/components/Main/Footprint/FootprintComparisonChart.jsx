import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export { ChartJS }

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Comparison own footprint vs. German average',
        },
    },
};

export default function FootprintComparisonChart({ trips }) {

    ChartJS.defaults.color = getComputedStyle(document.body).color;
    ChartJS.defaults.font.family = getComputedStyle(document.body).fontFamily;
    ChartJS.defaults.font.size = getComputedStyle(document.body).fontSize.split("px")[0];

    let minValue = Math.min.apply(null,
        trips?.map((o) => { return Number(o.periodFrom?.split("-")[0]) }));
    let maxValue = Math.max.apply(null,
        trips?.map((o) => { return Number(o.periodFrom?.split("-")[0]) }));

    let labels = []
    for (let i = minValue; i <= maxValue; i++) {
        labels.push(i)
    }
    labels.map((l) => {
        let tripsThatYear = []
        tripsThatYear = trips.filter(t => t.periodFrom?.split("-")[0] == l)
        let tripsThatYearEmission = 0
        tripsThatYear.length > 0 && (tripsThatYearEmission = tripsThatYear.reduce((acc, curr) => { return (acc.footprint?.emission + curr.footprint?.emission) / 1000 }))
        return tripsThatYearEmission
    })

    let data = {
        labels,
        datasets: [
            {
                label: 'Own Emissions due to Travels only',
                data: labels.map((l) => {
                    let tripsThatYear = []
                    tripsThatYear = trips.filter(t => t.periodFrom?.split("-")[0] == l)
                    let tripsThatYearEmission = 0
                    tripsThatYear.length > 1 ? (tripsThatYearEmission = tripsThatYear.reduce((acc, curr) => { 
                        return ((acc.footprint ? acc.footprint?.emission : acc) + curr.footprint?.emission)  
                    })) : tripsThatYear.length == 1 ? tripsThatYearEmission = tripsThatYear[0].footprint.emission  : tripsThatYearEmission = 0
                    return tripsThatYearEmission / 1000
                }),
                borderColor: 'rgb(129, 158, 179)',
                backgroundColor: 'rgba(129, 158, 179, 0.5)',
            },
            {
                label: 'German Average Travels by Plane*',
                data: labels.map((l) => { return 0.53 }),
                borderColor: 'rgb(250, 136, 163)',
                backgroundColor: 'rgba(250, 136, 163, 0.5)',
            },
            {
                label: 'German Average Total Mobility*',
                data: labels.map((l) => { return 0.24 + 1.41 + 0.53 }),
                borderColor: 'rgb(194, 65, 95)',
                backgroundColor: 'rgba(194, 65, 95, 0.5)',
            },
        ],
    };

    return (
        <>
            <div style={{ height: "89px" }}></div>
            <div id="footprint-comparison-chart">
                <Line options={options} data={data} height={"80vh"} />
            </div>
            <p className="fine-print">*German Averages taken from "CO2-Rechner des Umweltbundesamtes. Meine CO2-Bilanz" 2024 (<a href="https://uba.co2-rechner.de/de_DE/mobility#panel-calc">https://uba.co2-rechner.de/de_DE/mobility#panel-calc</a>)</p>
        </>
    )
}

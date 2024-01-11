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
                label: 'German Average Total Mobility',
                data: labels.map((l) => { return 0.24 + 1.41 + 0.53 }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'German Average Travels by Plane',
                data: labels.map((l) => { return 0.53 }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
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
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <>
            <div style={{ height: "89px" }}></div>
            <div id="footprint-comparison-chart">
                <Line options={options} data={data} height={"80vh"} />
            </div>
        </>
    )
}

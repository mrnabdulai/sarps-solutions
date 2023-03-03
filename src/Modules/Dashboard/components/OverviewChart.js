import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line, } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
ChartJS.defaults.font.family = 'Manrope';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    tension: 0.45
    , elements: {
        point: {
            radius: 0
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    responsive: true,
    label: {
        display: false //This will do the task
    },
    plugins: {
        legend: {
            position: 'top',
            display: false,
            labels: {
                fontSize: 16
            }
        },
        title: {
            display: true,
            text: 'Customers',
            font: {
                size: 16
            }
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Customers',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function OverViewChart() {
    return <div>
        <Line options={options} data={data} />
    </div>;
}

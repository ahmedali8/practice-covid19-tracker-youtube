import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {

        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();
    }, []);

    // making line chart for global data
    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ reportDate }) => reportDate),
                    datasets: [{
                        label: 'Infected',
                        fill: true,
                        borderColor: '#3333ff',
                        data: dailyData.map(({ confirmed }) => confirmed),
                    }, {
                        label: 'Deaths',
                        fill: true,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        borderColor: 'red',
                        data: dailyData.map(({ deaths }) => deaths),
                    }],
                }}
            />
        ) : null
    );

    // making bar chart for country data
    const barChart = (
        confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
}

export default Chart;
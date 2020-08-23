import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = () => {
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

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    );
}

export default Chart;
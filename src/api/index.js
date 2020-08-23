import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// fetching tha data through the api 
export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log('fetchDataError: ', error);
    }
};


// fetching the daily data
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        // looping through the data to get the desired daily data only
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            reportDate: dailyData.reportDate
        }));

        return modifiedData;

    } catch (error) {
        console.log('fetchDailyDataError: ', error);
    }
};
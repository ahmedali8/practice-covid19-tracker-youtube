import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// fetching tha data through the api 
export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log('fetchData: ', error);
    }
};

import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../api';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        };

        fetchAPI();
    }, [setFetchedCountries]);


    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => (handleCountryChange(e.target.value))}> {/* getting the country name in 'e' and sending it to App.js handle fn */}
                <option value="global">Global</option>
                    {fetchedCountries.map((country, i) => (
                        <option key={i} value={country}>{country}</option>
                    ))}
            </NativeSelect>
            <div className={styles.text}>Rotate the screen on mobile phone</div>
        </FormControl>
    );
}

export default CountryPicker;

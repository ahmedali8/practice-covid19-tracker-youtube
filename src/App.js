import React, { Component } from 'react';

import { Cards, CountryPicker, Chart } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends Component {

	async componentDidMount () {
		const data = await fetchData();

		console.log('componentDidMount: ', data);
	}


	render() {
		return(
			<div className={styles.container}>
				<h1>App</h1>
				<Cards />
				<CountryPicker />
				<Chart />
			</div>
		);
	}
}

export default App;
import React from 'react';
import Jumbotron from './Jumbotron';
import Pill from './Pill';

export default class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<div>
			<Jumbotron/>
			<Pill/>

			</div>
		);
	}
}	
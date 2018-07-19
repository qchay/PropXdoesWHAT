import React, { Component } from 'react';
import Laws from './Laws/';


class Laws_Model extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">	
			{law_array.map((law_array_item, i) => 
				<Laws key = {i} law_data = {law_array_item}/>)}
			</div>
			);
	}
}	

export default Laws_Model;
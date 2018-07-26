// Row.jsx
import React from 'react';
import Politician from './Politician'

export default class Row extends React.Component {
	render() {
  		return (
 			<div className="row">
				{this.props.politician_array.map((politician_array_item, i) => 
					<Politician key = {i} politician_data = {politician_array_item}/>)}
			</div>
    	);
  	}
}
// Album.jsx
import React from 'react';
import Row from './Row';

export default class Album extends React.Component {
	render() {
  		return (
  			<div className="album py-5" id="album">
  				<div className="container">	
    				{this.props.row_array.map((row_array_item, i) => <Row key = {i} politician_array = {row_array_item}/>)}
				</div>
  			</div>
    	);
  	}
}

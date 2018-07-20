import React from 'react';
import Law from './Law';

export default class Law_List extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var law_array = this.props.law_array
  		return (
  			<div className="container">
		 	   	{law_array.map((law_array_item, i) => <Law key = {i} law_data = {law_array_item}/>)}
			</div>
    	);
  	}
}	
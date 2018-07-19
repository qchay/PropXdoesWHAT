// Layout.jsx
import React from 'react';

export default class Example extends React.Component {
	constructor(props) { super(props); }
	render() {
		console.log(this.props);
  		return (
			<p>Example! Page: {this.props.match.params.page_number}</p>
    	);
  	}
}	
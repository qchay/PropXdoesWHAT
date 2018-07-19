// Row.jsx
import React from 'react';

export default class Filter extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = {buttonclicked: "Nope"};
		this.filterbutton = this.filterbutton.bind(this);
	}

	filterbutton () {
		console.log("filterbutton")
		this.setState({buttonclicked :"Yep"});
		let filterjson = {"filters":[{"name":"first_name","op":"eq","val":"Ted"},{"name":"last_name","op":"eq","val":"Cruz"}]}
		console.log(this.props.getJsonResponseCallBack);
		this.props.getJsonResponseCallBack(filterjson);
	}
	render() {
  		return (
  			<div>
	  			<p> {this.state.buttonclicked} </p>
	  			<button onClick={this.filterbutton}>
	  				Filter
				</button>
			</div>
    	);
  	}
}	
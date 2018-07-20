// Politician.jsx
import React from 'react';
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';

export default class Politician extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			partyMap: {
				R : "Republican",
				D : "Democrat",
				I : "Independent"
			},
			pictureMap: {
				R : republican,
				D : democrat,
				I : independent
			},
		};
	}
	render() {
  		return (
	  		<div className="col-md-4">
	 			<div className="card mb-4 box-shadow" id="politician-card">
					<div id="politician-headshot-box">
						<a href={'/politicians/' + this.props.politician_data.first_name + '_' + this.props.politician_data.last_name + '/' + this.props.politician_data.id}>
							<img className="card-img-top" id="politician-headshot" src={this.state.pictureMap[this.props.politician_data.party]} alt="Card image cap"/>
						</a>
					</div>

					<div className="card-body">
						<h3 id="card-name">{this.props.politician_data.first_name} {this.props.politician_data.last_name}</h3>
						<div id="card-attr">
							<li>Party: {this.state.partyMap[this.props.politician_data.party]}</li>
							<li>Chamber: {this.props.politician_data.chamber[0].toUpperCase() + this.props.politician_data.chamber.substring(1)}</li>
							<li>Legislator’s state: {this.props.politician_data.state}</li>
						</div>
					</div>
				</div>
			</div>
    	);
  	}
}	
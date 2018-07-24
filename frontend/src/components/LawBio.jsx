import React from 'react';
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';

class Bio extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="description-box">
					<h1 className="text-center" id="bio-title">{this.props.law_data.title}</h1>
					<h3 className="text-center">Description</h3>
					<h5 id="description">{this.props.law_data.desc}</h5>

					<li className="list-group-item list-group-item-primary">Sponsor: {this.props.law_data.sponsor.first_name + ' '
					+ this.props.law_data.sponsor.last_name + ' (' + this.props.law_data.sponsor.party + ')'}</li>
					<li className="list-group-item list-group-item-primary">Introduced: {this.props.law_data.introduced} </li>
					<li className="list-group-item list-group-item-primary">Name: {this.props.law_data.name}</li>
					<li className="list-group-item list-group-item-primary">GovTrack: 
						<a href={this.props.law_data.govtrack_url}>{this.props.law_data.govtrack_url}</a>
					</li>
					<li className="list-group-item list-group-item-primary">Subject: {this.props.law_data.subject}</li>
				</div>
			</div>
		);
	}
}

// Slightly different than the component in the politicians.js file
class Politician extends React.Component {
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
			// this div is here in politicians.js
			<div className="card mb-4 box-shadow" id="politician-card">
				<div id="politician-headshot-box">
					<a href={'/politicians/' + this.props.politician_data.first_name + '_' + this.props.politician_data.last_name + '/' + this.props.politician_data.id}>
						<img className="card-img-top" id="politician-headshot" src={this.state.pictureMap[this.props.politician_data.party]} alt="alt"/>
					</a>
				</div>

				<div className="card-body">
					<h3 id="card-name">{this.props.politician_data.first_name} {this.props.politician_data.last_name}</h3>
					<div id="card-attr">
						<li id="card-list">Party: {this.state.partyMap[this.props.politician_data.party]}</li>
						<li id="card-list">Chamber: {this.props.politician_data.chamber[0].toUpperCase() + this.props.politician_data.chamber.substring(1)}</li>
						<li id="card-list">Legislator’s state: {this.props.politician_data.state}</li>
					</div>
				</div>
			</div>
		);
	}
}


export default class LawBio extends React.Component {
	render(){ 
		// Getting json response
		var law_id = this.props.match.params.id;
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/laws/" + law_id;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);

		// Getting json response
		api = "http://api.propxdoeswhat.me/api/politicians/" + jsonResponse.sponsor.id;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponsePolitician = JSON.parse(httpRequest.responseText);

		return (
			<main>
				<div id="id_number" data-id_number="{{ id_number }}"></div>
				<div>
					<Bio law_data={jsonResponse}/>
				</div>
				<div className="container">
					<div className="row align-items-center justify-content-center" id="relatedBox">
						<h1 className="text-center col-12" id="relatedHeader">Politician related to this law</h1>
						<div className="col-md-4">
							<Politician politician_data={jsonResponsePolitician}/>
						</div>
					</div>
				</div>
			</main>
		);
	}
}
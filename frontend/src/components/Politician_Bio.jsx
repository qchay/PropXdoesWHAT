import React from 'react'; 
import Select from 'react-select'; 
import makeAnimated from 'react-select/lib/animated';
import ReactDOM from 'react-dom';
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';

export default class Politician_Bio extends React.Component {  
	constructor(props) {     
		super(props);     
	}  

	render(){ 
		class Law extends React.Component {
			constructor(props) { super(props); }
			render() {
		  		return (
					<li><a href={'/laws/' + this.props.law_data.name + '/' + this.props.law_data.id}>{this.props.law_data.title}</a></li>
		    	);
		  	}
		}

		class Law_List extends React.Component {
			constructor(props) { super(props); }
			render() {
		  		return (
				  	<div className="container">
						<div className="description-box">
							<h2>Laws related to this Politician</h2>
				  			<ol>
				  				{this.props.law_array.map((law_array_item, i) => <Law key = {i} law_data = {law_array_item}/>)}
							</ol>
						</div>
					</div>
		    	);
		  	}
		}

		class Bio extends React.Component {
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
				  	<div className="container">
						<div className="text-center">
							<img className="center-block" id="politician-bio-picture" src={this.state.pictureMap[this.props.politician_data.party]} alt="Card image cap"/>
						</div>
						<div className="description-box">
							<h1 className="text-center">{this.props.politician_data.first_name} {this.props.politician_data.last_name}</h1>
							<h2>BIO</h2>
							<p>Bio coming soon</p>

							<li>Date of Birth: {getBirthdayAndAge(this.props.politician_data.dob)}</li>
							<li>Party: {this.state.partyMap[this.props.politician_data.party]}</li>
							<li>Chamber: {this.props.politician_data.chamber[0].toUpperCase() + this.props.politician_data.chamber.substring(1)}</li>
							<li>Legislator's State: {this.props.politician_data.state}</li>
							<li>Website: <a href={this.props.politician_data.site}>{this.props.politician_data.site}</a></li>
							<li>Phone Number: {this.props.politician_data.phone}</li>
						</div>
					</div>
		    	);
		  	}
		}	

		// Returns Birthday and Age in a nice format
		function getBirthdayAndAge(dateStr) {
			const monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];
			const [birth_year, birth_month, birth_day] = dateStr.split("-");
			const birthDate =  new Date(birth_year, birth_month - 1, birth_day);
		    var today = new Date();
		    var age = today.getFullYear() - birthDate.getFullYear();
		    var m = today.getMonth() - birthDate.getMonth();
		    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
		    {
		        age--;
		    }
			return (monthNames[birthDate.getMonth()] + ' ' + birthDate.getDate() + ', ' + birthDate.getFullYear() + ' (age ' + age + ')');
		}

		// Getting json response
		var politician_number = this.props.match.params.id;
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/politicians/" + politician_number;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);

		return (   
			<main>
				<Bio politician_data={jsonResponse}/>
				<Law_List law_array={jsonResponse.law}/>
			</main>
		);

	} 
}




class Bio extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
		  	<div className="container">
				<div className="text-center">
					<img className="center-block" id="politician-bio-picture" src="https://cdn1.edgedatg.com/aws/v2/abc/SchoolhouseRock/episode/1697098/212f1befce5deb621a01c48a6d717dea/1000x563-Q90_212f1befce5deb621a01c48a6d717dea.jpg" alt="Card image cap"/>
				</div>
				<div className="description-box">
					<h1 className="text-center">{this.props.law_data.title}</h1>
					<h2>Description</h2>
					<p>{this.props.law_data.desc}</p>

					<li>Sponsor: {this.props.law_data.sponsor.first_name + ' ' + this.props.law_data.sponsor.last_name
						 + ' (' + this.props.law_data.sponsor.party + ')'}</li>
					<li>Introduced: {this.props.law_data.introduced} </li>
					<li>Name: {this.props.law_data.name}</li>
					<li>GovTrack: <a href={this.props.law_data.govtrack_url}> {this.props.law_data.govtrack_url}</a></li>
					<li>Subject: {this.props.law_data.subject}</li>
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
				R : "http://vincentsammons.com/wp-content/uploads/2018/03/republican-party-clipart-18.jpg",
				D : "https://scontent.fftw1-1.fna.fbcdn.net/v/t1.0-9/16681592_606500959548601_7691110575713909985_n.jpg?_nc_cat=0&oh=2c7744391f9b2d1b5da4f01a6faa79cb&oe=5BA1FDCE",
				I : "https://img.etsystatic.com/il/5e6507/1278371421/il_340x270.1278371421_t0rs.jpg?version=0"
			},
		};
		}
	render() {
  		return (
  			// this div is here in politicians.js
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
var law_id = JSON.parse(document.getElementById("id_number").dataset.id_number);
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/laws/" + law_id;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Rendering DOM elements
ReactDOM.render(
	<Bio law_data={jsonResponse}/>,
	document.getElementById('bio')
);


// Getting json response
var api = "http://api.propxdoeswhat.me/api/politicians/" + jsonResponse.sponsor.id;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponsePolitician = JSON.parse(httpRequest.responseText);

// Rendering DOM elements
ReactDOM.render(
	<Politician politician_data={jsonResponsePolitician}/>,
	document.getElementById('politician')
);



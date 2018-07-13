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
				R : "http://vincentsammons.com/wp-content/uploads/2018/03/republican-party-clipart-18.jpg",
				D : "https://scontent.fftw1-1.fna.fbcdn.net/v/t1.0-9/16681592_606500959548601_7691110575713909985_n.jpg?_nc_cat=0&oh=2c7744391f9b2d1b5da4f01a6faa79cb&oe=5BA1FDCE",
				I : "https://img.etsystatic.com/il/5e6507/1278371421/il_340x270.1278371421_t0rs.jpg?version=0"
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
					<h2 className="text-center">Political Spectrum</h2>
					<p className="text-center">---------------------------</p>
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
var politician_number = JSON.parse(document.getElementById("id_number").dataset.id_number);
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/politicians/" + politician_number;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Rendering DOM elements
ReactDOM.render(
	<Bio politician_data={jsonResponse}/>,
	document.getElementById('target')
);


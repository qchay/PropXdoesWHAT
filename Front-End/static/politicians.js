class Row extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
 			<div className="row">
 				{this.props.politician_array.map((politician_array_item, i) => 
 					<Politician key = {i} politician_data = {politician_array_item}/>)}
			</div>
    	);
  	}
}	

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

// Getting json response
var page_number = JSON.parse(document.getElementById("page_number").dataset.page);
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/politicians?page=" + page_number;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Parsing json response, putting data into rows
var row_array = [];
var politician_array = [];
var count = 1;
for (var politician of jsonResponse.objects) {
	if (!(count%3)){
		politician_array.push(politician);
		row_array.push(politician_array);
		var politician_array = [];
	} else {
		politician_array.push(politician);
	}

	if ((count == jsonResponse.objects.length) && (count%3)) {
		row_array.push(politician_array);
	}
	count++;
}

// Rendering DOM elements
ReactDOM.render(
	<div className="container">	
    	{row_array.map((row_array_item, i) => <Row key = {i} politician_array = {row_array_item}/>)}
	</div>, 
	document.getElementById('target')
);


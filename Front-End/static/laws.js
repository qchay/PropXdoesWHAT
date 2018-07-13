class Row extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
 			<div className="row">
 				{this.props.law_array.map((law_array_item, i) => 
 					<Law key = {i} law_data = {law_array_item}/>)}
			</div>
    	);
  	}
}	

class Law extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
	  		<div className="col-md-4">
	 			<div className="card mb-4 box-shadow" id="law-card">
					<a href={'/politicians/' + this.props.law_data.name + '/' + this.props.law_data.id}>
						<div id="law-headshot-box">
							<img className="card-img-top" id="law-headshot" src="https://cdn1.edgedatg.com/aws/v2/abc/SchoolhouseRock/episode/1697098/212f1befce5deb621a01c48a6d717dea/1000x563-Q90_212f1befce5deb621a01c48a6d717dea.jpg" alt="Card image cap"/>
						</div>
					</a>

					<div className="card-body">
						<h3 id="card-name">{this.props.law_data.title.substring(0,50) + (this.props.law_data.title.length > 50 ? '...' : ' ')}</h3>
						<div id="card-attr">
							<li>Sponsor: {this.props.law_data.sponsor.first_name + ' ' + this.props.law_data.sponsor.last_name }</li>
							<li>Subject: {this.props.law_data.subject}</li>
							<li>Introduced: {this.props.law_data.introduced}</li>
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
var api = "http://api.propxdoeswhat.me/api/laws?page=" + page_number;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Parsing json response, putting data into rows
var row_array = [];
var law_array = [];
var count = 1;
for (var law of jsonResponse.objects) {
	if (!(count%3)){
		law_array.push(law);
		row_array.push(law_array);
		var law_array = [];
	} else {
		law_array.push(law);
	}

	if ((count == jsonResponse.objects.length) && (count%3)) {
		row_array.push(law_array);
	}
	count++;
}

// Rendering DOM elements
ReactDOM.render(
	<div className="container">	
    	{row_array.map((row_array_item, i) => <Row key = {i} law_array = {row_array_item}/>)}
	</div>, 
	document.getElementById('album')
);



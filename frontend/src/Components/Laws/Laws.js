class Laws extends React.Component {
	constructor(props) {
		super(props);
		}
	render() {
  		return (
	  		<div className="list-group">
					<a href={'/laws/' + this.props.law_data.name + '/' + this.props.law_data.id} className="list-group-item">
						<h4>{this.props.law_data.title.substring(0,100) + (this.props.law_data.title.length > 100 ? '...' : ' ')}</h4>
						<div className="law-info">
						<li>Sponsor: {this.props.law_data.sponsor.first_name + ' ' + this.props.law_data.sponsor.last_name }</li>
						<li>Subject: {this.props.law_data.subject}</li>
						<li>Introduced: {this.props.law_data.introduced}</li>
						</div>
					</a>
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
var law_array = [];
for (var law of jsonResponse.objects) {
		law_array.push(law);
}

// Rendering DOM elements
ReactDOM.render(
	<div className="container">	
    	{law_array.map((law_array_item, i) => 
 					<Laws key = {i} law_data = {law_array_item}/>)}
	</div>, 
	document.getElementById('album')
);


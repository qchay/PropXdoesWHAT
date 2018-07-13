class Bio extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
		  	<div className="container">
				<div className="description-box">
					<h1 className="text-center">{this.props.action_group_data.name}</h1>
					<h2>Description</h2>
					<p>{this.props.action_group_data.desc}</p>
					<li>Type: {this.props.action_group_data.type} </li>
					<li>Website: <a href={this.props.action_group_data.url}> {this.props.action_group_data.url}</a></li>
				</div>
			</div>
    	);
  	}
}

// Getting json response
var action_group_id = JSON.parse(document.getElementById("id_number").dataset.id_number);
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/action_groups/" + action_group_id;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Rendering DOM elements
ReactDOM.render(
	<Bio action_group_data={jsonResponse}/>,
	document.getElementById('bio')
);



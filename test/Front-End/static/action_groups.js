class Action_Group extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
	  		<div className="list-group">
					<a href={'/action_groups/' + this.props.action_group_data.name.replace(/\s/g, '') + '/' + this.props.action_group_data.id} className="list-group-item">
						<h4>{this.props.action_group_data.name}</h4>
						<div className="law-info">
						<li>Type: {this.props.action_group_data.type}</li>
						</div>
					</a>
			</div>
    	);
  	}
}	

// Getting json response
var page_number = JSON.parse(document.getElementById("page_number").dataset.page);
var httpRequest = new XMLHttpRequest();
var api = "http://api.propxdoeswhat.me/api/action_groups?page=" + page_number;
httpRequest.open("GET", api, false);
httpRequest.send();
var jsonResponse = JSON.parse(httpRequest.responseText);

// Parsing json response, putting data into rows
var action_group_array = [];
for (var action_group of jsonResponse.objects) {
		action_group_array.push(action_group);
}

// Rendering DOM elements
ReactDOM.render(
	<div className="container">	
    	{action_group_array.map((action_group_array_item, i) => 
 			<Action_Group key = {i} action_group_data = {action_group_array_item}/>)}
	</div>, 
	document.getElementById('album')
);

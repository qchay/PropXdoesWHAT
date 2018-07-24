import React from 'react';

export default class ActionGroupBio extends React.Component {
	render(){
		class Bio extends React.Component {
			constructor(props) {
				super(props);
				this.state = {
				};
			}
			render() {
				return (
					<div className="container">
						<div className="description-box">
							<h1 className="text-center" id="bio-title">{this.props.action_group_data.name}</h1>
							<h2 className="text-center" id="description-header">Description</h2>
							<h5 id="description">{this.props.action_group_data.desc}</h5>
							<li className="list-group-item list-group-item-primary">Type: {this.props.action_group_data.type} </li>
							<li className="list-group-item list-group-item-primary">Website: <a href={this.props.action_group_data.url}> {this.props.action_group_data.url}</a></li>
						</div>
					</div>
				);
			}
		}	

		// Getting json response
		var action_group_id = this.props.match.params.id;
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/action_groups/" + action_group_id;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);

		return (
			<main>
				<Bio action_group_data={jsonResponse}/>
			</main>
		);

	}
}
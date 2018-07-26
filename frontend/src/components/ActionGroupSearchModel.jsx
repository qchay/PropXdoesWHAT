import React from 'react';
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';


export default class ActionGroupSearchModel extends React.Component {
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
			<div className="list-group">
					<a href={'/action_groups/' + this.props.action_group_data.name.replace(/\s/g, '') + '/' + this.props.action_group_data.id} className="list-group-item"
					>
						<h5 id="list-name">{this.props.action_group_data.name}</h5>
						<div className="list-info">
							<li id="list-name">Type: {this.props.action_group_data.type}</li>
						</div>
					</a>
			</div>
		);
	}
}
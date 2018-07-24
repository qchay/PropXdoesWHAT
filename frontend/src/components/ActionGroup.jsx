import React from 'react';

export default class ActionGroup extends React.Component {
	render() {
		return (
			<div className="list-group">
					<a href={'/action_groups/' + this.props.action_group_data.name.replace(/\s/g, '') + '/' + this.props.action_group_data.id} className="list-group-item"
					id="list-group-box">
						<h3 id="action-group-list-name">{this.props.action_group_data.name}</h3>
						<div className="list-info">
							<li className="list-group-item list-group-item-primary">Type: {this.props.action_group_data.type}</li>
						</div>
					</a>
			</div>
		);
	}
}
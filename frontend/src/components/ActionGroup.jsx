import React from 'react';

export default class ActionGroup extends React.Component {
	render() {
		return (
			<div className="list-group">
					<a href={'/action_groups/' + this.props.action_group_data.name.replace(/\s/g, '') + '/' + this.props.action_group_data.id} className="list-group-item">
						<h4>{this.props.action_group_data.name}</h4>
						<div className="list-info">
							<li>Type: {this.props.action_group_data.type}</li>
						</div>
					</a>
			</div>
		);
	}
}
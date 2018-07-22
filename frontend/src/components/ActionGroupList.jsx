import React from 'react';
import ActionGroup from './ActionGroup';

export default class ActionGroupList extends React.Component {
	render() {
		var action_group_array = this.props.action_group_array
		return (
			<div className="container">	
				{action_group_array.map((action_group_array_item, i) => <ActionGroup key = {i} action_group_data = {action_group_array_item}/>)}
			</div>
		);
	}
}
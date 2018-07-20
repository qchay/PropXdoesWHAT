import React from 'react';
import Action_Group from './Action_Group';

export default class Action_Group_List extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var action_group_array = this.props.action_group_array
		return (
			<div className="container">	
				{action_group_array.map((action_group_array_item, i) => <Action_Group key = {i} action_group_data = {action_group_array_item}/>)}
			</div>
		);
	}
}
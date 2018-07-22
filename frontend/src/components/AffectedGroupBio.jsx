import React from 'react';

export default class ActionGroupBio extends React.Component {
	render() {
		var affected_group_name = this.props.match.params.affected_group_name;
		affected_group_name = affected_group_name.charAt(0).toUpperCase() + affected_group_name.substr(1);
		return (
			<div className="container">
				<div className="text-center">
					<img className="center-block" id="affected-group-bio-picture" src="http://veteransgroup.com/wp-content/uploads/2016/07/veterans-group-logo.png" alt="alt"></img>
				</div>
				<div className="description-box">
					<h1 className="text-center">{ affected_group_name }</h1>
					<h2><b>Laws Affecting Group:</b></h2>
					<p>National Invasive Species Act of 1996</p>
					<h2><b>Action Groups Associated:</b></h2>
					<p>American Civil Liberties Union</p>
				</div>
			</div>
		);
	}
}
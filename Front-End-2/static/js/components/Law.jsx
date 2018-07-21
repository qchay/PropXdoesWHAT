import React from 'react';

export default class Law extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
			<div className="list-group">
				<a href={'/laws/' + this.props.law_data.name + '/' + this.props.law_data.id} className="list-group-item">
				<h4>{this.props.law_data.title.substring(0,100) + (this.props.law_data.title.length > 100 ? '...' : ' ')}</h4>
				<div className="list-info">
					<li>Sponsor: {this.props.law_data.sponsor.first_name + ' ' + this.props.law_data.sponsor.last_name }</li>
					<li>Subject: {this.props.law_data.subject}</li>
					<li>Introduced: {this.props.law_data.introduced}</li>
				</div>
				</a>
			</div>
		);
	}
}	
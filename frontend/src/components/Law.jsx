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
				<a href={'/laws/' + this.props.law_data.name + '/' + this.props.law_data.id} className="list-group-item" id="list-group-box">
				<h3 id="law-list-name">{this.props.law_data.title.substring(0,150) + (this.props.law_data.title.length > 150 ? '...' : ' ')}</h3>
				<div className="list-info">
					<li className="list-group-item list-group-item-primary">Sponsor: {this.props.law_data.sponsor.first_name + ' ' + this.props.law_data.sponsor.last_name }</li>
					<li className="list-group-item list-group-item-primary">Subject: {this.props.law_data.subject}</li>
					<li className="list-group-item list-group-item-primary">Introduced: {this.props.law_data.introduced}</li>
				</div>
				</a>
			</div>
		);
	}
}	
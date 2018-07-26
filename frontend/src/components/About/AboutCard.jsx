import React from 'react';
import { Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';


export default class AboutCard extends React.Component {
	render() {
		return(
			<Card>
				<div id="about-card-headshot-box">
					<CardImg id="about-card-headshot" src={this.props.card_data.pic} alt="Card image cap" />
				</div>
				<CardBody>
				<CardTitle className="text-center"><h2>{this.props.card_data.name}</h2></CardTitle>
				<CardText id="about-card-body">
					<li className="list-group-item">{this.props.card_data.bio}</li>
					<li className="list-group-item">{this.props.card_data.tasks}</li>
					<li className="list-group-item">{this.props.card_data.commits}</li>
					<li className="list-group-item">{this.props.card_data.issues}</li>
					<li className="list-group-item">{this.props.card_data.issues_created}</li></CardText>
				</CardBody>
			</Card>
		);
	}
}
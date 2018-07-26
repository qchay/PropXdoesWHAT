import React from 'react';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import Album from './Album';
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';


export default class PoliticianSearchModel extends React.Component {
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
			<div>
			<ul class="list-group">
			  <li class="list-group-item">
				<a href={'/politicians/' + this.props.politician_data.first_name + '_' + this.props.politician_data.last_name + '/' + this.props.politician_data.id}>
					<Row>
					<img className="politician-img" src={this.state.pictureMap[this.props.politician_data.party]} alt="alt"/>
					<div className="body-text">
					<h5 id="list-name">Name: {this.props.politician_data.first_name} {this.props.politician_data.last_name}</h5>
  					<p id="list-name">Party: {this.state.partyMap[this.props.politician_data.party]}
  					, Chamber: {this.props.politician_data.chamber[0].toUpperCase() + this.props.politician_data.chamber.substring(1)}
					, Legislator’s state: {this.props.politician_data.state}</p>
					</div>
					</Row>
  				</a>
  			</li>
			</ul>

			</div>
		);
	}
}
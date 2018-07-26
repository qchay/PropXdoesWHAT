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
				<a href={'/laws/' + this.props.law_data.name + '/' + this.props.law_data.id}>
					<Row>
					<div className="body-text">
				<h5 id="list-name">{this.props.law_data.title.substring(0,180) + (this.props.law_data.title.length > 180 ? '...' : ' ')}</h5>
					</div>
					</Row>
  				</a>
  			</li>
			</ul>

			</div>
		);
	}
}
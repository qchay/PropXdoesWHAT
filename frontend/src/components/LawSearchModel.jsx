import React from 'react';
import LawList from './LawList';
import Filter from './Filter';
import PageFooter from './Pagination'
import Sort from './Sort'
import Search from './Search';
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
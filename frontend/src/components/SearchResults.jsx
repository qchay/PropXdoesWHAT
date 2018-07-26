import React from 'react';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import Album from './Album';
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'
import ActionGroupSearchModel from './ActionGroupSearchModel';
import LawSearchModel from './LawSearchModel';
import PoliticianSearchModel from './PoliticianSearchModel';



export default class SearchResults extends React.Component {
	
	render() {

		return (
			<div>
				<PoliticianSearchModel queryStr={this.props.location.search}/>
				<LawSearchModel queryStr={this.props.location.search}/>
				<ActionGroupSearchModel queryStr={this.props.location.search}/>
			</div>
		);
	}
}
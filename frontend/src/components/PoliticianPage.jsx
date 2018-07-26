// Politician_Page.jsx
import React from 'react';
import Album from './Album';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import SortRelevance from './SortRelevance'
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'

export default class PoliticianPage extends React.Component {
	constructor(props) { 
		super(props); 
		const partyOptions = [
			{ value: 'R', label: 'Republican' },
			{ value: 'D', label: 'Democrat' },
			{ value: 'I', label: 'Independent' } ];
		const chamberOptions = [
			{ value: 'house', label: 'House' },
			{ value: 'senate', label: 'Senate' } ];
		const stateOptions = [
			{ label: 'AL' , value: 'AL'},
			{ label: 'AK' , value: 'AK'},
			{ label: 'AZ' , value: 'AZ'},
			{ label: 'AR' , value: 'AR'},
			{ label: 'CA' , value: 'CA'},
			{ label: 'CO' , value: 'CO'},
			{ label: 'CT' , value: 'CT'},
			{ label: 'DE' , value: 'DE'},
			{ label: 'FL' , value: 'FL'},
			{ label: 'GA' , value: 'GA'},
			{ label: 'HI' , value: 'HI'},
			{ label: 'ID' , value: 'ID'},
			{ label: 'IL' , value: 'IL'},
			{ label: 'IN' , value: 'IN'},
			{ label: 'IA' , value: 'IA'},
			{ label: 'KS' , value: 'KS'},
			{ label: 'KY' , value: 'KY'},
			{ label: 'LA' , value: 'LA'},
			{ label: 'ME' , value: 'ME'},
			{ label: 'MD' , value: 'MD'},
			{ label: 'MA' , value: 'MA'},
			{ label: 'MI' , value: 'MI'},
			{ label: 'MN' , value: 'MN'},
			{ label: 'MS' , value: 'MS'},
			{ label: 'MO' , value: 'MO'},
			{ label: 'MT' , value: 'MT'},
			{ label: 'NE' , value: 'NE'},
			{ label: 'NV' , value: 'NV'},
			{ label: 'NH' , value: 'NH'},
			{ label: 'NJ' , value: 'NJ'},
			{ label: 'NM' , value: 'NM'},
			{ label: 'NY' , value: 'NY'},
			{ label: 'NC' , value: 'NC'},
			{ label: 'ND' , value: 'ND'},
			{ label: 'OH' , value: 'OH'},
			{ label: 'OK' , value: 'OK'},
			{ label: 'OR' , value: 'OR'},
			{ label: 'PA' , value: 'PA'},
			{ label: 'RI' , value: 'RI'},
			{ label: 'SC' , value: 'SC'},
			{ label: 'SD' , value: 'SD'},
			{ label: 'TN' , value: 'TN'},
			{ label: 'TX' , value: 'TX'},
			{ label: 'UT' , value: 'UT'},
			{ label: 'VT' , value: 'VT'},
			{ label: 'VA' , value: 'VA'},
			{ label: 'WA' , value: 'WA'},
			{ label: 'WV' , value: 'WV'},
			{ label: 'WI' , value: 'WI'},
			{ label: 'WY' , value: 'WY'} ];
		const page_name = "politicians";
		const filterBoxStyles = { marginTop:'85px', marginBottom:'60px' };
		var filterRowStyles = { marginTop:'50px' };
		const queryStr = this.props.location.search;
		const row_array = [];
		const page_data = {};
		const filterList = ["party", "state", "chamber"];
		this.state = { partyOptions : partyOptions,
					   chamberOptions : chamberOptions,
					   stateOptions : stateOptions,
					   page_name : page_name,
					   filterBoxStyles : filterBoxStyles,
					   filterRowStyles : filterRowStyles,
					   queryStr : queryStr, 
					   row_array : row_array,
					   page_data : page_data,
					   filterList : filterList, 
					   defaultValues : this.getDefaultValues(queryStr, filterList) 
					};
		this.updateCallBack = this.updateCallBack.bind(this)
	}


	convertQueryStr (queryStr) {
		var qJSON = {};

		// Page
		let page = queryString.parse(queryStr).page;
		if (typeof page === "undefined") {
			page = 1;
		}

		// Filters
		qJSON.filters = [{and: []}]
		for (var filterName of this.state.filterList) {
			let filter = queryString.parse(queryStr)[filterName];
			if (typeof filter !== "undefined") {
				let filterJSON = {or:[]};
				if (typeof filter === "string") {
					filterJSON.or[0] = { "name" : filterName, "op" : "eq", "val" : filter};
				} else {
					for(let i = 0; i <filter.length;i++){       
			    		filterJSON.or[i] = { "name" : filterName, "op" : "eq", "val" : filter[i]};
					}
				}
				qJSON.filters[0].and.push(filterJSON);
			}
		}

		// Search
		let search = queryString.parse(queryStr).search;
		if (typeof search !== "undefined") {
			qJSON.search = search;
		}

		// Sorting
		let order_by = queryString.parse(queryStr).order_by;
		let order = queryString.parse(queryStr).order;
		if (typeof order_by !== "undefined" && !(order_by === "relevance")) {
			if (typeof order !== "undefined") {
				qJSON.order_by = [{ field : order_by, direction : order}];
			} else {
				qJSON.order_by = [{ field : order_by, direction : "asc"}];
			}
		}

		// Forming backend query string
		let backendQueryStr = "?page=" + page + "&q=" + JSON.stringify(qJSON);
		return backendQueryStr
	}

	getDefaultValues (queryStr, filterList) {
		let defaultValues = {}

		// Filters
		for (var filterName of filterList) {
			defaultValues[filterName] = [];
			let filter = queryString.parse(queryStr)[filterName];
			if (typeof filter !== "undefined") {
				if (typeof filter === "string") {
					defaultValues[filterName][0] = { value : filter, label : filter};
				} else {
					for(let i = 0; i <filter.length;i++){       
			    		defaultValues[filterName][i] = { value : filter[i], label : filter[i]};
					}
				}
			}
		}

		// Search
		let search = queryString.parse(queryStr).search;
		if (typeof search !== "undefined") {
			defaultValues.search = search;
		} else {
			defaultValues.search = "";
		}

		return defaultValues
	}

	updateCallBack (updateArray) {
		let queryJSON = queryString.parse(this.props.location.search);
		for (let update of updateArray) {
			if (update.value === "") {
				queryJSON[update.name] = [];
			} else {
				queryJSON[update.name] = update.value;
			}
			if (update.name === "page") {
				window.scrollTo(0, 0);
			}
		}
		let queryStr = queryString.stringify(queryJSON);
		this.props.history.push("?" + queryStr);
		this.getJSONsetState(this.state.page_name, queryStr);
	}

	getJSONsetState (tableName, queryStr) {
		let backendQueryStr = this.convertQueryStr(queryStr);
		fetch("http://api.propxdoeswhat.me/api/" + tableName + backendQueryStr)
      		.then(response => response.json())
      		.then(responseJSON => {
      				let row_array = this.getRowArray(responseJSON);
      				let page_data = this.getPageData(responseJSON);
					this.setState({row_array : row_array, page_data : page_data});
				});
	}

	componentDidMount () {
		this.getJSONsetState(this.state.page_name, this.props.location.search)
	}
	
	getPageData(responseJSON) {
		const page = responseJSON.page;
		const total_pages = responseJSON.total_pages;
		var page_count = page - 2;
		var page_array = [];
		if ((total_pages - page) < 2) {
			page_count += -2 + total_pages - page;
		}
		while (true) {
			while (page_count < 1) { 
				page_count++;
			}
			page_array.push(page_count);
			if ((page_count === total_pages) || (page_array.length === 5)) {
				break;
			}
			page_count++;
		}
		var page_data = {
			page: page, 
			total_pages: total_pages, // Logic in Pagination to catch case if total_pages === 0
			page_array: page_array, 
			prev_page: (page === 1 ? 1 : page - 1),
			next_page: (page === total_pages ? total_pages : page + 1)
			}
		return page_data;
	}

	getRowArray(jsonResponse) {
		var row_array = [];
		var politician_array = [];
		var count = 1;
		for (var politician of jsonResponse.objects) {
			if (!(count%3)){
				politician_array.push(politician);
				row_array.push(politician_array);
				politician_array = [];
			} else {
				politician_array.push(politician);
			}

			if ((count === jsonResponse.objects.length) && (count%3)) {
				row_array.push(politician_array);
			}
			count++;
		}

		return row_array
	}

	render() {
		return (
			<div>
				<main>
					<Container style={this.state.filterBoxStyles}>
						<Row style={this.state.filterRowStyles}>
							<Col xs="12" lg={{ size: '10', offset: '1' }}>
								<Search searchCallBack = {this.updateCallBack} defaultValue = {this.state.defaultValues.search}/>
							</Col>
						</Row>

						<Row>
							<Col xs="6" sm={{ size: '3', offset: '1' }}>
								<Filter defaultValue={this.state.defaultValues.party} filterCallBack = {this.updateCallBack} filterOptions={this.state.partyOptions} type={"party"}/>
							</Col>
							<Col xs="6" sm="2">
								<Filter defaultValue={this.state.defaultValues.state} filterCallBack = {this.updateCallBack} filterOptions={this.state.stateOptions} type={"state"}/>
							</Col>
							<Col xs="6" sm="3">
								<Filter defaultValue={this.state.defaultValues.chamber} filterCallBack = {this.updateCallBack} filterOptions={this.state.chamberOptions} type={"chamber"}/>
							</Col>
							<Col xs="6" sm={{ size: '2' }}>
								<Sort orderByCallBack = {this.updateCallBack} type={"last_name"}/>
								<SortRelevance orderByCallBack={this.updateCallBack} type={"relevance"}/>
							</Col>
						</Row>

					</Container>
					
					<Album row_array={this.state.row_array}/>
					<PageFooter page_data={this.state.page_data} page_name={this.state.page_name} pageUpdateCallBack={this.updateCallBack}/>
				</main>
			</div>
		);
	}
}


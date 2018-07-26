import React from 'react';
import LawList from './LawList';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import SortRelevance from './SortRelevance'
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'

export default class TestPage extends React.Component {
	constructor(props) { 
		console.log("*** constructor in TestPage ***")
		super(props);
		const subjectOptions = [
		{ label: 'Animals' , value: 'Animals'},
		{ label: 'Agriculture and Food' , value: 'Agriculture and Food'},
		{ label: 'Armed Forces and National Security' , value: 'Armed Forces and National Security'},
		{ label: 'Civil Rights and Liberties, Minority Issues' , value: 'Civil Rights and Liberties, Minority Issues'},
		{ label: 'Commerce' , value: 'Commerce'},
		{ label: 'Congress' , value: 'Congress'},
		{ label: 'Crime and Law Enforcement' , value: 'Crime and Law Enforcement'},
		{ label: 'Economics and Public Finance' , value: 'Economics and Public Finance'},
		{ label: 'Education' , value: 'Education'},
		{ label: 'Emergency Management' , value: 'Emergency Management'},
		{ label: 'Energy' , value: 'Energy'},
		{ label: 'Environmental Protection' , value: 'Environmental Protection'},
		{ label: 'Families' , value: 'Families'},
		{ label: 'Finance and Financial Sector' , value: 'Finance and Financial Sector'},
		{ label: 'Foreign Trade and International Finance' , value: 'Foreign Trade and International Finance'},
		{ label: 'Government Operations and Politics' , value: 'Government Operations and Politics'},
		{ label: 'Health' , value: 'Health'},
		{ label: 'Housing and Community Development' , value: 'Housing and Community Development'},
		{ label: 'Immigration' , value: 'Immigration'},
		{ label: 'International Affairs' , value: 'International Affairs'},
		{ label: 'Labor and Employment' , value: 'Labor and Employment'},
		{ label: 'Native Americans' , value: 'Native Americans'},
		{ label: 'Public Lands and Natural Resources' , value: 'Public Lands and Natural Resources'},
		{ label: 'Science, Technology, Communications' , value: 'Science, Technology, Communications'},
		{ label: 'Social Welfare' , value: 'Social Welfare'},
		{ label: 'Sports and Recreation' , value: 'Sports and Recreation'},
		{ label: 'Taxation' , value: 'Taxation'},
		{ label: 'Transportation and Public Works' , value: 'Transportation and Public Works'},
		{ label: 'Water Resources Development' , value: 'Water Resources Development'},
		{ label: 'Undefined' , value: ''}
		];
		const page_name = "testpage";
		const filterBoxStyles =  {marginTop:'50px', marginBottom:'100px'};
		const queryStr = this.props.location.search;
		const law_array = [];
		const page_data = {};
		const filterList = ["subject"];
		this.state = { subjectOptions : subjectOptions,
					   page_name : page_name,
					   filterBoxStyles : filterBoxStyles,
					   queryStr : queryStr, 
					   law_array : law_array,
					   page_data : page_data,
					   filterList : filterList, 
					   defaultValues : this.getDefaultValues(queryStr, filterList) 
					};
		this.updateCallBack = this.updateCallBack.bind(this)
	}

	convertQueryStr (queryStr) {
		console.log("*** convertQueryStr in TestPage ***");
		var qJSON = {};

		// Page
		let page = queryString.parse(queryStr).page;
		if (typeof page === "undefined") {
			page = 1;
		}

		// Filters
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
				qJSON.filters = [{and: [filterJSON]}];
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
		console.log("*** getDefaultValue in TestPage ***");
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
		console.log("*** updateCallBack in TestPage ***");
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
		this.getJSONsetState("laws", queryStr);
	}

	getJSONsetState (tableName, queryStr) {
		console.log("*** getJSONsetState in TestPage ***");
		let backendQueryStr = this.convertQueryStr(queryStr);
		fetch("http://api.propxdoeswhat.me/api/" + tableName + backendQueryStr)
      		.then(response => response.json())
      		.then(responseJSON => {
      				let law_array = this.getLawArray(responseJSON);
      				let page_data = this.getPageData(responseJSON);
					this.setState({law_array : law_array, page_data : page_data});
				});
	}

	componentDidMount () {
		console.log("*** componentDidMount in TestPage ***");
		this.getJSONsetState("laws", this.props.location.search)
	}

	getLawArray(responseJSON) {
		console.log("*** getLawArray in TestPage ***");
		var law_array = [];
		for (var law of responseJSON.objects) {
			law_array.push(law);
		}
		return law_array;
	}
	
	getPageData(responseJSON) {
		console.log("*** getPageData in TestPage ***");
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
			total_pages: total_pages, 
			page_array: page_array, 
			prev_page: (page === 1 ? 1 : page - 1),
			next_page: (page === total_pages ? total_pages : page + 1)
			}
		return page_data;
	}

	render() {
		console.log("*** render in TestPage ***")
		return (
			<div>
				<main>
					<Container style={this.state.filterBoxStyles}>
						<Row>
							<Col xs="12" lg={{ size: '12', offset: '1' }}>
								<Search 
									searchCallBack = {this.updateCallBack}
									defaultValue = {this.state.defaultValues.search}
								/>
							</Col>
						</Row>
						<Row>
							<Col xs="6" sm={{ size: '8', offset: '1' }}>
								<Filter 
									defaultValue = {this.state.defaultValues.subject} 
									filterCallBack = {this.updateCallBack} 
									filterOptions={this.state.subjectOptions} 
									type={"subject"}
								/>
							</Col>
							<Col sm={{ size: 'auto', offset: 0 }}>
								<Sort orderByCallBack = {this.updateCallBack} type={"introduced"}/>
								<SortRelevance orderByCallBack = {this.updateCallBack} type={"relevance"}/>
							</Col>
						</Row>
					</Container>

					<LawList law_array={this.state.law_array}/>
					<PageFooter page_data={this.state.page_data} page_name={this.state.page_name} pageUpdateCallBack={this.updateCallBack}/>
				</main>
			</div>
		);
	}
}

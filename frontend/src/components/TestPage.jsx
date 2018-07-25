import React from 'react';
import LawList from './LawList';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'

export default class TestPage extends React.Component {
	constructor(props) { 
		console.log("*** constructor in TestPage ***")
		super(props); 
		this.state = { queryStr : this.props.location.search, i : 0 };
		this.updateQueryStr = this.updateQueryStr.bind(this)
	}

	convertQueryStr (queryStr) {
		console.log("*** convertQueryStr in TestPage ***");
		let page = queryString.parse(queryStr).page;
		let subject = queryString.parse(queryStr).subject;
		let search = queryString.parse(queryStr).search;
		let order_by = queryString.parse(queryStr).order_by;
		let order = queryString.parse(queryStr).order;
		var qJSON = {};
		if (typeof search !== "undefined") {
			qJSON.search = search;
		}

		if (typeof subject !== "undefined") {
			let filterJSON = {or:[]};
			if (typeof subject === "string") {
				filterJSON.or[0] = { "name" : "subject", "op" : "eq", "val" : subject};
			} else {
				for(let i = 0; i <subject.length;i++){       
		    		filterJSON.or[i] = { "name" : "subject", "op" : "eq", "val" : subject[i]};
				}
			}
			qJSON.filters = [{and: [filterJSON]}];
		}

		if (typeof order_by !== "undefined") {
			if (typeof order !== "undefined") {
				qJSON.order_by = [{ field : order_by, direction : order}];
			} else {
				qJSON.order_by = [{ field : order_by, direction : "asc"}];
			}
		}

		if (typeof page === "undefined") {
			page = 1;
		}

		let backendQueryStr = "?page=" + page + "&q=" + JSON.stringify(qJSON);
		return backendQueryStr
	}

	getDefaultValues (queryStr) {
		console.log("*** getDefaultValue in TestPage ***");
		let subject = queryString.parse(queryStr).subject;
		let search = queryString.parse(queryStr).search;
		let defaultValues = {filter : [], search : ""}
		if (typeof subject !== "undefined") {
			if (typeof subject === "string") {
				defaultValues.filter[0] = { value : subject, label : subject};
			} else {
				for(let i = 0; i <subject.length;i++){       
		    		defaultValues.filter[i] = { value : subject[i], label : subject[i]};
				}
			}
		}

		if (typeof search !== "undefined") {
			defaultValues.search = search;
		}

		return defaultValues
	}

	updateQueryStr (updateArray) {
		console.log("*** updateQueryStr in TestPage ***");
		let queryJSON = queryString.parse(this.props.location.search);
		for (let update of updateArray) {
			queryJSON[update.name] = update.value
			if (update.name === "page") {
				window.scrollTo(0, 0);
			}
		}
		let queryStr = queryString.stringify(queryJSON)
		this.props.history.push("?" + queryStr)
		this.setState({queryStr : queryStr});
	}

	getResponseJSON(table, backendQueryStr) {
		console.log("*** getResponseJSON in TestPage ***");
		let httpRequest = new XMLHttpRequest();
		let api = "http://api.propxdoeswhat.me/api/" + table + backendQueryStr;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		let responseJSON = JSON.parse(httpRequest.responseText);
		return responseJSON;
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
		console.log("*** render in TestPage " + this.state.i + " ***")
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

		const page_name = "testpage"

		var filterBoxStyles = {
			marginTop:'50px',
			marginBottom:'100px'
		};

		let backendQueryStr = this.convertQueryStr(this.state.queryStr)
		let responseJSON = this.getResponseJSON("laws", backendQueryStr)
		let law_array = this.getLawArray(responseJSON);
		let page_data = this.getPageData(responseJSON);
		let defaultValues = this.getDefaultValues(this.state.queryStr);
		this.state.i += 1

		return (
			<div>
				<main>
					<Container style={filterBoxStyles}>
						<Row>
							<Col xs="12" lg={{ size: '12', offset: '1' }}>
								<Search 
									searchCallBack = {this.updateQueryStr}
									defaultValue = {defaultValues.search}
								/>
							</Col>
						</Row>
						<Row>
							<Col xs="6" sm={{ size: '8', offset: '1' }}>
								<Filter 
									defaultValue = {defaultValues.filter} 
									filterCallBack = {this.updateQueryStr} 
									filterOptions={subjectOptions} 
									type={"subject"}
								/>
							</Col>
							<Col sm={{ size: 'auto', offset: 0 }}>
								<Sort orderByCallBack = {this.updateQueryStr} type={"introduced"}/>
							</Col>
						</Row>
					</Container>

					<LawList law_array={law_array} page_name={"law_page"} />
					<PageFooter page_data={page_data} page_name={page_name} pageUpdateCallBack={this.updateQueryStr}/>
				</main>
			</div>
		);
	}
}
import React from 'react';
import LawList from './LawList';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'

export default class LawSearchModel extends React.Component {
	constructor(props) { 
		console.log("*** constructor in TestPage ***")
		super(props); 
		this.state = { queryStr : this.props.queryStr, i : 0 };
		this.updateQueryStr = this.updateQueryStr.bind(this)
	}

	convertQueryStr (queryStr) {
		console.log("*** convertQueryStr in TestPage ***");
		let page = queryString.parse(queryStr).page;
		let search = queryString.parse(queryStr).search;
		var qJSON = {};
		if (typeof search !== "undefined") {
			qJSON.search = search;
		}


		if (typeof page === "undefined") {
			page = 1;
		}

		let backendQueryStr = "?page=" + page + "&q=" + JSON.stringify(qJSON);
		return backendQueryStr
	}

	getDefaultValues (queryStr) {
		console.log("*** getDefaultValue in TestPage ***");
		let search = queryString.parse(queryStr).search;
		let defaultValues = {search : ""}
		

		if (typeof search !== "undefined") {
			defaultValues.search = search;
		}

		return defaultValues
	}

	updateQueryStr (updateArray) {
		console.log("*** updateQueryStr in TestPage ***");
		let queryJSON = queryString.parse(this.props.queryStr);
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
					</Container>

					<LawList law_array={law_array} page_name={"law_page"} />
					<PageFooter page_data={page_data} page_name={page_name} pageUpdateCallBack={this.updateQueryStr}/>
				</main>
			</div>
		);
	}
}
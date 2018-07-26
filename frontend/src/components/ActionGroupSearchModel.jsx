import React from 'react';
import Filter from './Filter2';
import PageFooter from './Pagination2'
import Sort from './Sort2'
import Album from './Album';
import Search from './Search2';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'
import ActionGroupList from './ActionGroupList';



export default class SearchResults extends React.Component {
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
		this.props.props.history.push("?" + queryStr)
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

	getActionGroupArray(jsonResponse) {
		var action_group_array = [];
		for (var action_group of jsonResponse.objects) {
			action_group_array.push(action_group);
		}
		return action_group_array;
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
		let responseJSON = this.getResponseJSON("action_groups", backendQueryStr)
		let action_group_array = this.getActionGroupArray(responseJSON);
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

					<ActionGroupList action_group_array={action_group_array} page_name={"action_group_page"} />
					<PageFooter page_data={page_data} page_name={page_name}/>
				</main>
			</div>
		);
	}
}
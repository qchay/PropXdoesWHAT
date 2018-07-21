import React from 'react';
import Action_Group_List from './Action_Group_List';
import Filter from './Filter';
import Page_Footer from './Page_Footer'
import Sort from './Sort'
import { Container, Row, Col } from 'reactstrap';

export default class Action_Group_Page extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { 
						filter1 : {"or" : []},
						orderByArray : []
					 };
		this.filterCallBack1 = this.filterCallBack1.bind(this)  
		this.orderByCallBack = this.orderByCallBack.bind(this)
	}

	filterCallBack1 (filter1) {
		this.setState({filter1 : filter1});
	}

	orderByCallBack (orderByArray) {
		this.setState({orderByArray : orderByArray});
	}

	combineFilters(filter1, orderByArray) {
		return { "filters": [ { "and":[filter1]}], "order_by" : orderByArray};
	}

	getJsonResponse(filterJson) {
		var page_number = this.props.match.params.page_number;
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/action_groups?page=" + page_number + "&q=" + JSON.stringify(filterJson);
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);

		return jsonResponse;
	}

	getActionGroupArray(jsonResponse) {
		var action_group_array = [];
		for (var action_group of jsonResponse.objects) {
			action_group_array.push(action_group);
		}
		return action_group_array;
	}

	getPageData(jsonResponse) {
		const page = jsonResponse.page;
		const total_pages = jsonResponse.total_pages;
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
		const subjectOptions = [
		{ label: 'Coalitions of Peace Groups' , value: 'Coalitions of Peace Groups' },
		{ label: 'Election Reform Groups' , value: 'Election Reform Groups' },
		{ label: 'General Peace Groups' , value: 'General Peace Groups' },
		{ label: 'Government Accountability Groups' , value: 'Government Accountability Groups' },
		{ label: 'Nuclear Weapons-Focused Groups' , value: 'Nuclear Weapons-Focused Groups' },
		{ label: 'Progressive Democratic Party Election Groups' , value: 'Progressive Democratic Party Election Groups' },
		{ label: 'Progressive Lobbying and Electoral Action Groups' , value: 'Progressive Lobbying and Electoral Action Groups' },
		{ label: 'Progressive Political Parties' , value: 'Progressive Political Parties' },
		{ label: 'Progressive State and Local Legislation Groups' , value: 'Progressive State and Local Legislation Groups' },
		{ label: 'Progressive Voter Engagement Groups' , value: 'Progressive Voter Engagement Groups' },
		{ label: 'Student Peace Groups' , value: 'Student Peace Groups' },
		{ label: 'Veterans Peace Groups' , value: 'Veterans Peace Groups' }
		];
		
		let page_name = "action_groups"

		var filterBoxStyles = {
			marginTop:'50px',
			marginBottom:'100px'
		};

		let jsonfilter = this.combineFilters(this.state.filter1, this.state.orderByArray);
		let jsonResponse = this.getJsonResponse(jsonfilter);
		let action_group_array = this.getActionGroupArray(jsonResponse);
		let page_data = this.getPageData(jsonResponse);

		return (
			<div>
				<main>
					<Container style={filterBoxStyles}>
						<Row>
							<Col xs="6" sm={{ size: '8', offset: '1' }}>
								<Filter filterCallBack = {this.filterCallBack1} filterOptions={subjectOptions} type={"type"}/>
							</Col>
							<Col sm={{ size: 'auto', offset: 0 }}>
								<Sort orderByCallBack = {this.orderByCallBack} type={"name"}/>
							</Col>
						</Row>
					</Container>



					<Action_Group_List action_group_array={action_group_array} page_name={"action_group_page"} />
					<Page_Footer page_data={page_data} page_name={page_name}/>
				</main>
			</div>
		);
	}
}


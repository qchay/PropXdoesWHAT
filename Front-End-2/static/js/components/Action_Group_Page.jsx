import React from 'react';
import Action_Group_List from './Action_Group_List';
import Filter from './Filter';
import Page_Footer from './Page_Footer'
import Sort from './Sort'
import { Container, Row, Col } from 'reactstrap';

export default class Action_Group_Page extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { jsonResponse : this.getJsonResponse({}) };
		this.getJsonResponseCallBack = this.getJsonResponseCallBack.bind(this);
	}

	getJsonResponseCallBack(json_from_filter){
		// return (json_from_filter) => {this.setState({jsonResponse : this.getJsonResponse(json_from_filter)});};
		this.setState({jsonResponse : this.getJsonResponse(json_from_filter)});

	}

	getJsonResponse(filterJson) {
		var page_number = this.props.match.params.page_number;
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/action_groups?page=" + page_number + "&q=" + JSON.stringify(filterJson);
		console.log(api);
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
		let action_group_array = this.getActionGroupArray(this.state.jsonResponse);

		let page_data = this.getPageData(this.state.jsonResponse);
		console.log(page_data);
		let page_name = "action_groups"

		var filterBoxStyles = {
			marginTop:'50px',
			marginBottom:'100px'
		};

		return (
			<div>
				<main>
					<Container style={filterBoxStyles}>
						<Row>
							<Col xs="6" sm={{ size: '8', offset: '1' }}>
								<Filter getJsonResponseCallBack = {this.getJsonResponseCallBack} type={"type"}/>
							</Col>
							<Col sm={{ size: 'auto', offset: 0 }}>
								<Sort getJsonResponseCallBack = {this.getJsonResponseCallBack} type={"name"}/>
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


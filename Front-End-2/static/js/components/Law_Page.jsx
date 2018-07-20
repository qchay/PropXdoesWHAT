// Politician_Page.jsx
import React from 'react';
import Law_List from './Law_List';
import Filter from './Filter';
import Page_Footer from './Page_Footer'
import Sort from './Sort'

export default class Law_Page extends React.Component {
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
		var api = "http://api.propxdoeswhat.me/api/laws?page=" + page_number + "&q=" + JSON.stringify(filterJson);
		console.log(api);
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);

		return jsonResponse;
	}

	getLawArray(jsonResponse) {
		var law_array = [];
		for (var law of jsonResponse.objects) {
			law_array.push(law);
		}
		return law_array;
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
		let law_array = this.getLawArray(this.state.jsonResponse);
		let page_data = this.getPageData(this.state.jsonResponse);
		console.log(page_data);
		let page_name = "laws"
  		return (
  			<div>
				<main>
					<Sort/>
					<Law_List law_array={law_array} page_name={"law_page"} />
					<Page_Footer page_data={page_data} page_name={page_name}/>
				</main>
			</div>
    	);
  	}
}


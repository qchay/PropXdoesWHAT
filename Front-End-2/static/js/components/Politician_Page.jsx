// Politician_Page.jsx
import React from 'react';
import Album from './Album';

export default class Politician_Page extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { jsonResponse : this.getJsonResponse() };
	}

	getJsonResponse() {
		var page_number = this.props.match.params.page_number
		console.log(page_number);
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/politicians?page=" + page_number;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);

		return jsonResponse
	}

	getRowArray(jsonResponse) {
		var row_array = [];
		var politician_array = [];
		var count = 1;
		for (var politician of jsonResponse.objects) {
			if (!(count%3)){
				politician_array.push(politician);
				row_array.push(politician_array);
				var politician_array = [];
			} else {
				politician_array.push(politician);
			}

			if ((count == jsonResponse.objects.length) && (count%3)) {
				row_array.push(politician_array);
			}
			count++;
		}

		return row_array
	}
	render() {
		let row_array = this.getRowArray(this.state.jsonResponse)
  		return (
  			<div>
				<p>Politician_Page! Page: {this.props.match.params.page_number}</p>
				<main>
					<Album row_array={row_array} page_name={"politician_page"}/>
				</main>
			</div>
    	);
  	}
}


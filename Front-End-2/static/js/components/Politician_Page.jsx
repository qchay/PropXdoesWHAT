// Politician_Page.jsx
import React from 'react';
import Album from './Album';

export default class Politician_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
		var page_number = this.props.match.params.page_number
		console.log(page_number);
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/politicians?page=" + page_number;
		httpRequest.open("GET", api, false);
		httpRequest.send();
		var jsonResponse = JSON.parse(httpRequest.responseText);
		//localStorage.setItem("response", JSON.stringify(jsonResponse));
		console.log(jsonResponse);
		//Parsing json response, putting data into rows
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
		console.log(row_array);
  		return (
  			<div>
				<p>Politician_Page! Page: {this.props.match.params.page_number}</p>
				<main>
					<Album row_array={row_array} />
				</main>
			</div>
    	);
  	}
}


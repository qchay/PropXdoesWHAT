// Politician_Page.jsx
import React from 'react';
import Album from './Album';
import Filter from './Filter';
import Page_Footer from './Page_Footer'
import Sort from './Sort'
import { Container, Row, Col } from 'reactstrap';

export default class Politician_Page extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { jsonResponse : this.getJsonResponse({}) };
		this.getJsonResponseCallBack = this.getJsonResponseCallBack.bind(this)  
	}

	getJsonResponseCallBack(json_from_filter){
		// return (json_from_filter) => {this.setState({jsonResponse : this.getJsonResponse(json_from_filter)});};
		this.setState({jsonResponse : this.getJsonResponse(json_from_filter)});

	}

	getJsonResponse(filterJson) {
		var page_number = this.props.match.params.page_number
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/politicians?page=" + page_number + "&q=" + JSON.stringify(filterJson);
		console.log(api);
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
		let row_array = this.getRowArray(this.state.jsonResponse);
		const partyOptions = [
		  { value: 'R', label: 'Republican' },
		  { value: 'D', label: 'Democrat' },
		  { value: 'I', label: 'Independent' }
		];

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
		{ label: 'WY' , value: 'WY'}]

		let page_data = this.getPageData(this.state.jsonResponse);
		//console.log(page_data);
		let page_name = "politicians"

		var filterBoxStyles = {
			marginTop:'50px',
			marginBottom:'100px'
		};

		return (
			<div>
				<main>
					<Container style={filterBoxStyles}>
						<Row>
							<Col xs="6" sm={{ size: '3', offset: '2' }}>
								<Filter getJsonResponseCallBack = {this.getJsonResponseCallBack} filterOptions={partyOptions} type={"party"}/>
							</Col>
							<Col xs="6" sm="3">
								<Filter getJsonResponseCallBack = {this.getJsonResponseCallBack} filterOptions={stateOptions} type={"state"}/>
							</Col>
							<Col xs={{ size: '6', offset: '3' }} sm={{ size: '3', offset: '0' }}>
								<Sort type={"Name"}/>
							</Col>
						</Row>
					</Container>
					
					<Album row_array={row_array} page_name={"politician_page"} />
					<Page_Footer page_data={page_data} page_name={page_name}/>
				</main>
			</div>
		);
	}
}


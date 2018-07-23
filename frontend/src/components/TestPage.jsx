import React from 'react';
import LawList from './LawList';
import Filter from './Filter';
import PageFooter from './Pagination2'
import Sort from './Sort'
import Search from './Search';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string'

export default class TestPage extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { 
					 	filter1 : {"or" : []},
					 	orderByArray : [],
					 	searchText : "",
					 	page : 1
					 };
		this.filterCallBack1 = this.filterCallBack1.bind(this)  
		this.orderByCallBack = this.orderByCallBack.bind(this)
		this.searchCallBack = this.searchCallBack.bind(this)
		this.pageUpdateCallBack = this.pageUpdateCallBack.bind(this)
	}

	componentDidMount() {
		// const values = queryString.parse(this.props.location.search)
		// console.log(values.page)
		this.setState({page : queryString.parse(this.props.location.search).page})
	}

	filterCallBack1 (filter1) {
		this.setState({filter1 : filter1});
	}

	orderByCallBack (orderByArray) {
		this.setState({orderByArray : orderByArray});
	}

	searchCallBack (searchText) {
		this.setState({searchText: searchText})
	}

	pageUpdateCallBack (page) {
		var historyPushPromise = new Promise( (resolve) => {
			this.props.history.push("/testpage?page=" + page)
		  	resolve('Success!');
		});
		historyPushPromise.then( () => {
		  this.setState({page : queryString.parse(this.props.location.search).page}); // Success!
		});
	}

	combineFilters(filter1, orderByArray, searchText) {
		return { "search":searchText, "filters": [ { "and":[filter1]}], "order_by" : orderByArray};
	}

	getJsonResponse(filterJson) {
		// var page_number = this.props.match.params.page_number;
		var httpRequest = new XMLHttpRequest();
		var api = "http://api.propxdoeswhat.me/api/laws?page=" + this.state.page + "&q=" + JSON.stringify(filterJson);
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

		let page_name = "testpage"

		var filterBoxStyles = {
			marginTop:'50px',
			marginBottom:'100px'
		};

		let jsonfilter = this.combineFilters(this.state.filter1, this.state.orderByArray, this.state.searchText);
		let jsonResponse = this.getJsonResponse(jsonfilter);
		let law_array = this.getLawArray(jsonResponse);
		let page_data = this.getPageData(jsonResponse);

		// this.props.history.push('/foo')
		return (
			<div>
				<main>
					<Container style={filterBoxStyles}>
						<Row>
							<Col xs="12" lg={{ size: '12', offset: '1' }}>
								<Search searchCallBack = {this.searchCallBack}/>
							</Col>
						</Row>
						<Row>
							<Col xs="6" sm={{ size: '8', offset: '1' }}>
								<Filter filterCallBack = {this.filterCallBack1} filterOptions={subjectOptions} type={"subject"}/>
							</Col>
							<Col sm={{ size: 'auto', offset: 0 }}>
								<Sort orderByCallBack = {this.orderByCallBack} type={"introduced"}/>
							</Col>
						</Row>
					</Container>


					
					<LawList law_array={law_array} page_name={"law_page"} />
					<PageFooter page_data={page_data} page_name={page_name} pageUpdateCallBack={this.pageUpdateCallBack}/>
				</main>
			</div>
		);
	}
}
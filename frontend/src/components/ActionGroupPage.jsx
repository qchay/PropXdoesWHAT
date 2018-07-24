import React from 'react';
import ActionGroupList from './ActionGroupList';
import Filter from './Filter';
import PageFooter from './Pagination'
import Sort from './Sort'
import Search from './Search'
import { Container, Row, Col } from 'reactstrap';

export default class ActionGroupPage extends React.Component {
	constructor(props) { 
		super(props); 
		this.state = { 
						filter1 : {"or" : []},
						orderByArray : [],
						searchText : ""
					 };
		this.filterCallBack1 = this.filterCallBack1.bind(this)
		this.orderByCallBack = this.orderByCallBack.bind(this)
		this.searchCallBack = this.searchCallBack.bind(this)
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

	combineFilters(filter1, orderByArray, searchText) {
		return { "search":searchText, "filters": [ { "and":[filter1]}], "order_by" : orderByArray};
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
		{ label: 'Family Advocacy Groups', value: 'Family Advocacy Groups'},
		{ label: 'General Legal Support Groups', value: 'General Legal Support Groups'},
		{ label: 'Progressive Groups Monitoring Foundations', value: 'Progressive Groups Monitoring Foundations'},
		{ label: 'Simple Living Advocacy Groups', value: 'Simple Living Advocacy Groups'},
		{ label: 'Forest Protection Groups', value: 'Forest Protection Groups'},
		{ label: 'Progressive Tax Groups', value: 'Progressive Tax Groups'},
		{ label: 'Civic and Neighborhood Groups', value: 'Civic and Neighborhood Groups'},
		{ label: 'Nonviolent Action Policy Groups', value: 'Nonviolent Action Policy Groups'},
		{ label: 'Worker Ownership Groups', value: 'Worker Ownership Groups'},
		{ label: 'Government Programs Preservation Groups', value: 'Government Programs Preservation Groups'},
		{ label: 'Other Progressive Support Groups', value: 'Other Progressive Support Groups'},
		{ label: 'Coalitions of Peace Groups', value: 'Coalitions of Peace Groups'},
		{ label: 'Women\'s Peace Groups', value: 'Women\'s Peace Groups'},
		{ label: 'Student Peace Groups', value: 'Student Peace Groups'},
		{ label: 'Groups Challenging Capital Punishment', value: 'Groups Challenging Capital Punishment'},
		{ label: 'Progressive Lawyer Groups', value: 'Progressive Lawyer Groups'},
		{ label: 'Progressive Scientist Groups', value: 'Progressive Scientist Groups'},
		{ label: 'Elder Advocacy Groups', value: 'Elder Advocacy Groups'},
		{ label: 'Progressive State and Local Legislation Groups', value: 'Progressive State and Local Legislation Groups'},
		{ label: 'Progressive Rural Groups', value: 'Progressive Rural Groups'},
		{ label: 'Gun Control Groups', value: 'Gun Control Groups'},
		{ label: 'Progressive Foundations', value: 'Progressive Foundations'},
		{ label: 'Humane Treatment of Animals Groups', value: 'Humane Treatment of Animals Groups'},
		{ label: 'Freedom of Religion Groups', value: 'Freedom of Religion Groups'},
		{ label: 'Cooperative Living Advocacy Groups', value: 'Cooperative Living Advocacy Groups'},
		{ label: 'Other Progressive Cultural Change Groups', value: 'Other Progressive Cultural Change Groups'},
		{ label: 'Progressive Humanist Groups', value: 'Progressive Humanist Groups'},
		{ label: 'Religious Peace Groups', value: 'Religious Peace Groups'},
		{ label: 'Nonviolent Peacemaker Groups', value: 'Nonviolent Peacemaker Groups'},
		{ label: 'Other Specialized Peace Groups', value: 'Other Specialized Peace Groups'},
		{ label: 'Regional Human Rights Groups', value: 'Regional Human Rights Groups'},
		{ label: 'International Economic Justice Groups', value: 'International Economic Justice Groups'},
		{ label: 'Electronic Privacy Groups', value: 'Electronic Privacy Groups'},
		{ label: 'Anti-Smoking Groups', value: 'Anti-Smoking Groups'},
		{ label: 'Worker Justice and Democracy Groups', value: 'Worker Justice and Democracy Groups'},
		{ label: 'Veterans Peace Groups', value: 'Veterans Peace Groups'},
		{ label: 'Anti-Poverty Policy Groups', value: 'Anti-Poverty Policy Groups'},
		{ label: 'Immigration Rights Groups', value: 'Immigration Rights Groups'},
		{ label: 'Economic Justice Groups', value: 'Economic Justice Groups'},
		{ label: 'Conscientious Objection to War Groups', value: 'Conscientious Objection to War Groups'},
		{ label: 'Peace Policy Institutes', value: 'Peace Policy Institutes'},
		{ label: 'Ending Hunger Groups', value: 'Ending Hunger Groups'},
		{ label: 'Healthcare Advocacy Groups', value: 'Healthcare Advocacy Groups'},
		{ label: 'International Development Groups', value: 'International Development Groups'},
		{ label: 'General Peace Groups', value: 'General Peace Groups'},
		{ label: 'Environmental Groups Focused on Energy and Mining', value: 'Environmental Groups Focused on Energy and Mining'},
		{ label: 'Environmental Research and Public Policy Groups', value: 'Environmental Research and Public Policy Groups'},
		{ label: 'Socially Responsible Business Groups', value: 'Socially Responsible Business Groups'},
		{ label: 'Election Reform Groups', value: 'Election Reform Groups'},
		{ label: 'Food Safety and Responsible Biotechnology Groups', value: 'Food Safety and Responsible Biotechnology Groups'},
		{ label: 'Environmental Groups Focused on Climate Change', value: 'Environmental Groups Focused on Climate Change'},
		{ label: 'Disability Rights Groups', value: 'Disability Rights Groups'},
		{ label: 'Progressive Political Parties', value: 'Progressive Political Parties'},
		{ label: 'Children Advocacy Groups', value: 'Children Advocacy Groups'},
		{ label: 'Progressive Lobbying and Electoral Action Groups', value: 'Children Advocacy Groups'},
		{ label: 'Progressive Education Reform Groups', value: 'Progressive Education Reform Groups'},
		{ label: 'Civil Rights Groups', value: 'Civil Rights Groups'},
		{ label: 'Criminal Justice Groups', value: 'Criminal Justice Groups'},
		{ label: 'Employment Groups', value: 'Employment Groups'},
		{ label: 'Community Organizing Groups', value: 'Community Organizing Groups'},
		{ label: 'Progressive Media Reform Groups', value: 'Progressive Media Reform Groups'},
		{ label: 'Consumer Protection Groups', value: 'Consumer Protection Groups'},
		{ label: 'Progressive Voter Engagement Groups', value: 'Progressive Voter Engagement Groups'},
		{ label: 'Civil Liberties Groups', value: 'Civil Liberties Groups'},
		{ label: 'International Worker Justice and Democracy Groups', value: 'International Worker Justice and Democracy Groups'},
		{ label: 'Anti-Poverty and Low Income Housing Groups', value: 'Anti-Poverty and Low Income Housing Groups'},
		{ label: 'Legal Defense of Civil Rights Groups', value: 'Legal Defense of Civil Rights Groups'},
		{ label: 'Nuclear Weapons-Focused Groups', value: 'Nuclear Weapons-Focused Groups'},
		{ label: 'Anti-Corporate Domination Groups', value: 'Anti-Corporate Domination Groups'},
		{ label: 'Conservation Groups', value: 'Conservation Groups'},
		{ label: 'Progressive Training and Education Groups', value: 'Progressive Training and Education Groups'},
		{ label: 'Family Planning Groups', value: 'Family Planning Groups'},
		{ label: 'Peace Building Groups', value: 'Peace Building Groups'},
		{ label: 'Gay, Lesbian, Bisexual, and Transgender Liberation Groups', value: 'Gay, Lesbian, Bisexual, and Transgender Liberation Groups'},
		{ label: 'Other Specific-Focus Environmental Groups', value: 'Other Specific-Focus Environmental Groups'},
		{ label: 'Other Progressive Professional Groups', value: 'Other Progressive Professional Groups'},
		{ label: 'General Progressive Policy Groups', value: 'General Progressive Policy Groups'},
		{ label: 'Feminist/Women\'s Liberation Groups', value: 'Feminist/Women\'s Liberation Groups'},
		{ label: 'Progressive Democratic Party Election Groups', value: 'Progressive Democratic Party Election Groups'},
		{ label: 'Civil Rights Constituency Groups', value: 'Civil Rights Constituency Groups'},
		{ label: 'International-Focus Environmental Groups', value: 'International-Focus Environmental Groups'},
		{ label: 'Broad-Focus Environmental Groups', value: 'Broad-Focus Environmental Groups'},
		{ label: 'Progressive Economic Research Groups', value: 'Progressive Economic Research Groups'},
		{ label: 'Government Accountability Groups', value: 'Government Accountability Groups'},
		{ label: 'Progressive Labor Unions', value: 'Progressive Labor Unions'},
		{ label: 'International Human Rights Groups', value: 'International Human Rights Groups'},
		{ label: 'Progressive Religious Groups', value: 'Progressive Religious Groups'}
		];
		
		let page_name = "action_groups"

		var filterBoxStyles = {
			marginTop:'85px',
			marginBottom:'100px'
		};
		var filterRowStyles = {
			marginTop:'50px'
		};
		var filterColStyles = {
			marginLeft:'35px'
		};

		let jsonfilter = this.combineFilters(this.state.filter1, this.state.orderByArray, this.state.searchText);
		let jsonResponse = this.getJsonResponse(jsonfilter);
		let action_group_array = this.getActionGroupArray(jsonResponse);
		let page_data = this.getPageData(jsonResponse);

		return (
			<div>
				<main>
					<Container style={filterBoxStyles}>
						<Row style={filterRowStyles}>
							<Col xs="12" lg={{ size: '10', offset: '1' }}>
								<Search searchCallBack = {this.searchCallBack}/>
							</Col>
						</Row>
						<Row>
							<Col xs="6" sm={{ size: '8', offset: '1' }}>
								<Filter filterCallBack = {this.filterCallBack1} filterOptions={subjectOptions} type={"type"}/>
							</Col>
							<Col sm={{ size: '1', offset: '0' }} style={filterColStyles}>
								<Sort orderByCallBack = {this.orderByCallBack} type={"name"}/>
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


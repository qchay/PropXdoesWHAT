import React from 'react';
import { Row, Col } from 'reactstrap';
import ActionGroupSearchModel from './ActionGroupSearchModel';
import PoliticianSearchModel from './PoliticianSearchModel';
import LawSearchModel from './LawSearchModel';
import queryString from 'query-string'
import PageFooter from './PaginationSearchAll'


export default class SearchResults extends React.Component {
	constructor(props){
	super(props);
	this.state = {
	          politician_page_data : {},
            law_page_data : {},
            action_group_page_data : {},
            politician_data : [],
            law_data : [],
            action_group_data : [],
            queryStr : this.props.location.search
    };
  this.updateCallBack = this.updateCallBack.bind(this)
	}

  convertQueryStr (queryStr, tableName) {
    var qJSON = {};

    // Page
    var page = 1;
    if (tableName === "politicians") {
      page = queryString.parse(queryStr).politician_page;
      if (typeof page === "undefined") {
        page = 1;
      }
    } else if (tableName === "laws") {
      page = queryString.parse(queryStr).law_page;
      if (typeof page === "undefined") {
        page = 1;
      }
    } else if (tableName === "action_groups") {
      page = queryString.parse(queryStr).action_group_page;
      if (typeof page === "undefined") {
        page = 1;
      }
    }

    // Search
    let search = queryString.parse(queryStr).search;
    if (typeof search !== "undefined") {
      qJSON.search = search;
    }

    // Forming backend query string
    let backendQueryStr = "?page=" + page + "&q=" + JSON.stringify(qJSON);
    return backendQueryStr
  }


  getAllDataSetState (queryStr) {
    let backendQueryStr = this.convertQueryStr(queryStr, "politicians");
    let politician_data = [];
    let politician_page_data = [];
    let law_data = [];
    let law_page_data = [];
    fetch("http://api.propxdoeswhat.me/api/politicians" + backendQueryStr)
          .then(response => response.json())
          .then(responseJSON => {
            politician_data = responseJSON.objects;
            politician_page_data = this.getPageData(responseJSON);
            backendQueryStr = this.convertQueryStr(queryStr, "laws")
            return fetch("http://api.propxdoeswhat.me/api/laws" + backendQueryStr);
        })
          .then(response => response.json())
          .then(responseJSON => {
            law_data = responseJSON.objects;
            law_page_data = this.getPageData(responseJSON);
            backendQueryStr = this.convertQueryStr(queryStr, "action_groups")
            return fetch("http://api.propxdoeswhat.me/api/action_groups" + backendQueryStr);
        })
          .then(response => response.json())
          .then(responseJSON => {
            let action_group_data = responseJSON.objects;
            let action_group_page_data = this.getPageData(responseJSON);
            this.setState({
                politician_data : politician_data,
                law_data : law_data,
                action_group_data : action_group_data,
                politician_page_data : politician_page_data,
                law_page_data : law_page_data,
                action_group_page_data : action_group_page_data
          });
        });
  }


  componentDidMount () {
    this.getAllDataSetState(this.props.location.search)
  }

  updateCallBack (updateArray) {
    let queryJSON = queryString.parse(this.props.location.search);
    for (let update of updateArray) {
      if (update.value === "") {
        queryJSON[update.name] = [];
      } else {
        queryJSON[update.name] = update.value;
      }
      if (update.name === "page") {
        window.scrollTo(0, 0);
      }
    }
    let queryStr = queryString.stringify(queryJSON);
    this.props.history.push("?" + queryStr);
    this.getAllDataSetState(queryStr)
  }

  getPageData(responseJSON) {
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
      total_pages: total_pages, // Logic in Pagination to catch case if total_pages === 0
      page_array: page_array, 
      prev_page: (page === 1 ? 1 : page - 1),
      next_page: (page === total_pages ? total_pages : page + 1)
      }
    return page_data;
  }

	render() {
		let search = queryString.parse(this.props.location.search).search;
		return (
			<div>
				<h1 className="text-center">Displaying Results for "{search}"</h1>
				<hr></hr>

				<Row>
						<Col xs="12" lg={{ size: '4', offset: '0' }}>
						<h3>Politicians Results</h3>
						<div>{this.state.politician_data.map((politician_data, i) => <PoliticianSearchModel key = {i} politician_data={politician_data}/>)}
						</div>
            <PageFooter page_data={this.state.politician_page_data} page_name={"politicians"} pageUpdateCallBack={this.updateCallBack} page_number_name={"politician_page"}/>						
						</Col>

						<Col xs="12" lg={{ size: '4', offset: '0' }}>
						<h3>Laws Results</h3>
						<div>{this.state.law_data.map((law_data,i) => <LawSearchModel key = {i} law_data={law_data}/>)}
						</div>
            <PageFooter page_data={this.state.law_page_data} page_name={"laws"} pageUpdateCallBack={this.updateCallBack} page_number_name={"law_page"}/> 
						</Col>

						<Col xs="12" lg={{ size: '4', offset: '0' }}>
						<h3>Action Groups Results</h3>
						<div>{this.state.action_group_data.map((action_group_data,i) => <ActionGroupSearchModel key = {i} action_group_data={action_group_data}/>)}
						</div>
            <PageFooter page_data={this.state.action_group_page_data} page_name={"action_groups"} pageUpdateCallBack={this.updateCallBack} page_number_name={"action_group_page"}/> 
						</Col>
				</Row>
			</div>
		);
	}
}
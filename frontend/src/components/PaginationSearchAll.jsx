// Pagination.jsx
import React from 'react';
import _ from 'lodash';

class FirstPage extends React.Component {
	render() {
		let update = {name: this.props.page_number_name, value: 1};
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" onClick={() => {this.props.pageUpdateCallBack([update])}}>1</a>
  			</li>	
    	);
  	}
}	

class LastPage extends React.Component {
	render() {
		let update = {name: this.props.page_number_name, value: this.props.last_page};
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" onClick={() => {this.props.pageUpdateCallBack([update])}} >{this.props.last_page}</a>
  			</li>	
    	);
  	}
}

class PrevPage extends React.Component {
	render() {
		let update = {name: this.props.page_number_name, value: this.props.prev_page};
  		return (
			<li className="page-item">
				<a className="page-link" onClick={() => {this.props.pageUpdateCallBack([update])}} aria-label="Previous">
					<span aria-hidden="true">Prev</span>
					<span className="sr-only">Previous</span>
				</a>
			</li>
    	);
  	}
}

class NextPage extends React.Component {
	render() {
		let update = {name: this.props.page_number_name, value: this.props.next_page};
  		return (
			<li className="page-item">
				<a className="page-link" onClick={() => {this.props.pageUpdateCallBack([update])}} aria-label="Next">
					<span aria-hidden="true">Next</span>
					<span className="sr-only">Next</span>
				</a>
			</li>
    	);
  	}
}	

class PageItem extends React.Component {
	render() {
		let update = {name: this.props.page_number_name, value: this.props.page};
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" onClick={() => {this.props.pageUpdateCallBack([update])}}>{this.props.page}</a>
  			</li>	
    	);
  	}
}	

export default class PageFooter extends React.Component {
	render() {
		// console.log("*** render in PageFooter ***");
		if (_.isEmpty(this.props.page_data)) {
			return (<p align="center" >Page Footer Loading...</p>);
		} else if (this.props.page_data.total_pages === 0) {
			return (<p align="center" >No Results</p>);
		} else {
	  		return (		
				<nav aria-label="pages">
					<ul className="pagination pagination-md justify-content-center">
						<FirstPage active={this.props.page_data.page === 1} pageUpdateCallBack={this.props.pageUpdateCallBack} page_number_name={this.props.page_number_name}/>
						<PrevPage prev_page={this.props.page_data.prev_page} pageUpdateCallBack={this.props.pageUpdateCallBack} page_number_name={this.props.page_number_name}/>
						{this.props.page_data.page_array.map((page, i) => 
							<PageItem key = {i} page={page} active={page === this.props.page_data.page} pageUpdateCallBack={this.props.pageUpdateCallBack} page_number_name={this.props.page_number_name}/>)}
						<NextPage next_page={this.props.page_data.next_page} pageUpdateCallBack={this.props.pageUpdateCallBack} page_number_name={this.props.page_number_name}/>
						<LastPage last_page={this.props.page_data.total_pages} active={this.props.page_data.page === this.props.page_data.total_pages} pageUpdateCallBack={this.props.pageUpdateCallBack} page_number_name={this.props.page_number_name}/>
					</ul>
				</nav>
	    	);
	    }
  	}
}


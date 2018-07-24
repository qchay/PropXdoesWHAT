// Pagination.jsx
import React from 'react';

class FirstPage extends React.Component {
	render() {
		return (
			<li className={"page-item"}>
				<a className="page-link" href={"/" + this.props.page_name + "/page/1"}>1</a>
			</li>	
			);
	}
}	

class LastPage extends React.Component {
	render() {
		return (
			<li className={"page-item"}>
				<a className="page-link" href={"/" + this.props.page_name + "/page/" + this.props.last_page}>{this.props.last_page}</a>
			</li>	
			);
	}
}	

class PrevPage extends React.Component {
	render() {
		return (
			<li className="page-item">
				<a className="page-link" href={"/"+this.props.page_name+"/page/" + this.props.prev_page} aria-label="Previous">
				<i className="fas fa-angle-double-left" />
				</a>
			</li>
			);
	}
}

class NextPage extends React.Component {
	render() {
		return (
			<li className="page-item">
				<a className="page-link" href={"/"+this.props.page_name+"/page/" + this.props.next_page} aria-label="Next">
					<i className="fas fa-angle-double-right" />
				</a>
			</li>
			);
	}
}	

class PageItem extends React.Component {
	render() {
		return (
			<li className={"page-item" + (this.props.active ? " active" : "")}>
				<a className="page-link" href={"/" + this.props.page_name + "/page/" + this.props.page}>{this.props.page}</a>
			</li>	
			);
	}
}	

export default class PageFooter extends React.Component {
	render() {
		return (		
			<nav aria-label="pages">
				<ul className="pagination pagination-lg justify-content-center">
					<FirstPage active={this.props.page_data.page === 1} page_name={this.props.page_name}/>
					<PrevPage prev_page={this.props.page_data.prev_page} page_name={this.props.page_name}/>
						{this.props.page_data.page_array.map((page, i) => 
						<PageItem key = {i} page={page} active={page === this.props.page_data.page} page_name={this.props.page_name}/>)}
					<NextPage next_page={this.props.page_data.next_page} page_name={this.props.page_name}/>
					<LastPage last_page={this.props.page_data.total_pages} active={this.props.page_data.page === this.props.page_data.total_pages} page_name={this.props.page_name}/>
				</ul>
			</nav>
			);
	}
}


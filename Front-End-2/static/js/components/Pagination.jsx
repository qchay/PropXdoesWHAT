// Pagination.jsx
import React from 'react';

class First_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + result + "/page/1"}>1</a>
  			</li>	
    	);
  	}
}	

class Last_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + result + "/page/" + this.props.last_page}>{this.props.last_page}</a>
  			</li>	
    	);
  	}
}	

class Prev_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/"+result+"/page/" + this.props.prev_page} aria-label="Previous">
					<span aria-hidden="true">Prev</span>
					<span className="sr-only">Previous</span>
				</a>
			</li>
    	);
  	}
}

class Next_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/"+result+"/page/" + this.props.next_page} aria-label="Next">
					<span aria-hidden="true">Next</span>
					<span className="sr-only">Next</span>
				</a>
			</li>
    	);
  	}
}	

class Page_Item extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/"+result+"/page/" + this.props.page}>{this.props.page}</a>
  			</li>	
    	);
  	}
}	

class Page_Footer extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (		
			<nav aria-label="pages">
				<ul className="pagination pagination-lg justify-content-center">
					<First_Page active={this.props.page_data.page === 1}/>
					<Prev_Page prev_page={this.props.page_data.prev_page}/>
					{this.props.page_data.page_array.map((page, i) => 
						<Page_Item key = {i} page={page} active={page === this.props.page_data.page}/>)}
					<Next_Page next_page={this.props.page_data.next_page}/>
					<Last_Page last_page={this.props.page_data.total_pages} active={this.props.page_data.page === this.props.page_data.total_pages}/>
				</ul>
			</nav>
    	);
  	}
}

export default {Page_Footer, Page_Item, Next_Page, Prev_Page, Last_Page, First_Page};

// Page_Footer.jsx
import React from 'react';
import First_Page from './First_Page'
import Prev_Page from './Prev_Page'
import Page_Item from './Page_Item'
import Next_Page from './Next_Page'
import Last_Page from './Last_Page'

export default class Page_Footer extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (		
			<nav aria-label="pages">
				<ul className="pagination pagination-lg justify-content-center">
					<First_Page active={this.props.page_data.page === 1} page_name={this.props.page_name}/>
					<Prev_Page prev_page={this.props.page_data.prev_page} page_name={this.props.page_name}/>
					{this.props.page_data.page_array.map((page, i) => 
						<Page_Item key = {i} page={page} active={page === this.props.page_data.page} page_name={this.props.page_name}/>)}
					<Next_Page next_page={this.props.page_data.next_page} page_name={this.props.page_name}/>
					<Last_Page last_page={this.props.page_data.total_pages} active={this.props.page_data.page === this.props.page_data.total_pages} page_name={this.props.page_name}/>
				</ul>
			</nav>
    	);
  	}
}

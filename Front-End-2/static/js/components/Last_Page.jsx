// Last_Page.jsx
import React from 'react';

export default class Last_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + this.props.page_name + "/page/" + this.props.last_page}>{this.props.last_page}</a>
  			</li>	
    	);
  	}
}	
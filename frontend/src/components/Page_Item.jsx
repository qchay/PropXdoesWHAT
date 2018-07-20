// Page_Item.jsx
import React from 'react';

export default class Page_Item extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + this.props.page_name + "/page/" + this.props.page}>{this.props.page}</a>
  			</li>	
    	);
  	}
}	
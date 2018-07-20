// First_Page.jsx
import React from 'react';

export default class First_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
  			<li className={"page-item" + (this.props.active ? " active" : "")}>
  				<a className="page-link" href={"/" + this.props.page_name + "/page/1"}>1</a>
  			</li>	
    	);
  	}
}	
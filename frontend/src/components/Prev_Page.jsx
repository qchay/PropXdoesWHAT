// Prev_Page.jsx
import React from 'react';

export default class Prev_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/" + this.props.page_name + "/page/" + this.props.prev_page} aria-label="Previous">
					<span aria-hidden="true">Prev</span>
					<span className="sr-only">Previous</span>
				</a>
			</li>
    	);
  	}
}
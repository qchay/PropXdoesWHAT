// Next_Page.jsx
import React from 'react';

export default class Next_Page extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<li className="page-item">
				<a className="page-link" href={"/" + this.props.page_name + "/page/" + this.props.next_page} aria-label="Next">
					<span aria-hidden="true">Next</span>
					<span className="sr-only">Next</span>
				</a>
			</li>
    	);
  	}
}	
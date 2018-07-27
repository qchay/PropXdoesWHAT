import React from 'react';
import { Row } from 'reactstrap';
import democrat from '../images/democrat.jpg';
import independent from '../images/independent.jpg';
import republican from '../images/republican.jpg';
import Highlighter from "react-highlight-words";


export default class PoliticianSearchModel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			partyMap: {
				R : "Republican",
				D : "Democrat",
				I : "Independent"
			},
			pictureMap: {
				R : republican,
				D : democrat,
				I : independent
			},
		};
	}

	render() {
		return (
			<div>
			<ul className="list-group">
			  <li className="list-group-item">
				<a href={'/laws/' + this.props.law_data.name + '/' + this.props.law_data.id}>
					<Row>
					<div className="body-text">
				<h5 id="list-name">
				<Highlighter
				highlightStyle={{backgroundColor: 'yellow'}}
   				textToHighlight={this.props.law_data.title.substring(0,180) + (this.props.law_data.title.length > 180 ? '...' : ' ')}
    			searchWords={[this.props.search]}/>
				</h5>
					</div>
					</Row>
  				</a>
  			</li>
			</ul>

			</div>
		);
	}
}
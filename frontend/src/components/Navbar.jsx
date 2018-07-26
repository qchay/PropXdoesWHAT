// Navbar.jsx
import React from 'react';
import SearchBar from './SearchBar'
export default class Navbar extends React.Component {
	render() {
  		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/">			
					<i className="fas fa-gavel"></i> PropXdoesWHAT
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href="/laws">Laws</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/politicians/page/1">Politicians</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/action_groups/page/1">Action Groups</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/affected_groups/page/1">Affected Groups</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/about">About</a>
						</li>
					</ul>
					<SearchBar/>
				</div>
			</nav>
    	);
  	}
}	
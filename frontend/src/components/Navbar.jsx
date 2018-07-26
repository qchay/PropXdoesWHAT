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
							<a className="nav-link" href="/politicians">Politicians</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/action_groups">Action Groups</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/affected_groups/page/1">Affected Groups</a>
						</li>
						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Visualizations
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<a className="dropdown-item" href="/visualizations/politicians">Politicians</a>
								<a className="dropdown-item" href="/visualizations/laws">Laws</a>
								<a className="dropdown-item" href="#">3</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#">4</a>
								<a className="dropdown-item" href="#">5</a>
								<a className="dropdown-item" href="#">6</a>
							</div>
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
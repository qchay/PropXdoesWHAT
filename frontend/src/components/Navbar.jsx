// Navbar.jsx
import React from 'react';
export default class Navbar extends React.Component {
	render() {
  		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<a className="navbar-brand" href="/">			
					<i className="fas fa-gavel"></i>
					PropXdoesWHAT
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link" href="/laws/page/1">Laws</a>
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
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
						<button className="btn btn-outline-info my-2 my-sm-0" type="submit">
             				<i className="fas fa-search"></i>
						</button>
					</form>
				</div>
			</nav>
    	);
  	}
}	
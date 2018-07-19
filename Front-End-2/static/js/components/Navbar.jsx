// Navbar.jsx
import React from 'react';
export default class Navbar extends React.Component {
	constructor(props) { super(props); }
	render() {
  		return (
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<a class="navbar-brand" href="/">PropXdoesWHAT</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item">
							<a class="nav-link" href="/laws/page/1">Laws</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/politicians/page/1">Politicians</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/action_groups/page/1">Action Groups</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/affected_groups/page/1">Affected Groups</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/about">About</a>
						</li>
					</ul>
					<form class="form-inline my-2 my-lg-0">
						<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
						<button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>
			</nav>
    	);
  	}
}	
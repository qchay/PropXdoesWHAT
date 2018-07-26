import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LawPage from "./components/LawPage";
import LawBio from "./components/LawBio";
import PoliticianPage from "./components/PoliticianPage";
import PoliticianBio from "./components/PoliticianBio";
import ActionGroupPage from "./components/ActionGroupPage";
import ActionGroupBio from "./components/ActionGroupBio";
import AffectedGroupPage from "./components/AffectedGroupPage";
import AffectedGroupBio from "./components/AffectedGroupBio";
import About from "./components/About/About";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TestPage from "./components/TestPage"

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/laws' component={LawPage} />
							<Route path='/laws/:law_name/:id' component={LawBio} />
							<Route exact path='/politicians' component={PoliticianPage} />
							<Route path='/politicians/:politcian_name/:id' component={PoliticianBio} />
							<Route path='/action_groups/page/:page_number' component={ActionGroupPage} />
							<Route path='/action_groups/:action_group_name/:id' component={ActionGroupBio} />
							<Route path='/affected_groups/page/:page_number' component={AffectedGroupPage} />
							<Route path='/affected_groups/:affected_group_name' component={AffectedGroupBio} />
							<Route path='/about' component={About} />
							<Route path='/testpage' component={TestPage} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
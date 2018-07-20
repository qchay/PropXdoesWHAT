import React from 'react';
import Navbar from "./Navbar";
import Home from "./Home";
import Law_Page from "./Law_Page";
// import Law_Bio from "./Law_Bio";
import Politician_Page from "./Politician_Page";
// import Politician_Bio from "./Politician_Bio";
import Action_Group_Page from "./Action_Group_Page";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Router>
					<div>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/laws/page/:page_number' component={Law_Page} />
							<Route path='/politicians/page/:page_number' component={Politician_Page} />
							<Route path='/action_groups/page/:page_number' component={Action_Group_Page} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
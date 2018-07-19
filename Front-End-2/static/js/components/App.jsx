// // Old App.jsx
// import React from 'react';
// import Layout from "./Layout";

// export default class App extends React.Component {
// 	constructor(props) { super(props); }
// 	render () {
// 		return (<Layout />);
// 	}
// }



// App.jsx
import React from 'react';
import Layout from "./Layout";
import Example from "./Example";
import Navbar from "./Navbar";
import Politician_Page from "./Politician_Page";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {

  constructor(props) { super(props); }

  render() {
	  return (
	    <div>
		    <Router>
		    	<div>
			    	<Navbar />
			        <Switch>
			          <Route exact path='/' component={Layout} />
			          <Route exact path='/example/page/:page_number' component={Example} />
			          <Route exact path='/politicians/page/:page_number' component={Politician_Page} />
			        </Switch>
		        </div>
		    </Router>
	    </div>
	    );
  }
}
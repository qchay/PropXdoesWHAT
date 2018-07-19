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

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {

  constructor(props) { super(props); }

  render() {
	  return (
	    <div>
		    <Router>
		        <Switch>
		          <Route exact path='/' component={Layout} />
		          <Route exact path='/example/page/:page_number' component={Example} />
		        </Switch>
		    </Router>
	    </div>
	    );
  }
}
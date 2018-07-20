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
import Navbar from "./Navbar";
import Home from "./Home";
// import Law_Page from "./Law_Page";
// import Law_Bio from "./Law_Bio";
import Politician_Page from "./Politician_Page";
// import Politician_Bio from "./Politician_Bio";
import Politician from "./Politician";
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
			          <Route exact path='/' component={Home} />
			          <Route path='/politicians/page/:page_number' component={Politician_Page} />
			          

			        </Switch>
		        </div>
		    </Router>
	    </div>
	    );
  }
}
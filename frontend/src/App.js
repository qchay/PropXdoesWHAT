import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
// import Laws from './components/Laws/Laws';

import Navbar from './Components/Navbar/Navbar';
import Filter from './Components/Filter/Filter';


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

  return (
    <div>
    <Router>
      <div>
      <Navbar/>
      <Filter/>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </Router>
    </div>
    );
  }



}

export default App;
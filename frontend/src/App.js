import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
// import Laws from './components/Laws/Laws';

import Navbar from './Components/Navbar/Navbar';
import PartyFilter from './Components/Filter/PartyFilter';

import StateFilter from './Components/Filter/StateFilter';

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
      <PartyFilter/>
      <StateFilter/>

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
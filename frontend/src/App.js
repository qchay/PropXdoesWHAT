import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Law_Page from "./components/Law_Page";
// import Law_Bio from "./Law_Bio";
import Politician_Page from "./components/Politician_Page";
// import Politician_Bio from "./Politician_Bio";
import Action_Group_Page from "./components/Action_Group_Page";
import About from "./components/About/About";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './CSS/styles.css'
class App extends Component {
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
              <Route path='/about' component={About} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

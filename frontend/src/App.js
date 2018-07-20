import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Law_Page from "./components/Law_Page";
// import Law_Bio from "./Law_Bio";
import Politician_Page from "./components/Politician_Page";
import Politician_Bio from "./components/Politician_Bio";
import Action_Group_Page from "./components/Action_Group_Page";
import Action_Group_Bio from "./components/Action_Group_Bio";
import Affected_Group_Page from "./components/Affected_Group_Page";
import About from "./components/About/About";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
              <Route path='/politicians/:politcian_name/:id' component={Politician_Bio} />
              <Route path='/action_groups/page/:page_number' component={Action_Group_Page} />
              <Route path='/action_groups/:action_group_name/:id' component={Action_Group_Bio} />
              <Route path='/affected_groups/page/:page_number' component={Affected_Group_Page} />
              <Route path='/about' component={About} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

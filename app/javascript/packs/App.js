import React, { Component } from "react";
import NavMenu from "./NavMenu";

import { inject, observer } from 'mobx-react'
import { withRouter} from 'react-router-dom'
import {Router, Route, Switch} from "react-router-dom";

import Student from "./scenes/Student"

@withRouter
@inject('studentStore','countryStore', 'paginationStore', 'dateStore', 'searchStore', 'sortedStore')
@observer class App extends Component {
// class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <NavMenu />
        <Switch>
          <Route exact path="/students" component={Student}/>
          <Route component={Student} />
        </Switch>
      </div>
    );
  }
}

export default App;

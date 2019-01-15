import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from './Home'
import { Digimon } from './Digimon'

export class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/digimon/:id" exact component={Digimon}/>
      </Switch>
    )
  }
}
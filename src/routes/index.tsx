import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Section } from 'bulma-styled-components'
import { Home } from './Home'
import { Digimon } from './Digimon'
import { Moves } from './Moves'
import { Supports } from './Supports'

export class Routes extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/moves" component={Moves}/>
            <Route path="/supports" component={Supports}/>
            <Route path="/digimon/:id" component={Digimon}/>
          </Switch>
        </Container>
      </Section>
    )
  }
}
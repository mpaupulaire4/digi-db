import React, { Component } from "react";
import { Route } from "react-router-dom";
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
          <Route path="/" exact component={Home}/>
          <Route path="/moves" exact component={Moves}/>
          <Route path="/supports" exact component={Supports}/>
          <Route path="/digimon/:id" exact component={Digimon}/>
        </Container>
      </Section>
    )
  }
}
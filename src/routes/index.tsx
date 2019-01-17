import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Container, Section } from 'bulma-styled-components'
import { Home } from './Home'
import { Digimon } from './Digimon'

export class Routes extends Component {
  render() {
    return (
      <Section>
        <Container>
          <Route path="/" exact component={Home}/>
          <Route path="/digimon/:id" exact component={Digimon}/>
        </Container>
      </Section>
    )
  }
}
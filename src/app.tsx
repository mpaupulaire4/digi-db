import React, { Component } from 'react';
import { BulmaStyledTheme, Container, Section, Navbar } from 'bulma-styled-components'
import { HashRouter as Router } from "react-router-dom";
import { Routes } from './routes'
import { Digimon } from './Data/Objects';

type State = {
  digimon: Digimon[]
}

class App extends Component<{}, State> {
  render() {
    return (
      <BulmaStyledTheme overrides={{ primary: '#0A5' }}>
        <Router>
          <div className="has-background-grey-light" style={{ minHeight: '100vh' }}>
            <Navbar className="is-fixed-top is-primary">
              asd
            </Navbar>
            <Section >
              <Container>
                <Routes/>
              </Container>
            </Section>
          </div>
        </Router>
      </BulmaStyledTheme>
    );
  }
}

const body = document.querySelector('body')
body && body.classList.add('has-navbar-fixed-top')

export default App;

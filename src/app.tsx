import React, { Component } from 'react';
import { BulmaStyledTheme, Container, Section } from 'bulma-styled-components'
import { HashRouter, Route } from "react-router-dom";
import { Routes } from './routes'
import { Header } from './components/Header'
import { Digimon } from './Data/Objects';

type State = {
  digimon: Digimon[]
}


class App extends Component<{}, State> {
  render() {
    return (
      <BulmaStyledTheme overrides={{ primary: '#0A5' }}>
        <HashRouter>
          <div className="has-background-grey-light" style={{ minHeight: '100vh' }}>
            <a href="#/digimon/1">click me</a>
            <Header />
            <Route render={(props) => (
              <Section {...props}>
                <Container {...props}>
                  <Routes/>
                </Container>
              </Section>
            )}/>
          </div>
        </HashRouter>
      </BulmaStyledTheme>
    );
  }
}

const body = document.querySelector('body')
body && body.classList.add('has-navbar-fixed-top')

export default App;

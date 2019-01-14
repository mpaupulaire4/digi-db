import React, { Component } from 'react';
import { BulmaStyledTheme, Container, Section, Navbar } from 'bulma-styled-components'
import { DigimonCard } from './components/DigimonCard'
import data from './data.json'

class App extends Component {
  render() {
    return (
      <BulmaStyledTheme>
        <div className="has-navbar-fixed-top">
          <Navbar className="is-fixed-top is-primary">
            asd
          </Navbar>
          <Section className="has-background-grey is-fullheight">
            <Container>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {data.digimon.map((digimon) => (
                <DigimonCard
                  key={digimon.id}
                  digimon={digimon}
                />
              ))}
              </div>
            </Container>
          </Section>
        </div>
      </BulmaStyledTheme>
    );
  }
}

export default App;

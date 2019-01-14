import React, { Component } from 'react';
import { BulmaStyledTheme, Container, Section, Navbar } from 'bulma-styled-components'
import { DigimonCard } from './components/DigimonCard'
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from './routes'
import { db } from './Data'
import { Digimon } from './Data/Objects';

type State = {
  digimon: Digimon[]
}

class App extends Component<{}, State> {
  state = {
    digimon: [] as Digimon[]
  }

  async componentDidMount() {
    const digimon = await db.table('digimon').toArray()
    this.setState({ digimon })
  }

  render() {
    return (
      <BulmaStyledTheme>
        <Router>
          <div className="has-navbar-fixed-top">
            <Navbar className="is-fixed-top is-primary">
              asd
            </Navbar>
            <Section className="has-background-grey is-fullheight">
              <Container>
                <Routes/>
                {/* <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {this.state.digimon.map((digimon) => (
                    <DigimonCard
                      key={digimon.id}
                      digimon={digimon}
                    />
                  ))}
                </div> */}
              </Container>
            </Section>
          </div>
        </Router>
      </BulmaStyledTheme>
    );
  }
}

export default App;

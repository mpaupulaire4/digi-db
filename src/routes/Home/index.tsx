import React, { Component } from "react";
import { DigimonCard } from '../../components/DigimonCard'
import { db } from '../../Data'
import { Digimon } from '../../Data/Objects'

type State = {
  digimon: Digimon[]
}


export class Home extends Component<{},State> {
  state = {
    digimon: [] as Digimon[]
  }

  async componentDidMount() {
    const digimon = await db.digimon.toArray()
    this.setState({ digimon })
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {this.state.digimon.map((digimon) => (
          <DigimonCard
            key={digimon.id}
            digimon={digimon}
          />
        ))}
      </div>
    )
  }
}
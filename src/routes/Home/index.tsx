import React, { Component, FormEvent } from "react";
import { Input } from 'bulma-styled-components'
import { DigimonCard } from '../../components/DigimonCard'
import { db } from '../../Data'
import { Digimon } from '../../Data/Objects'

type State = {
  digimon: Digimon[]
  name: string
}


export class Home extends Component<{},State> {
  state = {
    digimon: [] as Digimon[],
    name: '',
  }

  async componentDidMount() {
    const digimon = await db.digimon.toArray()
    this.setState({ digimon })
  }

  onChange = (e: any) => {
    this.setState({ name: e.target.value.toLowerCase() })
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <Input onChange={this.onChange}/>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.state.digimon.filter((digimon) => name ? digimon.name.toLowerCase().includes(name) : true).map((digimon) => (
            <DigimonCard
              link
              key={digimon.id}
              digimon={digimon}
            />
          ))}
        </div>
      </div>
    )
  }
}
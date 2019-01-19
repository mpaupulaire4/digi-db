import React, { Component, FormEvent } from "react";
import { Input, Checkbox } from 'bulma-styled-components'
import { DigimonCard } from '../../components/DigimonCard'
import { db } from '../../Data'
import { Digimon } from '../../Data/Objects'

type State = {
  digimon: Digimon[]
  name: string
  favorites: boolean
}


export class Home extends Component<{},State> {
  state: State = {
    digimon: [],
    name: '',
    favorites: false
  }

  async componentDidMount() {
    const digimon = await db.digimon.toArray()
    this.setState({ digimon })
  }

  onChange = (e: any) => {
    this.setState({ name: e.target.value.toLowerCase() })
  }

  toggleFavorite = () => {
    this.setState({ favorites: !this.state.favorites })
  }

  filter = (digimon: Digimon) => {
    const { name, favorites } = this.state
    if (favorites && !digimon.favorite) return false
    if (name && !digimon.name.toLowerCase().includes(name)) return false
    return true
  }

  render() {
    const { favorites } = this.state
    return (
      <div>
        <Input onChange={this.onChange}/>
        <Checkbox>
          <input type="checkbox" checked={favorites} onChange={this.toggleFavorite}/>
          Favorites
        </Checkbox>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {this.state.digimon.filter(this.filter).map((digimon) => (
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
import React, { Component, FormEvent } from "react";
import {
  Input,
  Checkbox,
  Card,
  Icon
} from 'bulma-styled-components'
import { DigimonCard } from '../../components/DigimonCard'
import { HeaderSearch } from '../../components/Header'
import { Favorite } from '../../components/Favorite'
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
    const { favorites, name } = this.state
    return (
      <div>
        <HeaderSearch
          Icon={<Favorite onClick={this.toggleFavorite} value={favorites} />}
          onChange={this.onChange}
          value={name}
        />
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
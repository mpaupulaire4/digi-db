import React, { Component } from "react";
import { TagSelect } from '../../components/TagSelect'
import { DigimonCard } from '../../components/DigimonCard'
import { HeaderSearch } from '../../components/Header'
import { Favorite } from '../../components/Favorite'
import { FilterIcon } from '../../components/FilterIcon'
import { db } from '../../Data'
import { Digimon } from '../../Data/Objects'

type State = {
  digimon: Digimon[]
  name: string
  favorites: boolean
  attrs: string[]
  types: string[]
  filterOpen: boolean
}

const Attributes = [
  'Fire',
  'Water',
  'Plant',
  'Electric',
  'Earth',
  'Wind',
  'Light',
  'Dark',
  'Neutral',
]

const Types = [
  'Data',
  'Vaccine',
  'Virus',
  'Free',
]

export class Home extends Component<{},State> {
  private static State: State = {
    digimon: [],
    name: '',
    favorites: false,
    attrs: [],
    types: [],
    filterOpen: false
  }

  constructor(props: {}) {
    super(props)
    this.state = Home.State
  }

  async componentDidMount() {
    const digimon = await db.digimon.toArray()
    this.setState({ digimon })
  }

  async componentWillUnmount() {
    Home.State = this.state
  }

  onChange = (e: any) => {
    this.setState({ name: e.target.value.toLowerCase() })
  }

  toggleFavorite = (e: any) => {
    e.stopPropagation()
    this.setState({ favorites: !this.state.favorites })
  }

  attrChange = (attrs: string[]) => {
    this.setState({
      attrs
    })
  }

  typeChange = (types: string[]) => {
    this.setState({
      types
    })
  }

  filter = (digimon: Digimon) => {
    const { name, favorites, attrs, types } = this.state
    if (favorites && !digimon.favorite) return false
    if (name && !digimon.name.toLowerCase().includes(name)) return false

    if (attrs.length && !attrs.includes(digimon.attribute)) return false
    if (types.length && !types.includes(digimon.type)) return false

    return true
  }

  toggleFilters = () => {
    this.setState({ filterOpen: !this.state.filterOpen })
  }

  render() {
    const { favorites, name, attrs, types, filterOpen } = this.state
    return (
      <div>
        <HeaderSearch
          Icon={<FilterIcon onClick={this.toggleFilters}/>}
          placeholder="Filter by Name"
          onChange={this.onChange}
          IInputLeft={<Favorite onClick={this.toggleFavorite} fav={favorites} style={{ position: 'absolute', right: 10, top: 6 }}/>}
          value={name}
        >
        {filterOpen && (
          <div style={{ position: 'relative', marginTop: -10 }}>
            <TagSelect
              value={attrs}
              label="Attribute"
              options={Attributes}
              onChange={this.attrChange}
            />
            <TagSelect
              value={types}
              label="Type"
              options={Types}
              onChange={this.typeChange}
            />
          </div>
        )}
        </HeaderSearch>
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
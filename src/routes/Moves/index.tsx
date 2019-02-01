import React, { Component } from "react";
import { MoveCard } from '../../components/MoveCard'
import { HeaderSearch } from '../../components/Header'
import { TagSelect } from '../../components/TagSelect'
import { FilterIcon } from '../../components/FilterIcon'
import { db } from '../../Data'
import { Move } from '../../Data/Objects'

type State = {
  moves: Move[]
  name: string
  filterOpen: boolean
  attrs: string[]
  types: string[]
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
  'Fixed',
  'Physical',
  'Magic',
  'Support',
]


export class Moves extends Component<{},State> {
  private static State: State = {
    moves: [],
    name: '',
    filterOpen: false,
    attrs: [],
    types: []
  }

  constructor(props: {}) {
    super(props)
    this.state = Moves.State
  }

  async componentDidMount() {
    const moves = await db.moves.toArray()
    this.setState({ moves })
  }

  async componentWillUnmount() {
    Moves.State = this.state
  }

  onChange = (e: any) => {
    this.setState({ name: e.target.value.toLowerCase() })
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

  moveFilter = (move: Move) => {
    const { name, attrs, types } = this.state
    if (attrs.length && !attrs.includes(move.attribute)) return false
    if (types.length && !types.includes(move.type)) return false

    if (!name) return true
    const words = name.split(/\s+/)
    for (let word of words) {
      if (
        !move.name.toLowerCase().includes(word.toLowerCase()) &&
        !move.description.toLowerCase().includes(word.toLowerCase())
      ) return false
    }
    return true
  }

  toggleFilters = () => {
    this.setState({ filterOpen: !this.state.filterOpen })
  }

  render() {
    const { name, filterOpen, attrs, types } = this.state
    return (
      <div>
        <HeaderSearch
          Icon={<FilterIcon onClick={this.toggleFilters}/>}
          onChange={this.onChange}
          placeholder="Filter by Name"
          value={name}
        >
        {filterOpen && (
          <div>
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
        <div >
          {this.state.moves.filter(this.moveFilter).map((move) => (
            <div key={move.id}>
              <MoveCard
                withDigimon={true}
                move={move}
              />
              <br/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

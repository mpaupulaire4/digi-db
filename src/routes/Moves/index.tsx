import React, { Component } from "react";
import { MoveCard } from '../../components/MoveCard'
import { HeaderSearch } from '../../components/Header'
import { db } from '../../Data'
import { Move } from '../../Data/Objects'
import { Icon } from "bulma-styled-components";

type State = {
  moves: Move[]
  name: string
  filterOpen: boolean
}


export class Moves extends Component<{},State> {
  private static State: State = {
    moves: [],
    name: '',
    filterOpen: false,
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

  moveFilter = (move: Move) => {
    const { name } = this.state
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
    const { name, filterOpen } = this.state
    return (
      <div>
        <HeaderSearch
          Icon={<FilterIcon onClick={this.toggleFilters}/>}
          onChange={this.onChange}
          placeholder="Filter by Name"
          value={name}
        >
        {filterOpen && (
          <div>Filters Coming Soon</div>
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

class FilterIcon extends React.PureComponent<{ onClick: () => void }> {
  render() {
    const { onClick } = this.props
    return (
      <Icon onClick={onClick} style={{ cursor: 'pointer' }} className="has-text-primary">
        <i className="fas fa-lg fa-sliders-h"/>
      </Icon>
    )
  }
}
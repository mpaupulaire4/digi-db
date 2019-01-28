import React, { Component } from "react";
import { MoveCard } from '../../components/MoveCard'
import { HeaderSearch } from '../../components/Header'
import { db } from '../../Data'
import { Move } from '../../Data/Objects'

type State = {
  moves: Move[]
  name: string
}


export class Moves extends Component<{},State> {
  state: State = {
    moves: [],
    name: ''
  }

  async componentDidMount() {
    const moves = await db.moves.toArray()
    this.setState({ moves })
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

  render() {
    return (
      <div>
        <HeaderSearch
          onChange={this.onChange}
          placeholder="Filter by Name"
          value={name}
        />
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
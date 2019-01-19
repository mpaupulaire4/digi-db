import React, { Component } from "react";
import { Input } from 'bulma-styled-components'
import { MoveCard } from '../../components/MoveCard'
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

  render() {
    const { name } = this.state
    return (
      <div>
        <Input onChange={this.onChange}/>
        <br/>
        <br/>
        <div >
          {this.state.moves.filter((move) => name ? move.name.toLowerCase().includes(name) : true).map((move) => (
            <div key={move.id}>
              <MoveCard
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
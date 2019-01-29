import React, { Component } from "react";
import { HeaderSearch } from '../../components/Header'
import { SupportCard } from '../../components/SupportCard'
import { db } from '../../Data'
import { Support } from '../../Data/Objects'

type State = {
  supports: Support[]
  name: string
}


export class Supports extends Component<{},State> {
  private static State: State = {
    supports: [],
    name: ''
  }

  constructor(props: {}) {
    super(props)
    this.state = Supports.State
  }

  async componentDidMount() {
    const supports = await db.supports.toArray()
    this.setState({ supports })
  }

  async componentWillUnmount() {
    Supports.State = this.state
  }

  onChange = (e: any) => {
    this.setState({ name: e.target.value.toLowerCase() })
  }

  filter = (move: Support) => {
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
    const { name } = this.state
    return (
      <div>
        <HeaderSearch
          placeholder="Filter by Name"
          onChange={this.onChange}
          value={name}
        />
        <div >
          {this.state.supports.filter(this.filter).map((support) => (
            <div key={support.id}>
              <SupportCard
                support={support}
              />
              <br/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
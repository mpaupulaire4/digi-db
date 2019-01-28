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
  state: State = {
    supports: [],
    name: ''
  }

  async componentDidMount() {
    const supports = await db.supports.toArray()
    this.setState({ supports })
  }

  onChange = (e: any) => {
    this.setState({ name: e.target.value.toLowerCase() })
  }

  render() {
    const { name } = this.state
    return (
      <div>
        <HeaderSearch
          onChange={this.onChange}
          value={name}
        />
        <div >
          {this.state.supports.filter((support) => name ? support.name.toLowerCase().includes(name) : true).map((support) => (
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
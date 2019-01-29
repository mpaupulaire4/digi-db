import React, { PureComponent } from "react";
import {
  Card,
  Content,
  Icon,
} from 'bulma-styled-components'
import { Move, Digimon } from '../Data/Objects'

type Props = {
  move: Move
  withDigimon?: boolean
  level?: number
}

type State = {
  open: boolean
  digimon?: Digimon[]
  digimonOpen: boolean
}

const AttrMap: { [type: string]: string } = {
  Neutral: 'fas fa-minus',
  Plant: 'fas fa-seedling',
  Light: 'fas fa-sun',
  Water: 'fas fa-tint',
  Wind: 'fas fa-wind',
  Dark: 'fas fa-moon',
  Earth: 'fas fa-mountain',
  Fire: 'fas fa-fire-alt',
  Electric: 'fas fa-bolt',
}

const textMap: { [type: string]: string } = {
  Earth: 'has-text-white-bis',
  Dark: 'has-text-white-bis',
  Fire: 'has-text-white-bis',
  Water: 'has-text-white-bis',
  Plant: 'has-text-white-bis',
}

const TypeMap: { [type: string]: string } = {
  Physical: 'fas fa-fist-raised',
  Magic: 'fas fa-hat-wizard',
  Support: 'fas fa-hands-helping',
  Fixed: 'fas fa-vector-square',
}


export class MoveCard extends PureComponent<Props, State> {
  state: State = {
    open: false,
    digimonOpen: false
  }

  async componentDidMount() {
    if (!this.props.withDigimon) return
    const digimon = await this.props.move.digimon()
    this.setState({ digimon })
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open, digimonOpen: false })
  }

  toggleDigimon = () => {
    this.setState({ digimonOpen: !this.state.digimonOpen })
  }

  render() {
    const { move, level, withDigimon } = this.props
    const { open, digimon, digimonOpen } = this.state
    return (
      <>
        <Card>
          <Card.Header className={`has-background-e-${move.attribute.toLowerCase()}`} onClick={this.toggleOpen}>
            <Card.Header.Title className={textMap[move.attribute]}>
              #{move.id} {move.name}
            </Card.Header.Title>
            <Card.Header.Icon className={textMap[move.attribute]}>
              <Icon>
                <i className={TypeMap[move.type]}/>
              </Icon>:
              <Icon>
                <i className={AttrMap[move.attribute]}/>
              </Icon>
              {level ? `LV. ${level}`:`#${move.id.toString().padStart(3, '0')}`}
            </Card.Header.Icon>
          </Card.Header>
          {open && (
            <Card.Content>
              <Content>
                {move.description}
              </Content>
            </Card.Content>
          )}
          <Card.Footer className="is-size-7">
            <Card.Footer.Item >
              <strong style={{paddingRight: 5}}>Power: </strong> {move.power}
            </Card.Footer.Item>
            <Card.Footer.Item>
              <strong style={{paddingRight: 5}}>Cost: </strong> {move.sp_cost}
            </Card.Footer.Item>
            <Card.Footer.Item>
              <strong style={{paddingRight: 5}}>Inherit: </strong> {move.inheritable}
            </Card.Footer.Item>
            {withDigimon && (
              <Card.Footer.Item as="a" onClick={this.toggleDigimon}>
                <strong style={{paddingRight: 5}}>Digimon: </strong> {digimon ? digimon.length : (
                  <Icon className="is-small">
                    <i className="fas fa-spinner fa-pulse" />
                  </Icon>
                )}
              </Card.Footer.Item>
            )}
          </Card.Footer>
        </Card>
        {withDigimon && digimonOpen && digimon && digimon.length && (
          <Card>
            <Card.Content>

            </Card.Content>
          </Card>
        )}
      </>
    )
  }
}
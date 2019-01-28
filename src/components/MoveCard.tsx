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
  Neutral: 'fas fa-lg fa-minus has-text-grey',
  Plant: 'fas fa-lg fa-leaf has-text-green',
  Light: 'fas fa-lg fa-sun has-text-yellow',
  Water: 'fas fa-lg fa-tint has-text-info',
  Wind: 'fas fa-lg fa-wind has-text-link',
  Dark: 'fas fa-lg fa-moon has-text-dark',
  Earth: 'fas fa-lg fa-mountain has-text-grey',
  Fire: 'fas fa-lg fa-fire has-text-red',
  Electric: 'fas fa-lg fa-bolt has-text-yellow',
  Thunder: 'fas fa-lg fa-bolt has-text-yellow',
}


export class MoveCard extends PureComponent<Props, State> {
  state: State = {
    open: false,
    digimonOpen: false
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
          <Card.Header className="has-background-primary" onClick={this.toggleOpen}>
            <Card.Header.Title>
              #{move.id} {move.name}
            </Card.Header.Title>
            {level && (
              <Card.Header.Icon>
                {`LV. ${level}`}
              </Card.Header.Icon>
            )}
          </Card.Header>
          {open && (
            <>
              <Card.Content>
                <Content>
                  <Icon>
                    <i className={AttrMap[move.attribute]}/>
                  </Icon>
                  <span>{move.description}</span>
                </Content>
              </Card.Content>
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
                    <strong style={{paddingRight: 5}}>Learned By: </strong> {digimon ? digimon.length : (
                      <Icon>
                        <i className="fas fa-spinner fa-pulse" />
                      </Icon>
                    )}
                  </Card.Footer.Item>
                )}
              </Card.Footer>
            </>
          )}
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
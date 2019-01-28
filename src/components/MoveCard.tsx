import React, { PureComponent } from "react";
import {
  Card,
  Content,
  Icon,
} from 'bulma-styled-components'
import { Move } from '../Data/Objects'

type Props = {
  move: Move,
  level?: number
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


export class MoveCard extends PureComponent<Props> {

  render() {
    const { move, level } = this.props
    if (!AttrMap[move.attribute]) console.log(move.attribute)

    return (
      <Card>
        <Card.Header className="has-background-primary">
          <Card.Header.Title>{move.name}</Card.Header.Title>
          <Card.Header.Icon>
            {level ? `LV. ${level}` : `#${move.id}`}
          </Card.Header.Icon>
        </Card.Header>
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
        </Card.Footer>
      </Card>
    )
  }
}
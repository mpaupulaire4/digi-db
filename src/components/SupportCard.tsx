import React, { PureComponent } from "react";
import {
  Card,
  Content,
  Icon,
} from 'bulma-styled-components'
import { Support } from '../Data/Objects'

type Props = {
  support: Support,
}

const AttrMap: { [type: string]: string } = {
  Neutral: 'fas fa-lg fa-minus has-text-grey',
  Plant: 'fas fa-lg fa-leaf has-text-green',
  Light: 'fas fa-lg fa-sun has-text-yellow',
  Water: 'fas fa-lg fa-tint has-text-info',
  Wind: 'fas fa-lg fa-wind has-text-light',
  Dark: 'fas fa-lg fa-moon has-text-dark',
  Earth: 'fas fa-lg fa-mountain has-text-grey',
  Fire: 'fas fa-lg fa-fire has-text-red',
  Electric: 'fas fa-lg fa-bolt has-text-yellow',
}


export class SupportCard extends PureComponent<Props> {

  render() {
    const { support } = this.props
    return (
      <Card>
        <Card.Header className="has-background-primary">
          <Card.Header.Title>{support.name}</Card.Header.Title>
          <Card.Header.Icon>
            #{support.id}
          </Card.Header.Icon>
        </Card.Header>
        <Card.Content>
          <Content>
            <span>{support.description}</span>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}
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

export class SupportCard extends PureComponent<Props> {

  render() {
    const { support } = this.props
    return (
      <Card>
        <Card.Header className="has-background-primary">
          <Card.Header.Title className="has-text-white-ter">{support.name}</Card.Header.Title>
          <Card.Header.Icon>
            #{support.id.toString().padStart(3, '0')}
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
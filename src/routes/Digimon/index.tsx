import React, { Component } from "react";
import { DigimonCard } from '../../components/DigimonCard'
import { Media, Box, Card, Content, Table } from 'bulma-styled-components'
import { db } from '../../Data'
import { Digimon as IDigimon } from '../../Data/Objects'

type State = {
  digimon?: IDigimon,
}

type Props = {
  match: {
    params: {
      id: string
    }
  }
}


export class Digimon extends Component<Props,State> {
  state = {} as State

  async componentDidMount() {
    const digimon = await db.digimon.get(parseInt(this.props.match.params.id))
    if (digimon) {
      digimon.join().then(() => {
        this.setState({ digimon })
      })
    }
    this.setState({ digimon })
  }

  render() {
    const { digimon } = this.state
    if (!digimon) return null
    return (
      <div>
        <Card>
          <Card.Content>
            <Media>
              <Media.Left as="figure">
                <DigimonCard digimon={digimon}/>
              </Media.Left>
              <Media.Content>
                <Content>
                  <p>
                    <strong>Type: </strong> {digimon.type}
                    <br/>
                    <strong>Attribute: </strong> {digimon.attribute}
                    <br/>
                    <strong>Stage: </strong> {digimon.stage}
                    <br/>
                    <strong>Memory: </strong> {digimon.memory}
                    <br/>
                    <strong>Equip Slots: </strong> {digimon.equip_slots}
                  </p>
                </Content>
              </Media.Content>
            </Media>
            {digimon.supportSkill && (
              <Content>
                <strong>Support Skill: </strong> {digimon.supportSkill.name}
                <br/>
                {digimon.supportSkill.description}
              </Content>
            )}
          </Card.Content>
        </Card>
        <br/>
        <Box className="is-paddingless is-clipped">
          <Table className="is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Digivolves From</th>
                <th>Level</th>
                <th>Requires</th>
              </tr>
            </thead>
            <tbody>
              {digimon.digivolveFrom && digimon.digivolveFrom.map((data) => (
                <tr key={data.digimon.id}>
                  <td>
                    <DigimonCard digimon={data.digimon}/>
                  </td>
                  <td>{data.level}</td>
                  <td>{data.require}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        <Box className="is-paddingless is-clipped">
          <Table className="is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Digivolves To</th>
                <th>Level</th>
                <th>Requires</th>
              </tr>
            </thead>
            <tbody>
              {digimon.digivolveTo && digimon.digivolveTo.map((data) => (
                <tr key={data.digimon.id}>
                  <td>
                    <DigimonCard digimon={data.digimon}/>
                  </td>
                  <td>{data.level}</td>
                  <td>{data.require}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        {digimon.moves && digimon.moves.map((data) => (
          <Card key={data.move.id}>
            <Card.Header>
              <Card.Header.Title>{data.move.name}</Card.Header.Title>
              <Card.Header.Icon>
                LV. {data.level}
              </Card.Header.Icon>
            </Card.Header>
            <Card.Content>
              <Content>{data.move.description}</Content>
            </Card.Content>
          </Card>
        ))}
      </div>
    )
  }
}
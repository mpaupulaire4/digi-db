import React, { Component } from "react";
import { DigimonCard } from '../../components/DigimonCard'
import { MoveCard } from '../../components/MoveCard'
import { Favorite } from '../../components/Favorite'
import { Media, Box, Card, Content, Table, Checkbox, Icon } from 'bulma-styled-components'
import { db } from '../../Data'
import { Digimon as IDigimon } from '../../Data/Objects'

type State = {
  digimon?: IDigimon,
  stats?: string
}

type Props = {
  match: {
    params: {
      id: string
    }
  }
}


export class Digimon extends Component<Props,State> {
  state: State = {}

  async componentDidMount() {
    const digimon = await db.digimon.get(parseInt(this.props.match.params.id))
    if (digimon) {
      digimon.join().then(() => {
        this.setState({ digimon })
      })
    }
    this.setState({ digimon })
  }

  async componentWillReceiveProps(props: Props) {
    if (this.props.match.params.id === props.match.params.id) return
    const digimon = await db.digimon.get(parseInt(props.match.params.id))
    if (digimon) {
      digimon.join().then(() => {
        this.setState({ digimon })
      })
    }
    this.setState({ digimon })
  }

  favorite = async () => {
    const { digimon } = this.state
    if (!digimon) return
    await digimon.toggleFavorite()
    this.setState({ digimon })

  }
  changeStat(level: string) {
    return () => this.setState({ stats: this.state.stats === level ? undefined : level })
  }

  render() {
    const { digimon, stats } = this.state
    if (!digimon) return null
    return (
      <div>
        <Card>
          <Card.Header className="has-background-primary">
            <Card.Header.Title>
              #{digimon.id} {digimon.name}
            </Card.Header.Title>
            <Card.Header.Icon>
              {digimon.stage}
            </Card.Header.Icon>
          </Card.Header>
          <Card.Content>
            <Media>
              <Media.Left as="figure">
                <DigimonCard
                  nameless
                  digimon={digimon}
                />
              </Media.Left>
              <Media.Content>
                <Content style={{ position: 'relative' }}>
                  <Favorite
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={this.favorite}
                    fav={digimon.favorite}
                  />
                  <p>
                    <strong>Type: </strong> {digimon.type}
                    <br/>
                    <strong>Attribute: </strong> {digimon.attribute}
                    <br/>
                    <strong>Memory: </strong> {digimon.memory}
                    <br/>
                    <strong>Slots: </strong> {digimon.slots}
                  </p>
                </Content>
              </Media.Content>
            </Media>
            {digimon.supportSkill && (
              <Content>
                <span style={{ textDecorationLine: 'underline' }}>
                  <strong>Support Skill: </strong> {digimon.supportSkill.name}
                </span>
                <br/>
                {digimon.supportSkill.description}
              </Content>
            )}
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Item as="a" onClick={this.changeStat('01')}>LV. 01</Card.Footer.Item>
            <Card.Footer.Item as="a" onClick={this.changeStat('50')}>LV. 50</Card.Footer.Item>
            <Card.Footer.Item as="a" onClick={this.changeStat('99')}>LV. 99</Card.Footer.Item>
          </Card.Footer>
        </Card>
        {stats && (
          <Card>
            <Card.Content className="is-paddingless">
              <Table className="is-bordered is-fullwidth is-size-7">
                <thead>
                  <tr>
                    <th>HP</th>
                    <th>SP</th>
                    <th>ATK</th>
                    <th>DEF</th>
                    <th>INT</th>
                    <th>SPD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{digimon.stats[stats].hp}</td>
                    <td>{digimon.stats[stats].sp}</td>
                    <td>{digimon.stats[stats].atk}</td>
                    <td>{digimon.stats[stats].def}</td>
                    <td>{digimon.stats[stats].int}</td>
                    <td>{digimon.stats[stats].spd}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Content>
          </Card>
        )}
        <br/>
        <Box className="is-paddingless is-clipped">
          <Table className="is-bordered is-fullwidth">
            <thead className="has-background-primary">
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
                    <DigimonCard link digimon={data.digimon}/>
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
            <thead className="has-background-primary">
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
                    <DigimonCard link digimon={data.digimon}/>
                  </td>
                  <td>{data.level}</td>
                  <td>{data.require}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        {digimon.moves && digimon.moves.map((data) => (
          <MoveCard key={data.move.id} move={data.move} level={data.level}/>
        ))}
      </div>
    )
  }
}
import React from 'react'
import { Navbar } from 'bulma-styled-components'


type Props = {

}
type State = {
  menu: boolean
}
export class Header extends React.Component<Props, State> {
  state: State = {
    menu: false
  }
  render() {
    const { menu } = this.state
    return (
      <Navbar className="is-fixed-top is-primary">
        <Navbar.Brand>
          <Navbar.Item>DigiDB</Navbar.Item>
          <Navbar.Burger onClick={() => this.setState({ menu: !menu })} className={menu ? 'is-active' : undefined} >
            <span/>
            <span/>
            <span/>
          </Navbar.Burger>
        </Navbar.Brand>
        <Navbar.Menu className={menu ? 'is-active' : undefined}>
          <Navbar.Start>
            <Navbar.Item as="a" href="#/">Digimon</Navbar.Item>
            <Navbar.Item as="a" href="#/moves">Moves</Navbar.Item>
            <Navbar.Item as="a" href="#/supports">Support Skills</Navbar.Item>
          </Navbar.Start>
        </Navbar.Menu>
      </Navbar>
    )
  }
}
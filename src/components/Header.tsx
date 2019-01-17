import React from 'react'
import { Navbar } from 'bulma-styled-components'
import { NavLink } from 'react-router-dom'


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
          <Navbar.Burger onClick={() => this.setState({ menu: !menu })} className={menu ? 'is-active' : ''} >
            <span/>
            <span/>
            <span/>
          </Navbar.Burger>
        </Navbar.Brand>
        <Navbar.Menu className={menu ? 'is-active' : ''}>
          <Navbar.Start>
            <Navbar.Item as="a">
              <NavLink to="/" style={{ textDecoration: 'none', color:'black' }}>Home</NavLink>
            </Navbar.Item>
          </Navbar.Start>
        </Navbar.Menu>
      </Navbar>
    )
  }
}
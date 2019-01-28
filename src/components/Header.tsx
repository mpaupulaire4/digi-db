import React from 'react'
import { Navbar, Tabs } from 'bulma-styled-components'


type Props = {

}
type State = {
  menu: boolean
}


export class Header extends React.Component<Props, State> {
  render() {
    function match(path: string) {
      return window.location.hash === path ? 'is-active' : undefined
    }
    return (
      <Navbar className="is-fixed-top is-primary">
        <div style={{ position: 'relative', height: 0 }}>
          <Tabs className="is-boxed is-centered" style={{ position: 'absolute', left: 0, right: 0, bottom: -54 }}>
            <ul>
              <li className={match("#/")}><a href="#/" className="is-active">Digimon</a></li>
              <li className={match("#/moves")}><a href="#/moves">Moves</a></li>
              <li className={match("#/supports")}><a href="#/supports">Support Skills</a></li>
            </ul>
          </Tabs>
        </div>
      </Navbar>
    )
  }
}
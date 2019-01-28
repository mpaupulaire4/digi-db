import React, { FormEvent, ReactNode, HTMLProps } from 'react'
import {
  Navbar,
  Tabs,
  Card,
  Input
} from 'bulma-styled-components'


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
        <div style={{ position: 'relative' }}>
          <Tabs className="is-boxed is-centered" style={{ position: 'absolute', left: 0, right: 0, top: 10 }}>
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

export function HeaderSearch({ Icon, children, ...props}: HeaderSearchProps) {
  return (
    <div style={{ height: 30 }}>
      <Card style={{ position: 'fixed', top: 52, left: 0, right: 0, zIndex: 100 }}>
        <Card.Header >
          <Card.Header.Title>
            <Input {...props}/>
          </Card.Header.Title>
          {Icon && <Card.Header.Icon children={Icon}/>}
        </Card.Header>
        {children && <Card.Content children={children}/>}
      </Card>
    </div>
  )
}

type HeaderSearchProps = {
  Icon?: ReactNode,
  children?: ReactNode
} & HTMLProps<any>
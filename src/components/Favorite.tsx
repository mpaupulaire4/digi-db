import React from 'react'
import { Icon } from 'bulma-styled-components'

type Props = {
  onClick: () => void,
  value?: boolean
}

export class Favorite extends React.PureComponent<Props> {
  render() {
    const { onClick, value } = this.props
    return (
      <Icon onClick={onClick}>
        <i className={`${value ? 'fas' : 'far'} fa-lg fa-heart`}/>
      </Icon>
    )
  }
}
import React, { HTMLProps } from 'react'
import { Icon } from 'bulma-styled-components'

type Props = {
  onClick: () => void,
  fav?: boolean
} & HTMLProps<any>

export class Favorite extends React.PureComponent<Props> {
  render() {
    const { onClick, fav, ...props } = this.props
    return (
      <Icon onClick={onClick} {...props}>
        <i className={`${fav ? 'fas' : 'far'} fa-lg fa-heart has-text-primary`}/>
      </Icon>
    )
  }
}